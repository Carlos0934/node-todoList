

export interface MysqlConfig { 
    host : string
    user : string
    pass : string
    database : string
}
export interface DBConnection {
    
    runQuery(query : string, ...params : any[]  ) : Promise<any>
}

