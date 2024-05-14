import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { mainApi } from '../redux/main.api'
import { RegisterUser } from '../types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Register = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [registerUser] = mainApi.useRegisterUserMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterUser>()

  const onSubmit: SubmitHandler<RegisterUser> = data => {
    const date = new Date(data.birthDate)
    if (eventId) {
      registerUser({ ...data, eventId, birthDate: date.toISOString() })
      navigate('/')
    }
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='font-semibold text-3xl my-4'>Event Registration</h1>
      <form
        className='border-2 border-slate-400 rounded-md p-5 w-[550px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex justify-between mb-2'>
          <label className='text-lg'>Full Name:</label>
          <Controller
            name='name'
            control={control}
            rules={{ required: true, maxLength: 30 }}
            render={({ field }) => (
              <input
                placeholder='Enter full name'
                className='bg-slate-200 rounded-md border border-slate-500 px-2'
                {...field}
              />
            )}
          />
          {errors.name && errors.name.type === 'required' && (
            <span className='text-red-600'>This field is required</span>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <span className='text-red-600'>Max length exceeded</span>
          )}
        </div>
        <div className='flex justify-between mb-2'>
          <label className='text-lg'>Email:</label>
          <Controller
            name='email'
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <input
                placeholder='Enter email'
                className='bg-slate-200 rounded-md border border-slate-500 px-2'
                {...field}
              />
            )}
          />
          {errors.email && errors.email.type === 'required' && (
            <span className='text-red-600'>This field is required</span>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <span className='text-red-600'>Invalid email address</span>
          )}
        </div>
        <div className='flex justify-between mb-2'>
          <label className='text-lg'>Date of Birth:</label>
          <Controller
            name='birthDate'
            control={control}
            render={({ field }) => (
              <DatePicker
                className='bg-slate-200 rounded-md px-2 border border-slate-300 cursor-pointer hover:shadow-md'
                {...field}
                selected={field.value ? new Date(field.value) : null}
              />
            )}
          />
        </div>
        <div className='mb-3'>
          <label className='text-lg'>
            Where did you hear about this event?
          </label>
          <Controller
            name='whereHeard'
            control={control}
            render={({ field }) => (
              <div className='flex justify-between'>
                <div>
                  <input
                    defaultChecked
                    className='cursor-pointer mr-1'
                    type='radio'
                    {...field}
                    value='Social Media'
                  />
                  <label>Social Media</label>
                </div>
                <div>
                  <input
                    className='cursor-pointer mr-1'
                    type='radio'
                    {...field}
                    value='Friends'
                  />
                  <label>Friends</label>
                </div>
                <div>
                  <input
                    className='cursor-pointer mr-1'
                    type='radio'
                    {...field}
                    value='Found Myself'
                  />
                  <label>Found Myself</label>
                </div>
              </div>
            )}
          />
        </div>
        <button
          className='w-full h-10 bg-slate-200 rounded-md border-2 border-slate-300 hover:shadow-md'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
