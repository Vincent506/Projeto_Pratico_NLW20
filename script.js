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

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha TODOS os campos!!!')
        return
    }

    askButton.disabled == true

    askButton.textContent = 'Perguntando....'

    askButton.classList.add('loading')

    try {
        //perguntar para IA

    }catch(error) {
        conseole.log('Error: ', error)

    } finally {
        askButton.disabled == false;
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }
    
}

form.addEventListener('submit', sendForm)