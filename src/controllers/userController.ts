import { APPRouter } from "../interfaces/server";
import { Application } from "express";
import { UserModel } from "../models/user";
import {Request, Response} from 'express'

export class UserController implements APPRouter {

    constructor (private userModel : UserModel  ) {
        
    }
    setup(app : Application) {
        
        app.route('/api/users')
            .get(this.getUsers)
            .post(this.createUser)
            
        app.route('/api/users/:user')
            .get(this.getUser)
            .put(this.updateUser)
            .delete(this.deleteUser)   
    }

    getUser(req : Request , res : Response) {
       
    }

    getUsers(req : Request , res : Response) {

    }
    createUser(req : Request , res : Response) {

    }

    updateUser(req : Request , res : Response) {

    }

    deleteUser(req : Request , res : Response) {

    }

}