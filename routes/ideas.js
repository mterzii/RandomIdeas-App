const express=require('express');
const router=express.Router();//const router = ...: Bu mini-uygulamayı router değişkenine koyuyorsun. Artık router.get(...), router.post(...) vb. yazabilirsin.
//MODEL İSMİ BÜYÜK OLMASI LAZIM
const Idea=require('../models/Idea');

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];


//Get All İdeas
// router.get('/',(req,res)=>  //http://localhost:5000/api/ideas
// {
//   res.json({success: true, data:ideas}); 
// })


// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});



// Get all ideas
router.get('/', async (req, res) => { //GET /api/ideas  async çünkü içeride await kullanacağız.
  try 
  {
    const ideas = await Idea.find(); 
    //Idea.find(): MongoDB’deki ideas koleksiyonuna sorgu gönderir.Parametre vermediğin için “tüm dökümanları getir”
    res.json({ success: true, data: ideas }); // JSON cevap dön
  } 
  catch (error) 
  {
    res.status(500).json({ success: false, error: 'Something went wrong' }); // Sunucu hatası
  }
});









//http://localhost:5000/api/ideas/1  GET İLE DATA ALIYORUZ POST İLE GÖNDERİYORUZ
// Update Idea
router.put('/:id', async (req, res) => {          // 1) PUT metodu: /api/ideas/:id yolunu dinler
  try 
  {                                           // 2) Riskli işler (DB) için try: dene
    const updatedIdea = await Idea.findByIdAndUpdate( // 3) Mongoose Model metodu: _id ile kaydı güncelle
      req.params.id,                               // 4) URL'deki :id → Express bunu req.params.id içine koyar
      {                                            // 5) Güncelleme komutu (Mongo update doc)
        $set: {                                    // 6) Sadece şu alanları değiştir:
          text: req.body.text,                     // 7) Body'den gelen text ile değiştir (app.use(express.json()) şart)
          tag:  req.body.tag                       // 8) Body'den gelen tag ile değiştir
        }
      },
      { new: true }                                // 9) Varsayılan: eski dokümanı döndürür. new:true → GÜNCEL halini döndür
    );

    res.json({ success: true, data: updatedIdea }); // 10) 200 OK → JSON cevap; güncellenen dokümanı gönder
  } 
  catch (error) 
  {                                 // 11) Hata olursa (bağlantı, cast vs.) buraya düşer
    console.log(error);                             // 12) Logla (server tarafı)
    return res                                      // 13) İstemciye 500 → genel sunucu hatası
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});










//Add an Idea     GET İLE DATA ALIYORUZ POST İLE GÖNDERİYORUZ
//*****Şemadan üretilmiş Model’den bir doküman oluşturup DB’ye kaydediyorsun.* */

router.post('/', async (req,res)=> //HTTP metodunu dinliyor.  GET → veri almak için. POST → yeni veri göndermek/eklemek
{
// res.send(req.body.text);//JSON içindeki "text" alanı.
 const idea = new Idea({
    // id: ideas.length + 1, idye gerek yok otomatik olarak mongo ile ekleniyor
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try
  {
    const savedIdea=await idea.save();//Mongoose dokümanını MongoDB’ye yazar.
    res.json({success:true,data:savedIdea}); 
  }
  catch (error)
  {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }


})




// Update Idea

router.put('/:id', async (req, res) => //express urlyi analiz eder.Urlde /:değişkenadı gibi tanımlanmış varsa req.paramsa koyar
{
  try
  {
    const updatedIdea=await Idea.findByIdAndUpdate(
    req.params.id,
    {
      $set:
      {
        text:req.body.text,
        tag:req.body.tag
      }
    },
    {
      new:true
    }
    );
    res.json({success:true,data:updatedIdea})
  } 
  catch (error) 
  {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something went wrong' });
  }
});







// Delete Idea
// Delete idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});










module.exports=router;