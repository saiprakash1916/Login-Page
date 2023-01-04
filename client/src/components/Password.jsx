import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import {passwordValidate} from '../helpers/validate'

export default function Password() {

  const formik = useFormik({
    initialValues : {
      password : ''
    },
    /** Validating the input text field  */
    validate : passwordValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      console.log(values);
    }
  })

  return (
    <div className='container mx-auto'>
    <Toaster position='top-right' reverseOrder={false}></Toaster>
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
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password'/>
              <button className={styles.btn} type="submit">Login</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Forget Password? <Link className='text-red-500' to="/recovery">Recovery now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

