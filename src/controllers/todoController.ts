import { APPRouter } from "../interfaces/server";
import { Application, Router } from "express";
import { TodoModel } from "../models/todo";
import {Request, Response} from 'express'

export class TodoController implements APPRouter {

    constructor (private todoModel : TodoModel  ) {
        
    }
    setup(app : Application) {
        
        const router = Router()

        router.route('/')
            .get(this.getTodo.bind(this))
            .post(this.createTodo.bind(this))
            
            
        router.route('/:todo')
            .get(this.getTodo.bind(this))
            .put(this.updateTodo.bind(this))
            .delete(this.deleteTodo.bind(this))

        app.use( '/api/todos' , router)
    }

    
    getAllTodos(req : Request , res : Response) {
        
    }

    getTodo(req : Request , res : Response) {

    }
    createTodo(req : Request , res : Response) {

    }

    updateTodo(req : Request , res : Response) {

    }

    deleteTodo(req : Request , res : Response) {

    }

}