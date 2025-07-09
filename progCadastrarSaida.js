let mensagem = document.getElementById('mensagem')
let btnCadSaida = document.getElementById('btnCadSaida')

mensagem.style.display = 'none'

btnCadSaida.addEventListener('click', (e) => {
    e.preventDefault()

    let dataSaida = document.getElementById('dataSaida').value
    let horaSaida = document.getElementById('horaSaida').value
    let horaRetorno = document.getElementById('horaRetorno').value
    let motivo = document.getElementById('motivoSaida').value
    let localDestino = document.getElementById('localDestino').value
    let status = document.getElementById('statusSaida').value
    let nomeAluno = document.getElementById('nomeAluno').value
    let nomeProfessor = document.getElementById('nomeProfessor').value


    if (dataSaida && horaSaida && horaRetorno && motivo && localDestino && status && nomeAluno && nomeProfessor) {
        fetch('http://localhost:8081/saida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataSaida: dataSaida,
                horaSaida: horaSaida,
                horaRetorno: horaRetorno,
                motivo: motivo,
                localDestino: localDestino,
                status: status,
                nomeAluno: nomeAluno,
                nomeProfessor: nomeProfessor
            })
        })
        .then(response => response.json())
        .then(data => {
            mensagem.textContent = 'ALUNO CADASTRADOR COM SUCESSO!'
            mensagem.style.color = 'white';
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
            mensagem.style.backgroundColor = 'green'
            mensagem.style.border = '1px solid white'
            console.log('Aluno cadastrado com sucesso:', data)
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO CADASTRAR ALUNO!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            console.error('Erro ao cadastrar aluno:', error)
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