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
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

export default function Kepemilikan() {
  const [ownerships, setOwnerships] = useState([]);
  const [allToko, setAllToko] = useState([]);
  const [allInvestor, setAllInvestor] = useState([]);

  // State form
  const [tokoId, setTokoId] = useState('');
  const [investorId, setInvestorId] = useState('');
  const [persentase, setPersentase] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{
    fetchOwnership();
    fetchToko();
    fetchInvestor();
  },[]);

  // Ambil list kepemilikan
  const fetchOwnership = async ()=>{
    try {
      const res = await api.get('/finance/ownership');
      // Data di back-end sebaiknya di-include Toko & Investor agar ada Toko.nama, Investor.namaInvestor
      setOwnerships(res.data);
    } catch(err){
      alert('Gagal memuat data Kepemilikan');
    }
  };

  const fetchToko = async ()=>{
    try {
      const res = await api.get('/finance/toko');
      setAllToko(res.data);
    } catch(err){
      alert('Gagal memuat Toko');
    }
  };

  const fetchInvestor = async ()=>{
    try {
      const res = await api.get('/finance/investors');
      setAllInvestor(res.data);
    } catch(err){
      alert('Gagal memuat Investor');
    }
  };

  // Submit form (create or update)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      if(editingId){
        // Update
        await api.put(`/finance/ownership/${editingId}`, {
          tokoId,
          investorId,
          persentase
        });
      } else {
        // Create
        await api.post('/finance/ownership', {
          tokoId,
          investorId,
          persentase
        });
      }
      setTokoId('');
      setInvestorId('');
      setPersentase('');
      setEditingId(null);
      fetchOwnership();
    } catch(err){
      console.error(err);
      alert('Gagal submit kepemilikan');
    }
  };

  // Klik edit
  const handleEdit = (item)=>{
    setEditingId(item.id);
    setTokoId(item.tokoId);
    setInvestorId(item.investorId);
    setPersentase(item.persentase);
  };

  // Klik delete
  const handleDelete = async(id)=>{
    if(!window.confirm('Hapus data kepemilikan ini?')) return;
    try {
      await api.delete(`/finance/ownership/${id}`);
      fetchOwnership();
    } catch(err){
      alert('Gagal hapus kepemilikan');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Kepemilikan Saham
      </Typography>

      {/* FORM INPUT / EDIT */}
      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="h6" sx={{ fontWeight:600, mb:2 }}>
          { editingId ? 'Edit Kepemilikan' : 'Tambah Kepemilikan' }
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Pilih Toko */}
          <Select
            value={tokoId}
            onChange={(e)=>setTokoId(e.target.value)}
            fullWidth
            sx={{ mt:1, mb:2 }}
          >
            <MenuItem value="">-- Pilih Toko --</MenuItem>
            {allToko.map((t)=>(
              <MenuItem key={t.id} value={t.id}>
                {t.nama}
              </MenuItem>
            ))}
          </Select>

          {/* Pilih Investor */}
          <Select
            value={investorId}
            onChange={(e)=>setInvestorId(e.target.value)}
            fullWidth
            sx={{ mb:2 }}
          >
            <MenuItem value="">-- Pilih Investor --</MenuItem>
            {allInvestor.map((inv)=>(
              <MenuItem key={inv.id} value={inv.id}>
                {inv.namaInvestor}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Persentase Saham (%)"
            value={persentase}
            onChange={(e)=>setPersentase(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" type="submit" sx={{ mt:2 }}>
            { editingId ? 'Update' : 'Simpan' }
          </Button>
        </form>
      </Paper>

      {/* TABEL DATA */}
      <Paper sx={{ p:2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Toko</TableCell>
              <TableCell>Investor</TableCell>
              <TableCell>Persentase</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownerships.map((o)=>(
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.Toko ? o.Toko.nama : o.tokoId}</TableCell>
                <TableCell>{o.Investor ? o.Investor.namaInvestor : o.investorId}</TableCell>
                <TableCell>{o.persentase}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleEdit(o)}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(o.id)}>
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
