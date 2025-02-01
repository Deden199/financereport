import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, Button, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

export default function MasterInvestor() {
  const [data, setData] = useState([]);
  // state form
  const [namaInvestor, setNamaInvestor] = useState('');
  const [persenSaham, setPersenSaham] = useState('');
  const [totalInject, setTotalInject] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchData = async()=>{
    try {
      const res = await api.get('/finance/investors');
      setData(res.data);
    } catch(err) {
      alert('Gagal memuat data Investor');
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      if(editingId){
        // Edit existing
        await api.put(`/finance/investors/${editingId}`, {
          namaInvestor,
          persenSaham,
          totalInject
        });
      } else {
        // Create new
        await api.post('/finance/investors', {
          namaInvestor,
          persenSaham,
          totalInject
        });
      }
      // reset form
      setNamaInvestor('');
      setPersenSaham('');
      setTotalInject('');
      setEditingId(null);
      fetchData();
    } catch(err) {
      alert('Gagal submit Investor');
    }
  };

  const handleEdit = (inv)=>{
    setEditingId(inv.id);
    setNamaInvestor(inv.namaInvestor);
    setPersenSaham(inv.persenSaham);
    setTotalInject(inv.totalInject);
  };

  const handleDelete = async(id)=>{
    if(!window.confirm('Hapus data investor ini?')) return;
    try {
      await api.delete(`/finance/investors/${id}`);
      fetchData();
    } catch(err) {
      alert('Gagal hapus investor');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Data Investor
      </Typography>

      {/* FORM INPUT / EDIT */}
      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="h6" sx={{ fontWeight:600, mb:2 }}>
          { editingId ? 'Edit Investor' : 'Tambah Investor' }
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Investor"
            value={namaInvestor}
            onChange={(e)=>setNamaInvestor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="% Saham"
            type="number"
            value={persenSaham}
            onChange={(e)=>setPersenSaham(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total Inject"
            type="number"
            value={totalInject}
            onChange={(e)=>setTotalInject(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" type="submit" sx={{ mt:2 }}>
            { editingId ? 'Update' : 'Simpan' }
          </Button>
        </form>
      </Paper>

      {/* TABEL DATA INVESTOR */}
      <Paper sx={{ p:2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Nama Investor</TableCell>
              <TableCell>% Saham</TableCell>
              <TableCell>Total Inject</TableCell>
              <TableCell>Total Bagi</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inv)=>(
              <TableRow key={inv.id}>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{inv.namaInvestor}</TableCell>
                <TableCell>{inv.persenSaham}</TableCell>
                <TableCell>{inv.totalInject}</TableCell>
                <TableCell>{inv.totalBagi}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleEdit(inv)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(inv.id)}>
                    <DeleteIcon color="error"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
