import { CRUDModel } from "../interfaces/db";
import { User } from "../dtos/user";
import { MySQLConnection } from "./db";
import { Todo } from "../dtos/todo";
import { OneWayEncrypter } from "../interfaces/utils";


export class UserModel implements CRUDModel<User> {

    
    constructor(private conn : MySQLConnection , private chipher : OneWayEncrypter) {

    }
    async find(user? : Partial<User>) {

        
        if (user) {
            
            return await this.conn.runQuery('SELECT * FROM users WHERE ? ' , user) as User[]
        }
        
        return await this.conn.runQuery('SELECT * FROM users ') as User[]
    } 

    async create(user : User) {
        user.password = this.chipher.encrypt(user.password)
        await this.conn.runQuery('INSERT INTO users SET ?' , user)
    }

    async update(  user : Partial<User> , userFilter : Partial<User>) {
        
        if(user.password) {
            user.password = this.chipher.encrypt(user.password)
        }
        await this.conn.runQuery('UPDATE users SET ? WHERE ? ' , user , userFilter)

        return (await this.find(userFilter))[0]
        
    }

    async delete(userFilter : Partial<User>) { 
        await this.conn.runQuery('DELETE users  WHERE ? ' ,  userFilter)
    }

    
    
}