let mensagem = document.getElementById('mensagem');
let btnCadAluno = document.getElementById('btnCadAluno');

mensagem.style.display = 'none';

btnCadAluno.addEventListener('click', () => {
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let matricula = document.getElementById('matricula').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

    if (nome && sobrenome && matricula && telefone && email) {
        fetch('https://api.npoint.io/63601e54bd199ab9d7a3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                sobrenome: sobrenome,
                matricula: matricula,
                telefone: telefone,
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            mensagem.textContent = 'ALUNO CADASTRADOR COM SUCESSO!';
            mensagem.style.color = 'white';
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
            mensagem.style.backgroundColor = 'green';
            mensagem.style.border = '1px solid white';
            console.log('Aluno cadastrado com sucesso:', data);
        })
        .catch(error => {
            mensagem.textContent = 'ERRO AO CADASTRAR ALUNO!';
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            mensagem.style.backgroundColor = 'lightcoral';
            mensagem.style.border = '1px solid red';
            console.error('Erro ao cadastrar aluno:', error);
        });
    } else {
        mensagem.textContent = 'POR FAVOR, PREENCHA TODOS OS CAMPOS!.';
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)'; // Sombra vermelha
        mensagem.style.backgroundColor = 'lightcoral';
        mensagem.style.border = '1px solid red';
        console.error('Por favor, preencha todos os campos.');
    }

    mensagem.style.display = 'block';
})


