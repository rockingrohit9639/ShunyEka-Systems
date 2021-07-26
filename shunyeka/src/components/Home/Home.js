import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser } from "../../axios/instance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDataLayerValues } from '../../DataLayer';
import { AmplifySignOut } from "@aws-amplify/ui-react";

const useStyles = makeStyles({
    container: {
        padding: "2rem",
    },
    table: {
        minWidth: 650,
    },
    link: {
        textDecoration: "none",
        marginRight: "1rem",
    },
    logout: {
        marginTop: "1rem",
        width: "7rem"
    }
});


export default function Home()
{
    const classes = useStyles();
    const [users, setUsers] = React.useState([]);
    const [{ totalUsers }, dispatch] = useDataLayerValues();

    const getUsers = async () =>
    {
        try
        {
            const allUsers = await getAllUsers();
            setUsers(allUsers.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    React.useEffect(() =>
    {
        getUsers();
    }, []);

    const handleDelete = async (id) =>
    {
        try
        {
            const res = await deleteUser(id);
            if (res.status === 200)
            {
                dispatch({
                    type: "SET_TOTAL_USERS",
                    totalUsers: totalUsers - 1
                });

                toast.success(res.data.message);
                getUsers();
            }
        }
        catch (error)
        {
            console.log(error);
            toast.error("Something went wront");
        }
    }


    return (
        <div className={classes.container}>
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
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>
                                    <Link to={`/user/${ user._id }`} className={classes.link}>
                                        <Button variant="contained" color="primary">View</Button>
                                    </Link>
                                    <Link to={`/user?ref=${ user._id }`} className={classes.link}>
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.logout}>
                <AmplifySignOut />
            </div>
        </div>
    );
}
