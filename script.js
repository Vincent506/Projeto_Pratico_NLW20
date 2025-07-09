const apiKeyInput = document.getElementById("ApiKey")
const gameSelect = document.getElementById("gameSelect")
const questionInput = document.getElementById("questionInput")
const askButton = document.getElementById("askButton")
const form = document.getElementById("form")
const aiResponse = document.getElementById("aiResponse")

const sendForm = (event) => {
    event.preventDefault()
    console.log(event)

    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    console.log({apiKey, game, question})
}

form.addEventListener('submit', sendForm)