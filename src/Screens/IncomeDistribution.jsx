import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Stack, 
    CircularProgress, 
    Alert,
    Divider,
    Grid,
    Paper,
    Chip,
    LinearProgress,
    Tooltip,
    IconButton,
    Collapse
} from '@mui/material';
import { 
    AttachMoney, 
    TrendingUp, 
    Download, 
    AccountBalanceWallet,
    ExpandMore,
    ExpandLess,
    Refresh,
    CheckCircle,
    Error
} from '@mui/icons-material';
import { getCreditAdminIncome, getCreditAdminIncome7, getIncomeBalances } from '../APIs/appApis';

const IncomeDistribution = () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [balanceError, setBalanceError] = useState(null);
    const [walletBalance, setWalletBalance] = useState({
        Admin_wallet: 0,
        Dummy_wallet: 0
    });

    // Fetch admin balance data from API
    const fetchBalanceData = async () => {
        try {
            setBalanceLoading(true);
            setBalanceError(null);
            const response = await getIncomeBalances();
            console.log(response);
            setWalletBalance(response);
        } catch (err) {
            console.error('Error fetching balance data:', err);
            setBalanceError(err.message || 'Failed to fetch balance data');
            // Fallback to dummy data on error
            setWalletBalance({
                admin_wallet: 2847650.50,
                dummy_wallet: 125430.75
            });
        } finally {
            setBalanceLoading(false);
        }
    };

    useEffect(() => {
        fetchBalanceData();
    }, []);

    const handleGetCreditAdminIncome = async () => {
        try {
            setLoading1(true);
            setError1(null);
            const response = await getCreditAdminIncome();
            setData1(response);
        } catch (err) {
            console.error('Error fetching credit admin income:', err);
            setError1(err.message || 'Failed to fetch credit admin income data');
        } finally {
            setLoading1(false);
        }
    };

    const handleGetCreditAdminIncome7 = async () => {
        try {
            setLoading2(true);
            setError2(null);
            const response = await getCreditAdminIncome7();
            setData2(response);
        } catch (err) {
            console.error('Error fetching credit admin income 7:', err);
            setError2(err.message || 'Failed to fetch credit admin income 7 data');
        } finally {
            setLoading2(false);
        }
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} color="#5b6be7" mb={1}>
                    Income Distribution
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage and monitor income distribution across the platform
                </Typography>
            </Box>

            {/* Admin Balance Overview */}
            <Card sx={{ 
                borderRadius: 3, 
                mb: 4, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Box sx={{
                                p: 2,
                                borderRadius: '16px',
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <AccountBalanceWallet sx={{ fontSize: 32 }} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={700}>
                                    Admin Balance
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    System administrator balance overview
                                </Typography>
                            </Box>
                        </Stack>
                        <Tooltip title="Refresh Admin Balance">
                            <IconButton 
                                sx={{ color: 'white' }}
                                onClick={fetchBalanceData}
                                disabled={balanceLoading}
                            >
                                {balanceLoading ? <CircularProgress size={24} color="inherit" /> : <Refresh />}
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    {balanceError && (
                        <Alert 
                            severity="warning" 
                            sx={{ 
                                mb: 3, 
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                                color: 'white',
                                border: '1px solid rgba(255, 193, 7, 0.3)',
                                '& .MuiAlert-icon': {
                                    color: '#ffc107'
                                }
                            }}
                        >
                            {balanceError} - Showing fallback data
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        {/* Admin Wallet */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ 
                                p: 2, 
                                background: 'rgba(255,255,255,0.15)', 
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                    Admin Wallet
                                </Typography>
                                {balanceLoading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                        <Typography variant="h6" sx={{ opacity: 0.7 }}>
                                            Loading...
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography variant="h4" fontWeight={700}>
                                        {walletBalance.Admin_Wallet || '0'} USDT
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        
                        {/* Dummy Wallet */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ 
                                p: 2, 
                                background: 'rgba(255,255,255,0.15)', 
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                    Dummy Wallet
                                </Typography>
                                {balanceLoading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                        <Typography variant="h6" sx={{ opacity: 0.7 }}>
                                            Loading...
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography variant="h4" fontWeight={700}>
                                        {walletBalance.Dummy_Wallet || '0'} USDT
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* API Actions Section */}
            <Grid container spacing={3}>
                {/* Credit Admin Income Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ 
                        borderRadius: 3, 
                        height: '100%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                        }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box sx={{
                                        p: 2,
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #5b6be7 0%, #4a5bd6 100%)',
                                        color: 'white'
                                    }}>
                                        <AttachMoney sx={{ fontSize: 28 }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600} color="#5b6be7">
                                            Credit Admin Income
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Retrieve admin income data
                                        </Typography>
                                    </Box>
                                </Stack>
                                {data1 && (
                                    <Chip 
                                        icon={<CheckCircle />} 
                                        label="Success" 
                                        color="success" 
                                        size="small"
                                    />
                                )}
                                {error1 && (
                                    <Chip 
                                        icon={<Error />} 
                                        label="Error" 
                                        color="error" 
                                        size="small"
                                    />
                                )}
                            </Stack>
                            
                            <Divider sx={{ mb: 3 }} />
                            
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleGetCreditAdminIncome}
                                disabled={loading1}
                                startIcon={loading1 ? <CircularProgress size={20} color="inherit" /> : <Download />}
                                sx={{
                                    bgcolor: '#5b6be7',
                                    '&:hover': { bgcolor: '#4a5bd6' },
                                    mb: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}
                            >
                                {loading1 ? 'Loading...' : 'Get Credit Admin Income'}
                            </Button>

                            {loading1 && (
                                <Box sx={{ mb: 2 }}>
                                    <LinearProgress sx={{ borderRadius: 1 }} />
                                </Box>
                            )}

                            {error1 && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        mb: 2, 
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            fontSize: '20px'
                                        }
                                    }}
                                >
                                    {error1}
                                </Alert>
                            )}

                            {data1 && (
                                <Box>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                        <Typography variant="subtitle1" fontWeight={600} color="#5b6be7">
                                            Response Data
                                        </Typography>
                                        <IconButton 
                                            onClick={() => setExpanded1(!expanded1)}
                                            size="small"
                                            sx={{ color: '#5b6be7' }}
                                        >
                                            {expanded1 ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </Stack>
                                    <Collapse in={expanded1}>
                                        <Paper sx={{ 
                                            p: 2, 
                                            bgcolor: '#f8f9fa', 
                                            borderRadius: 2,
                                            border: '1px solid #e0e0e0'
                                        }}>
                                            <Box 
                                                component="pre" 
                                                sx={{ 
                                                    fontSize: '0.75rem', 
                                                    overflow: 'auto', 
                                                    maxHeight: 300,
                                                    bgcolor: '#fff',
                                                    p: 2,
                                                    borderRadius: 1,
                                                    border: '1px solid #e0e0e0',
                                                    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                                                }}
                                            >
                                                {JSON.stringify(data1, null, 2)}
                                            </Box>
                                        </Paper>
                                    </Collapse>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Credit Admin Income 7 Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ 
                        borderRadius: 3, 
                        height: '100%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                        }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box sx={{
                                        p: 2,
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                                        color: 'white'
                                    }}>
                                        <TrendingUp sx={{ fontSize: 28 }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600} color="#e67e22">
                                            Credit Admin Income 7
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Retrieve admin income 7 data
                                        </Typography>
                                    </Box>
                                </Stack>
                                {data2 && (
                                    <Chip 
                                        icon={<CheckCircle />} 
                                        label="Success" 
                                        color="success" 
                                        size="small"
                                    />
                                )}
                                {error2 && (
                                    <Chip 
                                        icon={<Error />} 
                                        label="Error" 
                                        color="error" 
                                        size="small"
                                    />
                                )}
                            </Stack>
                            
                            <Divider sx={{ mb: 3 }} />
                            
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleGetCreditAdminIncome7}
                                disabled={loading2}
                                startIcon={loading2 ? <CircularProgress size={20} color="inherit" /> : <Download />}
                                sx={{
                                    bgcolor: '#e67e22',
                                    '&:hover': { bgcolor: '#d35400' },
                                    mb: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}
                            >
                                {loading2 ? 'Loading...' : 'Get Credit Admin Income 7'}
                            </Button>

                            {loading2 && (
                                <Box sx={{ mb: 2 }}>
                                    <LinearProgress sx={{ borderRadius: 1 }} />
                                </Box>
                            )}

                            {error2 && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        mb: 2, 
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            fontSize: '20px'
                                        }
                                    }}
                                >
                                    {error2}
                                </Alert>
                            )}

                            {data2 && (
                                <Box>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                        <Typography variant="subtitle1" fontWeight={600} color="#e67e22">
                                            Response Data
                                        </Typography>
                                        <IconButton 
                                            onClick={() => setExpanded2(!expanded2)}
                                            size="small"
                                            sx={{ color: '#e67e22' }}
                                        >
                                            {expanded2 ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </Stack>
                                    <Collapse in={expanded2}>
                                        <Paper sx={{ 
                                            p: 2, 
                                            bgcolor: '#f8f9fa', 
                                            borderRadius: 2,
                                            border: '1px solid #e0e0e0'
                                        }}>
                                            <Box 
                                                component="pre" 
                                                sx={{ 
                                                    fontSize: '0.75rem', 
                                                    overflow: 'auto', 
                                                    maxHeight: 300,
                                                    bgcolor: '#fff',
                                                    p: 2,
                                                    borderRadius: 1,
                                                    border: '1px solid #e0e0e0',
                                                    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                                                }}
                                            >
                                                {JSON.stringify(data2, null, 2)}
                                            </Box>
                                        </Paper>
                                    </Collapse>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Summary Section */}
            {(data1 || data2) && (
                <Card sx={{ 
                    borderRadius: 3, 
                    mt: 4,
                    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(39, 174, 96, 0.3)'
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                            <CheckCircle sx={{ fontSize: 32 }} />
                            <Box>
                                <Typography variant="h6" fontWeight={600}>
                                    API Response Summary
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Current status of all API calls
                                </Typography>
                            </Box>
                        </Stack>
                        
                        <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 2, 
                                    background: 'rgba(255,255,255,0.15)', 
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 2,
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                        Credit Admin Income Status
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                        {data1 ? '✅ Data Retrieved Successfully' : '⏳ No Data Retrieved'}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 2, 
                                    background: 'rgba(255,255,255,0.15)', 
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 2,
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                        Credit Admin Income 7 Status
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                        {data2 ? '✅ Data Retrieved Successfully' : '⏳ No Data Retrieved'}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default IncomeDistribution;
