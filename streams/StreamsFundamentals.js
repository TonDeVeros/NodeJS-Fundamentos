// Netflix e spotify

// as coisas sao carregadas aos poucos

//Importação de clientes via CSV (Excel)
//1gb - 1.000.000
// POST / upload import.csv


// sem o stream o node vai ler o arquivo inteiro pra depois inserir no BD

// Enquanto o arquivo ta sendo enviado para oo servidor eu ja consigo inseerrir

//Readable strems / Writable Streams


//Streams -> 
// o pipe é algo para encaminhar
// process.stdin.pipe(process.stdout); //aqui tudo que escrevermos no terminal vai ser duplicado

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1;

    _read(){
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            }else{
                //nao posso trabalhar em stream com tipos primitivos, apenas buffer
                const buf = Buffer.from(String(i));
                //buffer só aceita string
    
    
                this.push(buf);
            }
        }, 1000);
        
    }
}


class InverseNumberStream extends Transform{
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1;

        const buf = Buffer.from(String(transformed));

        callback(null, buf);
    }
}

class MultiplyByTenStream extends Writable{
    // chunk - pedaco que lemos da stream de leitura
    //enconding - como essa informacao ta codificada
    // callback - funcao que a stream de escrita precisa chamar quando terminar
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) * 10);
        callback();
    }

}


// new OneToHundredStream()
// .pipe(process.stdout);

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());