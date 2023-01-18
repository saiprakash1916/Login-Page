import toast from 'react-hot-toast';

/** validate login page username */

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}

/** Validate login page Password */

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}

/** Validate recover password */

export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    if(!values.password !== values.confirm_pwd){
        errors.exist = toast.error('Password not match...')
    }

    return errors;
}

/** Validate register form */

export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerfiy(errors, values);

    return errors;
}

/** validate Profile page */

export async function profilePagevalidation(values){
    const errors = emailVerfiy({}, values)

    return errors;
}

/** validate username */

function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Requried...')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...')
    }

    return error;
}

/** Validating password */

function passwordVerify(error = {}, values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        error.password = toast.error('Password requried...')
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid Password...')
    }else if(values.password.length < 8){
        error.password = toast.error('Password must be more than 8 char')
    }else if(!specialChars.test(values.password)){
        error.password = toast.error('Password must have Special charcters')
    }else{
        toast.success('Login Successfully...')
    }

    return error;
}

/** Validate Email */

function emailVerfiy(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email Id Requried...")
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email address...")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email address...")
    }

    return error;
}