import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mainApi } from '../redux/main.api'
import { UsersByEvent } from '../types'

const Users = () => {
  const { eventId } = useParams()
  const [query, setQuery] = useState('')
  const [usersData, setUsersData] = useState<UsersByEvent>()
  const { data, isLoading } = mainApi.useGetUsersByEventQuery(eventId || '')
  const { data: searchedUsers } = mainApi.useSearchUsersByEventQuery(
    eventId ? { eventId, query } : { eventId: '' }
  )
  useEffect(() => {
    setUsersData(data)
    setUsersData(searchedUsers)
  }, [data, searchedUsers])

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-3xl my-4'>
              "{usersData?.title}" participants
            </h1>
            <input
              placeholder='Search user'
              value={query}
              onChange={handleFullNameChange}
              className='bg-slate-200 rounded-md border border-slate-500 px-2'
              type='text'
            />
          </div>
          <div className='flex flex-1 flex-wrap gap-4 mb-3'>
            {usersData?.users.map(user => (
              <div
                key={user._id}
                className='flex flex-col w-60 h-20 border-2 border-slate-300 shadow-md rounded-lg px-4 mx-2 py-2'
              >
                <h3 className='text-lg line-clamp-1'>{user.name}</h3>
                <div className='text-sm line-clamp-1'>{user.email}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Users
