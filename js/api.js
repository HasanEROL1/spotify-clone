const url = "https://shazam.p.rapidapi.com/search?term=adele&locale=en-US";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "6168180c32msh468da6d8165170fp11f587jsnfbc687b6b116",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
//Api Clası

export class API {
  //popüler müzikler apidan çekildi
  async getPopular() {
    // const res = await fetch(url, options);

    // const data = await res.json();
    // const formatted = data.tracks.hits.map((item) => item.track);
    // // console.log(formatted);

    // return formatted;
    const data = await this.searchMusics("neffex");
    const data1 = await this.searchMusics("eminem");

    return [...data, ...data1]; // iki arama sonucunu birleştirip döndürdük
  }
  // aratılan müzikleri api dan alma

  async searchMusics(query) {
    // urli dinamik hale getirdik
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US";`;

    // api istek at
    const res = await fetch(url, options);
    const data = await res.json();
    const formatted = data.tracks.hits.map((item) => item.track);

    return formatted;
  }
}
