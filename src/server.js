// CommonJs => require
// const http = require('http');


// para usar modulos adcionar no arquivo package.json => type: "module" 
// ESModules => import/export
import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './extract-query-params.js';


//req é uma requisicao(quem esta chamando o servidor)
//res é uma response a resposta do servidor

//stateful - stateless 
// stateless nao salva nada em memoria

// JSON - JavaScript Object Notation

//cabecalhos (requisicao/resposta) => metadados

// const users = [];//aqui é so para em memoria


//Query Parameters: URL Stateful => filtros, paginacao, modificam a resposta mas nao sao obrigatorios
// http://localhost:3333/users?userId=1&name=Tom

//Route Parameters:Identificao de recurso
//GET http:localhost:3333/users/1

//Request Body: Envio de informacoes de um formulario (HTTPS)
// http://localhost:3333/users
const server = http.createServer(async(req, res)=>{

    const { method,url } = req

    await json(req, res);

    const route = routes.find(route =>{
        return route.method === method && route.path.test(url);
    })

    console.log(route);

    if(route){//caso exista rota

        const routeParams = req.url.match(route.path);


        const { query, ...params } = routeParams.groups

        req.params = params;

        // sem desestruturacao
        // req.query = extractQueryParams(routeParams.groups.query)
        //com desestruturacao
        req.query = query ? extractQueryParams(query) : {}


        // console.log(req.params)

        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not found');
    // return res.end("hello world!");
})

server.listen(3333);