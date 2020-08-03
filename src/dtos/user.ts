
import { Todo, TodoModify } from "./todo";



export interface UserView {
    
    username : string
    todos : Todo[]
}

export interface UserRegister {
    username : string
    email : string
    password : string
}

export interface UserLogin {
    username : string
    password : string
}


export interface UserModifyTodo extends TodoModify {
    id : number
    
}

export interface User {
    id : number
    username : string
    email : string
    password : string

}