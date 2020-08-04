
export interface Todo {
    id : number
    userId : number
    title : string
    description : string
    createdAt : string
    isComplete : boolean

}

export interface TodoModify {
    todoId : number
    todo : Todo  
}