import {sign , verify, } from 'jsonwebtoken'

export class JWT<T extends object | string>  {
    constructor(private privateKey : string  ) {
        
    }

    verify(token : string) : T {
        const data = verify(token , this.privateKey) as T

        return data  
    }

    sign(data : T) : string {
        
        return sign(data , this.privateKey)
    }
    

    
}