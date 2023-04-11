import React, { useState } from 'react';

import styles from './App.module.css'

import { Todolist } from './Todolist';
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm';




type TodolistsType = Array<Todolist>

type Todolist = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'



export function App() {


    //STATE

    let todolistId_1 = v1()
    let todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistsType>(
        [
            { id: todolistId_1, title: "What to learn", filter: 'all' },
            { id: todolistId_2, title: "What to buy", filter: 'all' },

        ]
    )

    const [tasks, setTasks] = useState(
        {
            [todolistId_1]: [
                { id: v1(), title: 'HTML', isDone: true },
                { id: v1(), title: 'CSS', isDone: true },
                { id: v1(), title: 'JavaScript', isDone: false },
                { id: v1(), title: 'React', isDone: false },
                { id: v1(), title: 'Next JS', isDone: false },
            ],
            [todolistId_2]: [
                { id: v1(), title: 'Bread', isDone: true },
                { id: v1(), title: 'Milk', isDone: true },
                { id: v1(), title: 'Butter', isDone: false },
                { id: v1(), title: 'Tea', isDone: false },
                { id: v1(), title: 'Coockies', isDone: false },
            ],
        }
    )





    //end


    // Pure functions

    // delete todolist 

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))

        delete tasks[todolistId]

    }


    // delete task
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].filter(el =>
                el.id !== taskId
            )
        })
    }

    // change status    
    const checkBoxRedraw = (todolistId: string, taskId: string, status: boolean) => {

        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(el =>
                el.id === taskId ? { ...el, isDone: status } : el
            )
        })
    }

    //change task title

    const changeTaskTitle = (todolistId: string, taskId: string, text: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(el =>
                el.id === taskId ? { ...el, title: text } : el
            )
        })
    }

    // add new task
    const addNewTask = (todolistId: string, text: string) => {
        let newTask = { id: v1(), isDone: false, title: text };
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    // filtering task
    const filteringTask = (todolistId: string, buttonName: FilterValuesType) => {

        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: buttonName } : el

        ))

    }

    //add todolist

    const addTodolist = (text: string) => {
        let newId = v1()
        let newTodolist: Todolist = { id: newId, title: text, filter: 'all' }

        setTodolists( [...todolists, newTodolist] )

        setTasks( {...tasks, [newId]:[]})


    }

                                       //end functions

    return (

        <div className={styles.App}>

            <div className={styles.mainInput}>
                <AddItemForm

                    callback={(title) => addTodolist(title)}
                />
            </div>

            {todolists.length ? todolists.map(el => {


                let filteredTasks = tasks[el.id]

                if (el.filter === 'active') {
                    filteredTasks = tasks[el.id].filter(el => el.isDone === false)
                }

                if (el.filter === 'completed') {
                    filteredTasks = tasks[el.id].filter(el => el.isDone === true)
                }


                return <Todolist
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    filter={el.filter}
                    tasks={filteredTasks}

                    removeTask={removeTask}
                    checkBoxRedraw={checkBoxRedraw}
                    addNewTask={addNewTask}
                    filteringTask={filteringTask}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                
                />
            }) : <div style={{ fontSize: '35px' }}>No todolist</div>}



        </div>
    );
}



