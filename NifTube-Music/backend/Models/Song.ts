class Song {
    public id: number;
    public description: string;
    public img: string;
    public title: string;
    public url: string;
    public category: number;
    public categoryName: string;
  
    constructor( id: number, description: string,
    img: string, title: string, url: string, 
    category: number, categoryName: string) {
      this.id = id;
      this.description = description;
      this.img = img;
      this.title = title;
      this.url = url;
      this.category = category;
      this.categoryName = categoryName;

    }
  }
  
  export default Song;