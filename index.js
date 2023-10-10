const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.json('deneme yapıyorum');
})

app.get('/manga/:mangaName/:episodeNumber/:pageNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;
    const pageNumber = req.params.pageNumber;
    const imagePath = `${__dirname}/manga/${mangaName}/${episodeNumber}/${pageNumber}.jpg`;
    console.log('imagePath:'+imagePath);
    res.sendFile(imagePath);
});

/*app.get('/manga/:mangaName/:episodeNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;
    const folderPath = `${__dirname}/manga/${mangaName}/${episodeNumber}`;
    const dosyaListesi = fs.readdirSync(klasorYolu)
  .filter((dosyaAdi) => {
    // Dosya uzantısını al
    const dosyaUzantisi = path.extname(dosyaAdi);

    // Sadece .jpg uzantısına sahip dosyaları al
    return dosyaUzantisi === '.jpg' && /^\d+$/.test(path.basename(dosyaAdi, dosyaUzantisi));
  })
  .map((dosyaAdi) => ({
    dosyaAdi,
    sayiDegeri: parseInt(path.basename(dosyaAdi, '.jpg'), 10), // Sayı değerini al
  }))
  .sort((a, b) => b.sayiDegeri - a.sayiDegeri) // Büyükten küçüğe sırala
  //res.json({fileList:dosyaListesi});
  //res.json({fileList:[1,2,3,4,5,6]});
  res.json('deneme');
});
*/
app.get('/manga/:mangaName/:episodeNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;

  res.json('deneme yapmak isitiyırkrjg');
});


app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})

module.exports = app;