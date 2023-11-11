// src/components/Login.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginPng from '../../assets/png/login.png';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleLogin = async () => {
		const usernameValue =
			username !== '' ? username : (document.getElementById('outlined-adornment-username') as any)?.value;
		const passwordValue =
			password !== '' ? password : (document.getElementById('outlined-adornment-password') as any)?.value;

		axios
			.post(`http://localhost:8080/login`, {
				username: usernameValue,
				password: passwordValue,

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
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', gap: 12 }}>
			<div style={{ width: '50%' }}>
				<img src={loginPng} alt='Login' width={'100%'} />
			</div>
			<div style={{ width: '50%', height: '70%', display: 'flex', justifyContent: 'center' }}>
				<div
					style={{
						width: '100%',
						height: '80%',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#F2F6E6',
						borderRadius: 4,
						paddingLeft: 24,
						paddingRight: 24,
						gap: 16,
					}}>
					<h2 style={{ textAlign: 'center' }}>Log In</h2>
					<FormControl variant='outlined' style={{ width: '100%' }}>
						<InputLabel htmlFor='outlined-adornment-username'>Username</InputLabel>
						<OutlinedInput id='outlined-adornment-username' type={'text'} label='Username' />
					</FormControl>
					<FormControl variant='outlined' style={{ width: '100%' }}>
						<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password'
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Password'
						/>
					</FormControl>
					<Button
						variant='contained'
						style={{
							// backgroundColor: username === '' || password === '' ? '#D0D0D0' : '#4A6130',
							backgroundColor: '#4A6130',
							borderRadius: 4,
							cursor: 'pointer',
						}}
						// disabled={username === '' || password === ''}
						onClick={handleLogin}>
						Submit
					</Button>
				</div>
		</div>
	);
};

export default Login;
