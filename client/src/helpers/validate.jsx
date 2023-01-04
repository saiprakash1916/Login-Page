import toast from 'react-hot-toast';

/** validate login page username */

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

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

/** Validate login page Password */

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}
/** Validating the password */

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