const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.json('deneme');
})

app.get('/manga/:mangaName/:episodeNumber/:pageNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;
    const pageNumber = req.params.pageNumber;
    const imagePath = `${__dirname}/manga/${mangaName}/${episodeNumber}/${pageNumber}.jpg`;
    console.log('imagePath:'+imagePath);
    res.sendFile(imagePath);
});

app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})

module.exports = app;