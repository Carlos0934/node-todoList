import { CRUDModel } from "../interfaces/db";
import { User } from "../dtos/user";
import { MySQLConnection } from "./db";


export class UserModel<User> implements CRUDModel<User> {

    
    constructor(private conn : MySQLConnection) {

    }
    async find(user? : Partial<User>) {

        
        if (!user) {
            return await this.conn.runQuery('SELECT * FROM users where ? ' , user) as User[]
        }
        
        return await this.conn.runQuery('SELECT * FROM users ') as User[]
    } 

    async create(user : User) {
        await this.conn.runQuery('INSERT INTO users SET ?' , user)
    }

    async update(  user : User , userFilter : Partial<User>) {
       
        await this.conn.runQuery('UPDATE users SET ? WHERE ? ' , user , userFilter)

        return (await this.find(userFilter))[0]
        
    }

    async delete(userFilter : Partial<User>) { 
        await this.conn.runQuery('DELETE users  WHERE ? ' ,  userFilter)
    }
}