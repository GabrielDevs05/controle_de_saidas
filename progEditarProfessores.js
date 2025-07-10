let mensagem = document.getElementById('mensagem')
let btnEditarProfessor = document.getElementById('btnEditarProfessor')
let btnBuscarProfessor = document.getElementById('btnBuscarProfessor')

mensagem.style.display = 'none'

btnBuscarProfessor.addEventListener('click', () => {
    let codProfessor = document.getElementById('codProfessor').value

    fetch(`http://localhost:8081/professor/${codProfessor}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar professor')
            }
            return response.json()
        })
        .then(professor => {
            if (professor && professor.codProfessor) {
                document.getElementById('nomeProfessor').value = professor.nome
                document.getElementById('sobrenomeProfessor').value = professor.sobrenome
                document.getElementById('matriculaProfessor').value = professor.matricula
                document.getElementById('telefoneProfessor').value = professor.telefone
                document.getElementById('emailProfessor').value = professor.email
                mensagem.textContent = 'PROFESSOR ENCONTRADO!'
                mensagem.style.color = 'white'
                mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
                mensagem.style.backgroundColor = 'green'
                mensagem.style.border = '1px solid white'
            } else {
                mensagem.textContent = 'PROFESSOR NÃO ENCONTRADO!'
                mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
                mensagem.style.backgroundColor = 'lightcoral'
                mensagem.style.border = '1px solid red'
            }
            mensagem.style.display = 'block'
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO BUSCAR PROFESSOR!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            mensagem.style.display = 'block'
            console.error('Erro ao buscar professor:', error)
        })
})

btnEditarProfessor.addEventListener('click', (e) => {
    e.preventDefault()

    let codProfessor = document.getElementById('codProfessor').value
    let nome = document.getElementById('nomeProfessor').value
    let sobrenome = document.getElementById('sobrenomeProfessor').value
    let matricula = document.getElementById('matriculaProfessor').value
    let telefone = document.getElementById('telefoneProfessor').value
    let email = document.getElementById('emailProfessor').value

    if (codProfessor && nome && sobrenome && matricula && telefone && email) {
        fetch(`http://localhost:8081/professor/${codProfessor}`, {
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
            mensagem.textContent = 'PROFESSOR EDITADO COM SUCESSO!'
            mensagem.style.color = 'white'
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
            mensagem.style.backgroundColor = 'green'
            mensagem.style.border = '1px solid white'
            console.log('Professor editado com sucesso:', data)
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO EDITAR PROFESSOR!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            console.error('Erro ao editar professor:', error)
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