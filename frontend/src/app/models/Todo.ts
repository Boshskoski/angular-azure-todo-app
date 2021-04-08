export interface Todo {
    id: string,
    title: string,
    completed: boolean
}

export interface TodoPost {
    title: string,
    completed: boolean
}

export interface TodoPostResponse {
    success: boolean,
    message: string
}