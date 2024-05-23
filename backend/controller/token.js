const jwt = require("jsonwebtoken")

const create_token = (user) => {
    token = jwt.sign(
        {
            role: user.role
        },
        "secret-key",
        {
            expiresIn: "1h"
        }
    )

    return token
}

const role = (token) => {
    return jwt.verify(token, "secret-key").role

}

module.exports = {
    create_token, 
    role
}