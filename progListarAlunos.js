document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.npoint.io/63601e54bd199ab9d7a3') // sua URL do npoint
      .then(response => response.json())
      .then(data => {
        let alunoList = document.getElementById('alunoList');
        alunoList.innerHTML = ''; // Limpa antes de inserir

        data.forEach(aluno => {
          let card = document.createElement('div');
          card.classList.add('aluno-card'); // Classe para estilizar depois

          card.innerHTML = `
            <p><strong>Código:</strong> ${aluno.codAluno}</p>
            <p><strong>Nome:</strong> ${aluno.nome} ${aluno.sobrenome}</p>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Telefone:</strong> ${aluno.telefone}</p>
            <p><strong>Email:</strong> ${aluno.email}</p>
          `;

          alunoList.appendChild(card);
        });
      })
      .catch(error => console.error('Erro ao listar alunos:', error));
  });