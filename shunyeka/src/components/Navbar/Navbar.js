import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useDataLayerValues } from "../../DataLayer";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        color: "#FFF",
    },
    count: {
        marginRight: "0.5rem"
    }
}));

const Navbar = () =>
{

    const classes = useStyles();
    const [{ totalUsers }] = useDataLayerValues();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>
                            ShunyEka Systems
                        </Link>
                    </Typography>

                    <Typography color="inherit" className={classes.count}>
                        Total Users : {totalUsers}
                    </Typography>

                    <Link to="/user?ref=new" className={classes.link}>
                        <Button color="inherit" className={classes.menuButton}>
                            Add new user
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;