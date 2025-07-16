let mensagem = document.getElementById('mensagem')
let btnCadSaida = document.getElementById('btnCadSaida')
let motivo = document.getElementById('motivoSaida')
let localDestino = document.getElementById('localDestino')
let statusSaida = document.getElementById('statusSaida')
let codAluno = document.getElementById('codAluno')

document.addEventListener('DOMContentLoaded', () => {
  const dataAtual = new Date().toISOString().split('T')[0]
  const horaAtual = new Date().toTimeString().split(':').slice(0,2).join(':')

  document.getElementById('dataSolicitacao').value = dataAtual
  document.getElementById('horaSaida').value = horaAtual
})

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8081/aluno`)
    .then(response => response.json())
    .then(data => {
        nomeAluno = document.getElementById('nomeAluno')
        nomeAluno.innerHTML = '<option value="" disabled selected>Selecione o Aluno</option>'
        
        data.forEach(aluno => {
            let option = document.createElement('option')
            option.value = aluno.codAluno 
            option.textContent = `${aluno.nome} ${aluno.sobrenome}`
            nomeAluno.appendChild(option)
        })
    })
    .catch(error => console.error('Erro ao buscar Aluno:', error))

    fetch(`http://localhost:8081/professor`)
    .then(response => response.json())
    .then(data => {
        nomeProfessor = document.getElementById('nomeProfessor')
        nomeProfessor.innerHTML = '<option value="" disabled selected>Selecione o Professor</option>'
        
        data.forEach(professor => {
            let option = document.createElement('option')
            option.value = professor.codProfessor
            option.textContent = `${professor.nome} ${professor.sobrenome}`
            nomeProfessor.appendChild(option)
        })
    })
    .catch(error => console.error('Erro ao buscar Professor:', error))
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

// nomeAluno.addEventListener('blur', () => {
//   fetch(`http://localhost:8081/aluno/${nomeAluno.value}`)
//   .then(response => response.json())
//   .then(data => {
//       codAluno.value = data.codAluno
//   })
//   .catch(error => {
//       mensagem.textContent = 'ERRO AO BUSCAR ALUNO!'
//       mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
//       mensagem.style.backgroundColor = 'lightcoral'
//       mensagem.style.border = '1px solid red'
//       console.error('Erro ao buscar aluno:', error)
//   })
// })

// codAluno.addEventListener('blur', () => {
//   fetch(`http://localhost:8081/aluno/${codAluno.value}`)
//   .then(response => response.json())
//   .then(data => {
//       nomeAluno.value = data.codAluno
//   })
//   .catch(error => {
//       mensagem.textContent = 'ERRO AO BUSCAR ALUNO!'
//       mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
//       mensagem.style.backgroundColor = 'lightcoral'
//       mensagem.style.border = '1px solid red'
//       console.error('Erro ao buscar aluno:', error)
//   })
// })

// document.addEventListener('DOMContentLoaded', () => {
//   fetch(`http://localhost:8081/professor`)
//   .then(response => response.json())
//   .then(data => {
//       nomeProfessor = document.getElementById('nomeProfessor')
//       nomeProfessor.innerHTML = '<option value="" disabled selected>Selecione o Professor</option>'
      
//       data.forEach(professor => {
//           let option = document.createElement('option')
//           option.value = professor.codProfessor
//           option.textContent = `${professor.nome} ${professor.sobrenome}`
//           nomeProfessor.appendChild(option)
//       })
//   })
//   .catch(error => console.error('Erro ao buscar Professor:', error))
// })

// nomeProfessor.addEventListener('blur', () => {
//   fetch(`http://localhost:8081/professor/${nomeProfessor.value}`)
//   .then(response => response.json())
//   .then(data => {
//       codProfessor.value = data.codProfessor
//   })
//   .catch(error => {
//       mensagem.textContent = 'ERRO AO BUSCAR PROFESSOR!'
//       mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
//       mensagem.style.backgroundColor = 'lightcoral'
//       mensagem.style.border = '1px solid red'
//       console.error('Erro ao buscar aluno:', error)
//   })
// })

// codProfessor.addEventListener('blur', () => {
//   fetch(`http://localhost:8081/professor/${codProfessor.value}`)
//   .then(response => response.json())
//   .then(data => {
//       nomeProfessor.value = data.codProfessor
//   })
//   .catch(error => {
//       mensagem.textContent = 'ERRO AO BUSCAR PROFESSOR!'
//       mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
//       mensagem.style.backgroundColor = 'lightcoral'
//       mensagem.style.border = '1px solid red'
//       console.error('Erro ao buscar professor:', error)
//   })
// })

mensagem.style.display = 'none'

btnCadSaida.addEventListener('click', (e) => {
    e.preventDefault()

    const dataAtual = new Date().toISOString().split('T')[0]
    console.log(dataAtual)
    const horaAtual = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
  
    const dataSolicitacao = document.getElementById('dataSolicitacao')
    const horaSaida = document.getElementById('horaSaida')
    const horaRetorno = document.getElementById('horaRetorno')
  
    document.getElementById('dataSolicitacao').value = dataAtual
    document.getElementById('horaSaida').value = horaAtual

    nomeAluno = document.getElementById('nomeAluno')

  
    if (dataSolicitacao.value && horaSaida.value && horaRetorno.value &&
        motivo.value && localDestino.value && statusSaida.value && codAluno.value &&
        nomeAluno.value && codProfessor.value && nomeProfessor.value) {
  
      console.log({
        dataSolicitacao: dataSolicitacao.value,
        horaSaida: horaSaida.value,
        horaRetorno: horaRetorno.value,
        motivo: motivo.value,
        localDestino: localDestino.value,
        status: statusSaida.value,
        aluno_cod: Number(codAluno.value),
        nomeAluno: nomeAluno.value,
        professor_cod: Number(codProfessor.value),
        nomeProfessor: nomeProfessor.value
      })
  
      fetch('http://localhost:8081/saida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dataSolicitacao: dataSolicitacao.value,
          horaSaida: horaSaida.value,
          horaRetorno: horaRetorno.value,
          motivo: motivo.value  || '',
          localDestino: localDestino.value  || '',
          status: statusSaida.value,
          aluno_cod: codAluno.value  || '',
          nomeAluno: nomeAluno.options[nomeAluno.selectedIndex].textContent  || '',
          professor_cod: codProfessor.value  || '',
          nomeProfessor: nomeProfessor.options[nomeProfessor.selectedIndex].textContent  || ''
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