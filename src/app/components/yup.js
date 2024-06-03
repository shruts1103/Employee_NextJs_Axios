'use client'
import * as Yup from "yup";

export const entrySchema = Yup.object({
    name: Yup.string()
        .min(2)
        .max(25)
        .required("Please enter your name"),
    username: Yup.string().min(2).max(25).required("Please enter your username"),
    email: Yup.string().email().required("Please enter your email"),
});
