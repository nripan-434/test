import express from 'express'
import { login ,Register} from '../controllers/authController.js'

const Router =express.Router()

Router.post('/login',login)
Router.post('/register',Register)
export default Router