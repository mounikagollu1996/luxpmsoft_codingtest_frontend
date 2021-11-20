import React from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
// import Image from 'material-ui-image';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Config } from "../../config/config";
import { useTranslation } from "react-i18next";
import Background from "../../assets/gradation.png";
axios.defaults.baseURL = Config.api_url;
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    position: "absolute",
    width: "171px",
    left: "29.33%",
    right: "29.33%",
    top: "10.73%",
    bottom: "85.46%",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
  },
  title: {
    position: "absolute",
    left: "41.67%",
    right: "42.87%",
    top: "19.7%",
    bottom: "76.63%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "23px",
    lineHeight: "27px",
    color: "#0A0A0A",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: "relative",
  },
  submit: {
    margin: theme.spacing(3, 5, 2),
    width: '287px',
    height: '53px',
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(3, 2, 2),
    },
    
  },
  forgotpassword: {
      marginBottom: '100px',
      textAlign: 'right',
      display: 'block',
      marginTop: '1rem',
      color: '#0A0A0A',
      fontWeight: 'Bold',
  },
  signup: {
    margin: theme.spacing(0, 9, 2),
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(0, 5, 2),
    },
  },
  alert: {
    position: "absolute",
    width: "100%",
  },
  loginbox: {
    maxWidth: '414px',
    height: '600px',
    position: 'relative',
    marginTop: '5rem',
    background: '#ffffff',
    [theme.breakpoints.down('md')]: {
        height: '100vh',
        marginTop: '0rem'
    },
  }
}));

export default function SignIn(/* { setIsSignedIn } */) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
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
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("id", data.user._id);
            localStorage.setItem("role", data.user.role);

            if (localStorage.getItem("role") === "Teacher") {
              window.location = "/teacher/" + localStorage.getItem("id");
            } else {
              window.location = "/";
            }
          } else {
            setError(data.message);
          }
        }
      })
      .catch((error) => {
        setError(t("Email or Password are incorrect !"));
      });
  };
  return (
    <Container component="main" maxWidth={false} className={classes.loginbox}>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}></div>
        <Typography component="div" className={classes.title}>
          <center>{"Login"}</center>
        </Typography>
        <form className={classes.form} onSubmit={signIn}>
          {error ? (
            <Alert
              className={classes.alert}
              style={{ position: "absolute" }}
              variant="filled"
              severity="error"
            >
              {error}
            </Alert>
          ) : (
            <></>
          )}

          <TextField
            label="Email"
            placeholder="sabahat@gmail.com"
            variant="outlined"
            margin="normal"
            className="login-first-input"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            // autoFocus
            onChange={handleEmailChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            placeholder="**********"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          
          <Grid container >
            <Grid item>
              <Link href="/forgotPassword" className={classes.forgotpassword} variant="">
                {"find password"}
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ background: "#3B286D" }}
            className={classes.submit}
          >
            {"Sign In"}
          </Button>
          <Grid container className={classes.signup}>
            <Grid item xs>
              <Link href="/register" variant="body2">
                {"Don't have an account? sign up"}
              </Link>
            </Grid>
            
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}
