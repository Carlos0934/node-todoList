import {createPool , Pool} from 'mysql2/promise'
import {DBConnection} from '../interfaces/db'

export class MySQLConnection implements DBConnection   {
    private conn : Pool

    constructor(host : string , user : string , pass : string , database : string) {
        this.conn = createPool({
            host,
            user,
            password : pass,
            database,

        })
        
    }

    async runQuery(query : string , ...params : any[] ) : Promise<any> {
        try {
            const  [rows, fields ] =  await this.conn.query(query, params)
            return rows
        } catch (error) {
            this.conn.end()
        }
      
        
    }
    
}