import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1;

    _read(){
        const i = this.index++;

        setTimeout(() => {
            if (i > 5) {
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


fetch('http://127.0.0.1:3334',{
    method: "POST",
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    response.text.then(data => {
        console.log(data);
    })
})