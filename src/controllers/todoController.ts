import { APPRouter } from "../interfaces/server";
import { Application, Router } from "express";
import { TodoModel } from "../models/todo";
import {Request, Response} from 'express'

export class TodoController implements APPRouter {

    constructor (private todoModel : TodoModel  ) {
        
    }
    setup(app : Application) {
        
        const router = Router()

        router.use()
        
        router.route('/api/todos')
            .post(this.createTodo)
            
        router.route('/api/todos/:todo')
            .put(this.updateTodo)
            .delete(this.deleteTodo)

        app.use(router)
    }

  
    createTodo(req : Request , res : Response) {

    }

    updateTodo(req : Request , res : Response) {

    }

    deleteTodo(req : Request , res : Response) {

    }

}