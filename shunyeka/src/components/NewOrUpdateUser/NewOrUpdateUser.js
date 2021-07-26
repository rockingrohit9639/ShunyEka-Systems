import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from "../../axios/instance";
import { getUserById, updateUser } from "../../axios/instance";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useDataLayerValues } from '../../DataLayer';

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        fontWeight: "bold"
    },
    container: {
        padding: theme.spacing(2),
    },
    input: {
        width: "100%",
        marginTop: "1.5rem"
    },
    phoneInput: {
        width: "100%",
        marginTop: "1.5rem",
    },
    button: {
        marginTop: "1rem"
    },
    phoneBox: {
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
    }
}));

export default function NewOrUpdateUser(props)
{
    const classes = useStyles();
    const ref = new URLSearchParams(props.location.search).get("ref");
    const [{ totalUsers }, dispatch] = useDataLayerValues();

    const [userData, setUserData] = React.useState({
        name: "",
        email: ""
    });
    const [phones, setPhones] = React.useState([
        { phone: "" }
    ]);

    const getUserIfExists = async () =>
    {
        if (ref !== "new")
        {
            try
            {
                const user = await getUserById(ref);
                setUserData({
                    name: user.data.name,
                    email: user.data.email
                });
                setPhones(user.data.phones);
            }
            catch (err)
            {
                console.log(err);
            }
        }
    }

    React.useEffect(() =>
    {
        getUserIfExists();
    }, []);

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setUserData(prevState =>
        {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    const validate = () =>
    {
        const errors = [];
        if (userData.name === "")
        {
            errors.push("Name is required");
        }
        if (userData.email === "")
        {
            errors.push("Email is required");
        }
        else if (!userData.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
        {
            errors.push("Email is not valid");
        }
        return errors;
    }

    const clearInputs = () =>
    {
        setUserData({
            name: "",
            email: ""
        });

        setPhones([{ phone: "" }]);
    }

    const handlePhoneChange = (value, idx) =>
    {
        const prevPhones = [...phones];
        prevPhones[idx].phone = value;
        setPhones(prevPhones);
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const data = {
            name: userData.name,
            email: userData.email,
            phones: phones,
        }

        const errors = validate();
        if (errors.length > 0)
        {
            for (let i = 0; i < errors.length; i++)
            {
                toast.error(errors[i]);
            }

            return;
        }
        else
        {
            try
            {
                if (ref === "new")
                {
                    const response = await createUser(data);
                    if (response.status === 200)
                    {
                        toast.success(response.data.message);
                        dispatch({
                            type: "SET_TOTAL_USERS",
                            totalUsers: totalUsers + 1
                        });
                    }

                    clearInputs();
                }
                else
                {
                    const res = await updateUser(ref, data);
                    if (res.status === 200)
                    {
                        toast.success(res.data.message)
                    }
                }

            }
            catch (err)
            {
                console.log(err);
                toast.error("Something went wrong");
            }
        }
    }


    const handleAddPhone = () =>
    {
        setPhones([...phones, { phone: "", }]);
    }

    const handleDelete = (idx) =>
    {
        const prevPhones = [...phones];
        prevPhones.splice(idx, 1);
        setPhones(prevPhones);
    }

    return (
        <Container maxWidth="sm" className={classes.container}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Typography variant="h3" gutterBottom className={classes.heading}>{ref === "new" ? "Add New User" : "Update User"}</Typography>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField label="Name" name="name" type="text" variant="outlined" value={userData.name} onChange={handleChange} className={classes.input} />
                <TextField label="Email" name="email" type="email" variant="outlined" value={userData.email} onChange={handleChange} className={classes.input} />


                {
                    phones.map((item, idx) => (
                        <div className={classes.phoneBox} key={idx}>
                            <PhoneInput
                                country={'in'}
                                value={item.phone}
                                className={classes.input}
                                onChange={phone => handlePhoneChange(phone, idx)}
                            />

                            <IconButton aria-label="add" onClick={handleAddPhone}>
                                <AddIcon />
                            </IconButton>

                            {idx !== 0 ? <IconButton aria-label="delete" onClick={() => handleDelete(idx)}>
                                <DeleteIcon />
                            </IconButton> : null}

                        </div>
                    ))
                }


                <Button variant="contained" color="primary" type="submit" className={classes.button}>{ref === "new" ? "Add New User" : "Update User"}</Button>
            </form>
        </Container>

    );
}

{/* <TextField label="Phone" name="phone" variant="outlined" value={userData.phone} onChange={handleChange} className={classes.input} /> */ }

