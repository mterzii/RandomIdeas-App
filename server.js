const path=require('path'); //Dosya ve klasör yollarını (path) işletim sistemine uygun Node.js Modülü
const express = require('express');   // 1. express paketini projeye dahil et
const cors=require('cors');
require('dotenv').config();//Normalde Node.js .env dosyasını tanımaz.dotenv paketi bunu çözer.config ayarları yükle der
const port =process.env.PORT || 5000;  // 2. hangi portta çalışacağını belirle http://localhost:5000
//.env dosyasında PORT=5000 varsa, kodda process.env.PORT yazınca sana "3000"

const connectDB=require('./config/db');
connectDB();//MongoDB’ye bağlanmayı deniyor.
const app = express();                // 3. express uygulamasını başlat app üzerinden route’lar (/, /about gibi yollar) ekleyebilir,


//Static Folder
app.use(express.static(path.join(__dirname, 'public')));//Her istekte şunu çalıştır||Verilen klasörü statik dosya deposu olarak işaretlemek.
//path.join(...) → İşletim sistemine uygun şekilde yol oluşturur.
//__dirname dosyanın bulunduğu tam yolu verir.




//Body Parser Middleware  → gelen veriyi okunabilir hale çevirir.
//Olmazsa POST/PUT isteklerinde data göremezsin.

app.use(express.json());//gelen isteğin (body) JSON formatındaysa, otomatik cevir req.body koy
app.use(express.urlencoded({ extended: false }));//gelen veri eğer HTML formundan gönderildiyse onu da çözümleyip req.body koyar
//extended: false → sadece basit key=value formatlarını

//cors middleware
app.use
(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);



app.get('/',(req,res)=> //http://localhost:5000 yazdığında (veya sonuna / eklediğinde), bu rota tetiklenecektir.
{
  // res.send('Hello there');
  res.json({message :'Welcome to RandomIdeas API'}); //key: value JSON DOSYASI
})




const ideasRouter=require('./routes/ideas');//ideasRouter değişkeni = ideas.js içindeki router.
app.use('/api/ideas',ideasRouter);//app.use(PATH, ROUTER) PATH ile başlayan tüm istekleri bu ROUTER’a yönlendir.
//app.use() → Express’e “şu path’te şu router’ı çalıştır”
///api/ideas ile başlayan her istek → ideasRouter




// 4. Sunucuyu ayağa kaldır
app.listen(port, () => {//portu dinlemeye başlıyorum
  console.log(`Server listening on port ${port}`);
});
