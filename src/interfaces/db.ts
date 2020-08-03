

export interface MysqlConfig { 
    host : string
    user : string
    pass : string
    database : string
}
export interface DBConnection {
    
    runQuery(query : string, ...params : any[]  ) : Promise<any>
}


export type PartialMap<T> = {
    [P in keyof T]? : T[P]
}

export interface CRUDModel<T> {
    find( filter? :  PartialMap<T> ) : Promise<T[]>
    create(data : T) : Promise<void>
    update(filter : PartialMap<T> , data : T) : Promise<T>
    delete(filter : PartialMap<T> ) : Promise<void>
}
