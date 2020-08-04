import { CRUDModel } from "../interfaces/db";
import { User, UserLogin } from "../dtos/user";
import { MySQLConnection } from "./db";

import { OneWayEncrypter } from "../interfaces/utils";


export class UserModel implements CRUDModel<User> {

    
    constructor(private conn : MySQLConnection , private chipher : OneWayEncrypter) {

    }
    async find(user? : Partial<User>) {

        
        if (user?.id) {
           
            return await this.conn.runQuery('SELECT * FROM users WHERE id = ?' , user.id) as User[]
            
            
        }
        
        return await this.conn.runQuery('SELECT * FROM users ') as User[]
    } 

    async findOne( user : Partial<User> ) {
        
        if(user.email && user.username) {
            return Object.assign({}, (
                await this.conn.runQuery('SELECT * FROM users WHERE  email = ? AND  username = ? LIMIT 1   ' ,  user.email , user.username))[0]
            ) as User
        }
        
        if(user.id) {
            return Object.assign({}, (
                await this.conn.runQuery('SELECT * FROM users WHERE  id = ?   ' ,  user.id))[0]
            ) as User
        }
       

       
        
        
    }

    async findValidate(user : UserLogin) {
        const userValid = (await this.conn.runQuery('SELECT * FROM users WHERE  email = ? AND  username = ? LIMIT 1   ' ,  user.email , user.username))[0] as User

        if(!this.chipher.isValid(user.password ,userValid.password )) {
            
            return undefined
        }
        // convert to plain object
        return Object.assign({} , userValid)
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
        await this.conn.runQuery('DELETE FROM users  WHERE id = ? ' ,  userFilter.id)
    }

    
    
}