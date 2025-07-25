let mensagem = document.getElementById('mensagem')
let btnCadProfessor = document.getElementById('btnCadProfessor')

mensagem.style.display = 'none'

btnCadProfessor.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nomeProfessor').value
    let sobrenome = document.getElementById('sobrenomeProfessor').value
    let matricula = document.getElementById('matriculaProfessor').value
    let telefone = document.getElementById('telefoneProfessor').value
    let email = document.getElementById('emailProfessor').value

    if (nome && sobrenome && matricula && telefone && email) {
        fetch('http://localhost:8081/professor', {
            method: 'POST',
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
            mensagem.textContent = 'PROFESSOR CADASTRADO COM SUCESSO!'
            mensagem.style.color = 'white';
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
            mensagem.style.backgroundColor = 'green'
            mensagem.style.border = '1px solid white'
            console.log('Professor cadastrado com sucesso:', data)
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO CADASTRAR PROFESSOR!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            console.error('Erro ao cadastrar professor:', error)
        })
    } else {
        mensagem.textContent = 'POR FAVOR, PREENCHA TODOS OS CAMPOS!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral';
        mensagem.style.border = '1px solid red';
        console.error('Por favor, preencha todos os campos.')
    }
    mensagem.style.display = 'block';
})