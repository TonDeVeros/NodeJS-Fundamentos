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




const server = http.createServer(async(req, res)=>{

    const { method,url } = req

    const buffers = [];
    //Asynca await com streams aguarda cada pedaco da stream ser retornado.
    for await (const chunk of req){
        buffers.push(chunk);
    }
    
    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString());

    }catch{
        req.body = null
    }

    console.log(req.body);

    if(method === 'GET' && url === '/users'){
        return res
        .setHeader('Content-type', 'application/json')
        .end('Listagem de usuarios ' + JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users'){

        const {name, email} = req.body


        users.push({
            id:1,
            name,
            email
        })

        // return res.end('Criação de usuário');
        return res.writeHead(201).end('Usuário criado com sucesso!');
    }

    console.log(method, url);

    return res.writeHead(404).end('Not found');
    // return res.end("hello world!");
})

server.listen(3333);