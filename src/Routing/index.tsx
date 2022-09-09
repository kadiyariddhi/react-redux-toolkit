import React from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import Register from '../Pages/Register';

const UserList = React.lazy(() => import("../Pages/User/UserList"));
const CreateUser = React.lazy(() => import("../Pages/User/CreateUser"));

const Routing = () => {
	return (
		<Router>
			<Routes>
				{/** Public Routes */}
				<Route element={<PublicRoutes />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				{/** Protected Routes */}
				<Route element={<ProtectedRoutes />}>
					<Route path="/users" >
						<Route path="list" element={<UserList />} />
						<Route path="create" element={<CreateUser />} />
					</Route>
				</Route>

			</Routes>
		</Router>
	)
}

export default Routing;