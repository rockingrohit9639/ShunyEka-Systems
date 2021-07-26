import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getUserById } from "../../axios/instance";

const useStyles = makeStyles({
    root: {
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    card: {
        width: "50%",
        marginTop: "2rem"
    },
    mt: {
        marginTop: "2rem",
    },
});


function UserDetails()
{
    const { id } = useParams();
    const [user, setUser] = React.useState(null);
    const classes = useStyles();

    const getUserDetails = async () =>
    {
        try
        {
            if (id)
            {
                const userData = await getUserById(id);
                setUser(userData.data);
            }
            else
            {
                window.alert("Invalid User Id")
            }
        }
        catch (err)
        {
            console.log(err)
        }
    }

    React.useEffect(() =>
    {
        getUserDetails();
    }, []);

    return (
        <div className={classes.root}>
            <Typography variant="h5">User Details</Typography>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Name :
                    </Typography>
                    <Typography variant="h4">{user?.name}</Typography>

                    <Typography color="textSecondary" className={classes.mt} gutterBottom>
                        Email :
                    </Typography>
                    <Typography variant="h4">{user?.email}</Typography>

                    {
                        user?.phones.map((p, idx) => (
                            <>
                                <Typography key={idx} color="textSecondary" className={classes.mt} gutterBottom>
                                    Phone :
                                </Typography>
                                <Typography variant="h4">{p.phone}</Typography>
                            </>
                        ))
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDetails;
