let mensagem = document.getElementById('mensagem')
let btnCadSaida = document.getElementById('btnCadSaida')

let motivo = document.getElementById('motivoSaida')
let localDestino = document.getElementById('localDestino')
let statusSaida = document.getElementById('statusSaida')
let codAluno = document.getElementById('codAluno')
let nomeAluno = document.getElementById('nomeAluno')
let codProfessor = document.getElementById('codProfessor')
let nomeProfessor = document.getElementById('nomeProfessor')

codAluno.addEventListener('blur', () => {
    fetch(`http://localhost:8081/aluno/${codAluno.value}`)
    .then(response => response.json())
    .then(data => {
        nomeAluno.value = data.nome + ' ' + data.sobrenome
    })
    .catch(error => {
        mensagem.textContent = 'ERRO AO BUSCAR ALUNO!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral'
        mensagem.style.border = '1px solid red'
        console.error('Erro ao buscar aluno:', error)
    })
})


codProfessor.addEventListener('blur', () => {
    fetch(`http://localhost:8081/professor/${codProfessor.value}`)
    .then(response => response.json())
    .then(data => {
        nomeProfessor.value = data.nome + ' ' + data.sobrenome
    })
    .catch(error => {
        mensagem.textContent = 'ERRO AO BUSCAR PROFESSOR!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral'
        mensagem.style.border = '1px solid red'
        console.error('Erro ao buscar professor:', error)
    })
})

mensagem.style.display = 'none'



btnCadSaida.addEventListener('click', (e) => {
    e.preventDefault()
  
    const dataSolicitacao = document.getElementById('dataSolicitacao')
    const horaSaida = document.getElementById('horaSaida')
    const horaRetorno = document.getElementById('horaRetorno')
  
    if (dataSolicitacao.value && horaSaida.value && horaRetorno.value &&
        motivo.value && localDestino.value && statusSaida.value &&
        nomeAluno.value && nomeProfessor.value) {
  
      fetch('http://localhost:8081/saida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dataSolicitacao: dataSolicitacao.value,  // PEGA DO INPUT!
          horaSaida: horaSaida.value,
          horaRetorno: horaRetorno.value,
          motivo: motivo.value,
          localDestino: localDestino.value,
          status: statusSaida.value,
          nomeAluno: nomeAluno.value,
          nomeProfessor: nomeProfessor.value
        })
      })
      .then(response => response.json())
      .then(data => {
        mensagem.textContent = 'SAÍDA CADASTRADA COM SUCESSO!'
        mensagem.style.color = 'white'
        mensagem.style.backgroundColor = 'green'
        console.log('Saída cadastrada:', data)
      })
      .catch(error => {
        mensagem.textContent = 'ERRO AO CADASTRAR SAÍDA!'
        mensagem.style.backgroundColor = 'lightcoral'
        console.error('Erro:', error)
      })
  
    } else {
      mensagem.textContent = 'POR FAVOR, PREENCHA TODOS OS CAMPOS!'
      mensagem.style.backgroundColor = 'lightcoral'
      console.error('Campos faltando.')
    }
    mensagem.style.display = 'block'
  })
  