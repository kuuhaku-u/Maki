import React, { Component, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { register } from './registerationStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from 'react-router-dom';
import Protected from './Protected';
import Test from './Test';

const Registration = ({classes}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfrim, setPasswordConfrim] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  // state = {
  //   email: '',
  //   password: '',
  //   passwordConfrim: '',
  //   hidePassword: true,
  //   error: null,
  //   errorOpen: false,
  //   isLoggedIn: false
  // };
  const errorClose = (e) => {
    setErrorOpen(false);
    // this.setState({
    //   errorOpen: false,
    // });
  };

  const handleChange = (name) => (e) => {
    if(name == "password"){
      setPassword(e.target.value);
    } 
    if(name == "email"){
      setEmail(e.target.value);
    }
    // this.setState({
    //   [name]: e.target.value,
    // });
  };
  const passwordMatch = () => true;
  const showPassword = () => {
    // this.setState((prevState) => ({ hidePassword: !prevState.hidePassword }));
    setHidePassword((prev) => !prev);
  };
  const isValid = () => {
    if (email === '') {
      return false;
    }
    return true;
  };
  const submitRegistration = (e) => {
    e.preventDefault();
    if (!passwordMatch()) {
      setIsLoggedIn(false);
      setErrorOpen(true);
      setError("Passwords don't match")
      // this.setState({
      //   isLoggedIn: false,
      //   errorOpen: true,
      //   error: "Passwords don't match",
      // });
    } else{
      // this.setState({
      //   isLoggedIn: true
      // });
      setIsLoggedIn(true);
    }
    // setIsLoggedIn(true);
    // const newUserCredentials = {
    //   email: this.state.email,
    //   password: this.state.password,
    //   passwordConfrim: this.state.passwordConfrim,
    // };
    // console.log(document.cookie);
    // fetch('http://localhost:8000/login', {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${document.cookie} `,
    //   },
    //   body: JSON.stringify({
    //     username: newUserCredentials.email,
    //     password: newUserCredentials.password,
    //   }),
    // })
    //   .then((e) => e.json())
    //   .then((e) => (document.cookie = e.token));
  };

  useEffect(() => {
    if(isLoggedIn){
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
          <form className={classes.form} onSubmit={() => submitRegistration}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='email' className={classes.labels}>
                User name
              </InputLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                className={classes.inputs}
                disableUnderline={true}
                onChange={handleChange('email')}
              />
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='password' className={classes.labels}>
                password
              </InputLabel>
              <Input
                name='password'
                autoComplete='password'
                className={classes.inputs}
                disableUnderline={true}
                onChange={handleChange('password')}
                type={hidePassword ? 'password' : 'input'}
                endAdornment={
                  hidePassword ? (
                    <InputAdornment position='end'>
                      <VisibilityOffTwoToneIcon
                        fontSize='default'
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position='end'>
                      <VisibilityTwoToneIcon
                        fontSize='default'
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!isValid()}
              disableRipple
              fullWidth
              variant='outlined'
              className={classes.button}
              type='submit'
              onClick={submitRegistration}>
              Login{' '}
            </Button>
          </form>
          {error ? (
            <Snackbar
              variant='error'
              key={error}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={errorOpen}
              onClose={errorClose}
              autoHideDuration={3000}>
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: '8px' }}>
                      <ErrorIcon fontSize='large' color='error' />
                    </span>
                    <span> {error} </span>
                  </div>
                }
                action={[
                  <IconButton key='close' aria-label='close' onClick={errorClose}>
                    <CloseIcon color='error' />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
      {isLoggedIn && <Protected>
          <Test></Test>
        </Protected>}
      </>
    );
}
export default withStyles(register)(Registration);

