import React, { useEffect } from 'react'
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserList } from '../../features/users/userAPI';
import { IUsers } from '../../app/interface';
import { Link } from 'react-router-dom';
import { clearState } from '../../features/users/userSlice';

const UserList = () => {
	const dispatch = useAppDispatch();
	const { users } = useAppSelector((state) => state.user);

	useEffect(() => {
		dispatch(getUserList(''));
	}, [])

	return (
		<Grid sx={{ width: '80vw', margin: '0 auto' }}>
			<Grid container spacing={2}>
				<Grid item xs={6} md={10}>
					<Typography variant="h4" component="h4" mb={2}>
						UserList
					</Typography>
				</Grid>
				<Grid item xs={6} md={2}>
					<Button variant="contained">
						<Link to="/users/create">ADD</Link>
					</Button>
				</Grid>
			</Grid>
			<TableContainer component={Paper}>
				<Table aria-label="simple table" >
					<TableHead>
						<TableRow>
							<TableCell>FirstName</TableCell>
							<TableCell>Lastname</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>DOB</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users?.map((row: IUsers) => (
							<TableRow
								key={row._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell>{row.firstName}</TableCell>
								<TableCell>{row.lastName}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{row.dob}</TableCell>
								<TableCell>{row.isActive}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	)
}

export default UserList