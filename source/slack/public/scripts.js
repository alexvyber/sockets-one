// const username = prompt("What is your username?")
const username = "zalupa " + Math.random()
// const socket = io('http://localhost:9000'); // the / namespace/endpoint

const socket = io("http://localhost:9000", {
  query: {
    username,
  },
})

let currentRoom = ""

let nsSocket = ""

// listen for nsList, which is a list of all the namespaces.
socket.on("nsList", nsData => {
  // console.log("The list of .rooms has arrived!!")
  // console.log(nsData)

  let namespacesDiv = document.querySelector(".namespaces")
  namespacesDiv.innerHTML = ""

  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`
  })

  // Add a clicklistener for each NS
  // console.log(document.getElementsByClassName("namespace"))

  Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
    elem.addEventListener("click", _event => {
      const nsEndpoint = elem.getAttribute("ns")
      // console.log(`${nsEndpoint} I should go to now`)
      joinNs(nsEndpoint)
    })
  })

  joinNs(nsData[0].endpoint)
})
