let btnDeletarAluno = document.getElementById('btnDeletarAluno')
let mensagem = document.getElementById('mensagem')

mensagem.style.display = 'none'

btnDeletarAluno.addEventListener('click', () => {
    let codAluno = document.getElementById('codAluno').value
  
    if (!codAluno.trim()) {
      mensagem.textContent = 'Por favor, informe o código do aluno.'
      mensagem.style.backgroundColor = 'orange'
      mensagem.style.display = 'block'
      return;
    }
  
    fetch(`http://localhost:8081/aluno/${codAluno}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar aluno')
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(data => {
      mensagem.textContent = 'ALUNO DELETADO COM SUCESSO!'
      mensagem.style.color = 'white'
      mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
      mensagem.style.backgroundColor = 'green'
      mensagem.style.border = '1px solid white'
      mensagem.style.display = 'block'
      console.log('Aluno deletado com sucesso:', data)
    })
    .catch(error => {
      mensagem.textContent = 'ERRO AO DELETAR ALUNO!'
      mensagem.style.color = 'white'
      mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.border = '1px solid red'
      mensagem.style.display = 'block'
      console.error('Erro ao deletar aluno:', error)
    })
    mensagem.style.display = 'block'
})
  