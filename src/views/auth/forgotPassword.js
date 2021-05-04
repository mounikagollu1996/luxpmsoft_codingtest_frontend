import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Config } from '../../config/config';
import { useTranslation } from 'react-i18next';
axios.defaults.baseURL = Config.api_url;
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        position: 'relative',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        position: 'absolute',
        width: '100%',
    },
}));

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const { t } = useTranslation();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const forgotPassword = (event) => {
        event.preventDefault();
        setError('');
        axios
            .post(`/requestForgottenPasswordLink`, { email: email })
            .then(({ data }) => {
                if (data) {
                    if (data.success) {
                        setMessage(data.message);
                    } else {
                        setError(data.message);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setError(t('An error occured on the server'));
            });
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="div">
                    <center>{t('Please enter your e-mail')}</center>
                </Typography>
                {message !== '' && (
                    <Typography component="div">
                        <strong>
                            <center>
                                {t(
                                    'Please check your email, a link to reset your password was sent to you'
                                )}
                            </center>
                        </strong>
                    </Typography>
                )}
                <form className={classes.form} onSubmit={forgotPassword}>
                    {error ? (
                        <Alert
                            className={classes.alert}
                            style={{ position: 'absolute' }}
                            variant="filled"
                            severity="error"
                        >
                            {error}
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        className="login-first-input"
                        required
                        fullWidth
                        id="email"
                        label={t('Email Address')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ background: '#ffc107' }}
                        className={classes.submit}
                    >
                        {t('Request Link')}
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
