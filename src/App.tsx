import React, { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from './components/Layout';
import { PageDefault } from './components/PageDefault';

import { AppContext, ThemeModeContext } from './contexts';
import { AppClient } from './clients';
import { routes } from './config';
import { Route as AppRoute } from './types';
import { getAppTheme } from './styles/theme';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './utils/constants';
import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login/Login';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (localStorage.getItem('token') ? <Component {...props} /> : <Redirect to='/login' />)}
	/>
);

function App() {
	const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(LIGHT_MODE_THEME);
	const appClient = new AppClient();

	const themeMode = useMemo(
		() => ({
			toggleThemeMode: () => {
				setMode((prevMode) => (prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME));
			},
		}),
		[]
	);

	const theme = useMemo(() => getAppTheme(mode), [mode]);

	const addRoute = (route: AppRoute) => <PrivateRoute key={route.key} path={route.path} component={Dashboard} exact />;

	return (
		<AppContext.Provider value={appClient}>
			<ThemeModeContext.Provider value={themeMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<Switch>
							{/* <Route exact path='/login' component={Login} /> */}
							<Layout>
								{/* {routes.map((route: AppRoute) =>
									route.subRoutes ? route.subRoutes.map((item: AppRoute) => addRoute(item)) : addRoute(route)
								)} */}
								<Route exact path='/login' component={Login} />
								<PrivateRoute exact path='/dashboard' component={Dashboard} />
							</Layout>
						</Switch>
					</Router>
				</ThemeProvider>
			</ThemeModeContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
