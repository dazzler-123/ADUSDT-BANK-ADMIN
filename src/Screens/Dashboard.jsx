

import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography, Divider, CircularProgress, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MailIcon from '@mui/icons-material/Mail';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell, PieChart, Pie, Cell as PieCell, LabelList
} from 'recharts';
import { getReport } from '../APIs/appApis';

// Example data for charts
const usersJoinedData = [
    { date: '2017-09-14', joined: 0.5 },
    { date: '2017-09-15', joined: 2.5 },
    { date: '2017-09-16', joined: 1.5 },
    { date: '2017-09-17', joined: 2.0 },
    { date: '2017-09-18', joined: 1.0 },
    { date: '2017-09-19', joined: 2.8 },
    { date: '2017-09-20', joined: 1.2 },
    { date: '2017-09-21', joined: 2.7 },
    { date: '2017-09-22', joined: 1.1 },
];

// Removed unused packagePurchaseData - now using API data


const responseData={
    "summary": {
      "totalUsers": 15,
      "totalInvested": "91767 USDT",
      "totalEarned": "16390.92 USDT",
      "avgInvested": "3989.87 USDT",
      "totalReferrals": 22,
      "totalTransactions": 37,
      "failedTransactions": 0
    },
    "usersByStatus": {
      "ACTIVE": 15,
      "null": 8
    },
    "incomeBreakdown": {
      "DIRECT": {
        "totalAmount": 8738.73,
        "count": 36
      },
      "LEVEL": {
        "totalAmount": 387.57,
        "count": 16
      },
      "RANK": {
        "totalAmount": 5997.75,
        "count": 18
      }
    },
    "planBreakdown": [
      {
        "planName": "Diamond",
        "userCount": 5
      },
      {
        "planName": "Legend",
        "userCount": 6
      },
      {
        "planName": "Gold",
        "userCount": 3
      },
      {
        "planName": "Crown ambassador",
        "userCount": 2
      },
      {
        "planName": "Ambassdor",
        "userCount": 2
      },
      {
        "planName": "Platinum",
        "userCount": 1
      },
      {
        "planName": "Kohinoor",
        "userCount": 5
      },
      {
        "planName": "Platinium",
        "userCount": 1
      },
      {
        "planName": "Sapphire",
        "userCount": 2
      },
      {
        "planName": "Star",
        "userCount": 3
      },
      {
        "planName": "Champion",
        "userCount": 1
      },
      {
        "planName": "Chancellor",
        "userCount": 6
      }
    ],
    "transactionBreakdown": [
      {
        "type": null,
        "count": 37,
        "totalAmount": 46783
      }
    ],
    "topEarners": [
      {
        "_id": "68babd5a202247f2a75c72db",
        "name": "Vinod Kumar Mishra",
        "email": "VinodKumar@gmail.com",
        "walletAddress": "0x2E5d829547c663a063d486E5249271Cc6Ad7CB7B",
        "totalEarned": 5367.0599999999995
      },
      {
        "_id": "68bac8ab202247f2a75c733c",
        "name": "Chandan6",
        "email": "chandan6@example.com",
        "walletAddress": "0x2E5d829547c663a063d486E5249271Cc6Ad7CB7B",
        "totalEarned": 3926.3399999999997
      },
      {
        "_id": "68babf90202247f2a75c72f6",
        "name": "Chandan2",
        "email": "chandan2@example.com",
        "walletAddress": "0x2E5d829547c663a063d486E5249271Cc6Ad7CB7B",
        "totalEarned": 3494.0400000000004
      },
      {
        "_id": "68babd79202247f2a75c72e5",
        "name": "Chandan1",
        "email": "chandan1@example.com",
        "walletAddress": "0x2E5d829547c663a063d486E5249271Cc6Ad7CB7B",
        "totalEarned": 2597.1000000000004
      },
      {
        "_id": "68c161ff33c0e5b51cd8b250",
        "name": "Varun",
        "email": "Varun@gmail.com",
        "walletAddress": "0x316554A01930A58f5f198ec4EDc03B9635d9eBA4",
        "totalEarned": 926.91
      }
    ],
    "topReferrers": [
      {
        "userId": "68bac8f3202247f2a75c734d",
        "name": "Chandan7",
        "email": "chandan7@example.com"
      },
      {
        "userId": "68bac33e202247f2a75c7307",
        "name": "Chandan3",
        "email": "chandan3@example.com"
      },
      {
        "userId": "68babd79202247f2a75c72e5",
        "name": "Chandan1",
        "email": "chandan1@example.com"
      },
      {
        "userId": "68c3043420f319552f307ac7",
        "name": "prakash",
        "email": "prakash22@gmail.com"
      },
      {
        "userId": "68c00c4d3acdd628dae6b50d",
        "name": "Nikhil",
        "email": "Nikhil@example.com"
      }
    ]
  }
const Dashboard = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setLoading(true);
                const data = await getReport();
                setReportData(data);
            } catch (err) {
                console.error('Error fetching report data:', err);
                setError(err.message || 'Failed to fetch report data');
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 2, background: '#f7fafd', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2, background: '#f7fafd', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    // Use API data if available, otherwise fallback to static data
    const data = reportData || responseData;

    // Transform plan breakdown data for chart
    const chartData = data.planBreakdown?.map((plan) => ({
        planName: plan.planName,
        users: plan.userCount
    })) || [];

    // Transform income breakdown data for doughnut chart
    const incomeChartData = data.incomeBreakdown ? Object.entries(data.incomeBreakdown).map(([key, value]) => ({
        name: key,
        value: value.totalAmount,
        count: value.count
    })) : [];

    // Define colors for different plans
    const planColors = [
        '#5b6be7', '#e67e22', '#27ae60', '#e74c3c', '#9b59b6', 
        '#f39c12', '#1abc9c', '#34495e', '#e91e63', '#ff5722', '#607d8b'
    ];

    // Define colors for income breakdown
    const incomeColors = ['#ffe600', '#4caf50', '#f44336', '#9c27b0', '#ff9800'];

    // Custom label component for pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize="12"
                fontWeight="600"
            >
                {/* Labels removed - using external legend instead */}
            </text>
        );
    };

    return (
        <Box sx={{ p: 2, background: '#f7fafd', minHeight: '100vh' }}>
            {/* Top summary cards */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} width="100%">
                <Card sx={{ flex: 1, bgcolor: '#5b6be7', color: '#fff', borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <GroupIcon fontSize="large" />
                            <Box>
                                <Typography variant="h5" fontWeight={700}>{data.summary?.totalUsers || 0}</Typography>
                                <Typography variant="body2">Network Members</Typography>
                                {/* <Typography variant="caption">6% Referred by Admin</Typography> */}
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1, bgcolor: '#e74c3c', color: '#fff', borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <AttachMoneyIcon fontSize="large" />
                            <Box>
                                <Typography variant="h5" fontWeight={700}>{data.summary?.totalEarned || '$0'}</Typography>
                                <Typography variant="body2">Total Earned</Typography>
                                {/* <Typography variant="caption">0% Payout done</Typography> */}
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1, bgcolor: '#3498db', color: '#fff', borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <ConfirmationNumberIcon fontSize="large" />
                            <Box>
                                <Typography variant="h5" fontWeight={700}>{data.summary?.totalInvested || 0}</Typography>
                                <Typography variant="body2">Total Invested</Typography>
                                <Typography variant="caption">Transactions in System</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1, bgcolor: '#27ae60', color: '#fff', borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <MailIcon fontSize="large" />
                            <Box>
                                <Typography variant="h5" fontWeight={700}>{data.summary?.totalReferrals || 0}</Typography>
                                {/* <Typography variant="h5" fontWeight={700}>{Number(data.summary.totalEarned.split(' ')[0]-Number(data.summary.totalInvested.split(' ')[0]))}</Typography> */}
                                <Typography variant="body2">Total Referrals</Typography>
                                <Typography variant="caption">Referrals in System</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>

            {/* Users Joined over the time - Full Width */}
            <Card sx={{ borderRadius: 2, mb: 2, width: '100%' }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={1}>Users Joined over the time</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction="row" spacing={2} mb={2}>
                        <Box>
                            <Typography variant="subtitle2">Weekly Joining</Typography>
                            <Typography variant="h6">0</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Monthly Joining</Typography>
                            <Typography variant="h6">0</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Yearly Joining</Typography>
                            <Typography variant="h6">609</Typography>
                        </Box>
                    </Stack>
                    <Box mt={2} sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={usersJoinedData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} />
                                <YAxis fontSize={12} />
                                <ChartTooltip />
                                <Legend />
                                <Line type="monotone" dataKey="joined" stroke="#5b6be7" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>

            {/* Package Purchase and Income Breakdown - Two Sections */}
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} width="100%">
                <Card sx={{ flex: 1, borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} mb={1}>Package purchase</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack direction="row" spacing={2} mb={2}>
                            {data.planBreakdown?.slice(0, 3).map((plan, index) => (
                                <Box key={index}>
                                    <Typography variant="subtitle2">{plan.planName}</Typography>
                                    <Typography variant="h6">{plan.userCount}</Typography>
                                </Box>
                            ))}
                        </Stack>
                        <Box mt={2} sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="planName" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <ChartTooltip 
                                        formatter={(value, name, props) => [
                                            value, 
                                            props.payload.planName
                                        ]}
                                        labelFormatter={(label) => `Plan: ${label}`}
                                    />
                                    <Bar dataKey="users" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={planColors[index % planColors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>

                {/* Income Breakdown Doughnut Chart */}
                <Card sx={{ flex: 1, borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} mb={1}>Income Breakdown</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={incomeChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={120}
                                            paddingAngle={2}
                                            dataKey="value"
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {incomeChartData.map((entry, index) => (
                                                <PieCell key={`cell-${index}`} fill={incomeColors[index % incomeColors.length]} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip 
                                            formatter={(value, name, props) => [
                                                `${value.toFixed(2)} USDT`,
                                                props.payload.name
                                            ]}
                                            labelFormatter={(label) => `Income Type: ${label}`}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                            {/* Custom Legend for Income Breakdown */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center' }}>
                                {incomeChartData.map((income, index) => (
                                    <Box key={income.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box 
                                            sx={{ 
                                                width: 12, 
                                                height: 12, 
                                                backgroundColor: incomeColors[index % incomeColors.length],
                                                borderRadius: '50%'
                                            }} 
                                        />
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                                            {income.name} ({income.count})
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>

            {/* Top Earners and Top Referrers Tables */}
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} width="100%" sx={{ mt: 2 }}>
                {/* Top Earners Table */}
                <Card sx={{ flex: 1, borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: '#5b6be7' }}>
                            Top Earners
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, color: '#5b6be7' }}>Rank</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: '#5b6be7' }}>Name</TableCell>
                                        {/* <TableCell sx={{ fontWeight: 700, color: '#5b6be7' }}>Email</TableCell> */}
                                        <TableCell sx={{ fontWeight: 700, color: '#5b6be7' }}>Total Earned</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: '#5b6be7' }}>Wallet Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.topEarners?.map((earner, index) => (
                                        <TableRow key={earner._id} hover>
                                            <TableCell>
                                                <Chip 
                                                    label={`#${index + 1}`} 
                                                    size="small" 
                                                    color={index < 3 ? 'primary' : 'default'}
                                                    sx={{ fontWeight: 700 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>{earner.name}</TableCell>
                                            {/* <TableCell sx={{ color: '#666' }}>{earner.email}</TableCell> */}
                                            <TableCell sx={{ fontWeight: 600, color: '#27ae60' }}>
                                                {earner.totalEarned?.toFixed(2)} USDT
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                                <Tooltip 
                                                    title={
                                                        <Box sx={{ textAlign: 'center', p: 1 }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff', mb: 0.5 }}>
                                                                Full Wallet Address
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: '#fff', fontSize: '11px', wordBreak: 'break-all' }}>
                                                                {earner.walletAddress}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    arrow
                                                    placement="top"
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                bgcolor: 'rgba(0, 0, 0, 0.9)',
                                                                borderRadius: 2,
                                                                fontSize: '14px',
                                                                maxWidth: '300px',
                                                                '& .MuiTooltip-arrow': {
                                                                    color: 'rgba(0, 0, 0, 0.9)',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Box sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                                        {earner.walletAddress?.slice(0, 6)}...{earner.walletAddress?.slice(-4)}
                                                    </Box>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>

                {/* Top Referrers Table */}
                <Card sx={{ flex: 1, borderRadius: 2, minWidth: 0 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: '#e67e22' }}>
                            Top Referrers
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, color: '#e67e22' }}>Rank</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: '#e67e22' }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: '#e67e22' }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: '#e67e22' }}>User ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.topReferrers?.map((referrer, index) => (
                                        <TableRow key={referrer.userId} hover>
                                            <TableCell>
                                                <Chip 
                                                    label={`#${index + 1}`} 
                                                    size="small" 
                                                    color={index < 3 ? 'secondary' : 'default'}
                                                    sx={{ fontWeight: 700 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>{referrer.name}</TableCell>
                                            <TableCell sx={{ color: '#666' }}>{referrer.email}</TableCell>
                                            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                                {referrer.userId?.slice(0, 8)}...
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
};

export default Dashboard;
