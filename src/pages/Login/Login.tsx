// src/components/Login.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleLogin = async () => {
		axios
			.post(`http://localhost:8080/login`, {
				username,
				password,
			})
			.then((res) => {
				const token = res?.data?.token ?? '';
				const expirationTime = Date.now() + 3600 * 24000; // 3600 seconds (1 hour) from now

				localStorage.setItem('token', token);
				localStorage.setItem('tokenExpiration', expirationTime.toString());
				history.push('/dashboard');
			})
			.catch((err) => {
				console.error('Login failed:', err);
				alert(err);
			});
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		const expirationTime = localStorage.getItem('tokenExpiration');

		if (token && expirationTime) {
			const isTokenExpired = Date.now() >= parseInt(expirationTime, 10);

			if (isTokenExpired) {
				// Token has expired, perform logout or reauthentication
			} else {
				// Token is still valid
				history.push('/dashboard');
			}
		} else {
			// Token or expiration time is not found, handle as needed
		}
	}, []);

	return (
		<div>
			<h2>Login</h2>
			<div>
				<input type='text' placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)} />
			</div>
			<div>
				<input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
