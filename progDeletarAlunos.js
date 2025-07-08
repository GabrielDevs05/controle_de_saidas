let btnDeletarAluno = document.getElementById('btnDeletarAluno');
let mensagem = document.getElementById('mensagem');

mensagem.style.display = 'none';

btnDeletarAluno.addEventListener('click', () => {
    let codAluno = document.getElementById('codAluno').value;

    if (codAluno) {
        fetch(`https://api.npoint.io/63601e54bd199ab9d7a3/${codAluno}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar aluno');
            }
            return response.json();
        })
        .then(data => {
            mensagem.textContent = 'ALUNO DELETADO COM SUCESSO!';
            mensagem.style.color = 'white';
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
            mensagem.style.backgroundColor = 'green';
            mensagem.style.border = '1px solid white';
            console.log('Aluno deletado com sucesso:', data);
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO DELETAR ALUNO!';
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            mensagem.style.backgroundColor = 'lightcoral';
            mensagem.style.border = '1px solid red';
            console.error('Erro ao deletar aluno:', error);
        });
    } else {
        mensagem.textContent = 'POR FAVOR, INSIRA O CÓDIGO DO ALUNO.';
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        mensagem.style.backgroundColor = 'lightcoral';
        mensagem.style.border = '1px solid red';
    }

    mensagem.style.display = 'block';
}