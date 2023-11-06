// CommonJs => require
// const http = require('http');


// para usar modulos adcionar no arquivo package.json => type: "module" 
// ESModules => import/export
import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; 

//req é uma requisicao(quem esta chamando o servidor)
//res é uma response a resposta do servidor

//stateful - stateless 
// stateless nao salva nada em memoria

// JSON - JavaScript Object Notation

//cabecalhos (requisicao/resposta) => metadados

// const users = [];//aqui é so para em memoria

const database = new Database();




const server = http.createServer(async(req, res)=>{

    const { method,url } = req

    await json(req, res);

    // console.log(req.body);

    if(method === 'GET' && url === '/users'){
        const users = database.select('users');
        return res.end(JSON.stringify(users));

        // .setHeader('Content-type', 'application/json') //agora estou fazendo essa funcao no middleware
    }

    if(method === 'POST' && url === '/users'){

        const {name, email} = req.body


        const user = {
            id:randomUUID(),
            name,
            email
        }

        database.insert('users', user)

        // return res.end('Criação de usuário');
        return res.writeHead(201).end('Usuário criado com sucesso!');
    }

    console.log(method, url);

    return res.writeHead(404).end('Not found');
    // return res.end("hello world!");
})

server.listen(3333);