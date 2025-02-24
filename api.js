const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

app.post('/users', (req, res) => {
    const { nome, idade, email } = req.body;

    if (!nome || !idade || !email) {
        return res.status(400).json({ success: false, message: 'Dados incompletos' });
    }

    const newUser = { nome, idade, email };
    users.push(newUser);

    res.status(201).json({ success: true, message: 'Usuário adicionado com sucesso', user: newUser });
});

app.get('/users', (req, res) => {
    res.json({ success: true, users });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});