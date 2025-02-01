import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

// Helper format Rupiah
function formatRupiah(numStr){
  if(!numStr) return "Rp 0";
  const num = parseFloat(numStr) || 0;
  return new Intl.NumberFormat('id-ID', {
    style:'currency',
    currency:'IDR'
  }).format(num);
}

// Helper parseNumber: jika string kosong, return 0
function parseNumber(str){
  if(!str || str.trim() === "") return 0;
  return Number(str);
}

export default function MasterInvestor() {
  const [data, setData] = useState([]);
  const [namaInvestor, setNamaInvestor] = useState('');
  const [persenSaham, setPersenSaham] = useState('');
  const [totalInject, setTotalInject] = useState('');
  const [totalBagi, setTotalBagi] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchData = async()=>{
    try {
      const res = await api.get('/finance/investor');
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
      // Pastikan kolom numeric tidak string kosong
      const payload = {
        namaInvestor,
        persenSaham: parseNumber(persenSaham),
        totalInject: parseNumber(totalInject),
        totalBagi: parseNumber(totalBagi)
      };

      if(editingId){
        await api.put(`/finance/investor/${editingId}`, payload);
      } else {
        await api.post('/finance/investor', payload);
      }
      // reset form
      setNamaInvestor('');
      setPersenSaham('');
      setTotalInject('');
      setTotalBagi('');
      setEditingId(null);
      fetchData();
    } catch(err) {
      alert('Gagal submit Investor');
    }
  };

  const handleEdit = (inv)=>{
    setEditingId(inv.id);
    setNamaInvestor(inv.namaInvestor);
    setPersenSaham(String(inv.persenSaham || ''));
    setTotalInject(String(inv.totalInject || ''));
    setTotalBagi(String(inv.totalBagi || ''));
  };

  const handleDelete = async(id)=>{
    if(!window.confirm('Hapus data investor ini?')) return;
    try {
      await api.delete(`/finance/investor/${id}`);
      fetchData();
    } catch(err) {
      alert('Gagal hapus investor');
    }
  };

  return (
    <Box sx={{ p:2 }}>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Data Investor
      </Typography>

      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight:600, mb:1 }}>
          { editingId ? 'Edit Investor' : 'Tambah Investor' }
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Nama Investor"
                value={namaInvestor}
                onChange={(e)=>setNamaInvestor(e.target.value)}
                fullWidth
                helperText="Contoh: Bpk. Andi / PT ABC"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="% Saham"
                type="number"
                value={persenSaham}
                onChange={(e)=>setPersenSaham(e.target.value)}
                fullWidth
                helperText="Persentase kepemilikan (0-100)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Total Inject (Rp)"
                type="number"
                value={totalInject}
                onChange={(e)=>setTotalInject(e.target.value)}
                fullWidth
                helperText="Modal yang sudah disuntikkan"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Total Bagi (Rp)"
                type="number"
                value={totalBagi}
                onChange={(e)=>setTotalBagi(e.target.value)}
                fullWidth
                helperText="Dividen sudah diterima Investor"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt:2, textAlign:'right' }}>
            <Button variant="contained" type="submit">
              { editingId ? 'Update' : 'Simpan' }
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper sx={{ p:2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Nama Investor</TableCell>
              <TableCell>% Saham</TableCell>
              <TableCell>Total Inject (Rp)</TableCell>
              <TableCell>Total Bagi (Rp)</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((inv)=>(
              <TableRow key={inv.id}>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{inv.namaInvestor}</TableCell>
                <TableCell>{inv.persenSaham}</TableCell>
                <TableCell>{formatRupiah(inv.totalInject)}</TableCell>
                <TableCell>{formatRupiah(inv.totalBagi)}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleEdit(inv)} size="small">
                    <EditIcon fontSize="inherit"/>
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(inv.id)} size="small">
                    <DeleteIcon fontSize="inherit" color="error"/>
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
