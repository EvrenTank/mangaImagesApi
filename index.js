const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/',(req,res)=>{
    res.json('deneme');
})

app.get('/manga/:mangaName/:episodeNumber/:pageNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;
    const pageNumber = req.params.pageNumber;
    const imagePath = `${__dirname}/manga/${mangaName}/${episodeNumber}/${pageNumber}.jpg`;
  
    res.sendFile(imagePath);
});

app.listen(8080,()=>{
    console.log('Server is running on port 8080')
})