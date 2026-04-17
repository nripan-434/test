import UserModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const Register = async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Fill All Fields" })
    }
    const loweremail = email.toLowerCase()
    const exist = await UserModel.findOne({ email: loweremail })
    if (exist) {
        return res.status(409).json({ message: "email already registered" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)
    const user = await UserModel.create({
        name, email: loweremail, password: hashedpass
    })
    return res.status(201).json({ message: " Registered successfully" })

}


export const login = async (req, res) => {
    const { email, password } = req.body
   
    if (!email || !password) {
        return res.status(400).json({ message: "Fill all Fields" })
    }
    const exist = await UserModel.findOne({ email }).select('+password')
    if (!exist) {
        return res.status(400).json({ message: 'Invalid Credentials' })
    }
    const valid = await bcrypt.compare(password, exist.password)
    if (!valid) {
        return res.status(400).json({ message: 'Invalid Credentials' })
    }
    const token = jwt.sign({ id: exist._id, name: exist.name }, process.env.SECRET_KEY, { expiresIn: '7d' })
    // SECRET_KEY: secretkey
    const currentuser = {
        name: exist.name,
        id: exist._id,
        email: exist.email,
    }
    return res.status(200).json({ message: "Logged in successfully", token, currentuser })

}