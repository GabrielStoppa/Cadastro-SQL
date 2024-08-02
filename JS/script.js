function msgError(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMsgError() {
    msgError('#msg', '*Seus dados estão incompletos!');
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        exibirMsgError();
        return;
    }

    const dados = { email, senha: password };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            window.location.href = 'open.html';
        } else {
            const error = await response.text();
            msgError('#msg', error);
        }
    } catch (error) {
        msgError('#msg', 'Erro: ' + error.message);
    }
});

document.getElementById('updateForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('updateEmail').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    if (!email || !currentPassword || !newPassword) {
        exibirMsgError();
        return;
    }

    const dados = { email, senha: currentPassword, novaSenha: newPassword };

    try {
        const response = await fetch('http://localhost:3000/atualizarSenha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            msgError('#msg', 'Senha atualizada com sucesso');
        } else {
            const error = await response.text();
            msgError('#msg', error);
        }
    } catch (error) {
        msgError('#msg', 'Erro: ' + error.message);
    }
});
