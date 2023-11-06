export async function json(req, res){

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

    res.setHeader('Content-type', 'application/json')

}


//middleware é um interceptador que sempre recebe como parametro req e res