import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BgImage from '../Img/img.jpg';
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  InputLabel,
} from '@mui/material';
// import {Redirect} from 'react-router-dom';
const SignInSide = () => {

  const validationSchema = Yup.object().shape({
    // Full Name Validation
    fullname: Yup.string().required('Fullname is required'),
    // Phone Number Validation
    phone: Yup.string()
      .typeError("That doesn't look like a phone number")
      .min(10, "Too short")
      .max(10, "Too long")
      .matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
      .required('A phone number is required'),
    // Email Validation
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    // Password Validation
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    // Confirm Password Validation and check if password and confirm password match
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      // check if the checkbox is checked
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  let navigate = useNavigate();
  const onSubmit = (data) => {
    // This is for print data on console
    console.log(JSON.stringify(data, null, 2));
    // This is for redirect to another page
    navigate("../next", { replace: true });
 }
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            mt: '30vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container maxWidth="sm" sx={{textAlign:'center'}}>
            <Typography variant="h4" component="h1" gutterBottom>
              Choose a date range
            </Typography>
            <Typography variant="body" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora doloribus veritatis officia assumenda. 
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              </Typography>
          </Container>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Fragment>
            <Paper>
              <Box px={3} py={2}>
                <Typography variant="h6" align="left" margin="dense">
                  Create an account
                </Typography>
                <InputLabel>Email</InputLabel>
                    <TextField
                      required
                      id="email"
                      name="email"
                      fullWidth
                      margin="dense"
                      {...register('email')}
                      error={errors.email ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {errors.email?.message}
                    </Typography>
                    <InputLabel>Password</InputLabel>
                    <TextField
                      required
                      id="password"
                      name="password"
                      type="password"
                      fullWidth
                      margin="dense"
                      {...register('password')}
                      error={errors.password ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {errors.password?.message}
                    </Typography>
                    <InputLabel>Confirm Password</InputLabel>
                    <TextField
                      required
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      margin="dense"
                      {...register('confirmPassword')}
                      error={errors.confirmPassword ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {errors.confirmPassword?.message}
                    </Typography>
                    <InputLabel>Full Name</InputLabel>
                    <TextField
                      required
                      id="fullname"
                      name="fullname"
                      fullWidth
                      margin="dense"
                      {...register('fullname')}
                      error={errors.fullname ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {errors.fullname?.message}
                    </Typography>
                    <InputLabel>Phone Number</InputLabel>
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      fullWidth
                      margin="dense"
                      {...register('phone')}
                      error={errors.phone ? true : false}
                    />
                    <Typography variant="inherit" color="error">
                      {errors.phone?.message}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Controller
                          control={control}
                          name="acceptTerms"
                          defaultValue="false"
                          inputRef={register()}
                          render={({ field: { onChange } }) => (
                            <Checkbox
                              color="primary"
                              onChange={e => onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label={
                        <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                          I have read and agree to the Terms *
                        </Typography>
                      }
                    />
                    <br />
                    <Typography variant="inherit" color="error">
                      {errors.acceptTerms
                        ? '(' + errors.acceptTerms.message + ')'
                        : ''}
                    </Typography>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Create Account
                    </Button>
                </Box>
              </Box>
            </Paper>
          </Fragment>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
};

export default SignInSide;