document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8081/saida')
    .then(response => response.json())
    .then(saidas => {
      preencherTabela(saidas)
    })
    .catch(error => {
      console.error('Erro ao carregar saídas:', error)
    })
})

function preencherTabela(saidas) {
  const tabela = document.getElementById('saidaTableBody')
  tabela.innerHTML = ''

  saidas.forEach(saida => {
    if (saida.status === 'Retornou' || saida.status === 'Recusado') return

    const linha = document.createElement('tr')
    linha.dataset.saida = JSON.stringify(saida)

    linha.innerHTML = `
      <td>${saida.dataSolicitacao}</td>
      <td>${saida.horaSaida}</td>
      <td>${saida.horaRetorno}</td>
      <td>${saida.motivo}</td>
      <td>${saida.localDestino}</td>
      <td class="status">${saida.status}</td>
      <td>${saida.aluno.nome} ${saida.aluno.sobrenome}</td>
      <td>${saida.professor.nome} ${saida.professor.sobrenome}</td>
      <td class="acoes">
        ${saida.status === 'Permitido'
          ? `<button class="btnRetornou" onclick='atualizarStatus(${saida.codSaida}, "Retornou", this)'>Retornar</button>`
          : saida.status === 'Recusado'
            ? `<button class="btnRemover" onclick='removerLinha(this)'>Remover</button>`
            : `
              <button class="btnPermitido" onclick='atualizarStatus(${saida.codSaida}, "Permitido", this)'>Permitir</button>
              <button class="btnRecusado" onclick='atualizarStatus(${saida.codSaida}, "Recusado", this)'>Recusar</button>
            `
          }
      </td>

    `
    tabela.appendChild(linha)
  })
}


function atualizarStatus(codSaida, novoStatus, botao) {
  const linha = botao.closest('tr')
  const saida = JSON.parse(linha.dataset.saida)

  const dataAtual = new Date()
  const dataFormatada = dataAtual.toISOString().split('T')[0]
  const horaFormatada = dataAtual.toTimeString().split(':').slice(0, 2).join(':')

  if (novoStatus === 'Permitido') {
    saida.dataSolicitacao = dataFormatada
    saida.horaSaida = horaFormatada
  }

  if (novoStatus === 'Retornou') {
    saida.horaRetorno = horaFormatada
  }

  if (novoStatus === 'Recusado') {
    saida.dataSolicitacao = dataFormatada
    saida.horaSaida = horaFormatada
    saida.horaRetorno = horaFormatada
  }

  const payload = {
    dataSolicitacao: saida.dataSolicitacao,
    horaSaida: saida.horaSaida,
    horaRetorno: saida.horaRetorno,
    motivo: saida.motivo,
    localDestino: saida.localDestino,
    status: novoStatus,
    aluno_cod: saida.aluno.codAluno,
    nomeAluno: `${saida.aluno.nome} ${saida.aluno.sobrenome}`,
    professor_cod: saida.professor.codProfessor,
    nomeProfessor: `${saida.professor.nome} ${saida.professor.sobrenome}`
  }

  fetch(`http://localhost:8081/saida/${codSaida}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
      if (novoStatus === 'Retornou') {
      linha.remove()
    } else if (novoStatus === 'Permitido') {
      linha.querySelector('.status').textContent = novoStatus
      linha.querySelector('.acoes').innerHTML = `
        <button class='btnRetornou' onclick='atualizarStatus(${codSaida}, "Retornou", this)'>Retornou</button>
      `
      linha.children[0].textContent = saida.dataSolicitacao
      linha.children[1].textContent = saida.horaSaida
    } else if (novoStatus === 'Recusado') {
      linha.querySelector('.status').textContent = novoStatus
      linha.querySelector('.status').className = 'status recusado'
      linha.querySelector('.acoes').innerHTML = `
        <button class="btnRemover" onclick='removerLinha(this)'>Remover</button>
      `
      linha.children[0].textContent = saida.dataSolicitacao
      linha.children[1].textContent = saida.horaSaida
      linha.children[2].textContent = saida.horaRetorno
    }
  })
  .catch(error => {
    console.error('Erro ao atualizar status:', error)
    alert('Erro ao atualizar status')
  })
}

function removerLinha(botao) {
  const linha = botao.closest('tr');
  linha.remove();
}

