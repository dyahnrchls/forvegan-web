import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Dialog,
	InputLabel,
	Grid,
	Select,
	DialogContentText,
} from '@mui/material';
import { IngredientListData } from '../../../pages/Dashboard/Dashboard';
import axios from 'axios';

export const ActionMenu = ({ row, getIngredientList }: { row: IngredientListData; getIngredientList: () => void }) => {
	const [openEditModal, setOpenEditModal] = useState<boolean>(false);
	const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
	const [value, setValue] = useState<IngredientListData>(row);
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setOpenEditModal(false);
		setOpenRemoveModal(false);
		setAnchorEl(null);
	};
	const edit = () => {
		setOpenEditModal(true);
	};
	const onEditSave = () => {
		axios
			.put(`http://localhost:8080/ingredient/${row.id}`, {
				name: value?.name,
				category: value?.category,
			})
			.then(() => {
				getIngredientList();
				handleClose();
			});
	};
	const remove = () => {
		setOpenRemoveModal(true);
	};
	const onRemove = () => {
		axios.delete(`http://localhost:8080/ingredient/${row.id}`).then(() => {
			getIngredientList();
			handleClose();
		});
	};
	const isDisabled = () => {
		if (value?.name?.length === 0) {
			return true;
		}
		if (value?.name === row?.name && value?.category === row?.category) {
			return true;
		}
		return false;
	};

	return (
		<div>
			<IconButton
				aria-label='more'
				id='long-button'
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				<MenuItem key='1' onClick={edit}>
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
								}}>
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
								onChange={(e) => setValue({ ...value, name: e.target.value })}
							/>
						</Grid>

						<Grid item xs={12} sm={3}>
							<InputLabel
								sx={{
									display: 'flex',
									fontWeight: 700,
								}}>
								Kategori
							</InputLabel>
						</Grid>
						<Grid item xs={12} sm={9}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={value?.category}
								onChange={(e) => setValue({ ...value, category: e.target.value })}
								style={{ width: '100%' }}>
								<MenuItem value={'vegan'}>Vegan</MenuItem>
								<MenuItem value={'non vegan'}>Non Vegan</MenuItem>
								<MenuItem value={'both'}>Both</MenuItem>
							</Select>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='outlined' style={{ color: 'black', borderColor: '#D0D0D0' }}>
						Cancel
					</Button>
					<Button
						disabled={isDisabled()}
						onClick={onEditSave}
						variant='contained'
						style={{ color: 'white', backgroundColor: '#4A6130' }}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openRemoveModal}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>Remove</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>Are you sure want to remove {row?.name} ?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='outlined' style={{ color: 'black', borderColor: '#D0D0D0' }}>
						Cancel
					</Button>
					<Button onClick={onRemove} variant='contained' style={{ color: 'white', backgroundColor: '#4A6130' }}>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
