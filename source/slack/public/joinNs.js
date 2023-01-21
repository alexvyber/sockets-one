function joinNs(endpoint) {
  if (nsSocket) {
    // check to see if nsSocket is actually a socket
    nsSocket.close()

    // remove the eventListener before it's added again
    document
      .querySelector("#user-input")
      .removeEventListener("submit", formSubmission)
  }

  nsSocket = io(`http://localhost:9000${endpoint}`)

  nsSocket.on("nsRoomLoad", nsRooms => {
    const roomList = document.querySelector(".room-list")

    roomList.innerHTML = ""

    nsRooms.forEach(room => {
      roomList.innerHTML += `<li class="room">${room.roomTitle}</li>`
    })

    // // add click listener to each room
    const roomNodes = document.getElementsByClassName("room")

    Array.from(roomNodes).forEach(elem => {
      elem.addEventListener("click", e => {
        joinRoom(e.target.innerText)
      })
    })

    // // add room automatically... first time here
    const topRoom = document.querySelector(".room")
    const topRoomName = topRoom.innerText

    joinRoom(topRoomName)
  })

  // --
  nsSocket.on("messageToClients", msg => {
    console.log(msg)
    const newMsg = buildHTML(msg)
    document.querySelector("#messages").innerHTML += newMsg
  })

  document
    .querySelector(".message-form")
    .addEventListener("submit", formSubmission)
}

// const getCurrentRoom = () => {
//   return currentRoom
// }

function formSubmission(event) {
  event.preventDefault()
  const newMessage = document.querySelector("#user-message").value
  nsSocket.emit("newMessageToServer", {
    text: newMessage,
    room: currentRoom,
  })
}

function buildHTML(msg) {
  const convertedDate = new Date(msg.time).toLocaleString("ru")

  const newHTML = `
    <li>
        <div class="user-image">
            <img src="${msg.avatar}" style="max-width: 30px"/>
        </div>
        <div class="user-message">
            <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
            <div class="message-text">${msg.text}</div>
        </div>
    </li>    
    `

  return newHTML
}
