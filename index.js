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

app.get('/manga/:mangaName/:episodeNumber',(req,res)=>{
    const mangaName = req.params.mangaName;
    const episodeNumber = req.params.episodeNumber;
    const folderPath = `${__dirname}/manga/${mangaName}/${episodeNumber}`;
    const dosyaListesi = fs.readdirSync(folderPath)
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
  .sort((a, b) => a.sayiDegeri - b.sayiDegeri) // Büyükten küçüğe sırala
  res.json({fileList:dosyaListesi});
  //res.json({fileList:[1,2,3,4,5,6]});
  
});
app.get('/manga/:mangaName',(req,res)=>{
  const mangaName = req.params.mangaName;
  console.log("Manga Name===",mangaName);
  const folderPath = `${__dirname}/informationsAboutMangas/informations.json`;
  fs.readFile(folderPath, 'utf8', (err, data) => {
    if (err) {
        console.error('JSON dosyası okunurken hata oluştu:', err);
        res.status(500).json({ error: 'Veri okunamadı' });
        return;
    }
    try {
        const jsonVeri = JSON.parse(data);
        console.log('JSON verisi:', jsonVeri);
        // JSON verisini kullanabiliriz, şimdi aradığımız elemanı bulmaya çalışalım
        const bulunanManga = jsonVeri.informations.find(manga => manga.name == mangaName); // Hata bu kodda olabilir. Dikkat etmek lazım.
        console.log('Bulunan manga', bulunanManga);

        if (bulunanManga) {
            res.json({bulunanManga:bulunanManga}); // Bulunan elemanı JSON olarak döndür
        } else {
            res.status(404).json({ error: 'Aranan manga bulunamadı' });
        }
    } catch (parseHata) {
        console.error('JSON verisi ayrıştırılırken hata oluştu:', parseHata);
        res.status(500).json({ error: 'Veri ayrıştırılamadı' });
    }
});
});

app.get('/lastEpisodes', function (req, res) {
  const folderPath = `${__dirname}/lastEpisodes/lastEpisodes.json`;
  fs.readFile(folderPath, 'utf8', (err, data) => {
    if (err) {
        console.error('JSON dosyası okunurken hata oluştu:', err);
        res.status(500).json({ error: 'Veri okunamadı' });
        return;
    }
    try {
        const jsonVeri = JSON.parse(data);
        console.log('JSON verisi:', jsonVeri);
        // JSON verisini kullanabiliriz, şimdi aradığımız elemanı bulmaya çalışalım
        const lastEpisodes = jsonVeri.informations;
              console.log('last episodes', lastEpisodes);

        if (lastEpisodes) {
            res.json({lastEpisodes:lastEpisodes}); // Bulunan elemanı JSON olarak döndür
        } else {
            res.status(404).json({ error: 'Bulunamadı' });
        }
    } catch (parseHata) {
        console.error('JSON verisi ayrıştırılırken hata oluştu:', parseHata);
        res.status(500).json({ error: 'Veri ayrıştırılamadı' });
    }
});

})
  

app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})

module.exports = app;