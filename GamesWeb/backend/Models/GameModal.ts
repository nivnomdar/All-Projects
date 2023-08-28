class Game {
    
    public game_id: number;
    public game_name: string;
    public release_date: string;
    public categories: string;
    public platforms: string;
    public developer: string;
    public publisher: string;
    public short_description: string;
    public rating: string;
    public price: string;
    public multiplayer: number;
    public mod_support: number;
    public achievements: number;
    public image_url: string;

constructor (

    game_id: number,
    game_name: string,
    release_date: string,
    categories: string,
    platforms: string,
    developer: string,
    publisher: string,
    short_description: string,
    rating: string,
    price: string,
    multiplayer: number,
    mod_support: number,
    achievements: number,
    image_url: string,

    ) {

    this.game_id = game_id;
    this.game_name = game_name;
    this.release_date = release_date;
    this.categories = categories;
    this.platforms = platforms;
    this.developer = developer;
    this.publisher = publisher;
    this.short_description = short_description;
    this.rating = rating;
    this.price = price;
    this.multiplayer = multiplayer;
    this.mod_support = mod_support;
    this.achievements = achievements;
    this.image_url = image_url;

    }
}

export default Game;