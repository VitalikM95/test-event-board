import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Event } from '../types'
import { formatDate } from '../utils/formatData'

interface CardProps {
  event: Event
}

const Card: FC<CardProps> = ({ event }) => {
  return (
    <div className='flex flex-col w-60 h-48 border-2 border-slate-300 shadow-md rounded-lg px-4 py-2 mx-2'>
      <div className='flex justify-between'>
        <h3 className='text-lg'>{event.title}</h3>
        <span className='px-2 rounded-full h-fit bg-slate-200'>
          {event.users.length}
        </span>
      </div>
      <p className='text-sm text-slate-400 leading-4 flex-1 line-clamp-5'>
        {event.description}
      </p>
      <div className='flex  text-slate-500  text-sm italic justify-between my-1'>
        <span>Org:</span>
        <span>{event.organizer}</span>
      </div>
      <div className='flex bg-slate-200 rounded-md px-1 justify-between my-1'>
        <span>Date:</span>
        <span>{formatDate(event.eventDate)}</span>
      </div>
      <div className='flex text-lg justify-between text-blue-700'>
        <Link to={`/${event._id}/register`} className='button-underline'>
          Register
        </Link>
        <Link to={`/${event._id}/users`} className='button-underline'>
          View
        </Link>
      </div>
    </div>
  )
}

export default Card
