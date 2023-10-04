import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Dialog,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	OutlinedInput,
	Grid,
	Select,
} from '@mui/material';
import { IngredientListData } from '../../../pages/Dashboard/Dashboard';

export const ActionMenu = ({ row }: { row: IngredientListData }) => {
	const [openEditModal, setOpenEditModal] = useState<boolean>(false);
	const [value, setValue] = useState<IngredientListData>();
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setOpenEditModal(false);
		setAnchorEl(null);
	};
	const add = () => {
		setOpenEditModal(true);
		// console.log('Add: ', row);
		// handleClose();
	};
	const remove = () => {
		console.log('remove: ', row);
		handleClose();
	};

	useEffect(() => {
		if (row) {
			setValue(row);
		}
	}, [row]);

	return (
		<div>
			<IconButton
				aria-label='more'
				id='long-button'
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem key='1' onClick={add}>
					Edit
				</MenuItem>
				<MenuItem key='2' onClick={remove}>
					Remove
				</MenuItem>
			</Menu>
			<Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
				<DialogTitle>Edit</DialogTitle>
				<DialogContent>
					{' '}
					<Grid container spacing={3} style={{ alignItems: 'center' }}>
						<Grid item xs={12} sm={3}>
							<InputLabel
								sx={{
									display: 'flex',
									fontWeight: 700,
								}}
							>
								Nama Bahan
							</InputLabel>
						</Grid>
						<Grid item xs={12} sm={9}>
							<TextField
								required
								id='title'
								name='title'
								fullWidth
								placeholder='Nama Bahan'
								size='small'
								autoComplete='off'
								variant='outlined'
								defaultValue={value?.name}
							/>
						</Grid>

						<Grid item xs={12} sm={3}>
							<InputLabel
								sx={{
									display: 'flex',
									fontWeight: 700,
								}}
							>
								Kategori
							</InputLabel>
						</Grid>
						<Grid item xs={12} sm={9}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={value?.category}
								onChange={(value) => console.log(value)}
								style={{ width: '100%' }}
							>
								<MenuItem value={'vegan'}>Vegan</MenuItem>
								<MenuItem value={'non vegan'}>Non Vegan</MenuItem>
								<MenuItem value={'both'}>Both</MenuItem>
							</Select>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
