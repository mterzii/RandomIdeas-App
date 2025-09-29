import IdeasApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');

    this._ideas = [];
    this.getTagClass();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  async getIdeas() 
  {
    try 
    {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      console.log(this._ideas);
    } 
    catch (error) 
    {
      console.log(error);
    }
}


  getTagClass(tag) 
  {
    tag = tag.toLowerCase();   // tag'i küçük harfe çeviriyor
    let tagClass = '';

    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;  // eğer tag geçerliyse class ismi oluştur
    } else {
      tagClass = '';            // geçerli değilse boş bırak
    }

    return tagClass;            // sonucu döndür
}


  render() {
  this._ideaListEl.innerHTML = this._ideas
    .map((idea) => {
      const tagClass=this.getTagClass(idea.tag);
      return `
        <div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>${idea.tag.toUpperCase()}</h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
    })
    .join('');
}

}

export default IdeaList;
