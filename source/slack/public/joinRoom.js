function joinRoom(roomName) {
  // Send this roomName to the server!
  nsSocket.emit(
    "joinRoom",

    { roomToJoin: roomName, roomToLeave: currentRoom },

    // newNumberOfMembers => {
    //   // we want to update the room member total now that we have joined!

    //   document.querySelector(
    //     ".curr-room-num-users",
    //   ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
    // },
  )

  currentRoom = roomName

  nsSocket.on("historyCatchUp", history => {
    console.log("🚀 ~ joinRoom ~ history", history)

    const messagesUl = document.querySelector("#messages")
    messagesUl.innerHTML = ""
    history.forEach(msg => {
      const newMsg = buildHTML(msg)
      messagesUl.innerHTML += newMsg
    })
    messagesUl.scrollTo(0, messagesUl.scrollHeight)
  })

  nsSocket.on("updateMembers", numMembers => {
    document.querySelector(
      ".curr-room-num-users",
    ).innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`
    document.querySelector(".curr-room-text").innerText = `${roomName}`
  })

  let searchBox = document.querySelector("#search-box")

  searchBox.addEventListener("input", e => {
    // console.log(e.target.value)

    let messages = Array.from(document.getElementsByClassName("message-text"))
    console.log(messages)

    messages.forEach(msg => {
      const searchTerm = msg.innerText
        .toLowerCase()
        .indexOf(e.target.value.toLowerCase())

      msg.style.display = searchTerm !== -1 ? "block" : "none"
    })
  })
}
