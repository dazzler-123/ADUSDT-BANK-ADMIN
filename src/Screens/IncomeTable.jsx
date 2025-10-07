import React, { useState, useEffect } from 'react';
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
    MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, AttachMoney, Launch } from '@mui/icons-material';
import { getIncome } from '../APIs/authApis';

const statusColor = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Pending') return 'warning';
    if (status === 'Failed') return 'error';
    if (status === 'Processing') return 'info';
    return 'default';
};

const IncomeTable = () => {
    const [search, setSearch] = useState('');
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchIncomes = async () => {
            setLoading(true);
            try {
                // Format dates with proper time boundaries
                const formatStartDate = (date) => {
                    if (!date) return '';
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    return startOfDay.toISOString();
                };

                const formatEndDate = (date) => {
                    if (!date) return '';
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);
                    return endOfDay.toISOString();
                };

                const res = await getIncome({
                    page: page + 1,
                    limit: rowsPerPage,
                    search,
                    sortBy: sortConfig.key || '',
                    sortDir: sortConfig.direction,
                    startDate: formatStartDate(startDate),
                    endDate: formatEndDate(endDate),
                    status: statusFilter,
                    incomeType: statusFilter
                });
                const list = Array.isArray(res) ? res : (res?.data || []);
           
                setIncomeData(Array.isArray(list) ? list : []);
                setTotal(res.totalUsers);
            } catch (error) {
                console.error('Error fetching incomes:', error);
                setIncomeData([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };
        fetchIncomes();
    }, [page, rowsPerPage, search, sortConfig, startDate, endDate, statusFilter]);

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

    const handleOpenDetails = (income) => {
        setSelectedIncome(income);
        setDetailOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailOpen(false);
        setSelectedIncome(null);
    };

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearch('');
        setStatusFilter('');
        setPage(0);
    };

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleBSCScanClick = (txHash) => {
        if (txHash) {
            const bscScanUrl = `https://bscscan.com/tx/${txHash}`;
            window.open(bscScanUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3, background: '#f7fafd', minHeight: '100vh' }}>
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={2.4}>
                            <TextField
                                placeholder="Search incomes"
                                size="small"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(0);
                                }}
                                sx={{ width: '100%', background: 'white', borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <FormControl size="small" sx={{ width: '100%', background: 'white', borderRadius: 2 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Status"
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setPage(0);
                                    }}
                                >
                                    <MenuItem value="">All Status</MenuItem>
                                    <MenuItem value="RANK">RANK</MenuItem>
                                    <MenuItem value="LEVEL">LEVEL</MenuItem>
                                    <MenuItem value="DIRECT">DIRECT</MenuItem>
                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                    <MenuItem value="ROYALITY">ROYALITY</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                    setPage(0);
                                }}
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
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                    setPage(0);
                                }}
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
                                <TableCell onClick={() => handleSort('userName')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    User Name {sortConfig.key === 'userName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('amount')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('type')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Type {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSort('status')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                    Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                </TableCell>
                                <TableCell style={{ fontSize: '13px', padding: '6px 8px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                        <CircularProgress size={28} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {!loading && incomeData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                        No income records found
                                    </TableCell>
                                </TableRow>
                            )}
                            {!loading && incomeData.map((income) => (
                                <TableRow
                                    key={income?._id || income?.id}
                                    hover
                                    sx={{ '& > *': { borderBottom: 'unset', fontSize: '13px', padding: '6px 8px' } }}
                                >
                                    <TableCell>
                                        <AttachMoney sx={{ color: 'green', fontSize: 20 }} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {income?.userId?.name || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'green' }}>
                                            {formatCurrency(income?.amount)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {income?.type || income?.incomeType || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {income?.createdAt ? new Date(income?.createdAt).toLocaleString() : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={'Completed'}
                                            color={statusColor('Completed')}
                                            size="small"
                                            sx={{ fontWeight: 400, fontSize: 11, height: 22 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="View details"
                                            onClick={() => handleOpenDetails(income)}
                                            size="small"
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
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
                    <DialogTitle>Income Details</DialogTitle>
                    <DialogContent dividers>
                        {selectedIncome && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 1.5, columnGap: 2 }}>
                                <Typography variant="body2" color="text.secondary">ID</Typography>
                                <Typography variant="body2">{selectedIncome?._id || selectedIncome?.id || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">User Name</Typography>
                                <Typography variant="body2">{selectedIncome?.userName || selectedIncome?.user?.name || selectedIncome?.userId || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Amount</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'green' }}>
                                    {formatCurrency(selectedIncome?.amount)}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">Type</Typography>
                                <Typography variant="body2">{selectedIncome?.type || selectedIncome?.incomeType || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Description</Typography>
                                <Typography variant="body2">{selectedIncome?.description || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Status</Typography>
                                <Typography variant="body2">{selectedIncome?.status || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                                {selectedIncome?.txHash ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                wordBreak: 'break-all',
                                                color: 'primary.main',
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                                '&:hover': {
                                                    color: 'primary.dark'
                                                }
                                            }}
                                            onClick={() => handleBSCScanClick(selectedIncome.txHash)}
                                        >
                                            {selectedIncome.txHash}
                                        </Typography>
                                        <Launch 
                                            fontSize="small" 
                                            sx={{ 
                                                color: 'primary.main', 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: 'primary.dark'
                                                }
                                            }}
                                            onClick={() => handleBSCScanClick(selectedIncome.txHash)}
                                        />
                                    </Box>
                                ) : (
                                    <Typography variant="body2">N/A</Typography>
                                )}

                                <Typography variant="body2" color="text.secondary">Created At</Typography>
                                <Typography variant="body2">
                                    {selectedIncome?.createdAt ? new Date(selectedIncome.createdAt).toLocaleString() : ''}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">Updated At</Typography>
                                <Typography variant="body2">
                                    {selectedIncome?.updatedAt ? new Date(selectedIncome.updatedAt).toLocaleString() : ''}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} variant="contained">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
};

export default IncomeTable;
