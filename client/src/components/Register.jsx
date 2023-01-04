import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import {registerValidation} from '../helpers/validate'
import covertToBase64 from '../helpers/convert'

export default function Register() {

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues : {
      email : '',
      username: '',
      password : ''
    },
    /** Validating the input text field  */
    validate : registerValidation,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      values = await Object.assign(values, {profile : file || ''})
      console.log(values);
    }
  })

  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async e =>{
    const base64 = await covertToBase64(e.target.files[0]);
    setFile(base64);
  }
  return (
    <div className='container mx-auto'>
    <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{width:"35%", paddingTop:'1em'}}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>Register</h4>
           <span className='py-2 text-l w-2/3 text-center text-gray-500'>Happy to join you!</span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
              <label htmlFor='profile'>
                  <img src={file || avatar} className={styles.profile_img} alt="avatar"/>
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile'/>
            </div>
            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*'/>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='UserName*'/>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password*'/>
              <button className={styles.btn} type="submit">Register</button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

