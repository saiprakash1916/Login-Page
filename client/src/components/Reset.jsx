import React from 'react'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import {resetPasswordValidation} from '../helpers/validate'

export default function Reset() {

  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pwd : ''
    },
    /** Validating the reset password field  */
    validate : resetPasswordValidation,
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
        <div className={styles.glass} style={{width:"50%"}}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>Reset</h4>
           <span className='py-4 text-l w-2/3 text-center text-gray-500'>Enter new Password.</span>
          </div>
          <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password'/>
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Re-Enter Password'/>
              <button className={styles.btn} type="submit">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

