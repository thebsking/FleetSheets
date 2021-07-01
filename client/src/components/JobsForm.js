import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    OutlinedInput,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Typography,
    TextField,
    Button,
    InputAdornment
} from '@material-ui/core';

import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    input: {
        width: '60vw',
        margin: theme.spacing(1, 2, 1, 0),
        [theme.breakpoints.up('md')]: {
            width: '40vw'
        },
        [theme.breakpoints.up('lg')]: {
            width: '20vw'
        }
    },
    TextField: {
        width: '60vw',
        margin: theme.spacing(1, 2, 1, 0)
    },
    button: {
        margin: theme.spacing(2),
        width: '7rem'
    },
    container: {
        margin: theme.spacing(2)
    },
    break: {
        flexBasis: '100%',
        height: 0
    }
}));

/// *** NOTES: ***
/// - auto increment job number
/// - jobs form is same form for create job, edit job, and job details
///     *use props to set different states for different editing accessiblity
///     * admin create job + edit
///     * employee - edit in job details: notes, job desc, action taken
///         * maybe ability to send request for job to be edited


export default function JobsForm(props) {
    const classes = useStyles();

    const [formObject, setFormObject] = useState({})

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.APIFunction({
            client: {
                type: formObject.type,
                name: formObject.name,
                location: formObject.address,
                contact: formObject.contact,
                phone: formObject.phone,
                email: formObject.email,
            },

            quote_date: formObject.quote,
            quote_price: formObject.price,
            start_date: formObject.start,
            end_date: formObject.end,

            description: formObject.work,
            notes: formObject.notes
        })
            .then((res) => console.log(res))
            // .then(<Redirect to="/admin"></Redirect>)
            .catch((err) => console.log(err))
    }

    return (
        <div className={classes.root}>
            <form className='form-flex' name="job-details">

                {/* <FormControl disabled>
                    <InputLabel htmlFor="jobNumber">Job Number</InputLabel>
                    <OutlinedInput id="jobNumber" name="job_number" className={classes.input} variant="outlined" placeholder={jobNumber} />
                </FormControl> */}
                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.formControl} htmlFor="clientName"> Client Name</InputLabel>
                    <OutlinedInput
                        id="clientName"
                        name="name"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="outlined"
                        label="Client Name"
                        className='form-input-positioning'

                    />
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="clientType">Client Type</InputLabel>
                    <Select
                        labelId="clientType"
                        id="clientType"
                        name="type"
                        onChange={handleInputChange}
                        label="Client Type"
                        className='form-input-positioning'
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Residential"}>Residential</MenuItem>
                        <MenuItem value={"Commercial"}>Commercial</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.break} />

                <FormControl>
                    <TextField variant="outlined"
                        id="quoteDate"
                        name="quote"
                        onChange={handleInputChange}
                        label="Quote Date"
                        type="date"
                        defaultValue={new Date}
                        className={classes.textField, classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="quotePrice">Quote Price</InputLabel>
                    <OutlinedInput
                        id="quotePrice"
                        name="price"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="outlined"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Quote Price" />
                </FormControl>

                <div className={classes.break} />

                <FormControl>
                    <TextField variant="outlined"
                        id="startDate"
                        name="start"
                        onChange={handleInputChange}
                        label="Job Start"
                        type="datetime-local"
                        defaultValue={new Date}
                        className={classes.textField, classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                <FormControl>
                    <TextField variant="outlined"
                        id="endDate"
                        name="end"
                        onChange={handleInputChange}
                        label="Job End"
                        type="datetime-local"
                        defaultValue={new Date}
                        className={classes.textField, classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                <div className={classes.break} />

                <Typography variant="body1">Contact Information:</Typography>

                <FormControl>
                    <InputLabel htmlFor="contactName">Point of Contact</InputLabel>
                    <OutlinedInput
                        id="contactName"
                        name="contact"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="outlined"
                        label="Point of Contact" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="contactPhone">Contact Phone</InputLabel>
                    <OutlinedInput
                        id="contactPhone"
                        name="phone"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="outlined"
                        label="Contact Phone" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="contactEmail">Contact Email</InputLabel>
                    <OutlinedInput
                        id="contactEmail"
                        name="email"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="outlined"
                        label="Contact Email" />
                </FormControl>

                <div className={classes.break} />

                <Typography variant="body1">Job Location:</Typography>

                <FormControl>
                    <TextField
                        id="jobLocation"
                        name="address"
                        onChange={handleInputChange}
                        className={classes.TextField}
                        placeholder="123 Lawncare Lane, Greenville, OH 45331"
                        variant="outlined"
                    />
                </FormControl>

                <div className={classes.break} />

                <Typography variant="body1">Scope of Work:</Typography>

                <FormControl>
                    <TextField
                        id="workDescription"
                        name="work"
                        onChange={handleInputChange}
                        className={classes.TextField}
                        multiline
                        rows={4}
                        placeholder="Describe Approved Work"
                        variant="outlined"
                    />
                </FormControl>

                <div className={classes.break} />

                <Typography variant="body1">Notes:</Typography>

                <FormControl>
                    <TextField
                        id="notes"
                        name="notes"
                        onChange={handleInputChange}
                        className={classes.TextField}
                        multiline
                        rows={4}
                        placeholder="Directions, special considerations, etc."
                        variant="outlined"
                    />
                </FormControl>

                <div className={classes.break} />

                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
