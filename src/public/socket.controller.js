const socket = io()

let messagesForm = document.getElementById('messagesForm')


const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form)
  let obj = {}
  let method = "";
  const messageId = evt.submitter.value
  if (!messageId) {
    method = "POST"
    formData.forEach((value, key) => obj[key]=value);
    socketEvent = route.slice(1);
  } else {
    method = evt.submitter.name
    const responseInput = document.getElementById(`id_${messageId}`).value;
    if (responseInput === "") return alert("Debe ingresar una respuesta")
    obj = { id: messageId, response: responseInput}
    route = route + "/" + messageId
    socketEvent = "chatResponse"
  }
  fetch(route, {
    method: method,
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json"
    }
  })
  .then(response => response.json())
  .then(response => socket.emit(socketEvent, response))
  .then(() => form.reset())
}

messagesForm.addEventListener('submit', (e) => handleSubmit(e, e.target, '/chat'))

socket.on('messagesHistory', data => {
  if (data && data.length > 0) {
    let messagesHistory = document.getElementById("messagesHistory")
    let html = '';
    const userType = document.getElementById("userType").value
    data.forEach((message) => {
      const date = new Date(message.timestamp); 
      let minutes = date.getMinutes().toString().padStart(2, '0');
      if (userType === "false") {
        if (message.response) {
          html += `
            <ul style="border: 2px solid #000000;">
              <li><span style="color: blue;">Usuario: </span>${message.email}</li>
              <li><span style="color: blue;">Día: </span>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</li>
              <li><span style="color: blue;">Hora: </span>${date.getHours()}:${minutes}hs</li>
              <li><span style="color: blue;">Mensaje: </span>${message.message}</li>
              <li><span style="color: red;">Respuesta: </span>${message.response}</li>
            </ul>
          `
        } else {
          html += `
            <ul style="border: 2px solid #000000;">
              <li><span style="color: blue;">Usuario: </span>${message.email}</li>
              <li><span style="color: blue;">Día: </span>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</li>
              <li><span style="color: blue;">Hora: </span>${date.getHours()}:${minutes}hs</li>
              <li><span style="color: blue;">Mensaje: </span>${message.message}</li>
            </ul>
          `          
        }
      } else {
        if (message.response) {
          html += `
          <div style="border: 2px solid #000000;">
            <ul>
              <li><span style="color: blue;">Usuario: </span>${message.email}</li>
              <li><span style="color: blue;">Día: </span>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</li>
              <li><span style="color: blue;">Hora: </span>${date.getHours()}:${minutes}hs</li>
              <li><span style="color: blue;">Mensaje: </span>${message.message}</li>
              <li><span style="color: Red;">Respuesta: </span>${message.response}</li>
            </ul>
          </div>
          <br>
        `      
        } else {
          html += `
          <div style="border: 2px solid #000000;">
            <ul>
              <li><span style="color: blue;">Usuario: </span>${message.email}</li>
              <li><span style="color: blue;">Día: </span>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</li>
              <li><span style="color: blue;">Hora: </span>${date.getHours()}:${minutes}hs</li>
              <li><span style="color: blue;">Mensaje: </span>${message.message}</li>
            </ul>
            <input type="text" name="respose_${message._id}" id="id_${message._id}" placeholder="Escriba una respuesta">
            <button name="PUT" value="${message._id}" id="submit_${message._id}">Enviar</button>
          </div>
          <br>
        `    
        }
      }
    });
    messagesHistory.innerHTML = html
  } 
})

