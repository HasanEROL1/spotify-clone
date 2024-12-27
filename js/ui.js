export class UI {
  constructor() {
    this.list = document.querySelector(".list");
    this.form = document.querySelector("form");
    this.title = document.getElementById("title");
    this.player = document.querySelector(".player");
  }
  //ekrana müzik cartı render et
  renderCards(songs) {
    //öncesinde list kısmında htmli temizle
    this.list.innerHTML = "";
    // müzikler için ekrana html oluştur
    songs.forEach((song) => {
      //card oluştur
      const card = document.createElement("div");
      //card.classı
      card.className = "card";

      // card elemanına şarkı verilerini aktar
      card.dataset.title = song.title;
      card.dataset.title = song.subtitle;
      card.dataset.img = song.images.coverarthq;
      card.dataset.mp3 = song.hub.actions[1].uri;

      //card içeriği
      card.innerHTML = `
     
                        <figure>
                            <img src="${song.images.coverarthq}" alt="artist foto"/>
                            <div class="play">
                    <i class="bi bi-play-fill"></i> 
                    </div></figure>
                       
                        <div class="card-info">
                            <h4>${song.title}</h4>
                            <h4>${song.subtitle}</h4>
                        </div>
                    
      
      `;

      //cardı html içerisine yerleştir
      this.list.appendChild(card);
    });
  }
  // /LOader basma
  renderLoader() {
    this.list.innerHTML = ` 
    <div class="loader">
      <div class="cell d-0"></div>
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
      <div class="cell d-2"></div>
      <div class="cell d-3"></div>
      <div class="cell d-3"></div>
      <div class="cell d-4"></div>
    </div>`;
  }

  // arama işlemi sonrası başlık güncelle

  updateTitle(text) {
    this.title.textContent = text;
  }
  sliceText(text) {
    if (text.length > 16) {
      return text.slice(0, 16) + "...";
    }
    return text;
  }
  // oynatma listesini güncelleyen fonksiyon
  renderPlayer(song) {
    this.player.innerHTML = `
     <div class="info">
            <img src="${song.img}"
                alt="">
            <div>
                <h5>${song.title}</h5>
                <p>${song.subtitle}</p>
            </div>
        </div>
       
        <audio autoplay
            src="${song.mp3}"
            controls>
        </audio>
       
        <div class="icons">
            <i class="bi bi-music-note-list"></i>
            <i class="bi bi-boombox-fill"></i>
            <i class="bi bi-pc-display"></i>
        </div>
  `;
    const audio = this.player.querySelector("audio");
    audio.addEventListener("play", this.toggleAnimation);
    audio.addEventListener("pause", this.toggleAnimation);
  }
  // resim animasyonunu dinamik şekilde ekle-çıkar yapan fonksiyon
  toggleAnimation() {
    const image = document.querySelector(".info img");
    image.classList.toggle("animate");
  }
}
