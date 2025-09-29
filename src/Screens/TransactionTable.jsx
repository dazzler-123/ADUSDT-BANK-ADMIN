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
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Edit, Delete, KeyboardArrowDown, KeyboardArrowUp, VideoCall } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { getTransaction } from '../APIs/authApis';

const statusColor = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Pending') return 'warning';
    if (status === 'Failed') return 'error';
    if (status === 'Processing') return 'info';
    if (status === 'Cancelled') return 'default';
    return 'default';
};

const TransactionTable = () => {
    const [search, setSearch] = useState('');
    const [transactionData, setTransactionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
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

                const res = await getTransaction({
                    page: page + 1,
                    limit: rowsPerPage,
                    search,
                    sortBy: sortConfig.key || '',
                    sortDir: sortConfig.direction,
                    startDate: formatStartDate(startDate),
                    endDate: formatEndDate(endDate),
                    status: statusFilter,
                });
                const list = Array.isArray(res) ? res : (res?.data || res?.items || res?.results || []);
                const totalCount = res?.total || res?.totalCount || res?.totalTransactions || 0;
                setTransactionData(Array.isArray(list) ? list : []);
                setTotal(totalCount);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactionData([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
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

    const handleOpenDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setDetailOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailOpen(false);
        setSelectedTransaction(null);
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

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3, background: '#f7fafd', minHeight: '100vh' }}>
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={2.4}>
                            <TextField
                                placeholder="Search transactions"
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
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Failed">Failed</MenuItem>
                                    <MenuItem value="Processing">Processing</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                            <TableCell onClick={() => handleSort('transactionId')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Transaction ID {sortConfig.key === 'transactionId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('userName')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                User {sortConfig.key === 'userName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
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
                                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                                    <CircularProgress size={28} />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && transactionData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No transactions found
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && transactionData.map((transaction) => (
                            <TableRow
                                key={transaction?._id || transaction?.id}
                                hover
                                sx={{ '& > *': { borderBottom: 'unset', fontSize: '13px', padding: '6px 8px' } }}
                            >
                                <TableCell>
                                    <ReceiptIcon sx={{ color: '#5b2be7', fontSize: 20 }} />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#5b2be7' }}>
                                        {transaction?.transactionId || transaction?.txnId || transaction?._id?.slice(-8) || 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar sx={{ width: 30, height: 30 }} src={transaction?.user?.avatarName || transaction?.avatarName} alt={transaction?.userName || transaction?.user?.name || ''} />
                                        <Typography variant="body2">
                                            {transaction?.userId || 'N/A'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: transaction?.type === 'debit' ? 'red' : 'green' }}>
                                        {transaction?.type === 'debit' ? '-' : '+'}{formatCurrency(transaction?.amount)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                        {transaction?.type || transaction?.transactionType || 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {transaction?.createdAt ? new Date(transaction.createdAt).toDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={transaction?.status || 'Pending'}
                                        color={statusColor(transaction?.status || 'Pending')}
                                        size="small"
                                        sx={{ fontWeight: 400, fontSize: 11, height: 22 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton 
                                        aria-label="View details" 
                                        onClick={() => handleOpenDetails(transaction)} 
                                        size="small"
                                    >
                                        <VisibilityIcon fontSize="small" />
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
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogContent dividers>
                    {selectedTransaction && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 1.5, columnGap: 2 }}>
                            <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#5b2be7' }}>
                                {selectedTransaction?.transactionId || selectedTransaction?.txnId || selectedTransaction?._id || ''}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">User</Typography>
                            <Typography variant="body2">{selectedTransaction?.userName || selectedTransaction?.user?.name || selectedTransaction?.userId || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Amount</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: selectedTransaction?.type === 'debit' ? 'red' : 'green' }}>
                                {selectedTransaction?.type === 'debit' ? '-' : '+'}{formatCurrency(selectedTransaction?.amount)}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">Type</Typography>
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                {selectedTransaction?.type || selectedTransaction?.transactionType || ''}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">Description</Typography>
                            <Typography variant="body2">{selectedTransaction?.description || selectedTransaction?.remarks || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Status</Typography>
                            <Typography variant="body2">{selectedTransaction?.status || ''}</Typography>

                            <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                            <Typography variant="body2">{selectedTransaction?.paymentMethod || selectedTransaction?.method || 'N/A'}</Typography>

                            <Typography variant="body2" color="text.secondary">Reference Number</Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                {selectedTransaction?.referenceNumber || selectedTransaction?.refNo || ''}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">Wallet Address</Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                {selectedTransaction?.walletAddress || selectedTransaction?.fromAddress || selectedTransaction?.toAddress || ''}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">Created At</Typography>
                            <Typography variant="body2">
                                {selectedTransaction?.createdAt ? new Date(selectedTransaction.createdAt).toLocaleString() : ''}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">Updated At</Typography>
                            <Typography variant="body2">
                                {selectedTransaction?.updatedAt ? new Date(selectedTransaction.updatedAt).toLocaleString() : ''}
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

export default TransactionTable;
