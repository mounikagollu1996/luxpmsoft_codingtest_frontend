import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
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

const passwordErrorMessage =
    'At least 8 characters including 1 capital letter,1 number and 1 special chracter';

const passwordConfirmErrorMessage = 'Your passwords do not match';

const yupSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, passwordErrorMessage)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            passwordErrorMessage
        )
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], passwordConfirmErrorMessage)
        .required(),
});

export default function ForgotPassword({ match }) {
    const classes = useStyles();
    const [confirmedPassword, setConfirmedPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordMatch, setPasswordMatch] = React.useState(false);
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const { t } = useTranslation();

    let history = useHistory();

    const { register, errors } = useForm({
        mode: 'all',
        resolver: yupResolver(yupSchema),
    });

    const errorMessage = (field) =>
        !!errors[field] ? errors[field].message : '';

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmedPasswordChange = (event) => {
        setConfirmedPassword(event.target.value);
    };

    const forgotPassword = (event) => {
        event.preventDefault();

        if (password !== confirmedPassword) {
            setPasswordMatch('Your passwords do not match');
        } else {
            setPasswordMatch('');
            axios
                .post(`/resetPassword/${match.params.token}`, {
                    newPassword: password,
                    newPasswordConfirmation: confirmedPassword,
                })
                .then(({ data }) => {
                    if (data) {
                        if (data.success) {
                            history.push('/login');
                        } else {
                            setError(data.message);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError(t('An error occured on the server'));
                });
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="div">
                    <center>{t('Please enter your new Password')}</center>
                </Typography>

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
                        className="register-input"
                        required
                        fullWidth
                        name="password"
                        label={t('Password')}
                        type="password"
                        id="password"
                        onChange={handlePasswordChange}
                        inputRef={register}
                        error={!!errors.password}
                        helperText={t(errorMessage('password'))}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        className="register-input"
                        required
                        fullWidth
                        name="confirmPassword"
                        label={t('Confirm Password')}
                        type="password"
                        id="confirm"
                        onChange={handleConfirmedPasswordChange}
                        inputRef={register}
                        id="confirm"
                        error={!!errors.confirmPassword}
                        helperText={t(errorMessage('confirmPassword'))}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ background: '#ffc107' }}
                        className={classes.submit}
                    >
                        {t('Change password')}
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
