import {v1} from 'uuid'
import {TasksStateType} from '../App';

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reduser'
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';


test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},

        ],
        [todolistId2]: [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ],
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, '1'))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].every(t => t.id !== '1')).toBeTruthy()
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
        ],
        [todolistId2]: [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ],
    }

    const endState = tasksReducer(startState, addTaskAC(todolistId1, 'TaskTitle'))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][3].id).toBeDefined()
    expect(endState[todolistId1][3].title).toBe('TaskTitle')
    expect(endState[todolistId1][3].isDone).toBe(false)
})

test('correct task should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTaskTitle = 'New Task'

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ],
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '2', newTaskTitle))

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
        ],
        [todolistId2]: [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: false},
        ],
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, '2', false))

    expect(endState[todolistId2][1].isDone).toBeTruthy()
    expect(endState[todolistId1][1].isDone).toBeFalsy()
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})




