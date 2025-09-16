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
    MenuItem,
    TextareaAutosize,
    Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, ConfirmationNumber, Send, CheckCircle } from '@mui/icons-material';
import { getTicket } from '../APIs/authApis';

const statusColor = (status) => {
    if (status === 'Open') return 'error';
    if (status === 'In Progress') return 'warning';
    if (status === 'Resolved') return 'success';
    if (status === 'Closed') return 'default';
    if (status === 'Pending') return 'info';
    return 'default';
};

const priorityColor = (priority) => {
    if (priority === 'High') return 'error';
    if (priority === 'Medium') return 'warning';
    if (priority === 'Low') return 'success';
    return 'default';
};

const TicketTable = () => {
    const [search, setSearch] = useState('');
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const res = await getTicket({
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
                setTicketData(Array.isArray(list) ? list : []);
                setTotal(totalCount);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setTicketData([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
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

    const handleOpenDetails = (ticket) => {
        console.log(ticket);
        // return
        setSelectedTicket(ticket);
        setReplyText('');
        setDetailOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailOpen(false);
        setSelectedTicket(null);
        setReplyText('');
    };

    const handleReplySubmit = async () => {
        if (!replyText.trim() || !selectedTicket) return;
        
        setIsSubmittingReply(true);
        try {
            // Here you would call your API to submit the reply
            // await submitTicketReply(selectedTicket._id, replyText);
            console.log('Submitting reply:', { ticketId: selectedTicket._id, reply: replyText });
            
            // For now, just show success message
            alert('Reply submitted successfully!');
            setReplyText('');
            
            // Refresh the ticket data
            // await fetchTickets();
        } catch (error) {
            console.error('Error submitting reply:', error);
            alert('Error submitting reply. Please try again.');
        } finally {
            setIsSubmittingReply(false);
        }
    };

    const handleResolveTicket = async () => {
        if (!selectedTicket) return;
        
        try {
            // Here you would call your API to resolve the ticket
            // await resolveTicket(selectedTicket._id);
            console.log('Resolving ticket:', selectedTicket._id);
            
            alert('Ticket resolved successfully!');
            setDetailOpen(false);
            setSelectedTicket(null);
            
            // Refresh the ticket data
            // await fetchTickets();
        } catch (error) {
            console.error('Error resolving ticket:', error);
            alert('Error resolving ticket. Please try again.');
        }
    };

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearch('');
        setStatusFilter('');
        setPage(0);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3, background: '#f7fafd', minHeight: '100vh' }}>
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={2.4}>
                            <TextField
                                placeholder="Search tickets"
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
                                    <MenuItem value="Open">Open</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
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
                            <TableCell onClick={() => handleSort('ticketId')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Ticket ID {sortConfig.key === 'ticketId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('subject')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Subject {sortConfig.key === 'subject' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('userName')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                User {sortConfig.key === 'userName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('priority')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Priority {sortConfig.key === 'priority' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('status')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </TableCell>
                            <TableCell onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', fontSize: '13px', padding: '6px 8px' }}>
                                Created Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
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
                        {!loading && ticketData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No tickets found
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && ticketData.map((ticket) => (
                            <TableRow
                                key={ticket?._id || ticket?.id}
                                hover
                                sx={{ '& > *': { borderBottom: 'unset', fontSize: '13px', padding: '6px 8px' } }}
                            >
                                <TableCell>
                                    <ConfirmationNumber sx={{ color: '#5b2be7', fontSize: 20 }} />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#5b2be7' }}>
                                        #{ticket?.ticketId || ticket?.ticketNumber || ticket?._id?.slice(-8) || 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ 
                                        maxWidth: 200, 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {ticket?.subject || ticket?.title || 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {ticket?.userName || ticket?.user?.name || ticket?.userId || 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={ticket?.priority || 'Medium'}
                                        color={priorityColor(ticket?.priority || 'Medium')}
                                        size="small"
                                        sx={{ fontWeight: 400, fontSize: 10, height: 20 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={ticket?.status || 'Open'}
                                        color={statusColor(ticket?.status || 'Open')}
                                        size="small"
                                        sx={{ fontWeight: 400, fontSize: 11, height: 22 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {ticket?.createdAt ? new Date(ticket.createdAt).toDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <IconButton 
                                        aria-label="View details" 
                                        onClick={() => handleOpenDetails(ticket)} 
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
                <DialogTitle>Ticket Details</DialogTitle>
                <DialogContent dividers>
                    {selectedTicket && (
                        <Box>
                            {/* Ticket Information */}
                            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 1.5, columnGap: 2, mb: 3 }}>
                                <Typography variant="body2" color="text.secondary">Ticket ID</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#5b2be7' }}>
                                    #{selectedTicket?.ticketId || selectedTicket?.ticketNumber || selectedTicket?._id?.slice(-8) || ''}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">Subject</Typography>
                                <Typography variant="body2">{selectedTicket?.subject || selectedTicket?.title || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Description</Typography>
                                <Typography variant="body2">{selectedTicket?.description || selectedTicket?.message || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">User</Typography>
                                <Typography variant="body2">{selectedTicket?.createdBy?.name || selectedTicket?.createdBy.userId || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Priority</Typography>
                                <Typography variant="body2">{selectedTicket?.priority || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Status</Typography>
                                <Typography variant="body2">{selectedTicket?.status || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Category</Typography>
                                <Typography variant="body2">{selectedTicket?.category || selectedTicket?.type || ''}</Typography>

                                <Typography variant="body2" color="text.secondary">Assigned To</Typography>
                                {/* <Typography variant="body2">{selectedTicket?.assignedTo || selectedTicket?.assignedAgent || 'Unassigned'}</Typography> */}

                                <Typography variant="body2" color="text.secondary">Created At</Typography>
                                <Typography variant="body2">
                                    {selectedTicket?.createdAt ? new Date(selectedTicket.createdAt).toLocaleString() : ''}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">Updated At</Typography>
                                <Typography variant="body2">
                                    {selectedTicket?.updatedAt ? new Date(selectedTicket.updatedAt).toLocaleString() : ''}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">Last Response</Typography>
                                <Typography variant="body2">
                                    {selectedTicket?.lastResponse ? new Date(selectedTicket.lastResponse).toLocaleString() : 'No response yet'}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Reply Section */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2, color: '#5b2be7' }}>
                                    Reply to Ticket
                                </Typography>
                                
                                <TextareaAutosize
                                    minRows={4}
                                    maxRows={8}
                                    placeholder="Type your reply here..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
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
                                
                                <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={handleReplySubmit}
                                        disabled={!replyText.trim() || isSubmittingReply}
                                        startIcon={<Send />}
                                        sx={{ minWidth: 120 }}
                                    >
                                        {isSubmittingReply ? 'Sending...' : 'Send Reply'}
                                    </Button>
                                    
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleResolveTicket}
                                        startIcon={<CheckCircle />}
                                        sx={{ minWidth: 140 }}
                                    >
                                        Resolve Ticket
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>
            </Box>
        </LocalizationProvider>
    );
};

export default TicketTable;
