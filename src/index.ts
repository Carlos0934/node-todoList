import dotenv from 'dotenv'
import { APPServer } from './server'
import { MySQLConnection } from './models/db'
import { UserModel } from './models/user'
import { TodoModel } from './models/todo'
import { UserController } from './controllers/userController'
import { TodoController } from './controllers/todoController'
import express from 'express'
import { PasswordEncrypt } from './utils/encrypt'

function getMysqlConn() : MySQLConnection {
    const env = process.env
    const mysqlConn = new MySQLConnection(
        env.DB_HOST || '',
        env.DB_USER || '',
        env.DB_PASS || '',
        env.DB || '',

    )

    return mysqlConn
}

async function main() {
    dotenv.config()
   
    const mysqlConn = getMysqlConn()
    const chipher = new PasswordEncrypt()

    const userModel = new UserModel(mysqlConn , chipher)
    const todoModel = new TodoModel(mysqlConn)

    const app = new APPServer({
        port : process.env.PORT || 3000,
        apps : [
            new UserController(userModel),
            new TodoController(todoModel)
        ],
        middlewares : [
            {
                handler : express.json(),
            }
        ],
    })

    
    app.run()
}


main()