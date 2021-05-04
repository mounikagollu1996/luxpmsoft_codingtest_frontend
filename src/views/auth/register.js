import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Config } from '../../config/config';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        marginTop: theme.spacing(1),
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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(1, 0, 1),
    },
    formControl: {
        minWidth: 120,
        width: '100%',
        margin: 'auto 0',
        marginBottom: '20px',
        marginTop: '16px',
    },
}));

const passwordErrorMessage =
    'At least 8 characters including 1 capital letter,1 number and 1 special chracter';
const emailErrorMessage = 'Invalid e-mail !!';
const codeErrorMessage = 'Invalid code !!';
const roleErrorMessage = 'Unsupported role';

const yupSchema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email(emailErrorMessage).required(),
    code: yup
        .string()
        .matches(/(01099404534|6808)/, codeErrorMessage)
        .required(),
    phoneNumber: yup.string().required(),
    role: yup
        .string()
        .matches(/(Master|Server|Teacher)/, roleErrorMessage)
        .required(),
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
        .oneOf([yup.ref('password')])
        .required(),
});

export default function SignUp() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { register, handleSubmit, control, errors } = useForm({
        mode: 'all',
        resolver: yupResolver(yupSchema),
    });
    const [role, setRole] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const errorMessage = (field) =>
        !!errors[field] ? errors[field].message : '';

    const onError = () => {
        setError(t('Please fix the problems marked in red'));
    };

    const onSubmit = (data) => {
        if (data.code !== '6808' && data.role === 'Master') {
            setError(t("Invalid code for role 'Master'"));
        }

        axios
            .post(`/signup`, data)
            .then(({ data }) => {
                if (data) {
                    if (data.warning) {
                        setError(data.warning);
                    } else {
                        setSuccess(
                            t('You were registered successfully') + ' !!'
                        );
                        window.location = '/login';
                    }
                }
            })
            .catch((error) => {
                console.log(error.warning);
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
                    <strong>{t('Welcome To Website')} !!</strong>
                </Typography>
                <Typography component="div">
                    <center>{t('Register As A User')} </center>
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    {error && (
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert variant="filled" severity="success">
                            {success}
                        </Alert>
                    )}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        className="register-input"
                        required
                        fullWidth
                        id="email"
                        label={t('id')}
                        name="email"
                        autoComplete="email"
                        inputRef={register}
                        error={!!errors.email}
                        helperText={t(errorMessage('email'))}
                    />
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
                        inputRef={register}
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errorMessage('password')}
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
                        inputRef={register}
                        id="confirm"
                        autoComplete="current-password"
                        error={!!errors.confirmPassword}
                        helperText={errorMessage('confirmPassword')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        className="register-input"
                        required
                        fullWidth
                        id="fullname"
                        label={t('Name')}
                        name="fullName"
                        inputRef={register}
                        error={!!errors.fullName}
                        helperText={errorMessage('fullName')}
                        autoComplete="text"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        className="register-input"
                        required
                        fullWidth
                        name="phoneNumber"
                        label={t('Phone Number')}
                        type="tel"
                        inputRef={register}
                        id="phone"
                        error={!!errors.phoneNumber}
                        helperText={errorMessage('phoneNumber')}
                        autoComplete="text"
                    />
                    <FormControl ref={register} className={classes.formControl}>
                        <InputLabel
                            id="demo-simple-select-label"
                            variant="outlined"
                        >
                            {t('Role')}
                        </InputLabel>
                        <Controller
                            as={
                                <Select
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="role"
                                    label={t('Role')}
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    error={!!errors.role}
                                    helpertext={errorMessage('role')}
                                >
                                    <MenuItem value="Master">
                                        {t('Master')}
                                    </MenuItem>
                                    <MenuItem value="Server">
                                        {t('Server')}
                                    </MenuItem>
                                    <MenuItem value="Teacher">
                                        {t('Teacher')}
                                    </MenuItem>
                                </Select>
                            }
                            name="role"
                            control={control}
                            defaultValue=""
                        />
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        className="register-input"
                        required
                        fullWidth
                        id="code"
                        label={t('Code')}
                        name="code"
                        inputRef={register}
                        autoComplete="text"
                        autoFocus
                        error={!!errors.code}
                        helperText={t(errorMessage('code'))}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ background: '#ffc107' }}
                        className={classes.submit}
                    >
                        {t('Sign Up')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                {t('have an account')}?
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
