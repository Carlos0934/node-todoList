import {Request , NextFunction , Response} from 'express'
import { UserModel } from '../models/user';

export class AuthMiddleware {

    constructor(userModel : UserModel , key : string) {
        
    }
    
    isAuthenticated(req : Request, res : Response , next : NextFunction) {

    }

    isAuthorized(req : Request, res : Response , next : NextFunction) {

    }
}