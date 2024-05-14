import { useState } from 'react'
import Card from '../components/Card'
import { mainApi } from '../redux/main.api'

const Home = () => {
  const [queryParams, setQueryParams] = useState({
    sortBy: '',
    limit: '15',
    skip: '0',
  })

  const { data: events, isLoading } = mainApi.useGetEventsQuery({
    sortOrder: 'asc',
    sortBy: queryParams.sortBy,
    limit: queryParams.limit,
    skip: queryParams.skip,
  })

  const handlePrevPage = () => {
    if (queryParams.skip != '0') {
      setQueryParams(prevParams => ({
        ...prevParams,
        skip: String(Number(prevParams.skip) - 15),
      }))
    }
  }

  const handleNextPage = () => {
    if (events && events?.length == 15) {
      setQueryParams(prevParams => ({
        ...prevParams,
        skip: String(Number(prevParams.skip) + 15),
      }))
    }
  }

  const sortOptions = [
    { value: '', label: 'Sort by' },
    { value: 'title', label: 'Title' },
    { value: 'eventDate', label: 'Event Date' },
    { value: 'organizer', label: 'Organizer' },
  ]

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-3xl my-4'>Events</h1>
        <select
          className='border-2 border-slate-300 rounded-lg p-2 h-fit'
          onChange={e => {
            setQueryParams({ sortBy: e.target.value, limit: '15', skip: '0' })
          }}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className='flex flex-1 flex-wrap gap-4 mb-3'>
          {events?.map(item => (
            <Card key={item._id} event={item} />
          ))}
        </div>
      )}
      <div className='flex justify-between uppercase pb-3'>
        <div
          onClick={handlePrevPage}
          className={`flex ${
            queryParams.skip != '0' ? 'button-active' : 'button-disabled'
          }`}
        >
          <svg
            className='w-6 h-6 text-slate-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m15 19-7-7 7-7'
            />
          </svg>
          <span> Prev </span>
        </div>
        <div
          onClick={handleNextPage}
          className={`flex ${
            events && events?.length == 15 ? 'button-active' : 'button-disabled'
          }`}
        >
          <span> Next </span>
          <svg
            className='w-6 h-6 text-slate-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m9 5 7 7-7 7'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Home
