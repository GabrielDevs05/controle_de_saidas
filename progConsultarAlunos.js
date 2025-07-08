let btnConsultaAluno = document.getElementById('btnConsultaAluno');
let mensagem = document.getElementById('mensagem');
let alunoConsultado = document.getElementById('alunoConsultado');

mensagem.style.display = 'none';

btnConsultaAluno.addEventListener('click', () => {
    fetch('https://api.npoint.io/63601e54bd199ab9d7a3')
    .then(response => response.json())
    .then(data => {
        let codAluno = document.getElementById('codAluno').value;
        let aluno = data.find(aluno => aluno.codAluno === codAluno);

        if (aluno) {
            alunoConsultado.innerHTML = `
                <p><strong>Código:</strong> ${aluno.codAluno}</p>
                <p><strong>Nome:</strong> ${aluno.nome} ${aluno.sobrenome}</p>
                <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
                <p><strong>Telefone:</strong> ${aluno.telefone}</p>
                <p><strong>Email:</strong> ${aluno.email}</p>
            `;
            mensagem.textContent = 'ALUNO ENCONTRADO!';
            mensagem.style.color = 'white';
            mensagem.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
            mensagem.style.backgroundColor = 'green';
            mensagem.style.border = '1px solid white';
        } else {
            alunoConsultado.innerHTML = '';
            mensagem.textContent = 'ALUNO NÃO ENCONTRADO!';
            mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            mensagem.style.backgroundColor = 'lightcoral';
            mensagem.style.border = '1px solid red';
        }
        
        mensagem.style.display = 'block';
    })
    .catch(error => {
        mensagem.textContent = 'ERRO AO CONSULTAR ALUNO!';
        mensagem.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        mensagem.style.backgroundColor = 'lightcoral';
        mensagem.style.border = '1px solid red';
        console.error('Erro ao consultar aluno:', error);
        mensagem.style.display = 'block';
    });
}
);
        