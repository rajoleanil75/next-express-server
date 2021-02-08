/*******************************************************************************
 * MIT License
 *
 * Copyright (c) 2021 Anil D Rajole
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
var Public = {};
const jwt = require('jsonwebtoken');
Public.authenticateUser = async function(req, res, next) {
    const { user_email, user_password } = req.body;

    if (user_email === "admin@gmail.com" && user_password === "password") {
        const payload = {
            email: user_email
        };
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '720h'
        });
        res
            .cookie('auth_token', token, {
                maxAge: 2592000000,
                httpOnly: true
            })
            .sendStatus(200);
    } else {
        res.status(401).json({
            error: 'Incorrect email or password'
        });
    }
};

module.exports = Public;