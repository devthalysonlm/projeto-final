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


    


