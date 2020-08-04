import {Request} from 'express'

export type RequestIDFunction = (req :Request ) => number


export function GetterRequestID(param : string) : RequestIDFunction {

    return (req :  Request ) => {
        const id = Number(req.params[param])

        if(isNaN(id)) {
            throw `Invalid ${param} param`
        }

        return id 
        
    }
}