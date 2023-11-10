import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; 
import { BuildRoutePath } from './utils/build-route-path.js';

const database = new Database();


export const routes = [
    {
        method: 'GET',
        path: BuildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users');
            return res.end(JSON.stringify(users));

             // .setHeader('Content-type', 'application/json') //agora estou fazendo essa funcao no middleware
        }
    },
    {
        //request body
        method: 'POST',
        path: BuildRoutePath('/users'),
        handler: (req, res) => {

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
    },
    {
   //route parameters

        method: 'PUT',
        path: BuildRoutePath('/users/:id'),
        handler: (req, res) =>{

            //isso é uma destruturacao
            const { id } = req.params;
            const {name, email} = req.body


            database.Update('users',id, {
                name, email
            });

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: BuildRoutePath('/users/:id'),
        handler: (req, res) =>{

            //isso é uma destruturacao
            const { id } = req.params;


            database.Delete('users',id);

            return res.writeHead(204).end();
        }
    }
]