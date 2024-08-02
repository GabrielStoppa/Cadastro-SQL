const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors'); // Adiciona suporte a CORS

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Permite CORS para todas as origens

async function dadosCadastro(nome, sobrenome, data, email, senha) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./login.db', (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message);
                return reject(err.message);
            }
            console.log('Conectado ao banco de dados SQLite.');
        });

        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                sobrenome TEXT,
                data TEXT,
                email TEXT,
                senha TEXT
            )`);

            const stmt = db.prepare(`INSERT INTO usuarios (nome, sobrenome, data, email, senha) VALUES (?,?,?,?,?)`);
            stmt.run(nome, sobrenome, data, email, senha, (err) => {
                if (err) {
                    console.error('Erro ao inserir dados:', err.message);
                    return reject(err.message);
                }
                resolve('Usuário cadastrado com sucesso');
            });
            stmt.finalize();
        });

        db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err.message);
                return reject(err.message);
            }
            console.log('Conexão com o banco de dados fechada.');
        });
    });
}

app.post('/register', async (req, res) => {
    const { nome, sobrenome, data, email, senha } = req.body;

    try {
        const message = await dadosCadastro(nome, sobrenome, data, email, senha);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
