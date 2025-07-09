document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8081/aluno`)
      .then(response => response.json())
      .then(data => {
        let alunoList = document.getElementById('alunoList')
        alunoList.innerHTML = ''

        data.forEach(aluno => {
          let card = document.createElement('div')
          card.classList.add('aluno-card')

          card.innerHTML = `
            <p><strong>Código:</strong> ${aluno.codAluno}</p>
            <p><strong>Nome:</strong> ${aluno.nome} ${aluno.sobrenome}</p>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Telefone:</strong> ${aluno.telefone}</p>
            <p><strong>Email:</strong> ${aluno.email}</p>
          `

          alunoList.appendChild(card)
        })
      })
      .catch(error => console.error('Erro ao listar alunos:', error))
})