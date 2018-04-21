import { Department } from './department'

export class User {

    private id: number;
    private login: string;
    private password: string;
    private name: string;
    private email: string;
    private department: Department;

    constructor() {
    }

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getLogin(): String {
        return this.login;
    }
    setLogin(login: string) {
        this.login = login;
    }
    getPassword(): string {
        return this.password;
    }
    setPassword(password: string) {
        this.password = password;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    getEmail(): string {
        return this.email;
    }
    setEmail(email: string) {
        this.email = email;
    }
    getDepartment(): Department {
        return this.department;
    }
    setDepartment(department: Department) {
        this.department = department;
    }
}