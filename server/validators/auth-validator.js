const { z } = require("zod");

//creating object schema
const signupSchema = z.object({
    username: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "name must contain atleast 3 characters" })
        .max(120, { message: "name must not contain more than 120 characters" }),
    email: z.string({ required_error: "email is required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "email must contain atleast 3 characters" })
        .max(120, { message: "email must not contain more than 120 characters" }),
    password: z.string({ required_error: "password is required" })
        .min(7, { message: "password must contain atleast 3 characters" })
        .max(1024, { message: "password must not contain more than 120 characters" }),
});
const loginSchema = z.object({
    email: z.string({ required_error: "email is required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "email must contain atleast 3 characters" })
        .max(120, { message: "email must not contain more than 120 characters" }),
    password: z.string({ required_error: "password is required" })
        .min(7, { message: "password must contain atleast 3 characters" })
        .max(1024, { message: "password must not contain more than 120 characters" }),
});
const contactSchema=z.object({
     username: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "name must contain atleast 3 characters" })
        .max(120, { message: "name must not contain more than 120 characters" }),
        email: z.string({ required_error: "email is required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "email must contain atleast 3 characters" })
        .max(120, { message: "email must not contain more than 120 characters" }),
        message:z.string({required_error:"You need to fill this message box"})
        .min(4,{message:"enter more than 4 characters"}),

})


module.exports = { signupSchema, loginSchema,contactSchema };
