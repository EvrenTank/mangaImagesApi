const express = require('express');
const app = express();
const cors = require('cors');

const uploadPath = './manga';

app.get('manga/:mangaName/:episodeNumber/:pageNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;
    const pageNumber = req.params.pageNumber;
    const imagePath = `manga/${mangaName}/${episodeNumber}/${pageNumber}`;

    res.sendFile(imagePath);
});

app.listen(8080,()=>{
    console.log('Server is')
})