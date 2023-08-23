class Meeting {
    public id: number;
    public starttime: string;
    public endtime: string;
    public description: string;
    public room: string;
    public teamid: number;


    constructor( id: number, starttime: string, endtime: string, description:string, room: string, teamid: number )
    {
        this.id = id;
        this.starttime = starttime;
        this.endtime = endtime;
        this.description = description;
        this.room = room;
        this.teamid = teamid;

    }

}

export default Meeting;