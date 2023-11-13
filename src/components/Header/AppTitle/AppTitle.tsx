/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logoPng from '../../../assets/png/logo.png';
import { APP_TITLE } from '../../../utils/constants';

export const AppTitle = () => (
	<NavLink
		to='/'
		css={css`
			text-decoration: none;
			color: inherit;
		`}>
		<img src={logoPng} alt='Logo' height='30' />
	</NavLink>
);
