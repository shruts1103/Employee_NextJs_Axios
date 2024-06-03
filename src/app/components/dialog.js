



import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ handleAdding }) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputValue('');
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim().toLowerCase() === 'confirmation') {
            handleAdding();
            setOpen(false);
            setInputValue('');
            setError(false);
        } else {
            event.stopPropagation();
            event.preventDefault();
            setError(true);
        }
    };



    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setError(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Submit Details
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Enter the word confirmation to confirm posting the details:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="confirmation"
                            name="confirmation"
                            fullWidth
                            variant="standard"
                            value={inputValue}
                            onChange={handleInputChange}
                            error={error}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Confirm</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
