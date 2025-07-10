document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8081/professor`)
      .then(response => response.json())
      .then(data => {
        let professorList = document.getElementById('professorList')
        professorList.innerHTML = ''

        data.forEach(professor => {
          let card = document.createElement('div')
          card.classList.add('professor-card')

          card.innerHTML = `
            <p><strong>Código:</strong> ${professor.codProfessor}</p>
            <p><strong>Nome:</strong> ${professor.nome} ${professor.sobrenome}</p>
            <p><strong>Matrícula:</strong> ${professor.matricula}</p>
            <p><strong>Telefone:</strong> ${professor.telefone}</p>
            <p><strong>Email:</strong> ${professor.email}</p>
          `
          professorList.appendChild(card)
        })
      })
      .catch(error => console.error('Erro ao listar professores:', error))
})