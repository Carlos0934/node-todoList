import { CRUDModel } from "../interfaces/db";
import {Todo} from '../dtos/todo'
import { MySQLConnection } from "./db";

export class TodoModel<Todo> implements CRUDModel<Todo> {


    constructor(private conn : MySQLConnection) {

    }

    async find(todo? : Partial<Todo>) {

        
        if (!todo) {
            return await this.conn.runQuery('SELECT * FROM todos WHERE ? ' , todo) as Todo[]
        }
        
        return await this.conn.runQuery('SELECT * FROM todos ') as Todo[]
    } 

    async create(todo : Todo) {
        await this.conn.runQuery('INSERT INTO todos SET ?' , todo)
    }

    async update(  todo : Todo , todoFilter : Partial<Todo>) {
       
        await this.conn.runQuery('UPDATE todos SET ? WHERE ? ' , todo , todoFilter)

        return (await this.find(todoFilter))[0]
        
    }

    async delete(todoFilter : Partial<Todo>) { 
        await this.conn.runQuery('DELETE todos  WHERE ? ' ,  todoFilter)
    }
}