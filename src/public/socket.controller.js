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
    data.slice().reverse().forEach((message) => {
      const date = new Date(message.timestamp); 
      let minutes = date.getMinutes().toString().padStart(2, '0');
      let hour = date.getHours().toString().padStart(2, '0');
      if (userType === "false") {
        if (message.response) {
          html += `
            <div class="container d-flex justify-content-center">
              <div class="row col-12">
                <div class="alert alert-light m-auto mt-3">
                  <h3><span style="color: blue;">${message.email}</span> | ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</h3>
                  <hr>
                  <h4>${hour}:${minutes}hs</h4>
                  <hr>
                  <h4>Mensaje:</h4>
                  <p>${message.message}</p>
                  <hr>
                  <h4>Respuesta:</h4>
                  <p><span style="color: blue;">${message.response}</span></p>
                </div>
              </div>
            </div>
          `
        } else {
          html += `
          <div class="container d-flex justify-content-center">
            <div class="row col-12">
              <div class="alert alert-light m-auto mt-3">
                <h3><span style="color: blue;">${message.email}</span> | ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</h3>
                <hr>
                <h4>${hour}:${minutes}hs</h4>
                <hr>
                <h4>Mensaje:</h4>
                <p>${message.message}</p>
              </div>
            </div>
          </div>
        `          
        }
      } else {
        if (message.response) {
          html += `
          <div class="container d-flex justify-content-center">
            <div class="row col-12">
              <div class="alert alert-light m-auto mt-3">
                <h3><span style="color: blue;">${message.email}</span> | ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</h3>
                <hr>
                <h4>${hour}:${minutes}hs</h4>
                <hr>
                <h4>Mensaje:</h4>
                <p>${message.message}</p>
                <hr>
                <h4>Respuesta:</h4>
                <p><span style="color: blue;">${message.response}</span></p>
              </div>
            </div>
          </div>
        `
        } else {
          html += `
            <div class="container d-flex justify-content-center">
              <div class="row col-12">
                <div class="alert alert-light m-auto mt-3">
                  <h3><span style="color: blue;">${message.email}</span> | ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</h3>
                  <hr>
                  <h4>${hour}:${minutes}hs</h4>
                  <hr>
                  <h4>Mensaje:</h4>
                  <p>${message.message}</p>
                  <hr>
                  <div class="form-group">
                    <input class="mt-3 form-control" type="text" name="respose_${message._id}" id="id_${message._id}" placeholder="Escriba una respuesta">
                    <button class="mt-3 btn btn-primary" name="PUT" value="${message._id}" id="submit_${message._id}">Enviar una respuesta</button>
                  </div>
                </div>
              </div>
            </div>
          `    
        }
      }
    });
    messagesHistory.innerHTML = html
  } 
})

