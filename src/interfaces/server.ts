import { Application, RequestHandler,  } from "express";


export interface APPRouter {
    setup : (app : Application) => void
} 


export interface APPMiddleware {
    handler : RequestHandler
    path? : string 
}
export interface APPServerProps {
    port : number | string
    apps : APPRouter[]
    middlewares : APPMiddleware[]

}

