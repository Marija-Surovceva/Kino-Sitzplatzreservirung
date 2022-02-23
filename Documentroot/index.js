const http =require('http')
const fs=require('fs');


let filename ='index.html';

const server=http.createServer((req, res) => {
   console.log(req.url);

   filename=req.url.substring(1);
if (filename.length==0){filename='index.html';}

fs.readFile(filename,(err,content)=>{
    if(err)throw err;
    res.write(content.toString());
    res.end();
})

})
server.listen(8000);

