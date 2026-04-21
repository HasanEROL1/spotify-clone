const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "6168180c32msh468da6d8165170fp11f587jsnfbc687b6b116",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

export class API {
  async getPopular() {
    try {
      const data = await this.searchMusics("neffex");
      const data1 = await this.searchMusics("eminem");
      return [...data, ...data1];
    } catch (err) {
      console.error("Popüler müzikler çekilirken hata:", err);
      return [];
    }
  }
  async searchMusics(query) {
    const url = `https://shazam.p.rapidapi.com/v2/search?term=${encodeURIComponent(query)}&locale=en-US`;

    const res = await fetch(url, options);
    const data = await res.json();

    console.log(`${query} için gelen ham veri:`, data);

    // YENİ YAPI: v2'de şarkılar results.songs.data içinde geliyor
    // Eğer bu yapı yoksa boş dizi döndür ki hata vermesin
    const songs = data?.results?.songs?.data || [];

    // Veriyi render fonksiyonuna uygun hale getiriyoruz
    const formatted = songs.map((song) => ({
      // Kendi kodundaki değişken isimlerine göre burayı kontrol et (title, subtitle vb.)
      title: song.attributes.name,
      subtitle: song.attributes.artistName,
      images: {
        coverart: song.attributes.artwork.url.replace('{w}', '400').replace('{h}', '400'),
      },
      mp3: song.attributes.previews?.[0]?.url || "", // Önizleme URL'si, yoksa boş string
      hub: {
        actions: [
          { uri: song.attributes.url } // Eğer tıklayınca gitmesini istiyorsan
        ]
      }
    }));

    if (formatted.length === 0) {
      console.warn(`${query} için sonuç bulunamadı. Yapı hala uyuşmuyor olabilir.`);
    }

    return formatted;
  }

}