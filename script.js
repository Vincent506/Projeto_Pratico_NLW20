const apiKeyInput = document.getElementById("ApiKey")
const gameSelect = document.getElementById("gameSelect")
const questionInput = document.getElementById("questionInput")
const askButton = document.getElementById("askButton")
const form = document.getElementById("form")
const aiResponse = document.getElementById("aiResponse")

const sendForm = (event) => {
    event.preventDefaul()
    console.log(event)
}

form.addEventListener('submit', sendForm)