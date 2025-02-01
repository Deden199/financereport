import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, Button
} from '@mui/material';
import api from '../services/api';

export default function Dividen() {
  const [data, setData] = useState([]);

  // State form input
  const [totalProfit, setTotalProfit] = useState('');
  const [notes, setNotes] = useState('');

  const fetchDividen = async()=>{
    try {
      const res = await api.get('/finance/dividens');
      setData(res.data);
    } catch(err){
      console.error(err);
      alert('Gagal memuat data Dividen');
    }
  };

  useEffect(()=>{
    fetchDividen();
  },[]);

  // handle submit form (untuk POST /finance/dividens)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await api.post('/finance/dividens', {
        totalProfit,
        notes,
        // status? => "PENDING"
      });
      setTotalProfit('');
      setNotes('');
      fetchDividen();
    } catch(err){
      console.error(err);
      alert('Gagal tambah dividen');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Dividen Management
      </Typography>

      {/* FORM INPUT DIVIDEN */}
      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="h6" sx={{ fontWeight:600, mb:2 }}>
          Tambah Dividen
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Total Profit"
            type="number"
            fullWidth
            margin="normal"
            value={totalProfit}
            onChange={(e)=>setTotalProfit(e.target.value)}
          />
          <TextField
            label="Catatan"
            fullWidth
            margin="normal"
            value={notes}
            onChange={(e)=>setNotes(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{ mt:2 }}>
            Simpan
          </Button>
        </form>
      </Paper>

      {/* TABEL LIST DIVIDEN */}
      <Paper sx={{ p:2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Total Profit</TableCell>
              <TableCell>Catatan</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row)=>(
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  { new Date(row.distributedAt).toLocaleDateString() }
                </TableCell>
                <TableCell>{row.totalProfit}</TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
