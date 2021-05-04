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

export default function SignIn(/* { setIsSignedIn } */) {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const { t } = useTranslation();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const signIn = (event) => {
        event.preventDefault();
        const data = {
            username: email,
            hash: password,
        };

        axios
            .post(`/signin`, data)
            .then(({ data }) => {
                if (data) {
                    if (data.success) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('email', data.user.email);
                        localStorage.setItem('id', data.user._id);
                        localStorage.setItem('role', data.user.role);

                        if (localStorage.getItem('role') === 'Teacher') {
                            window.location =
                                '/teacher/' + localStorage.getItem('id');
                        } else {
                            window.location = '/';
                        }
                    } else {
                        setError(data.message);
                    }
                }
            })
            .catch((error) => {
                setError(t('Email or Password are incorrect !'));
            });
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <strong>{t('Welcome to Our Website')}</strong>
                </Typography>
                <Typography component="div">
                    <center>{t('Login To Our Website Freely')}</center>
                </Typography>
                <form className={classes.form} onSubmit={signIn}>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('Password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ background: '#ffc107' }}
                        className={classes.submit}
                    >
                        {t('Sign In')}
                    </Button>

                    <hr />
                    <Grid container>
                        <Grid item xs>
                            <Link href="/register" variant="body2">
                                {t("Don't have an account")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/forgotPassword" variant="body2">
                                {t('Forgot Password')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
