import nodemailer from "nodemailer";


export const generatePassword = (length = 8) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset[Math.floor(Math.random() * n)];
    }
    return retVal;
}

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "cyberfork2000@gmail.com",
        pass: "anqc jzjp oklb uint",
    },
});