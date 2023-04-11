

import styles from './App.module.css'

import { AddItemForm } from './AddItemForm';

import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';


import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';



type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTask: (todolistId: string,taskId: string) => void
    checkBoxRedraw: (todolistId: string,taskId: string, status: boolean) => void
    addNewTask: (todolistId: string,text: string) => void
    filteringTask: (todolistId: string, buttonName: FilterValuesType)=>void
    removeTodolist: (todolistId: string)=>void
    changeTaskTitle: (todolistId: string, taskId: string, text: string)=>void
    
}

type TaskType = {
    isDone: boolean
    title: string
    id: string

}





export const Todolist = (props: TodoListPropsType) => {

    

    




    let renderedListItems = props.tasks.map(el => {



        const checkBoxHandler = (status: boolean) => {
            props.checkBoxRedraw(props.id,el.id, status) 
        } 

        const changeTaskTitleHandler = (text: string)=>{
            props.changeTaskTitle(props.id, el.id, text)
        }

        return (
            <li key={el.id} className={el.isDone === true?styles.completedTask:''}>
               {/*  <input
                    type="checkbox"
                    checked={el.isDone}
                    onChange={(e)=>checkBoxHandler(e.currentTarget.checked)}
                /> */}
<Checkbox 
style={{accentColor:"orange"}}
 checked={el.isDone}
 onChange={(e)=>{checkBoxHandler( e.currentTarget.checked)}}
/>

             


                <EditableSpan
                oldTitle={el.title}
                callback={changeTaskTitleHandler}
                />



                <span
                    onClick={() => props.removeTask(props.id,el.id)}
                    className={styles.del}>[x]</span>
            </li>
        )
    })



    return <div className={styles.todolist}>
        

       
            <h3>{props.title}</h3>
            <span
            onClick={()=>props.removeTodolist(props.id)}
            className={styles.delTodolist}>[x]</span>
           

           <AddItemForm
           callback={(title)=>props.addNewTask(props.id ,title)}
           
           />



            <ul>
                

                {renderedListItems.length?renderedListItems
                : <div>No tasks</div>    
            }

            </ul>

            <div>

                {/* <button
                    className={props.filter === 'all' ? styles.active : ''}
                    onClick={() => props.filteringTask(props.id, 'all')}>
                    All
                </button>

                <button
                    className={props.filter === 'active' ? styles.active : ''}
                    onClick={() =>props.filteringTask(props.id, 'active')}>
                    Active
                </button>

                <button
                    className={props.filter === 'completed' ? styles.active : ''}
                    onClick={() => props.filteringTask(props.id, 'completed')}>
                    Completed
                </button> */}


<Button
size="small"
 variant="contained"
 color={props.filter === 'all'? 'success': 'secondary'}
 onClick={()=> props.filteringTask(props.id, 'all')}
 >
  All
</Button>

<Button
size="small"
 variant="contained"
 color={props.filter === 'active'? 'success': 'secondary'}
 onClick={() =>props.filteringTask(props.id, 'active')}
 >
  Active
</Button>

<Button
size="small"
 variant="contained"
 color={props.filter === 'completed'? 'success': 'secondary'}
 onClick={() => props.filteringTask(props.id, 'completed')}
 >
  Completed
</Button>

            </div>
        </div>
    
};

