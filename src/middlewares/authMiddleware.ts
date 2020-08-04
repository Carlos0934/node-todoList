import {Request , NextFunction , Response} from 'express'
import { UserModel } from '../models/user';
import { JWT } from '../utils/jwt';
import { User } from '../dtos/user';

export class AuthMiddleware {

    constructor( private userModel : UserModel , private jwt : JWT<User>) {
        
    }
    
    private getUserByToken(req : Request) : User | undefined {
        const authHeader = req.headers['authorization']
        if (authHeader) {
           
            const token = authHeader.split(' ')[1]
            return this.jwt.verify(token)
        }

        return undefined
    }
    isAuthenticated(req : Request, res : Response , next : NextFunction) {
        
        
        if(this.getUserByToken(req))  {
            
            next()
            return 
        }
        res.status(401).json({
            message : "Unauthenticated, you are anonymous user"
        })

    }

    async isAuthorized(req : Request, res : Response , next : NextFunction) {
        const user = this.getUserByToken(req)
        const id = Number(req.params['user'])
       
        if (user &&  !Number.isNaN(id)) {
            const verifiedUser = (await this.userModel.findOne(user))
           
            if (verifiedUser && id === verifiedUser.id) {
                next()
                return 
            }
            
            res.status(401).json({
                message : "Unauthorized"
            })

        } else {
            res.status(401).json({
                message : "Invalid token"
            })
        }

    }
}