/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export const SignOutRoute = () => {
	const handleSignOutClick = () => {
		alert('Signing Out...');
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiration');
		window.location.reload();
	};

	return (
		<ListItemButton
			css={css`
				position: absolute;
				bottom: 0;
				width: 100%;
			`}
			onClick={handleSignOutClick}>
			<ListItemIcon>
				<IconButton size='small'>
					<ExitToApp />
				</IconButton>
			</ListItemIcon>
			<ListItemText primary='Sign Out' />
		</ListItemButton>
	);
};
