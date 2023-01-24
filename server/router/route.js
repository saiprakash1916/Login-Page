import { Router } from "express";
const router = Router();

/** Import all controllers */
import * as controller from '../controllers/appController.js'
import AUTH, {localVariables} from '../middleware/auth.js'
import {registerMail} from '../controllers/mailer.js'

/** POST Method */

router.route('/register').post(controller.register);  //    Register User
router.route('/registerMail').post(registerMail);  //   Send the mail
router.route('/authenticate').post(controller.verifyUser, (req,res) => res.end());   //  Authenticate user
router.route('/login').post(controller.verifyUser, controller.login);   //  Login App

/** GET Method */

router.route('/user/:username').get(controller.getUser);  //  User with Username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);     //  Generate Random OTP
router.route('/verifyOTP').get(controller.verifyOTP);       //  Verify Generated OTP
router.route('/createResetSessions').get(controller.createResetSession);     //  Reset all the variables

/** PUT Method */

router.route('/updateuser').put(AUTH, controller.updateUser);  //  Is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);   //  Use to reset password


export default router;