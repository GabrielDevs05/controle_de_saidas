let btnConsultaProfessor = document.getElementById('btnConsultaProfessor')
let mensagem = document.getElementById('mensagem')
let professorConsultado = document.getElementById('professorConsultado')

mensagem.style.display = 'none'
professorConsultado.style.display = 'none'

btnConsultaProfessor.addEventListener('click', () => {
  let codProfessor = document.getElementById('codProfessor').value

  fetch(`http://localhost:8081/professor/${codProfessor}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar professor')
      }
      return response.json()
    })
    .then(professor => {
      if (professor && professor.codProfessor) {
        professorConsultado.innerHTML = `
          <p><strong>Código:</strong> ${professor.codProfessor}</p>
          <p><strong>Nome:</strong> ${professor.nome} ${professor.sobrenome}</p>
          <p><strong>Matrícula:</strong> ${professor.matricula}</p>
          <p><strong>Telefone:</strong> ${professor.telefone}</p>
          <p><strong>Email:</strong> ${professor.email}</p>
        `
        mensagem.textContent = 'PROFESSOR ENCONTRADO!'
        mensagem.style.color = 'white'
        mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
        mensagem.style.backgroundColor = 'green'
        mensagem.style.border = '1px solid white'
      } else {
        professorConsultado.innerHTML = ''
        mensagem.textContent = 'PROFESSOR NÃO ENCONTRADO!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral'
        mensagem.style.border = '1px solid red'
      }
      professorConsultado.style.display = 'block'
      mensagem.style.display = 'block'
    })
    .catch(error => {
      professorConsultado.innerHTML = ''
      mensagem.textContent = 'ERRO AO CONSULTAR PROFESSOR!'
      mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.border = '1px solid red'
      mensagem.style.display = 'block'
      console.error('Erro ao consultar professor:', error)
    })
})