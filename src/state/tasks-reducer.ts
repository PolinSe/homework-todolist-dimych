import {TasksType} from '../ToDoList';
import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | AddTodolistActionType
    | RemoveTodolistActionType

export type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    id: string
}
export type AddTaskACType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}
export type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    id: string,
    title: string
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    id: string,
    isDone: boolean
}
let todolistId1 = v1()
let todolistId2 = v1()
const initialState: TasksStateType = {
        // [todolistId1]: [
        //     {id: v1(), title: "HTML&CSS", isDone: true},
        //     {id: v1(), title: "JS", isDone: true},
        //     {id: v1(), title: "ReactJS", isDone: false},
        //     {id: v1(), title: "Redux", isDone: false},
        // ],
        // [todolistId2]: [
        //     {id: v1(), title: "Book", isDone: false},
        //     {id: v1(), title: "Milk", isDone: true},
        // ],
    }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.id)}
        }
        case 'ADD-TASK': {
            const newTask: TasksType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [...state[action.todolistId], newTask]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {
                    ...el,
                    title: action.title
                } : el)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskACType => {
    return {
        type: 'REMOVE-TASK' as const,
        todolistId: todolistId,
        id: id
    }
}
export const addTaskAC = (todolistId: string, title: string): AddTaskACType => {
    return {
        type: 'ADD-TASK' as const,
        todolistId: todolistId,
        title: title
    }
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleACType => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        todolistId: todolistId,
        id: id,
        title: title
    }
}
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        todolistId: todolistId,
        id: id,
        isDone: isDone
    }
}




