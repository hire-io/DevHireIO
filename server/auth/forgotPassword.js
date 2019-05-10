const router = require('express').Router()
const { User } = require('../db/models')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config()
module.exports = router

router.post('/', async (req, res, next) => {
    const user = await User.scope('withToken').findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        res.json({ error: "No User Found." })
    } else {
        const hash = crypto.randomBytes(20).toString('hex');
        user.update({
            resetPasswordToken: hash,
            resetPasswordExpires: Date.now() + 360000
        })

        const auth = {
            type: 'OAuth2',
            user: 'devhire.io@gmail.com',
            password: process.env.EMAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_MAIL_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_MAIL_ACCESS_TOKEN
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth
        })
        const mailOptions = {
            from: `${process.env.EMAIL_ADDRESS}`,
            to: req.body.email,
            subject: "Password Reset",
            text: `You are receiving this email because you or someone with this email adress requested a password reset for your account. If this is a valid request that you initiated, please click the following link to reset your password ${`http://localhost:8080/reset/${hash}`}\n\n

            If you did not request this reset, simply ignore this email, or contact us to address the issue.`
        }

        await transporter.sendMail(mailOptions, (err, resp) => {
            if (err) {
                console.error(err)
                res.json({ error: 'Error sending email.' })
            } else {
                res.json(resp)
            }
        })
    }

});

router.get('/:token', async (req, res, next) => {
    const { resetPasswordExpires } = await User.scope('withToken').findOne({ where: { resetPasswordToken: req.params.token } });
    if (!resetPasswordExpires || resetPasswordExpires <= Date.now()) {
        res.send({
            status: 400,
            message: 'Token is either invalid or has expired. Please try again.'
        })
    } else {
        res.send({
            status: 200,
            message: "Successfully identified and validated token."
        })
    }
});

router.put('/', async (req, res, next) => {
    const { password, token } = req.body;

    const user = await User.scope('withToken').findOne({
        where: {
            resetPasswordToken: token
        }
    });
    if (!user) {
        res.json({ error: "No User Found With That Token" })
    } else {
        /*eslint-disable no-lonely-if*/
        if (user.resetPasswordExpires <= Date.now()) {
            res.json({ error: "Your Token has expired. Please request another reset." })
        } else {
            user.update({
                password
            })
            res.json({ message: "Successfully updated password" })
        }
    }
})
