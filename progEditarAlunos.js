let mensagem = document.getElementById('mensagem')
let btnEditarAluno = document.getElementById('btnEditarAluno')
let btnBuscarAluno = document.getElementById('btnBuscarAluno')

mensagem.style.display = 'none'

btnBuscarAluno.addEventListener('click', () => {
    let codAluno = document.getElementById('codAluno').value

    fetch(`http://localhost:8081/aluno/${codAluno}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar aluno')
            }
            return response.json()
        })
        .then(aluno => {
            if (aluno && aluno.codAluno) {
                document.getElementById('nomeAluno').value = aluno.nome
                document.getElementById('sobrenomeAluno').value = aluno.sobrenome
                document.getElementById('matriculaAluno').value = aluno.matricula
                document.getElementById('telefoneAluno').value = aluno.telefone
                document.getElementById('emailAluno').value = aluno.email
                mensagem.textContent = 'ALUNO ENCONTRADO!'
                mensagem.style.color = 'white'
                mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
                mensagem.style.backgroundColor = 'green'
                mensagem.style.border = '1px solid white'
            } else {
                mensagem.textContent = 'ALUNO NÃO ENCONTRADO!'
                mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
                mensagem.style.backgroundColor = 'lightcoral'
                mensagem.style.border = '1px solid red'
            }
            mensagem.style.display = 'block'
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO BUSCAR ALUNO!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            mensagem.style.display = 'block'
            console.error('Erro ao buscar aluno:', error)
        })
})

btnEditarAluno.addEventListener('click', (e) => {
    e.preventDefault()

    let codAluno = document.getElementById('codAluno').value
    let nome = document.getElementById('nomeAluno').value
    let sobrenome = document.getElementById('sobrenomeAluno').value
    let matricula = document.getElementById('matriculaAluno').value
    let telefone = document.getElementById('telefoneAluno').value
    let email = document.getElementById('emailAluno').value

    if (codAluno && nome && sobrenome && matricula && telefone && email) {
        fetch(`http://localhost:8081/aluno/${codAluno}`, {
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
            mensagem.textContent = 'ALUNO EDITADO COM SUCESSO!'
            mensagem.style.color = 'white'
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
            mensagem.style.backgroundColor = 'green'
            mensagem.style.border = '1px solid white'
            console.log('Aluno editado com sucesso:', data)
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO EDITAR ALUNO!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            console.error('Erro ao editar aluno:', error)
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