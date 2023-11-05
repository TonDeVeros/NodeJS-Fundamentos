// CommonJs => require
// const http = require('http');


// para usar modulos adcionar no arquivo package.json => type: "module" 
// ESModules => import/export
import http from 'node:http';

//req é uma requisicao(quem esta chamando o servidor)
//res é uma response a resposta do servidor

//stateful - stateless 
// stateless nao salva nada em memoria

// JSON - JavaScript Object Notation

//cabecalhos (requisicao/resposta) => metadados

const users = [];

const server = http.createServer((req, res)=>{

    const { method,url } = req

    if(method === 'GET' && url === '/users'){
        return res
        .setHeader('Content-type', 'application/json')
        .end('Listagem de usuarios ' + JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users'){

        users.push({
            id:1,
            name: 'John',
            email: 'john@example.com'
        })

        // return res.end('Criação de usuário');
        return res.writeHead(201).end();
    }

    console.log(method, url);

    return res.writeHead(404).end('Not found');
    // return res.end("hello world!");
})

server.listen(3333);