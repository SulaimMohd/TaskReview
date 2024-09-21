import React from 'react'
import { FaStar } from 'react-icons/fa'
export default function Stars({count}) {
  let i = 1
  let stars = [];
  while(i <= 5){
    stars.push(
      <FaStar 
        className={i <= count? `text-orange-500 text-xl`:'text-gray-500 text-xl'}
      />
    )
    i++;
  }
  return (
    <div className='flex items-center '>
      {
        stars
      } 
      <span className='ml-2'>
      {
        ` (${count})`
      }
      </span>
    </div>
  )
}
