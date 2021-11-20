import React from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
// import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
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
    width: '200px',
    top: "19.7%",
    bottom: "76.63%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "23px",
    lineHeight: "27px",
    color: "#0A0A0A",
  },
  subtitle: {
    position: "absolute",
    width: '200px',
    top: "25.7%",
    marginBottom: '2rem',
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "27px",
    color: "#B7B7B7",
    textAlign: 'center',
  },
  loginbox: {
    maxWidth: "414px",
    height: "600px",
    position: "relative",
    marginTop: "5rem",
    background: "#ffffff",
    [theme.breakpoints.down("md")]: {
      height: "100vh",
      marginTop: "0rem",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
        marginTop: "0rem",
      },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(15, 4, 2),
    position: "relative",
  },

  submit: {
    margin: theme.spacing(15, 4, 2),
    width: '300px',
    height: '53px',
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(15, 2, 2),
    },
  },
  alert: {
    position: "absolute",
    width: "100%",
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { t } = useTranslation();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const forgotPassword = (event) => {
    event.preventDefault();
    setError("");
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
        setError(t("An error occured on the server"));
      });
  };
  return (
    <Container component="main" maxWidth={false} className={classes.loginbox}>
      <CssBaseline />
      <div className={classes.paper}>
      <div className={classes.logo}></div>
        <Typography component="div" className={classes.title}>
          <strong>{"Forgot Password?"}</strong>
        </Typography>
        <Typography component="div" className={classes.subtitle}>
          <span>{"Please enter your e-mail associated to your account"}</span>
        </Typography>
        {message !== "" && (
          <Typography component="div">
            <span>
             
                {
                  "Please check your email, a link to reset your password was sent to your account."
                }
              
            </span>
          </Typography>
        )}
        <form className={classes.form} onSubmit={forgotPassword}>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ background: "#3B286D" }}
            className={classes.submit}
          >
            {"Submit Email"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
