const chat_Msg = document.getElementById("chatMsg");
const chatForm = document.getElementById("chart_window");
const chatCont = document.querySelector(".container");
const socket = io();

//The user uploads an image
let preview = document.getElementById("file-ip-1-preview");
let isFileUploaded = false;
let fileSource = null;

function showPreview(event){
  if(event.target.files.length > 0){
    fileSource = URL.createObjectURL(event.target.files[0]);
    preview.src = fileSource;
    preview.style.display = "block";
    isFileUploaded = true;
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

// chat communication between user
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let message;
  let textMessage = e.target.elements.msg.value;
  //The user uploads and sends an image along a text
  if (isFileUploaded){
    message = textMessage +  `<br> <img src='${fileSource}' width="300" height="300">`;
    preview.src = "";
    preview.style.display = "none";
  }
  //user only sends a text to the chat
  else{
    message = `${textMessage}`;
    preview.src = "";
    preview.style.display = "none";
  }

  //emmet message to the server.
  socket.emit("chartMessage", message);

  e.target.elements.msg.value = "";
  e.target.files[0] = "";
  e.target.elements.msg.focus();
});

//Display message to the chatroom
function outputMsg(message) {
  const li = document.createElement("li"); 
  let text = ` ${message.username}   ${message.time} -->  ${message.text}`;
  li.innerHTML = text;
  chatMsg.appendChild(li);
}
