import { APPRouter } from "../interfaces/server";
import { Application, Router } from "express";
import { UserModel } from "../models/user";
import {Request, Response} from 'express'

import { AuthMiddleware } from "../middlewares/authMiddleware";
import { RequestIDFunction, GetterRequestID } from "../utils/http";

export class UserController implements APPRouter {

    private getUserID : RequestIDFunction

    constructor (private userModel : UserModel , private authMiddleware : AuthMiddleware   ) {
        this.getUserID = GetterRequestID('user')
    }
    setup(app : Application) {
        
        const router = Router()
        router.post('/', this.createUser.bind(this))

        router.use(this.authMiddleware.isAuthenticated.bind(this.authMiddleware))
        router.use('/' , this.getUsers.bind(this))
        router.get('/:user', this.getUser.bind(this))
        
        
        
        
        router.use('/:user' ,  this.authMiddleware.isAuthorized.bind(this.authMiddleware))  
        router.route('/:user')
            .put(this.updateUser.bind(this))
            .delete(this.deleteUser.bind(this))

        app.use('/api/users' , router)
        
    }

    async getUser(req : Request , res : Response) {
            try {
                const user = (await this.userModel.find({
                    id : this.getUserID(req)
                }))[0]
                
               
                if(!user)
                    res.status(404).json({
                        message : 'User not found'
                    })

                res.status(200).json(user)

            } catch (error) {
                res.status(500).json({
                    message : 'Error to try get user'
                })
            }
    }

    async getUsers(req : Request , res : Response) {
        
        try {
            const users = await this.userModel.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({
                message : 'Error to try get users'
            })
        }
      
    }
    async createUser(req : Request , res : Response) {
        try {
            
            await this.userModel.create(req.body)
            res.status(201).json({
                message : 'User successfully created'
            })
        } catch (error) {
           
            res.status(500).json({
                message : 'Error to try create users'
            })
        }
      
    }

    async updateUser(req : Request , res : Response) {
        try {
            
            await this.userModel.update(req.body , {
                id : this.getUserID(req)
            })
            res.status(200).json({
                message : 'User successfully updated'
            })
        } catch (error) {
           
            res.status(500).json({
                message : 'Error to try updated users'
            })
        }
      
    }

    async deleteUser(req : Request , res : Response) {
        try {
           await this.userModel.delete({
                id : Number(req.params['user'])
            })
            

            res.status(200).json({
                message : 'User successfully deleted'
            })

        } catch (error) {
            res.status(500).json({
                message : 'Error to try delete user'
            })
        }
    }

}