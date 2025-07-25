let btnConsultaSaida = document.getElementById('btnConsultaSaida')
let mensagem = document.getElementById('mensagem')
let saidaConsultada = document.getElementById('saidaConsultada')

mensagem.style.display = 'none'
saidaConsultada.style.display = 'none'

btnConsultaSaida.addEventListener('click', () => {
  let codSaida = document.getElementById('codSaida').value

  fetch(`http://localhost:8081/saida/${codSaida}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar saida')
      }
      return response.json()
    })
    .then(saida => {
      if (saida && saida.codSaida) {
        saidaConsultada.innerHTML = `
            <p><strong>Código:</strong> ${saida.codSaida}</p>
            <p><strong>Data e Hora da Saída:</strong> ${saida.dataSolicitacao} ${saida.horaSaida}</p>
            <p><strong>Hora do Retorno:</strong> ${saida.horaRetorno}</p>
            <p><strong>Motivo da Saída:</strong> ${saida.motivo}</p>
            <p><strong>Local Destino:</strong> ${saida.localDestino}</p>
            <p><strong>Status:</strong> ${saida.status}</p>
            <p><strong>Nome do Aluno:</strong> ${saida.nomeAluno}</p>
            <p><strong>Nome do Professor:</strong> ${saida.nomeProfessor}</p>
        `

        mensagem.textContent = 'SAÍDA ENCONTRADA!'
        mensagem.style.color = 'white'
        mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
        mensagem.style.backgroundColor = 'green'
        mensagem.style.border = '1px solid white'
      } else {
        saidaConsultada.innerHTML = ''
        mensagem.textContent = 'SAÍDA NÃO ENCONTRADA!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral'
        mensagem.style.border = '1px solid red'
      }
      saidaConsultada.style.display = 'block'
      mensagem.style.display = 'block'
    })
    .catch(error => {
      saidaConsultada.innerHTML = ''
      mensagem.textContent = 'ERRO AO CONSULTAR SAÍDA!'
      mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.border = '1px solid red'
      mensagem.style.display = 'block'
      console.error('Erro ao consultar saída:', error)
    })
})
