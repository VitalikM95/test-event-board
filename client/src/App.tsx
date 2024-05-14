import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Users from './pages/Users'

export default function App() {
  return (
    <div className='mx-20 px-2'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:eventId/register' element={<Register />} />
        <Route path='/:eventId/users' element={<Users />} />
      </Routes>
    </div>
  )
}
