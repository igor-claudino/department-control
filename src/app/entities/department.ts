import {User} from './user'
export class Department{
    private id : number;
    private name : string;
    private email : string;
    private users : User[];

    constructor (){
    }

    getId():number{
        return this.id;
    }
    setId(id : number){
        this.id = id;
    }
    getName():string{
        return this.name;
    }
    setName(name :string){
        this.name = name;
    }
    getEmail():string{
        return this.email;
    }
    setEmail(email : string){
        this.email = email;
    }
    getUsers():User[]{
        return this.users;
    }
    setUsers(users : User[]){
        this.users = users;
    }
}