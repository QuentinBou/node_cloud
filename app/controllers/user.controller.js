const { User } = require('../models/index')
require('dotenv').config('../config/.env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    const newUser = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    const createdUser = await User.create(newUser)

    if (!createdUser) {
        return res.status(400).json({ message: "User can not be created" })
    } else {
        await createdUser.save()
        return res.status(201).json(createdUser)
    }
};

exports.login = async (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    const user = await User.findOne({ where: { email: userEmail } })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    } else {
        const passwordIsValid = bcrypt.compareSync(userPassword, user.password)
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password" })
        } else {
            const userDatas = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
            const userJwt = jwt.sign(userDatas, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
            return res.status(200).json({...userDatas, token: userJwt})
        }
    }
};