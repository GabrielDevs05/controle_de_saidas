let btnConsultaAluno = document.getElementById('btnConsultaAluno')
let mensagem = document.getElementById('mensagem')
let alunoConsultado = document.getElementById('alunoConsultado')

mensagem.style.display = 'none'
alunoConsultado.style.display = 'none'

btnConsultaAluno.addEventListener('click', () => {
  let codAluno = document.getElementById('codAluno').value

  fetch(`http://localhost:8081/aluno/${codAluno}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar aluno')
      }
      return response.json()
    })
    .then(aluno => {
      if (aluno && aluno.codAluno) {
        alunoConsultado.innerHTML = `
          <p><strong>Código:</strong> ${aluno.codAluno}</p>
          <p><strong>Nome:</strong> ${aluno.nome} ${aluno.sobrenome}</p>
          <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
          <p><strong>Telefone:</strong> ${aluno.telefone}</p>
          <p><strong>Email:</strong> ${aluno.email}</p>
        `
        mensagem.textContent = 'ALUNO ENCONTRADO!'
        mensagem.style.color = 'white'
        mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
        mensagem.style.backgroundColor = 'green'
        mensagem.style.border = '1px solid white'
      } else {
        alunoConsultado.innerHTML = ''
        mensagem.textContent = 'ALUNO NÃO ENCONTRADO!'
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
        mensagem.style.backgroundColor = 'lightcoral'
        mensagem.style.border = '1px solid red'
      }
      alunoConsultado.style.display = 'block'
      mensagem.style.display = 'block'
    })
    .catch(error => {
      alunoConsultado.innerHTML = ''
      mensagem.textContent = 'ERRO AO CONSULTAR ALUNO!'
      mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.border = '1px solid red'
      mensagem.style.display = 'block'
      console.error('Erro ao consultar aluno:', error)
    })
})

        