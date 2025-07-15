let mensagem = document.getElementById('mensagem')
let btnEditarSaida = document.getElementById('btnEditarSaida')
let btnBuscarSaida = document.getElementById('btnBuscarSaida')

mensagem.style.display = 'none'

btnBuscarSaida.addEventListener('click', () => {
    let codSaida = document.getElementById('codSaida').value

    fetch(`http://localhost:8081/saida/${codSaida}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar saida')
            }
            return response.json()
        })
        .then(saida => {
            if (saida && saida.codSaida) {
            

                mensagem.textContent = 'SAIDA ENCONTRADO!'
                mensagem.style.color = 'white'
                mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
                mensagem.style.backgroundColor = 'green'
                mensagem.style.border = '1px solid white'
            } else {
                mensagem.textContent = 'SAIDA NÃO ENCONTRADO!'
                mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
                mensagem.style.backgroundColor = 'lightcoral'
                mensagem.style.border = '1px solid red'
            }
            mensagem.style.display = 'block'
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO BUSCAR SAIDA!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            mensagem.style.display = 'block'
            console.error('Erro ao buscar saida:', error)
        })
})

btnEditarSaida.addEventListener('click', (e) => {
    e.preventDefault()

    let codSaida = document.getElementById('codSaida').value
    let nome = document.getElementById('nomeSaida').value
    let sobrenome = document.getElementById('sobrenomeSaida').value
    let matricula = document.getElementById('matriculaSaida').value
    let telefone = document.getElementById('telefoneSaida').value
    let email = document.getElementById('emailSaida').value

    if (codSaida && nome && sobrenome && matricula && telefone && email) {
        fetch(`http://localhost:8081/saida/${codSaida}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                sobrenome: sobrenome,
                matricula: matricula,
                telefone: telefone,
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            mensagem.textContent = 'SAIDA EDITADO COM SUCESSO!'
            mensagem.style.color = 'white'
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
            mensagem.style.backgroundColor = 'green'
            mensagem.style.border = '1px solid white'
            console.log('Saida editado com sucesso:', data)
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO EDITAR SAIDA!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            console.error('Erro ao editar saida:', error)
        })
    } else {
        mensagem.textContent = 'POR FAVOR, PREENCHA TODOS OS CAMPOS!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral'
        mensagem.style.border = '1px solid red'
        console.error('Por favor, preencha todos os campos.')
    }
    mensagem.style.display = 'block'
})