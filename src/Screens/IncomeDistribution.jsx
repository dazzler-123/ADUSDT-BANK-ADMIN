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
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [balanceError, setBalanceError] = useState(null);
    const [walletBalance, setWalletBalance] = useState({
        Admin7_Wallet: 0,
        Admin3_Wallet: 0,
        Royality_Wallet: 0,
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
                                    Admin 7 Wallet
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
                                        {walletBalance.Admin7_Wallet || '0'} USDT
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
                                    Admin 3 Wallet
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
                                        {walletBalance.Admin3_Wallet || '0'} USDT
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
                                    Royality Wallet
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
                                        {walletBalance.Royality_Wallet || '0'} USDT
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

           
        </Box>
    );
};

export default IncomeDistribution;
