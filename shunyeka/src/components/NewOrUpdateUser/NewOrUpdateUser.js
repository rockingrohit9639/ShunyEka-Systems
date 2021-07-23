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
    button: {
        marginTop: "1rem"
    }
}));

export default function NewOrUpdateUser(props)
{
    const classes = useStyles();
    const ref = new URLSearchParams(props.location.search).get("ref");

    const [userData, setUserData] = React.useState({
        name: "",
        email: "",
        phone: ""
    });

    const getUserIfExists = async () =>
    {
        if (ref !== "new")
        {
            try
            {
                const user = await getUserById(ref);
                setUserData({
                    name: user.data.name,
                    email: user.data.email,
                    phone: user.data.phone
                });
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
        if (userData.phone === "")
        {
            errors.push("Phone is required");
        }
        return errors;
    }

    const clearInputs = () =>
    {
        setUserData({
            name: "",
            email: "",
            phone: ""
        });
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
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
                    const response = await createUser(userData);
                    if (response.status === 200)
                    {
                        toast.success(response.data.message);
                    }

                    clearInputs();
                }
                else
                {
                    const res = await updateUser(ref, userData);
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
                <TextField label="Phone" name="phone" variant="outlined" value={userData.phone} onChange={handleChange} className={classes.input} />
                <Button variant="contained" color="primary" type="submit" className={classes.button}>{ref === "new" ? "Add New User" : "Update User"}</Button>
            </form>
        </Container>

    );
}
