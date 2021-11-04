const chat_Msg = document.getElementById("chatMsg");
const chatForm = document.getElementById("chart_window");
const chatCont = document.querySelector(".container");
const socket = io();

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

//message to DOM
function outputMsg(message) {
  const li = document.createElement("li");
  li.innerHTML = `
  ${message.username}   ${message.time} -->
  ${message.text}`;
  chatMsg.appendChild(li);
}
