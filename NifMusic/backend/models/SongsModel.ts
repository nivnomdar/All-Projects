class Song {
    public  id: string;
    public description: string;
    public img: string;
    public title: string;
    public url: string;
  
    constructor( id: number, description: string,
    img: string, title: string, url: string) {
      this.id = id;
      this.description = description;
      this.img = img;
      this.title = title;
      this.url = url;
    }
  }

  type VideoGridItemProps = {
    id: string;
    title: string;
    channel: {
      id: string;
      name: string;
      profileUrl: string;
    };
    views: number;
    postedAt: Date;
    duration: number;
    thumbnailUrl: string;
    videoUrl: string;
  };