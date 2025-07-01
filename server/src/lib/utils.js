import jwt from 'jsonwebtoken';

export const generateToken = (userId, response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    const isDev = process.env.NODE_ENV === "development";
    response.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isDev ? "Lax" : "None", 
        secure: !isDev, 
    }) 

    return token;
};