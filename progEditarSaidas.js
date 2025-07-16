let mensagem = document.getElementById('mensagem');
let btnBuscarSaida = document.getElementById('btnBuscarSaida');
let btnEditarSaida = document.getElementById('btnEditarSaida');

let codSaida = document.getElementById('codSaida');
let dataSolicitacao = document.getElementById('dataSolicitacao');
let horaSaida = document.getElementById('horaSaida');
let horaRetorno = document.getElementById('horaRetorno');
let motivo = document.getElementById('motivoSaida');
let localDestino = document.getElementById('localDestino');
let statusSaida = document.getElementById('statusSaida');
let codAluno = document.getElementById('codAluno');
let nomeAluno = document.getElementById('nomeAluno');
let codProfessor = document.getElementById('codProfessor');
let nomeProfessor = document.getElementById('nomeProfessor');

mensagem.style.display = 'none';


document.addEventListener('DOMContentLoaded', () => {
  fetch(`http://localhost:8081/aluno`)
    .then(response => response.json())
    .then(data => {
      nomeAluno.innerHTML = '<option value="" disabled selected>Selecione o Aluno</option>'
      data.forEach(aluno => {
        let option = document.createElement('option')
        option.value = aluno.codAluno
        option.textContent = `${aluno.nome} ${aluno.sobrenome}`
        nomeAluno.appendChild(option)
      })
    })
    .catch(error => console.error('Erro ao buscar Alunos:', error))

  fetch(`http://localhost:8081/professor`)
    .then(response => response.json())
    .then(data => {
      nomeProfessor.innerHTML = '<option value="" disabled selected>Selecione o Professor</option>'
      data.forEach(professor => {
        let option = document.createElement('option')
        option.value = professor.codProfessor
        option.textContent = `${professor.nome} ${professor.sobrenome}`
        nomeProfessor.appendChild(option)
      });
    })
    .catch(error => console.error('Erro ao buscar Professores:', error))
})

nomeAluno.addEventListener('blur', () => {
  codAluno.value = nomeAluno.value || ''
})

codAluno.addEventListener('blur', () => {
  nomeAluno.value = codAluno.value || ''
})

nomeProfessor.addEventListener('blur', () => {
  codProfessor.value = nomeProfessor.value || ''
})

codProfessor.addEventListener('blur', () => {
  nomeProfessor.value = codProfessor.value || ''
})

btnBuscarSaida.addEventListener('click', () => {
  if (!codSaida.value) {
    mensagem.textContent = 'Informe o CÓDIGO da saída!'
    mensagem.style.backgroundColor = 'lightcoral'
    mensagem.style.display = 'block'
    return
  }

  fetch(`http://localhost:8081/saida/${codSaida.value}`)
  .then(response => response.json())
  .then(data => {
    dataSolicitacao.value = data.dataSolicitacao
    horaSaida.value = data.horaSaida
    horaRetorno.value = data.horaRetorno
    motivo.value = data.motivo
    localDestino.value = data.localDestino
    statusSaida.value = data.status

    codAluno.value = data.aluno.codAluno
    nomeAluno.value = data.aluno.codAluno

    codProfessor.value = data.professor.codProfessor
    nomeProfessor.value = data.professor.codProfessor

    mensagem.textContent = 'Saída carregada com sucesso!'
    mensagem.style.backgroundColor = 'green'
    mensagem.style.display = 'block'
  })
  .catch(error => {
    mensagem.textContent = 'Erro ao buscar saída!'
    mensagem.style.backgroundColor = 'lightcoral'
    mensagem.style.display = 'block'
    console.error('Erro ao buscar saída:', error)
  })
})

btnEditarSaida.addEventListener('click', (e) => {
  e.preventDefault()

  if (!codSaida.value) {
    mensagem.textContent = 'Busque uma saída antes de editar!'
    mensagem.style.backgroundColor = 'lightcoral'
    mensagem.style.display = 'block'
    return
  }

  if (
    dataSolicitacao.value && horaSaida.value && horaRetorno.value &&
    motivo.value && localDestino.value && statusSaida.value &&
    codAluno.value && nomeAluno.value && codProfessor.value && nomeProfessor.value
  ) {
    fetch(`http://localhost:8081/saida/${codSaida.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataSolicitacao: dataSolicitacao.value,
        horaSaida: horaSaida.value,
        horaRetorno: horaRetorno.value,
        motivo: motivo.value,
        localDestino: localDestino.value,
        status: statusSaida.value,
        aluno_cod: codAluno.value,
        nomeAluno: nomeAluno.options[nomeAluno.selectedIndex].textContent,
        professor_cod: codProfessor.value,
        nomeProfessor: nomeProfessor.options[nomeProfessor.selectedIndex].textContent
      })
    })
    .then(response => response.json())
    .then(data => {
      mensagem.textContent = 'Saída atualizada com sucesso!'
      mensagem.style.backgroundColor = 'green'
      mensagem.style.color = 'white'
      mensagem.style.display = 'block'
      console.log('Saída atualizada:', data)
    })
    .catch(error => {
      mensagem.textContent = 'Erro ao atualizar saída!'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.display = 'block'
      console.error('Erro:', error)
    });
  } else {
    mensagem.textContent = 'Preencha todos os campos!'
    mensagem.style.backgroundColor = 'lightcoral'
    mensagem.style.display = 'block'
  }
});
