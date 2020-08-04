import { CRUDModel } from "../interfaces/db";
import {Todo} from '../dtos/todo'
import { MySQLConnection } from "./db";

export class TodoModel implements CRUDModel<Todo> {


    constructor(private conn : MySQLConnection) {

    }

    async find(todo : Partial<Todo>) {

        
        if(todo.userId) {
            
            return await this.conn.runQuery('SELECT * FROM todos WHERE userId = ? ' , todo.userId) as Todo[]
            
        }
            return []
       
    } 

    async findOne(todo : Partial<Todo>) {
        if (todo.id && todo.userId) {
            return (await this.conn.runQuery('SELECT * FROM todos WHERE id = ? AND userId = ? ' , todo.id , todo.userId))[0] as Todo
        }
        
        
    }
    async create(todo : Todo) {
        await this.conn.runQuery('INSERT INTO todos SET ?' , todo)
    }

    async update(  todo : Todo , todoFilter : Partial<Todo>) {
       
        await this.conn.runQuery('UPDATE todos SET ? WHERE ? ' , todo , todoFilter)

        return (await this.find(todoFilter))[0]
        
    }

    async delete(todoFilter : Partial<Todo>) { 
        await this.conn.runQuery('DELETE FROM todos  WHERE id = ? ' ,  todoFilter.id)
    }
}