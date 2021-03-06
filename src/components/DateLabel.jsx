
import React from 'react'
import formatZeros from '../funcs/formatZeros'


export default function DateLabel({ selectedDate }) {
  return (
      <h4>
      {selectedDate ? 
      (selectedDate
        .split("_")
        .map((el) => formatZeros(el)) // just formatting the date for it to have zeros
        .reverse() // originally it's YYYY.MM.DD, which is more convinient for storing the data (looks more organized). 
        .join("."))
      : "DD.MM.YYYY"}
      </h4>
  )
}
