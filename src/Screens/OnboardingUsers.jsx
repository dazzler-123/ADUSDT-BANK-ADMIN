import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Avatar,
    Chip,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    TablePagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import { Edit, Delete, KeyboardArrowDown, KeyboardArrowUp, VideoCall, Assessment } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import VideoCallIcon from '@mui/icons-material/VideoCall';
import { getAllUser } from '../APIs/appApis';
import UserReport from './UserReport';




const statusColor = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Pending') return 'warning';
    return 'default';
};

const OnboardingUsers = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [userData,setUserData]=useState([])
    const [loading,setLoading]=useState(false)
    const [page,setPage]=useState(0)
    const [rowsPerPage,setRowsPerPage]=useState(10)
    const [total,setTotal]=useState(0)
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [detailOpen,setDetailOpen]=useState(false)
    const [selectedUser,setSelectedUser]=useState(null)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [reportUser, setReportUser] = useState(null);

    // Debounce search - only search after 3 characters and 500ms delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.length >= 3 || search.length === 0) {
                setDebouncedSearch(search);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try{
                // Format dates with proper time boundaries
                const formatStartDate = (dateString) => {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    date.setHours(0, 0, 0, 0);
                    return date.toISOString();
                };

                const formatEndDate = (dateString) => {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    date.setHours(23, 59, 59, 999);
                    return date.toISOString();
                };

                const res = await getAllUser({
                    page:page+1,
                    limit: rowsPerPage,
                    search: debouncedSearch,
                    sortBy: sortConfig.key || '',
                    sortDir: sortConfig.direction,
                    startDate: formatStartDate(startDate),
                    endDate: formatEndDate(endDate),
                    status,
                });
                const list = Array.isArray(res) ? res : (res?.data || res?.items || res?.results || []);
                const totalCount =res.totalUsers
                setUserData(Array.isArray(list) ? list : [])
                setTotal(totalCount)
            }catch{
                setUserData([])
                setTotal(0)
            }finally{
                setLoading(false)
            }
        }
        fetchUsers()
    }, [page, rowsPerPage, debouncedSearch, sortConfig, startDate, endDate, status])


    // Server-side pagination: data is already paginated from backend

    const handleChangePage = (_event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const handleOpenDetails = (user) => {
        setSelectedUser(user)
        setDetailOpen(true)
    }

    const handleCloseDetails = () => {
        setDetailOpen(false)
        setSelectedUser(null)
    }

    const handleViewReport = (user) => {
        setReportUser(user)
        setShowReport(true)
    }

    const handleCloseReport = () => {
        setShowReport(false)
        setReportUser(null)
    }

    const handleClearFilters = () => {
        setStartDate('')
        setEndDate('')
        setStatus('')
        setSearch('')
        setDebouncedSearch('')
        setPage(0)
    }


    return (
        <Box sx={{ p: 3, background: '#f7fafd', minHeight: '100vh' }}>
            {/* Search and Filters Section */}
            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            placeholder="Search by name, email, mobile"
                            size="small"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(0);
                            }}
                            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            label="Start Date"
                            type="date"
                            size="small"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setPage(0);
                            }}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            label="End Date"
                            type="date"
                            size="small"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setPage(0);
                            }}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} minWidth={150}>
                        <FormControl size="small" sx={{ width: '100%', background: 'white', borderRadius: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    setPage(0);
                                }}
                                label="Status"
                            >
                                <MenuItem value="">All Status</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            variant="outlined"
                            onClick={handleClearFilters}
                            sx={{ 
                                mr: 1, 
                                background: 'white', 
                                borderRadius: 2,
                                textTransform: 'none'
                            }}
                        >
                            Clear Filters
                        </Button>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Total Users: {total}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell onClick={() => handleSort('loanApplication')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Name {sortConfig.key === 'loanApplication' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('dateOfApplication')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Date of joining {sortConfig.key === 'dateOfApplication' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('loanProduvct')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Mobile {sortConfig.key === 'loanProduvct' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('status')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Email {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell style={{ fontSize: '13px', padding: '6px 8px' }}>Status</TableCell>

                            <TableCell style={{ fontSize: '13px', padding: '6px 8px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                                    <CircularProgress size={28} />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && userData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No record found
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && userData.map((user) => (
                            <React.Fragment key={user?._id || user?.id}>
                                <TableRow
                                    hover
                                    sx={{ '& > *': { borderBottom: 'unset', fontSize: '13px', padding: '6px 8px' } }}
                                >
                                    <TableCell>
                                       
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                                            <Avatar sx={{ width: 30, height: 30 }} src={user?.avatarName} alt={user?.name || user?.fullName || user?.username || ''} />
                                            {user?.name }
                                        </Box>
                                    </TableCell>
                                    <TableCell>{new Date(user?.createdAt).toDateString() || ''}</TableCell>
                                 
                                    <TableCell>{user?.mobile ||''}</TableCell>
                                    <TableCell>{user?.email || user?.mobile || ''}</TableCell>
                                   
                                    <TableCell>
                                        <Chip
                                            label={user?.status || 'Pending'}
                                            color={statusColor(user?.status || 'Pending')}
                                            size="small"
                                            sx={{ fontWeight: 400, fontSize: 11, height: 22 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton 
                                                aria-label="View details" 
                                                onClick={() => handleOpenDetails(user)} 
                                                size="small"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton 
                                                aria-label="View report" 
                                                onClick={() => handleViewReport(user)} 
                                                size="small"
                                                sx={{ color: 'success.main' }}
                                            >
                                                <Assessment fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>

                            </React.Fragment>
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
                    rowsPerPageOptions={[5,10,25,50]}
                />
            </TableContainer>

            <Dialog open={detailOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent dividers>
                    {selectedUser && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 1.5, columnGap: 2 }}>
                            <Typography variant="body2" color="text.secondary">ID</Typography>
                            <Typography variant="body2">{selectedUser?._id || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Name</Typography>
                            <Typography variant="body2">{selectedUser?.name || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Email</Typography>
                            <Typography variant="body2">{selectedUser?.email || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Mobile</Typography>
                            <Typography variant="body2">{selectedUser?.mobile || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Wallet Address</Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{selectedUser?.walletAddress || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Role</Typography>
                            <Typography variant="body2">{selectedUser?.role || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Status</Typography>
                            <Typography variant="body2">{selectedUser?.status || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Total Earned</Typography>
                            <Typography variant="body2">{String(selectedUser?.totalEarned ?? '')}</Typography>

                            <Typography variant="body2" color="text.secondary">Total Invested</Typography>
                            <Typography variant="body2">{String(selectedUser?.totalInvested ?? '')}</Typography>

                            <Typography variant="body2" color="text.secondary">Sponsor Name</Typography>
                            <Typography variant="body2">{selectedUser?.sponsorId?.name || ''},  {selectedUser?.sponsorId?.email || ''}</Typography>
                          

                            <Typography variant="body2" color="text.secondary">Referral Code</Typography>
                            <Typography variant="body2">{selectedUser?.referralCode || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Created At</Typography>
                            <Typography variant="body2">{selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Updated At</Typography>
                            <Typography variant="body2">{selectedUser?.updatedAt ? new Date(selectedUser.updatedAt).toLocaleString() : ''}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>

            {/* User Report Modal */}
            <Dialog 
                open={showReport} 
                onClose={handleCloseReport} 
                maxWidth="lg" 
                fullWidth
            >
                {showReport && reportUser && (
                    <UserReport 
                        userId={reportUser?._id || reportUser?.id}
                        userName={reportUser?.name || reportUser?.fullName || reportUser?.username}
                        onBack={handleCloseReport}
                    />
                )}
            </Dialog>

        </Box>
    );
};

export default OnboardingUsers;
