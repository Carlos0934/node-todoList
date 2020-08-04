import {Request ,  Response, Application} from 'express'
import { APPRouter } from '../interfaces/server';
import { UserModel } from '../models/user';
import { JWT } from '../utils/jwt';
import { User } from '../dtos/user';
export class AuthController implements APPRouter {
    

    constructor(private userModel : UserModel , private jwt : JWT<User>) {

    }
    setup(app : Application) {
        app.post('api/login' , this.authorize.bind(this))
    }


    

    async authorize(req : Request , res : Response) {
        
        try {
            const user = (await this.userModel.find(req.body))[0]
            if(user) {
                const token = this.jwt.sign(user)
                res.setHeader('Token' , 'Bearer ' + token)
                res.status(204).json({
                    message : 'successfully token created'
                })

            } else {
                res.status(422).json({
                    message : 'Invalid data'
                })
            }
        } catch (error) {
            res.status(500).json({
                message : 'Server Error'
            })
        }
        
    }
    

}