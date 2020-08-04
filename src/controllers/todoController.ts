import { APPRouter } from "../interfaces/server";
import { Application, Router } from "express";
import { TodoModel } from "../models/todo";
import {Request, Response} from 'express'
import { User } from "../dtos/user";
import { GetterRequestID , RequestIDFunction } from "../utils/http";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export class TodoController implements APPRouter {

    private getUserID  : RequestIDFunction
    private getTodoID : RequestIDFunction
    constructor (private todoModel : TodoModel , private auth : AuthMiddleware  ) {
        this.getUserID = GetterRequestID('user')
        this.getTodoID = GetterRequestID('todo')

    }
    setup(app : Application) {
        
        const router = Router()
        // this path not is defined in app.use() because the handler not would get user id  
        router.use('/:user/todos',this.auth.isAuthorized.bind(this.auth))
        
        router.route('/:user/todos')
            .get(this.getAllTodos.bind(this))
            .post(this.createTodo.bind(this))
            
            
        router.route('/:user/todos/:todo')
            .get(this.getTodo.bind(this))
            .put(this.updateTodo.bind(this))
            .delete(this.deleteTodo.bind(this))

        app.use( '/api/users' , router)
    }

    
    
  

    async getAllTodos(req : Request , res : Response) {
        try {
            
            const userId = this.getUserID(req)
            
            const todos =  await this.todoModel.find({
                userId
            })
           
            res.status(200).json(todos)
        } catch (error) {
            
            res.status(500).json({
                message : 'Error to try get todos'
            })
        }
    }

    async getTodo(req : Request , res : Response) {
        try {
            const todoId = this.getTodoID(req)
            const userId = this.getUserID(req)
            const todo = await this.todoModel.findOne({
                id : todoId,
                userId : userId 
            })

            if(todo) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({})
            }
           
        } catch (error) {
            
            res.status(500).json({
                message : 'Error to try get todo'
            })
        }
    }
    
    async createTodo(req : Request , res : Response) {
        try {
            const userId = this.getUserID(req)
            await this.todoModel.create({
                ...req.body,
                userId : userId

            })
            res.status(201).json({
                message : 'Todo successfully created'
            })
        } catch (error) {
            res.status(500).json({
                message : 'Error to try get todo'
            })
        }
    }

    async updateTodo(req : Request , res : Response) {
        try {
            await this.todoModel.update(req.body , {
                id : this.getTodoID(req)
            })
            
            res.status(200).json({
                message : 'Todo successfully updated'
            })

        } catch (error) {
            res.status(500).json({
                message : 'Error to try updated todo'
            })
        }
    }

    async deleteTodo(req : Request , res : Response) {
        try {
            await this.todoModel.delete({
                id : this.getTodoID(req),
            })
            res.status(200).json({
                message : 'Todo successfully deleted'
            })
        } catch (error) {
            res.status(500).json({
                message : 'Error to try delete todo'
            })
        }
    }

}