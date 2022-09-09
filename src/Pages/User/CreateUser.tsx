import React, { useEffect } from 'react';
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AddUserForm } from '../../app/interface';
import { addUserValidations } from '../../Helper/validations';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createUser } from '../../features/users/userAPI';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearState } from '../../features/users/userSlice';

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<AddUserForm>({
    resolver: yupResolver(addUserValidations)
  });

  const { isFetching, isSuccess, isError, errorMessage } = useAppSelector((state) => state.user);

  const onSubmit = (data: AddUserForm) => {
    dispatch(createUser(data));
  };

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, []);

	useEffect(() => {
		if (isSuccess) {
			navigate('/users/list');
			dispatch(clearState());
		}

		if (isError) {
			toast.error(errorMessage);
			dispatch(clearState());
		}
	}, [isSuccess, isError]);

  return (
    <Container fixed>
      <Box sx={{ height: '100vh', margin: '20px' }} >
        <Paper elevation={3} >
          <Typography variant="h4" component="h4" align="center">
            Create user
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, padding: "20px" }}>
            <TextField
              required
              margin="normal"
              fullWidth
              id="firstName"
              label="FirstName"
              variant="standard"
              {...register('firstName')}
              error={errors.firstName ? true : false}
              helperText={errors && errors.firstName?.message}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              id="lastName"
              label="LastName"
              variant="standard"
              {...register('lastName')}
              error={errors.lastName ? true : false}
              helperText={errors && errors.lastName?.message}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              variant="standard"
              {...register('email')}
              error={errors.email ? true : false}
              helperText={errors && errors.email?.message}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              variant="standard"
              multiline
              rows={5}
              {...register('address')}
              error={errors.address ? true : false}
              helperText={errors && errors.address?.message}
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                id="gender"
                defaultValue="first"
                {...register('gender')}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <TextField
              required
              margin="normal"
              fullWidth
              id="date"
              variant="standard"
              type="date"
              {...register('dob')}
              error={errors.dob ? true : false}
              helperText={errors && errors.dob?.message}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              id="password"
              variant="standard"
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password ? true : false}
              helperText={errors && errors.password?.message}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              id="confirmPassword"
              variant="standard"
              label="Confirm Password"
              type="password"
              autoComplete="confirmPassword"
              {...register('confirmPassword')}
              error={errors.confirmPassword ? true : false}
              helperText={errors && errors.confirmPassword?.message}
            />
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>

  )
}

export default CreateUser;