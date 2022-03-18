import React, { useEffect, useState } from 'react'
import prebuildMonthViewModel from '../funcs/prebuildMonthViewModel'
import loadTodoData from "../funcs/loadTodoData"
import TodoTile from './TodoTile'



export default function CalendarGrid({ selectedMonth }) {
  const [monthView, setMonthView] = useState([])


  const handleStorageUpdate = () => {
    setMonthView(loadTodoData(monthView))
  }

  const handleMonthUpdate = () => {
    setMonthView(loadTodoData(prebuildMonthViewModel(selectedMonth)))
  }

  useEffect(handleMonthUpdate, [selectedMonth])
  
  useEffect(() => {   
    document.addEventListener("localStorageUpdated", handleStorageUpdate) // recieved from <= saveTodoData.js
    return () => {
      document.removeEventListener("localStorageUpdated", handleStorageUpdate) // recieved from <= saveTodoData.js
    }
  })
  

  return (
    <div
      tabIndex={0} 
      className='calendarGrid'>
      {
      monthView.map((el) => {
        return (<TodoTile 
          key={`${el.year}_${el.month}_${el.day}`} 
          year={el.year}
          month={el.month}
          day={el.day}
          content={el.content}
          
          />)
      })
      }
    </div>
  );
}
