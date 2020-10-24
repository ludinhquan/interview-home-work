
const authConfig = {
    secret: process.env.JWT_SECRET,
    tokenExpiryTime: 30000, // seconds => 5 minutes
}

export { authConfig }