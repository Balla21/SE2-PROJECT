const chat_Msg = document.getElementById("chatMsg");
const chatForm = document.getElementById("chart_window");
const chatCont = document.querySelector(".container");
const socket = io();

//The user uploads an image
let isImageUploaded = false;
let imageSource

function showPreview(event){
  if(event.target.files.length > 0){
    imageSource = URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("file-ip-1-preview");
    preview.src = imageSource;
    preview.style.display = "block";
    isImageUploaded = true;
  }
}

//Get userName using Query
const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
//join chartuser
socket.emit("joinUser", { username });

//message from server
socket.on("message", (message) => {
  console.log(`${message}`);
  outputMsg(message);

  //scroll down
  chat_Msg.scrollTop = chat_Msg.scrollHeight;
});

// message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let msg = e.target.elements.msg.value;
  //emmet message to the server.
  socket.emit("chartMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//Display message to the chatroom
function outputMsg(message) {
  const li = document.createElement("li"); 
  let text = ` ${message.username}   ${message.time} -->  `;
  // user uploads an image with a text to the chat
  if (isImageUploaded){
    text += `${message.text} <br> <img src='${imageSource}' >`;
  }
  //user only uploads a text to the chat
  else{
    text += `${message.text}`;
  }
  li.innerHTML = text;
  chatMsg.appendChild(li);
}
