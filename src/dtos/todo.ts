
export interface Todo {
    id : number
    userId : number
    title : string
    description : string
    createdAt : string
    isCompleted : boolean

}

export interface TodoModify {
    todoId : number
    todo : Todo  
}