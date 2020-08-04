import {createPool , Pool} from 'mysql2/promise'
import {DBConnection} from '../interfaces/db'

export class MySQLConnection implements DBConnection   {
    private pool : Pool

    constructor(host : string , user : string , pass : string , database : string) {
        this.pool = createPool({
            host,
            user,
            password : pass,
            database,
            

        })
        
    }

    async runQuery(query : string , ...params : any[] ) : Promise<any> {
        const conn = await this.pool.getConnection()
        try {
            
            const  [rows, fields ] =  await conn.query(query, params)
            conn.release()
            return rows
        } catch (error) {
            console.log(error)
            conn.destroy()
            return []
        } 
        
      
        
    }
    
}