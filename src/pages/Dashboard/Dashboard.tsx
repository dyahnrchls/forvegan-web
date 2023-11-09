import React, { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ActionMenu } from '../../components/Actions/ActionMenu';
import axios from 'axios';
import { Fab, Pagination, TablePagination } from '@mui/material';
import { Search } from '../../components/Header/Search';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export interface IngredientListData {
	id: number;
	name: string;
	category: string;
}

export interface IngredientListMeta {
	page: number;
	limit: number;
	totalPages: number;
	total: number;
}

export const Dashboard = () => {
	const [ingredients, setIngredients] = useState<IngredientListData[]>([]);
	const [filter, setFilter] = useState<string>('');
	const [keyword, setKeyword] = useState<string>('');
	const [meta, setMeta] = useState<IngredientListMeta>();
	const [page, setPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(1);
	};

	const getIngredientList = useCallback(() => {
		axios
			.get('http://localhost:8080/ingredients', {
				params: {
					page,
					category: filter,
					keyword,
					limit: rowsPerPage,
				},
			})
			.then((res) => {
				const data: IngredientListData[] = res.data.data;
				const meta: IngredientListMeta = res.data.meta;
				setIngredients(data);
				setMeta(meta);
			});
	}, [filter, keyword, page, rowsPerPage]);

	useEffect(() => {
		getIngredientList();
	}, [getIngredientList]);

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					paddingBottom: 16,
				}}>
				<div
					style={{
						display: 'flex',
						gap: 8,
					}}>
					<Fab
						variant='extended'
						size='small'
						color={filter === '' ? 'primary' : 'secondary'}
						onClick={() => setFilter('')}>
						All
					</Fab>
					<Fab
						variant='extended'
						size='small'
						color={filter === 'vegan' ? 'primary' : 'secondary'}
						onClick={() => setFilter('vegan')}>
						Vegan
					</Fab>
					<Fab
						variant='extended'
						size='small'
						color={filter === 'non vegan' ? 'primary' : 'secondary'}
						onClick={() => setFilter('non vegan')}>
						Non Vegan
					</Fab>
					<Fab
						variant='extended'
						size='small'
						color={filter === 'both' ? 'primary' : 'secondary'}
						onClick={() => setFilter('both')}>
						Both
					</Fab>
					<Fab
						variant='extended'
						size='small'
						color={filter === 'unknown' ? 'primary' : 'secondary'}
						onClick={() => setFilter('unknown')}>
						Unknown
					</Fab>
				</div>
				<Search onChange={(e: any) => setKeyword(e.target.value)} />
			</div>
			<TableContainer
				component={Paper}
				style={{
					maxHeight: '72vh',
				}}>
				<Table sx={{ minWidth: 650 }} stickyHeader aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Bahan</TableCell>
							<TableCell align='right'>Kategori</TableCell>
							<TableCell align='right'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ingredients.map((row) => (
							<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='right'>{row.category}</TableCell>
								<TableCell align='right'>
									<ActionMenu row={row} getIngredientList={getIngredientList} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component='div'
				count={meta?.total ?? 1}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{/* <div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Pagination
					count={meta?.totalPages ?? 1}
					size='medium'
					style={{
						paddingTop: 16,
					}}
					onChange={(e: any, newPage: number) => setPage(newPage)}
				/>
			</div> */}
		</div>
	);
};
