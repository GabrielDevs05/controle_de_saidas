document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8081/saida`)
      .then(response => response.json())
      .then(data => {
        let saidaList = document.getElementById('saidaList')
        saidaList.innerHTML = ''

        data.forEach(saida => {
          let card = document.createElement('div')
          card.classList.add('saida-card')

          card.innerHTML = `
            <p><strong>Código:</strong> ${saida.codSaida}</p>
            <p><strong>Data de Solicitação:</strong> ${saida.dataSolicitacao}</p>
            <p><strong>Hora de Saída:</strong> ${saida.horaSaida}</p>
            <p><strong>Hora de Retorno:</strong> ${saida.horaRetorno}</p>
            <p><strong>Motivo:</strong> ${saida.motivo}</p>
            <p><strong>Local de Destino:</strong> ${saida.localDestino}</p>
            <p><strong>Status:</strong> ${saida.status}</p>
            <p><strong>Nome do Aluno:</strong> ${saida.nomeAluno}</p>
            <p><strong>Nome do Professor:</strong> ${saida.nomeProfessor}</p>
          `
          saidaList.appendChild(card)
        })
      })
      .catch(error => console.error('Erro ao listar saídas:', error))
})