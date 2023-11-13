/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Navigation } from '../Navigation';
import { Header } from '../Header';
import { Footer } from '../Footer';

import { FOOTER_HEIGHT } from '../../utils/constants';

export const Layout: FC = ({ children }) => {
	const [open, setOpen] = useState(false);
	const toggleNavigation = () => setOpen((status) => !status);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const expirationTime = localStorage.getItem('tokenExpiration');

		if (token && expirationTime) {
			const isTokenExpired = Date.now() >= parseInt(expirationTime, 10);

			if (isTokenExpired) {
				// Token has expired, perform logout or reauthentication
			} else {
				// Token is still valid
				setShowDrawer(true);
			}
		} else {
			// Token or expiration time is not found, handle as needed
		}
	}, [localStorage.getItem('token'), localStorage.getItem('tokenExpiration')]);

	return (
		<div style={{ minHeight: '100vh' }}>
			<div style={{ display: 'flex', minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}>
				<Box component='header'>
					<Header toggleNavigation={toggleNavigation} />
				</Box>
				{showDrawer && <Navigation open={open} handleClose={toggleNavigation} />}
				<Box component='main' sx={{ flexGrow: 1, p: 3, pt: 10 }}>
					{children}
				</Box>
			</div>
			<Box component='footer'>
				<Footer />
			</Box>
		</div>
	);
};
