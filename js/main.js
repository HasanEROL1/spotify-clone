import { API } from "./api.js";
import { UI } from "./ui.js";
const api = new API();
const ui = new UI();
document.addEventListener("DOMContentLoaded", () => {
  //loader ı render et
  ui.renderLoader();
  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log("hata ", err);
      alert("hata oluştu");
    });
});

//formun gönderilmesini izle
ui.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;

  // aratılan kelime yoksa fonksiyonu durdur
  if (query.trim === "")
    return alert("lütfen geçerli arama işlemi gerçekleştiriniz");

  //loader ı render et
  ui.renderLoader();

  // başlığı güncellle
  ui.updateTitle(query + " için sonuçlar");

  //aramayı başlat
  api
    .searchMusics(query)
    // gelen şarkıları ekrana render et
    .then((data) => ui.renderCards(data))
    // hata durumunda uyarı ver
    .catch((err) => {
      console.log("hata ", err);
      alert("hata oluştu");
    });
});

/// Liste alanında gerçekleşen tıklanma olaylarını izle

// play buttonuna tıklandığında şarkıyı başlat
ui.list.addEventListener("click", (e) => {
  if (e.target.className == "play") {
    // tıklanılan elemanın kapsamına eriş

    const card = e.target.closest(".card");
    const data = card.dataset;

    console.log(data);

    ui.renderPlayer(data);

    console.log(ui);
  }
});
