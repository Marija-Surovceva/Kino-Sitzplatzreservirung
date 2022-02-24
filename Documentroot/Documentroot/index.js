const http =require('http')
const fs=require('fs');
const sqlite3 = require('sqlite3');



let filename ='index.html';

const server=http.createServer((req, res) => {
   console.log(req.url);
   let db = new sqlite3.Database('platzreservirung.db');
if (req.url=='/getData'){
    let query='SELECT PlatzID,Reihe,Status,Platz.KategorieID,Preise FROM Platz INNER JOIN Kategorie ON Platz.KategorieID=Kategorie."Kategorie ID"';

    let arr = [];
    db.all( query, (err,inhalt)=>{
        if(err) {throw err;}
        arr.push(inhalt); 
    
      

let str='let data ='+JSON.stringify(arr);
res.write(str);
res.end();
});
}else{
   filename=req.url.substring(1);
if (filename.length==0){filename='index.html';}

fs.readFile(filename,(err,content)=>{
    if(err)throw err;
    res.write(content.toString());
    res.end();
})
}
db.close;

})

server.listen(8000);

