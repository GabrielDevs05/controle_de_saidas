let btnDeletarProfessor = document.getElementById('btnDeletarProfessor')
let mensagem = document.getElementById('mensagem')

mensagem.style.display = 'none'

btnDeletarProfessor.addEventListener('click', () => {
    let codProfessor = document.getElementById('codProfessor').value
  
    if (!codProfessor.trim()) {
      mensagem.textContent = 'Por favor, informe o código do professor.'
      mensagem.style.backgroundColor = 'orange'
      mensagem.style.display = 'block'
      return;
    }
  
    fetch(`http://localhost:8081/professor/${codProfessor}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar professor')
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(data => {
      mensagem.textContent = 'PROFESSOR DELETADO COM SUCESSO!'
      mensagem.style.color = 'white'
      mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
      mensagem.style.backgroundColor = 'green'
      mensagem.style.border = '1px solid white'
      mensagem.style.display = 'block'
      console.log('Professor deletado com sucesso:', data)
    })
    .catch(error => {
      mensagem.textContent = 'ERRO AO DELETAR PROFESSOR!'
      mensagem.style.color = 'white'
      mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.border = '1px solid red'
      mensagem.style.display = 'block'
      console.error('Erro ao deletar professor:', error)
    })
    mensagem.style.display = 'block'
})
  