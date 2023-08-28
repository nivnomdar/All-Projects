class User {
    public user_id: number;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public role: string;

constructor (
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    
) {

    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
}
}

export default User;