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
    MenuItem,
    Card,
    CardContent,
    Tabs,
    Tab,
    Divider,
    Alert,
    Fade,
    Skeleton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    ArrowBack,
    AttachMoney,
    Receipt,
    People,
    Visibility,
    Launch,
    TrendingUp,
    AccountBalance,
    PersonAdd
} from '@mui/icons-material';
import { getAllUser, getUserIncomes, getUserTransactions, getUserReferrals } from '../APIs/appApis';

const UserReport = ({ userId, userName, onBack }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [incomeLoading, setIncomeLoading] = useState(false);
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [referralLoading, setReferralLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [incomeData, setIncomeData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);
    const [referralData, setReferralData] = useState([]);
    const [incomePage, setIncomePage] = useState(0);
    const [transactionPage, setTransactionPage] = useState(0);
    const [referralPage, setReferralPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [transactionTotal, setTransactionTotal] = useState(0);
    const [referralTotal, setReferralTotal] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailType, setDetailType] = useState('');



    const fetchUserData = useCallback(async () => {
        try {
            const res = await getAllUser({
                page: 1,
                limit: 1,
                search: userId
            });
            const users = Array.isArray(res) ? res : (res?.data || []);
            if (users.length > 0) {
                setUserData(users[0]);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [userId]);

    const fetchUserIncomes = useCallback(async () => {
        setIncomeLoading(true);
        try {
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

            const res = await getUserIncomes({
                userId: userId,
                page: incomePage + 1,
                limit: rowsPerPage,
                startDate: formatStartDate(startDate),
                endDate: formatEndDate(endDate),
            });
            
            // Update user data with totals from income response
            if (res?.totalEarned !== undefined && res?.totalInvested !== undefined) {
                setUserData(prev => ({
                    ...prev,
                    totalEarned: res.totalEarned,
                    totalInvested: res.totalInvested
                }));
            }
            
            const list = res?.data || [];
            setIncomeData(Array.isArray(list) ? list : []);
            setIncomeTotal(res?.totalIncomes || 0);
        } catch (error) {
            console.error('Error fetching incomes:', error);
            setIncomeData([]);
            setIncomeTotal(0);
        } finally {
            setIncomeLoading(false);
        }
    }, [userId, incomePage, rowsPerPage, startDate, endDate]);

    const fetchUserTransactions = useCallback(async () => {
        setTransactionLoading(true);
        try {
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

            const res = await getUserTransactions({
                userId: userId,
                page: transactionPage + 1,
                limit: rowsPerPage,
                startDate: formatStartDate(startDate),
                endDate: formatEndDate(endDate),
            });
            
            const list = res?.data || [];
            setTransactionData(Array.isArray(list) ? list : []);
            setTransactionTotal(res?.totalTransactions || 0);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactionData([]);
            setTransactionTotal(0);
        } finally {
            setTransactionLoading(false);
        }
    }, [userId, transactionPage, rowsPerPage, startDate, endDate]);

    const fetchUserReferrals = useCallback(async () => {
        setReferralLoading(true);
        try {
            const res = await getUserReferrals({
                userId: userId,
                page: referralPage + 1,
                limit: rowsPerPage,
            });
            
            const list = res?.data || [];
            setReferralData(Array.isArray(list) ? list : []);
            setReferralTotal(res?.totalReferrals || 0);
        } catch (error) {
            console.error('Error fetching referrals:', error);
            setReferralData([]);
            setReferralTotal(0);
        } finally {
            setReferralLoading(false);
        }
    }, [userId, referralPage, rowsPerPage]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleChangePage = (type) => (event, newPage) => {
        if (type === 'income') setIncomePage(newPage);
        else if (type === 'transaction') setTransactionPage(newPage);
        else if (type === 'referral') setReferralPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setIncomePage(0);
        setTransactionPage(0);
        setReferralPage(0);
    };

    const handleOpenDetails = (item, type) => {
        setSelectedItem(item);
        setDetailType(type);
        setDetailOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailOpen(false);
        setSelectedItem(null);
        setDetailType('');
    };

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const statusColor = (status) => {
        if (status === 'Completed') return 'success';
        if (status === 'Pending') return 'warning';
        if (status === 'Failed') return 'error';
        if (status === 'Processing') return 'info';
        return 'default';
    };
    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchUserIncomes();
            fetchUserTransactions();
            fetchUserReferrals();
        }
    }, [userId, incomePage, transactionPage, referralPage, startDate, endDate, fetchUserData, fetchUserIncomes, fetchUserTransactions, fetchUserReferrals]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3, background: '#f7fafd', minHeight: 'auto' }}>
                {/* Header */}
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={onBack} sx={{ background: 'white', boxShadow: 1 }}>
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3748' }}>
                            User Report
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {userName || 'User Details'}
                        </Typography>
                    </Box>
                </Box>

                {/* User Summary Cards */}
                {userData && (
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        {/* <Grid item xs={12} md={3}>
                            <Card sx={{ background: '#6c2b8f', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ width: 50, height: 50, bgcolor: 'rgba(255,255,255,0.2)' }}>
                                            {userData?.name?.charAt(0) || 'U'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {userData?.name || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                {userData?.email || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid> */}
                        <Grid item xs={12} md={3}>
                            <Card sx={{ background: '#4caf50', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {formatCurrency(userData?.totalEarned || 0)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                Total Earned
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card sx={{ background: '#2196f3', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <AccountBalance sx={{ fontSize: 40, opacity: 0.8 }} />
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {formatCurrency(userData?.totalInvested || 0)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                Total Invested
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card sx={{ background: '#ff9800', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <PersonAdd sx={{ fontSize: 40, opacity: 0.8 }} />
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {referralTotal || 0}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                Total Referrals
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {/* Filters */}
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setStartDate(null);
                                    setEndDate(null);
                                }}
                                sx={{ width: '100%', height: '40px' }}
                            >
                                Clear Filters
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Tabs */}
                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tab
                            label={`Incomes (${incomeTotal})`}
                            icon={<AttachMoney />}
                            iconPosition="start"
                        />
                        <Tab
                            label={`Transactions (${transactionTotal})`}
                            icon={<Receipt />}
                            iconPosition="start"
                        />
                        <Tab
                            label={`Referrals (${referralTotal})`}
                            icon={<People />}
                            iconPosition="start"
                        />
                    </Tabs>

                    {/* Incomes Tab */}
                    {activeTab === 0 && (
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {incomeLoading && (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                                    <CircularProgress size={28} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!incomeLoading && incomeData.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                                    No income records found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!incomeLoading && incomeData.map((income) => (
                                            <TableRow key={income?._id || income?.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        {income?.type || income?.incomeType || 'N/A'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'green' }}>
                                                        {formatCurrency(income?.amount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {income?.createdAt ? new Date(income.createdAt).toLocaleString() : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label="Completed"
                                                        color="success"
                                                        size="small"
                                                        sx={{ fontWeight: 400, fontSize: 11, height: 22 }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleOpenDetails(income, 'income')}
                                                        size="small"
                                                    >
                                                        <Visibility fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={incomeTotal}
                                page={incomePage}
                                onPageChange={handleChangePage('income')}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                            />
                        </Box>
                    )}

                    {/* Transactions Tab */}
                    {activeTab === 1 && (
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Transaction ID</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactionLoading && (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                                    <CircularProgress size={28} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!transactionLoading && transactionData.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                                    No transaction records found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!transactionLoading && transactionData.map((transaction) => (
                                            <TableRow key={transaction?._id || transaction?.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#5b2be7' }}>
                                                        {transaction?.transactionId || transaction?.txnId || transaction?._id?.slice(-8) || 'N/A'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                        {transaction?.type || transaction?.transactionType || 'N/A'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{
                                                        fontWeight: 600,
                                                        color: transaction?.type === 'debit' ? 'red' : 'green'
                                                    }}>
                                                        {transaction?.type === 'debit' ? '-' : '+'}{formatCurrency(transaction?.amount)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {transaction?.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'N/A'}
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
                                                        onClick={() => handleOpenDetails(transaction, 'transaction')}
                                                        size="small"
                                                    >
                                                        <Visibility fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={transactionTotal}
                                page={transactionPage}
                                onPageChange={handleChangePage('transaction')}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                            />
                        </Box>
                    )}

                    {/* Referrals Tab */}
                    {activeTab === 2 && (
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            {/* <TableCell>Mobile</TableCell> */}
                                            <TableCell>Join Date</TableCell>
                                            {/* <TableCell>Status</TableCell> */}
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {referralLoading && (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                                    <CircularProgress size={28} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!referralLoading && referralData.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                                    No referral records found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!referralLoading && referralData.map((referral) => (
                                            <TableRow key={referral?._id || referral?.id} hover>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar sx={{ width: 30, height: 30 }} src={referral?.avatarName} />
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            {referral?.userId?.name || 'N/A'}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {referral?.userId?.email || 'N/A'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {referral?.createdAt ? new Date(referral.createdAt).toLocaleString() : 'N/A'}
                                                </TableCell>
                                                
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleOpenDetails(referral, 'referral')}
                                                        size="small"
                                                    >
                                                        <Visibility fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={referralTotal}
                                page={referralPage}
                                onPageChange={handleChangePage('referral')}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                            />
                        </Box>
                    )}
                </Paper>

                {/* Detail Dialog */}
                <Dialog open={detailOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {detailType === 'income' && 'Income Details'}
                        {detailType === 'transaction' && 'Transaction Details'}
                        {detailType === 'referral' && 'Referral Details'}
                    </DialogTitle>
                    <DialogContent dividers>
                        {selectedItem && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 1.5, columnGap: 2 }}>
                                {detailType === 'income' && (
                                    <>
                                        <Typography variant="body2" color="text.secondary">ID</Typography>
                                        <Typography variant="body2">{selectedItem?._id || selectedItem?.id || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Amount</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'green' }}>
                                            {formatCurrency(selectedItem?.amount)}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">Type</Typography>
                                        <Typography variant="body2">{selectedItem?.type || selectedItem?.incomeType || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Description</Typography>
                                        <Typography variant="body2">{selectedItem?.description || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Created At</Typography>
                                        <Typography variant="body2">
                                            {selectedItem?.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : ''}
                                        </Typography>
                                    </>
                                )}

                                {detailType === 'transaction' && (
                                    <>
                                        <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#5b2be7' }}>
                                            {selectedItem?.transactionId || selectedItem?.txnId || selectedItem?._id || ''}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">Amount</Typography>
                                        <Typography variant="body2" sx={{
                                            fontWeight: 600,
                                            color: selectedItem?.type === 'debit' ? 'red' : 'green'
                                        }}>
                                            {selectedItem?.type === 'debit' ? '-' : '+'}{formatCurrency(selectedItem?.amount)}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">Type</Typography>
                                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                            {selectedItem?.type || selectedItem?.transactionType || ''}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">Status</Typography>
                                        <Typography variant="body2">{selectedItem?.status || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Description</Typography>
                                        <Typography variant="body2">{selectedItem?.description || selectedItem?.remarks || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Created At</Typography>
                                        <Typography variant="body2">
                                            {selectedItem?.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : ''}
                                        </Typography>
                                    </>
                                )}

                                {detailType === 'referral' && (
                                    <>
                                        <Typography variant="body2" color="text.secondary">ID</Typography>
                                        <Typography variant="body2">{selectedItem?._id || selectedItem?.id || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Name</Typography>
                                        <Typography variant="body2">{selectedItem?.name || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Email</Typography>
                                        <Typography variant="body2">{selectedItem?.email || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Mobile</Typography>
                                        <Typography variant="body2">{selectedItem?.mobile || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Status</Typography>
                                        <Typography variant="body2">{selectedItem?.status || ''}</Typography>

                                        <Typography variant="body2" color="text.secondary">Join Date</Typography>
                                        <Typography variant="body2">
                                            {selectedItem?.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : ''}
                                        </Typography>
                                    </>
                                )}
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

export default UserReport;
