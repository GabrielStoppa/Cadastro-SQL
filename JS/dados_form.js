document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const primeiroNome = document.getElementById('primeiroNome').value;
    const segundoNome = document.getElementById('segundoNome').value;
    const dataAniversario = document.getElementById('dataAniversario').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const dados = {
        nome: primeiroNome,
        sobrenome: segundoNome,
        data: dataAniversario,
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            const result = await response.text();
            alert(result);
        } else {
            const error = await response.text();
            alert('Erro: ' + error);
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});
