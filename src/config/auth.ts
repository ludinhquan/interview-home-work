
const authConfig = {
    secret: process.env.JWT_SECRET,
    tokenExpiryTime: 300, // seconds => 5 minutes
}

export { authConfig }