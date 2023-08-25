class Note {
    public id: number;
    public name: string;
    public date: string;
    public time: string;

    constructor( id: number, name: string, date: string, time: string)
    {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;

    }

}

export default Note;