import {v1} from 'uuid'
import {TasksStateType} from '../App';

import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasks-reduser'


test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: '5', title: "Book", isDone: false},
            {id: '6', title: "Milk", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, RemoveTaskAC(todolistId1, '1'))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].id).toBe('2')
})

test('correct task should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: '5', title: "Book", isDone: false},
            {id: '6', title: "Milk", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, AddTaskAC(todolistId1, 'TaskTitle'))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId1][4].title).toBe('TaskTitle')
})

test('correct task should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTaskTitle = 'New Task'

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: '5', title: "Book", isDone: false},
            {id: '6', title: "Milk", isDone: true},
        ],
    }


    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId1, '2', newTaskTitle))

    expect(endState[todolistId2][1].title).toBe('Milk')
    expect(endState[todolistId1][1].title).toBe(newTaskTitle)
})

test('correct isDone of task should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: '5', title: "Book", isDone: false},
            {id: '6', title: "Milk", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, ChangeTaskStatusAC(todolistId1, '2', false))

    expect(endState[todolistId2][1].isDone).toBe(true)
    expect(endState[todolistId1][1].isDone).toBe(false)
})




