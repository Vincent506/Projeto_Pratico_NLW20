const apiKeyInput = document.getElementById("ApiKey")
const gameSelect = document.getElementById("gameSelect")
const questionInput = document.getElementById("questionInput")
const askButton = document.getElementById("askButton")
const form = document.getElementById("form")
const aiResponse = document.getElementById("aiResponse")

const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const perguntarAI = async (question, game, ApiKey) => {
    const model = "gemini-2.5-flash"
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${ApiKey}`
    
    let pergunta = ''

    
    
    const perguntaLoL = `
        ## Especialidade
        Você é um especialista assistente de meta para jogo ${game}

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu 
        conhecimento do jogo, estratégias, build e dicas

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não 
        tente inventar uma resposta. 
        
        - Se a pergunta não esta relacionada ao jogo, responda com 
        'Essa pergunta não está relacionada ao jogo '
        
        - Considere a data atual ${new Date().toLocaleDateString()} e
        
        - Faça pesquisas atualizadas sobre o patch atual, baseado na 
        data atual, para dar uma resposta coerente.
        
        -Nunca responda itens que você não tenha certeza de que existe
        no patch atual. 

        ## Reposta
        - Economize na resposta, seja direto e responda no maximo 500
        caracteres
        
        - Responda em Mark
        
        - Não precisa fazer nenhuma saudação ou despedida, apenas 
        responda o que o usuário está querendo.

        ## Exemplo de Resposta

        Pergunta do usuário: Melhor build rengar jungle
        resposta: A build mais atual é 
        \n\n**Itens:**\n\n
        coloque os itens aqui.
        \n\n**Runas:**\n\n
        exemplo de runas\n\n

        ---
        Aqui está a pergunta do usuário: ${question}`

        const perguntaValorant = `
        

        `
        const perguntaCS = `
        
        `

        if(game == 'League of Legends'){
            pergunta = perguntaLoL
        }else if( game == 'Valorant'){
            pergunta = perguntaValorant
        }else if( game == 'CS:GO'){
            pergunta = perguntaCS
        }

    const contents = [{
        role: 'user',
        parts: [{
            text: pergunta
        }]
    }]
    const tools = [{
        google_search: {}
    }]

    //chamada API
    const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
            contents,
            tools 
        })
    })
    const data = await response.json()

    return data.candidates[0].content.parts[0].text
}

const sendForm = async (event) => {
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
        const text = await perguntarAI(question,game,apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')
    }catch(error) {
        conseole.log('Error: ', error)

    } finally {
        askButton.disabled == false;
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }
    
}

form.addEventListener('submit', sendForm)