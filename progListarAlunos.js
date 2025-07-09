document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8081/aluno`)
      .then(response => response.json())
      .then(data => {
        let saidaList = document.getElementById('saidaList')
        saidaList.innerHTML = ''

        data.forEach(saida => {
          let card = document.createElement('div')
          card.classList.add('saida-card')

          card.innerHTML = `
            <p><strong>Código:</strong> ${saida.codAluno}</p>
            <p><strong>Nome:</strong> ${saida.nome} ${saida.sobrenome}</p>
            <p><strong>Matrícula:</strong> ${saida.matricula}</p>
            <p><strong>Telefone:</strong> ${saida.telefone}</p>
            <p><strong>Email:</strong> ${saida.email}</p>
          `

          saidaList.appendChild(card)
        })
      })
      .catch(error => console.error('Erro ao listar alunos:', error))
    })