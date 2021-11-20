import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Background from "../../assets/gradation.png";
import axios from "axios";
import { Config } from "../../config/config";
import { useTranslation } from "react-i18next";
axios.defaults.baseURL = Config.api_url;


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
    width: "200px",
    top: "19.7%",
    bottom: "76.63%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "23px",
    lineHeight: "27px",
    color: "#0A0A0A",
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

const passwordErrorMessage =
  "At least 8 characters including 1 capital letter,1 number and 1 special chracter";

const passwordConfirmErrorMessage = "Your passwords do not match";

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
    .oneOf([yup.ref("password")], passwordConfirmErrorMessage)
    .required(),
});

export default function ForgotPassword({ match }) {
  const classes = useStyles();
  const [confirmedPassword, setConfirmedPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  // passwordMatch,
  const [setPasswordMatch] = React.useState(false);
  const [error, setError] = React.useState("");
  // const [message, setMessage] = React.useState('');
  const { t } = useTranslation();

  let history = useHistory();

  const { register, errors } = useForm({
    mode: "all",
    resolver: yupResolver(yupSchema),
  });

  const errorMessage = (field) =>
    !!errors[field] ? errors[field].message : "";

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const forgotPassword = (event) => {
    event.preventDefault();

    if (password !== confirmedPassword) {
      setPasswordMatch("Your passwords do not match");
    } else {
      setPasswordMatch("");
      axios
        .post(`/resetPassword/${match.params.token}`, {
          newPassword: password,
          newPasswordConfirmation: confirmedPassword,
        })
        .then(({ data }) => {
          if (data) {
            if (data.success) {
              history.push("/login");
            } else {
              setError(data.message);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setError(t("An error occured on the server"));
        });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}></div>
        <Typography component="div" className={classes.title}>
          <strong>{"Enter New Password"}</strong>
        </Typography>

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
            variant="outlined"
            margin="normal"
            className="register-input"
            required
            fullWidth
            name="password"
            label={"Password"}
            type="password"
            id="password"
            onChange={handlePasswordChange}
            inputRef={register}
            error={!!errors.password}
            helperText={errorMessage("password")}
          />
          <TextField
            label="password"
            variant="outlined"
            placeholder="***********"
            margin="normal"
            className="register-input"
            required
            fullWidth
            name="confirmPassword"
            type="password"
            id="confirm"
            onChange={handleConfirmedPasswordChange}
            inputRef={register}
            error={!!errors.confirmPassword}
            helperText={errorMessage("confirmPassword")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ background: "#3B286D" }}
            className={classes.submit}
          >
            {"Change password"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
