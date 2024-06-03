

// DRAWER.JS

'use client'
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { entrySchema } from "./yup";
import FormDialog from "./dialog";

export default function TemporaryDrawer({
    handleAdding,
    handleEditing,
    editUser,
    setEditUser,
    open,
    setOpen
}) {

    // FORMIK
    const initialValues = {
        name: editUser ? editUser.name : "",
        username: editUser ? editUser.username : "",
        email: editUser ? editUser.email : "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema: entrySchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (editUser) {
                handleEditing(editUser.id, values);
            } else {
                handleAdding(values);
            }
            setOpen(false);
        },
    });

    const handleFormDialogSubmit = () => {
        formik.handleSubmit();
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <StyledTextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="name"
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="form-error">{formik.errors.name}</p>
                )}
                <StyledTextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="username"
                />
                {formik.touched.username && formik.errors.username && (
                    <p className="form-error">{formik.errors.username}</p>
                )}
                <StyledTextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    name="email"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="form-error">{formik.errors.email}</p>
                )}
                <FormDialog handleAdding={handleFormDialogSubmit} />
            </Box>
        </Box>
    );

    return (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            {DrawerList}
        </Drawer>
    );
}

const StyledTextField = styled(TextField)({
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
    },
    "& input[type=number]": {
        "-moz-appearance": "textfield",
    },
});
