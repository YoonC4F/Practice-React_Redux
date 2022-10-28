import { Button, FormControl, FormControlLabel, InputLabel, List, ListItemButton, ListItemText, ListSubheader, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { addContact } from "../../redux/slices/contactSlice";
import './Contact.css';

const Contact = () => {
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact);

    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            phone:"",
            program:0,
            message:"",
            agree:false
        },
        onSubmit: (values)=>{
            dispatch(addContact(formik.values))
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            email: Yup.string().required("Required.").email("Invalid email"),
            phone: Yup.number().integer().typeError("Please enter a valid number"),
            program: Yup.number().integer().typeError("Please select a program."),
            message: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            agree: Yup.boolean().oneOf([true], "The terms and conditions must be accepted.")
        }),    
    });
        
    return (  
        <>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
                <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.errors.email && (<Typography variant="caption" color="red">{formik.errors.email}</Typography>)}
                <TextField
                    label="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
                {formik.errors.phone && (<Typography variant="caption" color="red">{formik.errors.phone}</Typography>)}
                <FormControl sx={{ m: 1, minWidth: 600 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Program of Study</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        label="Program of Stydy"
                        name="program"
                        value={formik.values.program}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={0}><em>Please select</em></MenuItem>
                        <MenuItem value={1}>Software Engineering</MenuItem>
                        <MenuItem value={2}>Information System</MenuItem>
                        <MenuItem value={3}>Information Assurance</MenuItem>
                        <MenuItem value={4}>Internet of Things</MenuItem>
                        <MenuItem value={5}>Artificial Intelligence</MenuItem>
                        <MenuItem value={6}>Digital Art & Design</MenuItem>
                    </Select>
                    {formik.errors.program && (<Typography variant="caption" color="red">{formik.errors.program}</Typography>)}
                </FormControl>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    name='message'
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                />
                {formik.errors.message && (<Typography variant="caption" color="red">{formik.errors.message}</Typography>)}
                <FormControlLabel
                    control={<Switch/>} 
                    label="Agree to terms and conditions." 
                    name='agree' 
                    value={formik.values.agree} onClick={formik.handleChange}  />
                {formik.errors.agree && (<Typography variant="caption" color="red">{formik.errors.agree}</Typography>)}
                <Button type='submit'>Send</Button>
            </form>

            {contact.agree &&
                <div className="added">
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            Thong tin vua them:
                            </ListSubheader>
                        }
                        >
                        <ListItemButton>
                            <ListItemText primary="Name" />
                            <ListItemText primary={`${contact.name}`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Email" />
                            <ListItemText primary={`${contact.email}`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Phone" />
                            <ListItemText primary={`${contact.phone}`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Program" />
                            <ListItemText primary={`${contact.program}`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Message" />
                            <ListItemText primary={`${contact.message}`} />
                        </ListItemButton>
                    </List>
                </div>
            }
        </>
    );
}
 
export default Contact;