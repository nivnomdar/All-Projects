class Song {
    public id: number;
    public description: string;
    public img: string;
    public title: string;
    public url: string;
    public category:number;
  
    constructor( id: number, description: string,
    img: string, title: string, url: string, category:number) {
      this.id = id;
      this.description = description;
      this.img = img;
      this.title = title;
      this.url = url;
      this.category = category;

    }
  }
  
  export default Song;