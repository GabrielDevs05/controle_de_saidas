let mensagem = document.getElementById('mensagem')
let btnCadSaida = document.getElementById('btnCadSaida')

let horaSaida = document.getElementById('horaSaida')
let dataSolicitacao = document.getElementById('dataSolicitacao')
let horaRetorno = document.getElementById('horaRetorno')
let motivo = document.getElementById('motivoSaida')
let localDestino = document.getElementById('localDestino')
let statusSaida = document.getElementById('statusSaida')
let codAluno = document.getElementById('codAluno')
let nomeAluno = document.getElementById('nomeAluno')
let codProfessor = document.getElementById('codProfessor')
let nomeProfessor = document.getElementById('nomeProfessor')

codAluno.addEventListener('blow', () => {
    fetch(`http://localhost:8081/aluno/${codAluno}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.nome) {
                nomeAluno.value = data.nome + ' ' + data.sobrenome
            } else {
                nomeAluno.value = ''
                console.error('Aluno não encontrado.')
            }
        })
        .catch(error => console.error('Erro ao buscar aluno:', error))
})

codProfessor.addEventListener('blow', () => {
    fetch(`http://localhost:8081/professor/${codProfessor}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.nome) {
                nomeProfessor.value = data.nome + ' ' + data.sobrenome
            } else {
                nomeProfessor.value = ''
                console.error('Professor não encontrado.')
            }
        })
        .catch(error => console.error('Erro ao buscar professor:', error))
})

mensagem.style.display = 'none'



btnCadSaida.addEventListener('click', (e) => {
    e.preventDefault()

    if (dataSolicitacao && horaSaida && horaRetorno && motivo && localDestino && statusSaida && nomeAluno && nomeProfessor) {
        fetch('http://localhost:8081/saida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataSolicitacao: dataSolicitacao,
                horaSaida: horaSaida,
                horaRetorno: horaRetorno,
                motivo: motivo,
                localDestino: localDestino,
                status: statusSaida,
                nomeAluno: nomeAluno,
                nomeProfessor: nomeProfessor
            })
        })
        .then(response => response.json())
        .then(data => {
            mensagem.textContent = 'SAÍDA CADASTRADA COM SUCESSO!'
            mensagem.style.color = 'white';
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
            mensagem.style.backgroundColor = 'green'
            mensagem.style.border = '1px solid white'
            console.log('Saída cadastrada com sucesso:', data)
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO CADASTRAR SAÍDA!'
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
            mensagem.style.backgroundColor = 'lightcoral'
            mensagem.style.border = '1px solid red'
            console.error('Erro ao cadastrar saída:', error)
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