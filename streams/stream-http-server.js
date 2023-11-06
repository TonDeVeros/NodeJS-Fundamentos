import http from 'node:http';
import { Readable, Writable, Transform } from 'node:stream';



// tudo no node sao streams
//req e res sao streams
//req => ReadableStrem
//res => WritableStream


class InverseNumberStream extends Transform{
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed);

        const buf = Buffer.from(String(transformed));

        callback(null, Buffer.from(String(transformed)));
    }
}

const server = http.createServer(async(req, res)=>{
    
    const buffers = [];
    //Asynca await com streams aguarda cada pedaco da stream ser retornado.
    for await (const chunk of req){
        buffers.push(chunk);
    }
    
    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent);

    return res.end(fullStreamContent);

    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res)
    // .end('subiu o server');
})





server.listen(3334);