import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import api from '../services/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async()=>{
    try {
      const res = await api.get('/finance/transactions');
      setTransactions(res.data);
    } catch(err) {
      alert('Gagal memuat data transactions');
    }
  };

  useEffect(()=>{
    fetchTransactions();
  },[]);

  const handleApprove = async(id)=>{
    try {
      await api.put(`/finance/transaction/${id}/approve`);
      fetchTransactions();
    } catch(err) {
      alert('Approve gagal');
    }
  };

  const handleReject = async(id)=>{
    try {
      await api.put(`/finance/transaction/${id}/reject`);
      fetchTransactions();
    } catch(err) {
      alert('Reject gagal');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Transactions
      </Typography>
      <Paper sx={{ p:2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx)=>(
              <TableRow key={tx.id}>
                <TableCell>{tx.title}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>
                  {tx.status === "PENDING" && (
                    <>
                      <Button onClick={()=>handleApprove(tx.id)}>Approve</Button>{" "}
                      <Button onClick={()=>handleReject(tx.id)} color="error">
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
