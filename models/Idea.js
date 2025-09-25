const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({//“Bu koleksiyondaki dökümanların şekli nasıl olacak?”
  text: {
    type: String,
    required: [true, 'Please add a text field'],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//MODEL İSMİ BÜYÜK OLMASI LAZIM
module.exports = mongoose.model('Idea', IdeaSchema);
//Şemanın adı: Kodda verdiğin değişken adı → IdeaSchema
//'Idea': Bu, modelin adı. Yani “Bu şemadan Idea isminde bir Model üret” diyorsun.
//IdeaSchema: tanımladığın “verikalıbı”||mongoose.model: Bu şemadan bir Model sınıfı üretir.