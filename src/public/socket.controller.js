const socket = io()

let messagesForm = document.getElementById('messagesForm')

const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form)
  let obj = {}
  formData.forEach((value, key) => obj[key]=value);
  socketEvent = route.slice(1);
  fetch(route, {
    method: "POST",
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
  if (data.length > 0) {
    let messagesHistory = document.getElementById("messagesHistory")
    let html = '';
    let user = '';
    data.forEach(message => {
      if (message.userType === "system") {
        user = `<span style="color: red;">System: </span>`;
      } else if (message.userType === "user") {
        user = `<span style="color: blue;">User: </span>`;
      }
      const date = new Date(message.timestamp); 
      let minutes = date.getMinutes().toString().padStart(2, '0');
      html += `
        <ul style="border: 2px solid #000000;">
          <li><span style="color: blue;">${user}: </span>${message.email}</li>
          <li><span style="color: blue;">Día: </span>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</li>
          <li><span style="color: blue;">Hora: </span>${date.getHours()}:${minutes}hs</li>
          <li><span style="color: blue;">Mensaje: </span>${message.message}</li>
        </ul>
      `
    });
    messagesHistory.innerHTML = html
  }
})
