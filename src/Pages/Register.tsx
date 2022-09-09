import React, { useEffect } from 'react'
import { Avatar, Button, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signupUser } from '../features/auth/authAPI';
import { clearState } from '../features/auth/authSlice';
import { registerValidations } from "../Helper/validations";
import { RegisterSubmitForm } from '../app/interface';
import toast from 'react-hot-toast';

const theme = createTheme();

const Register = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors } } = useForm<RegisterSubmitForm>({
		resolver: yupResolver(registerValidations)
	});
	
	const { isFetching, isSuccess, isError, errorMessage } = useAppSelector((state) => state.auth);

	const onSubmit = (data: RegisterSubmitForm) => {
		dispatch(signupUser(data));
	};

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, []);

	useEffect(() => {
		if (isSuccess) {
			navigate('/login');
			dispatch(clearState());
		}

		if (isError) {
			toast.error(errorMessage);
			dispatch(clearState());
		}
	}, [isSuccess, isError]);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							autoComplete="email"
							autoFocus
							{...register('email')}
							error={errors.email ? true : false}
							helperText={errors && errors.email?.message}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password')}
							error={errors.password ? true : false}
							helperText={errors && errors.password?.message}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Confirm Password"
							type="password"
							id="confirmPassword"
							autoComplete="confirmPassword"
							{...register('confirmPassword')}
							error={errors.confirmPassword ? true : false}
							helperText={errors && errors.confirmPassword?.message}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
					</Box>
					<Grid container>
						<Grid item>
							<Link to="/login">Login</Link>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Register
