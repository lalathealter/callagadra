import './TodoForm.scss'
import './TodoMenu.scss'
import React, { useRef, useState } from 'react'
import createTodoObject from '../funcs/createTodoObject'
import convertMinutesToTimeString from '../funcs/convertMinutesToTimeString'
import Nouislider from 'nouislider-react'
import "nouislider/distribute/nouislider.css";
import formatTimeInterval from '../funcs/formatTimeInterval';
import { useDispatch } from 'react-redux';
import convertTimeStringToMinutes from '../funcs/convertTimeStringToMinutes';
import useTodo from '../funcs/redux-logic/useTodo';


export default function TodoWriteMenu({ idToEdit, closeModal }) {
  
  const MIN_TIME = 0  
  const MAX_TIME = 24*60 // in minutes
  
  const todoToEdit = useTodo(idToEdit)
  const isInChangeMode = todoToEdit ? true : false
  const DEFAULT_START_TIME = isInChangeMode ? convertTimeStringToMinutes(todoToEdit.startTime) : MIN_TIME
  const DEFAULT_END_TIME = isInChangeMode ? convertTimeStringToMinutes(todoToEdit.endTime) : MAX_TIME
  const DEFAULT_TEXT = isInChangeMode ? todoToEdit.text : null

  const [start, setStart] = useState(DEFAULT_START_TIME)
  const [end, setEnd] = useState(DEFAULT_END_TIME)
  const text = useRef(DEFAULT_TEXT)

  const dispatch = useDispatch()
  const handleTodoSubmit = (event) => { 
    if(isInChangeMode) {
      const editedTodo = createTodoObject(start, end, text.current.value, idToEdit)
      dispatch({type: 'CHANGE', payload: [editedTodo]})
    } else {
      const todo = createTodoObject(start, end, text.current.value)
      dispatch({ type: 'CREATE', payload: [todo]})
    }

    event.preventDefault()
    closeModal(event) // taken from ModalOpener
  }

  const handleTimeSlide = (render, handle, value) => {
    setStart(value[0].toFixed())
    setEnd(value[1].toFixed())
  }
  
  return (
    <div className="menu">
      <div className="menu__top-label">
        {isInChangeMode ? 
        <h3>Event <span className='menu__highlight'>#{idToEdit}</span></h3>
        : <h3>New event</h3>}
      </div>
      
      <div className="menu__main-content">
        <form 
          onSubmit={handleTodoSubmit}
          className='todo-form'
        >
          <label className='todo-form__slider-label'>
            {formatTimeInterval( 
              convertMinutesToTimeString(start),
              convertMinutesToTimeString(end)
            )}
            <Nouislider 
              range={{ min: MIN_TIME, max: MAX_TIME }} 
              start={[ DEFAULT_START_TIME, DEFAULT_END_TIME]} 
              step={5}
              className="todo-form__slider"
              onSlide={handleTimeSlide}
              behaviour="drag"
              tabIndex={1}
              connect
              />
          </label>
        
          <textarea 
            ref={text}
            defaultValue={DEFAULT_TEXT}
            name="todoText" 
            className='todo-form__text-field'
            placeholder={"Describe your event"}
            spellCheck="false"
            minLength={3}
            cols="30" 
            rows="10"
            tabIndex={1}
            required />

          <button
            tabIndex={2} 
            type="submit"
            className={"todo-form__submit-btn"}
            >
            {isInChangeMode ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}
