const express = require('express');
const { registration, login, resetPassword, forgotPassword } = require('../Controller/userController');
const { verifyToken } = require('../helper/JWTverify');
const userRoutes = express.Router();

userRoutes.post('/registration',registration)
userRoutes.post('/login',login)
userRoutes.post('/reset',resetPassword)
userRoutes.post('/forget',verifyToken,forgotPassword)

module.exports = {userRoutes}