import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import {usernameValidate} from '../helpers/validate'

export default function Username() {

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    /** Validating the input text field  */
    validate : usernameValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      console.log(values);
    }
  })

  return (
    <div className='container mx-auto'>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>Hello Again!</h4>
           <span className='py-4 text-l w-2/3 text-center text-gray-500'>Explore more by connecting with us.</span>
          </div>
          <form className='py-2' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={styles.profile_img} alt="avatar"/>
            </div>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username'/>
              <button className={styles.btn} type="submit">Let's Go</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Not a member <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

