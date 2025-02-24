const {GoogleSpreadsheet} = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');

const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets'
];

const jwt = new JWT({
    email: credenciais.client_email,
    key: credenciais.private_key,
    scopes: SCOPES,
})

async function GetDoc() {
    const doc = new GoogleSpreadsheet('1B_aNW3fc0jf5e5R79-EeBCmPTLey_iK_77rUyfA5zh4', jwt);
    await doc.loadInfo();
    return doc;
}

async function ReadWorkSheet() {
    const doc = await GetDoc(); // Obtém o objeto da planilha
    const sheet = doc.sheetsByIndex[0]; // Seleciona a primeira aba da planilha
    const rows = await sheet.getRows(); // Obtém as linhas da planilha

    // Transforma as linhas em objetos
    const users = rows.map(row => ({
        nome: row.nome, // Substitua "nome" pelo nome da coluna na planilha
        idade: row.idade, // Substitua "idade" pelo nome da coluna na planilha
        email: row.email, // Substitua "email" pelo nome da coluna na planilha
    }));

    return users;


}

const axios = require('axios');

async function AddUser(data = {}) {
    try {
        const response = await axios.post('http://localhost:3000/users', data); // Substitua pela URL da sua API
        console.log('Usuário adicionado:', response.data);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error.message);
    }
}

async function main() {
    try {
        const users = await ReadWorkSheet(); // Lê os dados da planilha

        // Envia cada usuário para a API
        for (const user of users) {
            await AddUser(user);
        }

        console.log('Processo concluído com sucesso!');
    } catch (error) {
        console.error('Erro no processo:', error.message);
    }
}

// Executa a função principal
main();


    


