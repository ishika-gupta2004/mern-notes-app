const jwt = require("jsonwebtoken")

const authMiddleWare = (req, resp, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return resp.status(401).json({ message: "No token" })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.id;

        next()

    } catch (err) {

        resp.status(401).json({ message: "Invalid token" })

    }

}

module.exports = authMiddleWare