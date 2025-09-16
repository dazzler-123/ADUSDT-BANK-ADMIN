import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Chip,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    TablePagination,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextareaAutosize
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, Add, Save, Cancel, Edit, Block } from '@mui/icons-material';
import { getAnnouncement, createAnnouncement, updateAnnouncement, updateAnnouncementDeactive } from '../APIs/authApis';

const statusColor = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'Inactive') return 'error';
    if (status === 'Draft') return 'warning';
    return 'default';
};

const AnnouncementTable = () => {
    const [search, setSearch] = useState('');
    const [announcementData, setAnnouncementData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        message: '',
        isActive: true
    });
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState({
        id: '',
        title: '',
        message: '',
        isActive: true
    });

    const fetchAnnouncements = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAnnouncement({
                page: page + 1,
                limit: rowsPerPage,
                search,
                sortBy: sortConfig.key || '',
                sortDir: sortConfig.direction,
                startDate: startDate ? startDate.toISOString().split('T')[0] : '',
                endDate: endDate ? endDate.toISOString().split('T')[0] : '',
                status: statusFilter,
            });
            const list = Array.isArray(res) ? res : (res?.data || res?.items || res?.results || []);
            const totalCount = res?.total || res?.totalCount || 0;
            setAnnouncementData(Array.isArray(list) ? list : []);
            setTotal(totalCount);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setAnnouncementData([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, search, sortConfig, startDate, endDate, statusFilter]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const handleOpenDetails = (announcement) => {
        setSelectedAnnouncement(announcement);
        setDetailOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailOpen(false);
        setSelectedAnnouncement(null);
    };

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearch('');
        setStatusFilter('');
        setPage(0);
    };

    const handleOpenCreateModal = () => {
        setNewAnnouncement({
            title: '',
            message: '',
            isActive: true
        });
        setCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false);
        setNewAnnouncement({
            title: '',
            message: '',
            isActive: true
        });
    };

    const handleCreateAnnouncement = async () => {
        console.log(newAnnouncement);   
        
        if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        setIsCreating(true);
        try {
            await createAnnouncement({
                title: newAnnouncement.title.trim(),
                message: newAnnouncement.message.trim(),
                isActive: newAnnouncement.isActive
            }).then(() => { 
                alert('Announcement created successfully!');
                handleCloseCreateModal();
            }).catch(() => {
                alert('Error creating announcement. Please try again.');
            });
            
         
            
            // Refresh the announcements data
            await fetchAnnouncements();
        } catch (error) {
            console.error('Error creating announcement:', error);
            alert('Error creating announcement. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    const handleInputChange = (field, value) => {
        setNewAnnouncement(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEditInputChange = (field, value) => {
        setEditingAnnouncement(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleOpenEditModal = (announcement) => {
        setEditingAnnouncement({
            id: announcement._id || announcement.id,
            title: announcement.title || '',
            message: announcement.message || '',
            isActive: announcement.isActive || false
        });
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setEditingAnnouncement({
            id: '',
            title: '',
            message: '',
            isActive: true
        });
    };

    const handleUpdateAnnouncement = async () => {
        if (!editingAnnouncement.title.trim() || !editingAnnouncement.message.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        setIsUpdating(true);
        try {
            await updateAnnouncement({
                id: editingAnnouncement.id,
                title: editingAnnouncement.title.trim(),
                message: editingAnnouncement.message.trim(),
                isActive: editingAnnouncement.isActive
            });
            
            alert('Announcement updated successfully!');
            handleCloseEditModal();
            await fetchAnnouncements();
        } catch (error) {
            console.error('Error updating announcement:', error);
            alert('Error updating announcement. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeactivateAnnouncement = async (announcement) => {
        if (window.confirm('Are you sure you want to deactivate this announcement?')) {
            try {
                await updateAnnouncementDeactive({ id: announcement._id || announcement.id });
                alert('Announcement deactivated successfully!');
                await fetchAnnouncements();
            } catch (error) {
                console.error('Error deactivating announcement:', error);
                alert('Error deactivating announcement. Please try again.');
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3, background: '#f7fafd', minHeight: '100vh' }}>
                {/* Header with Create Button */}
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#5b2be7', fontWeight: 600 }}>
                        Announcements
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenCreateModal}
                        sx={{
                            backgroundColor: '#5b2be7',
                            '&:hover': {
                                backgroundColor: '#4a1fd1'
                            },
                            px: 3,
                            py: 1.5,
                            borderRadius: 2
                        }}
                    >
                        Create New Announcement
                    </Button>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={2.4}>
                            <TextField
                                placeholder="Search announcements"
                                size="small"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{ width: '100%', background: 'white', borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <FormControl size="small" sx={{ width: '100%', background: 'white', borderRadius: 2 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Status"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="">All Status</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                    <MenuItem value="Draft">Draft</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        sx: { width: '100%', background: 'white', borderRadius: 2 }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        sx: { width: '100%', background: 'white', borderRadius: 2 }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <Button
                                variant="outlined"
                                onClick={handleClearFilters}
                                sx={{ width: '100%', height: '40px' }}
                            >
                                Clear Filters
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell onClick={() => handleSort('title')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Title {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('description')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Description {sortConfig.key === 'message' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Created Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('isActive')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Status {sortConfig.key === 'isActive' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell style={{ fontSize: '13px', padding: '6px 8px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                        <CircularProgress size={28} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {!loading && announcementData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                        No announcements found
                                    </TableCell>
                                </TableRow>
                            )}
                            {!loading && announcementData.map((announcement) => (
                                <TableRow
                                    key={announcement?._id || announcement?.id}
                                    hover
                                    sx={{ '& > *': { borderBottom: 'unset', fontSize: '13px', padding: '6px 8px' } }}
                                >
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {announcement?.title || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{
                                            maxWidth: 200,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {announcement?.message || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {announcement?.createdAt ? new Date(announcement.createdAt).toDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={announcement?.isActive ? 'Active' : 'Inactive'}
                                            color={statusColor(announcement?.isActive ? 'Active' : 'Inactive')}
                                            size="small"
                                            sx={{ fontWeight: 400, fontSize: 11, height: 22 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                aria-label="View details"
                                                onClick={() => handleOpenDetails(announcement)}
                                                size="small"
                                                sx={{ color: '#5b2be7' }}
                                            >
                                                <Visibility fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Edit announcement"
                                                onClick={() => handleOpenEditModal(announcement)}
                                                size="small"
                                                sx={{ color: '#1976d2' }}
                                            >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            {announcement?.isActive && (
                                                <IconButton
                                                    aria-label="Deactivate announcement"
                                                    onClick={() => handleDeactivateAnnouncement(announcement)}
                                                    size="small"
                                                    sx={{ color: '#d32f2f' }}
                                                >
                                                    <Block fontSize="small" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </TableContainer>

                <Dialog open={detailOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
                    <DialogTitle>Announcement Details</DialogTitle>
                    <DialogContent dividers>
                        {selectedAnnouncement && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 1.5, columnGap: 2 }}>
                                <Typography variant="body2" color="text.secondary">ID</Typography>
                                <Typography variant="body2">{selectedAnnouncement?._id || selectedAnnouncement?.id || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Title</Typography>
                                <Typography variant="body2">{selectedAnnouncement?.title || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Description</Typography>
                                <Typography variant="body2">{selectedAnnouncement?.description || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Status</Typography>
                                <Typography variant="body2">{selectedAnnouncement?.status || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Created At</Typography>
                                <Typography variant="body2">
                                    {selectedAnnouncement?.createdAt ? new Date(selectedAnnouncement.createdAt).toLocaleString() : ''}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">Updated At</Typography>
                                <Typography variant="body2">
                                    {selectedAnnouncement?.updatedAt ? new Date(selectedAnnouncement.updatedAt).toLocaleString() : ''}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                            <Button onClick={handleCloseDetails} variant="outlined">Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Create Announcement Modal */}
                <Dialog open={createModalOpen} onClose={handleCloseCreateModal} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ color: '#5b2be7', fontWeight: 600 }}>
                        Create New Announcement
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                            {/* Title Field */}
                            <TextField
                                label="Title"
                                placeholder="Enter announcement title"
                                value={newAnnouncement.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                fullWidth
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                            />

                            {/* Message Field */}
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                                    Message *
                                </Typography>
                                <TextareaAutosize
                                    minRows={6}
                                    maxRows={12}
                                    placeholder="Enter announcement message..."
                                    value={newAnnouncement.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical',
                                        outline: 'none'
                                    }}
                                />
                            </Box>

                            {/* Status Field */}
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={newAnnouncement.isActive ? 'Active' : 'Inactive'}
                                    label="Status"
                                    onChange={(e) => handleInputChange('isActive', e.target.value === 'Active')}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={handleCloseCreateModal}
                            variant="outlined"
                            startIcon={<Cancel />}
                            disabled={isCreating}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateAnnouncement}
                            variant="contained"
                            startIcon={<Save />}
                            disabled={isCreating || !newAnnouncement.title.trim() || !newAnnouncement.message.trim()}
                            sx={{
                                backgroundColor: '#5b2be7',
                                '&:hover': {
                                    backgroundColor: '#4a1fd1'
                                }
                            }}
                        >
                            {isCreating ? 'Creating...' : 'Create Announcement'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Announcement Modal */}
                <Dialog open={editModalOpen} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ color: '#5b2be7', fontWeight: 600 }}>
                        Edit Announcement
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                            {/* Title Field */}
                            <TextField
                                label="Title"
                                placeholder="Enter announcement title"
                                value={editingAnnouncement.title}
                                onChange={(e) => handleEditInputChange('title', e.target.value)}
                                fullWidth
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                            />

                            {/* Message Field */}
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                                    Message *
                                </Typography>
                                <TextareaAutosize
                                    minRows={6}
                                    maxRows={12}
                                    placeholder="Enter announcement message..."
                                    value={editingAnnouncement.message}
                                    onChange={(e) => handleEditInputChange('message', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical',
                                        outline: 'none'
                                    }}
                                />
                            </Box>

                            {/* Status Field */}
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={editingAnnouncement.isActive ? 'Active' : 'Inactive'}
                                    label="Status"
                                    onChange={(e) => handleEditInputChange('isActive', e.target.value === 'Active')}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={handleCloseEditModal}
                            variant="outlined"
                            startIcon={<Cancel />}
                            disabled={isUpdating}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateAnnouncement}
                            variant="contained"
                            startIcon={<Save />}
                            disabled={isUpdating || !editingAnnouncement.title.trim() || !editingAnnouncement.message.trim()}
                            sx={{
                                backgroundColor: '#5b2be7',
                                '&:hover': {
                                    backgroundColor: '#4a1fd1'
                                }
                            }}
                        >
                            {isUpdating ? 'Updating...' : 'Update Announcement'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
};

export default AnnouncementTable;
