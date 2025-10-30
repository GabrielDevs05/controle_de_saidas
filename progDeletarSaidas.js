let btnDeletarSaida = document.getElementById('btnDeletarSaida')
let mensagem = document.getElementById('mensagem')

mensagem.style.display = 'none'

btnDeletarSaida.addEventListener('click', () => {
    let codSaida = document.getElementById('codSaida').value
  
    if (!codSaida.trim()) {
      mensagem.textContent = 'Por favor, informe o código da saída.'
      mensagem.style.backgroundColor = 'orange'
      mensagem.style.display = 'block'
      return;
    }
  
    fetch(`http://localhost:8081/saida/${codSaida}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar saída')
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(data => {
      mensagem.textContent = 'SAÍDA DELETADA COM SUCESSO!'
      mensagem.style.color = 'white'
      mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
      mensagem.style.backgroundColor = 'green'
      mensagem.style.border = '1px solid white'
      mensagem.style.display = 'block'
      console.log('Saída deletada com sucesso:', data)
    })
    .catch(error => {
      mensagem.textContent = 'ERRO AO DELETAR SAÍDA!'
      mensagem.style.color = 'white'
      mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
      mensagem.style.backgroundColor = 'lightcoral'
      mensagem.style.border = '1px solid red'
      mensagem.style.display = 'block'
      console.error('Erro ao deletar saída:', error)
    })
    mensagem.style.display = 'block'
})


//     let codProfessor = document.getElementById('codProfessor').value
  
//     if (!codProfessor.trim()) {
//       mensagem.textContent = 'Por favor, informe o código do professor.'
//       mensagem.style.backgroundColor = 'orange'
//       mensagem.style.display = 'block'
//       return;
//     }
  
//     fetch(`http://localhost:8081/professor/${codProfessor}`, {
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Erro ao deletar professor')
//       }
//       return response.text().then(text => text ? JSON.parse(text) : {});
//     })
//     .then(data => {
//       mensagem.textContent = 'PROFESSOR DELETADO COM SUCESSO!'
//       mensagem.style.color = 'white'
//       mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'
//       mensagem.style.backgroundColor = 'green'
//       mensagem.style.border = '1px solid white'
//       mensagem.style.display = 'block'
//       console.log('Professor deletado com sucesso:', data)
//     })
//     .catch(error => {
//       mensagem.textContent = 'ERRO AO DELETAR PROFESSOR!'
//       mensagem.style.color = 'white'
//       mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'
//       mensagem.style.backgroundColor = 'lightcoral'
//       mensagem.style.border = '1px solid red'
//       mensagem.style.display = 'block'
//       console.error('Erro ao deletar professor:', error)
//     })
//     mensagem.style.display = 'block'
// })