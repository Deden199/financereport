import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, Button, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

export default function MasterToko() {
  const [tokoData, setTokoData] = useState([]);

  // State form
  const [nama, setNama] = useState('');
  const [modalAwal, setModalAwal] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [keterangan, setKeterangan] = useState('');

  // State penanda edit / create
  const [editingId, setEditingId] = useState(null);

  // Fetch data Toko
  const fetchToko = async ()=>{
    try {
      const res = await api.get('/finance/toko');
      setTokoData(res.data);
    } catch(e){
      alert('Gagal memuat data Toko');
    }
  };

  useEffect(()=>{
    fetchToko();
  },[]);

  // Submit form (create/update)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      if(editingId){
        // update existing
        await api.put(`/finance/toko/${editingId}`, {
          nama,
          modalAwal,
          lokasi,
          keterangan
        });
      } else {
        // create new
        await api.post('/finance/toko', {
          nama,
          modalAwal,
          lokasi,
          keterangan
        });
      }
      // reset
      setNama('');
      setModalAwal('');
      setLokasi('');
      setKeterangan('');
      setEditingId(null);
      fetchToko();
    } catch(err){
      alert('Error submit Toko');
    }
  };

  // Ketika user klik Edit icon
  const handleEdit = (t)=>{
    setEditingId(t.id);
    setNama(t.nama);
    setModalAwal(t.modalAwal);
    setLokasi(t.lokasi || '');
    setKeterangan(t.keterangan || '');
  };

  // Hapus
  const handleDelete = async(id)=>{
    if(!window.confirm('Hapus data Toko ini?')) return;
    try {
      await api.delete(`/finance/toko/${id}`);
      fetchToko();
    } catch(err){
      alert('Gagal hapus Toko');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Master Toko
      </Typography>

      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="h6" sx={{ fontWeight:600 }}>
          { editingId ? 'Edit Toko' : 'Tambah Toko' }
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Toko"
            value={nama}
            onChange={(e)=>setNama(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Modal Awal"
            type="number"
            value={modalAwal}
            onChange={(e)=>setModalAwal(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lokasi"
            value={lokasi}
            onChange={(e)=>setLokasi(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Keterangan"
            value={keterangan}
            onChange={(e)=>setKeterangan(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt:2 }}
          >
            { editingId ? 'Update' : 'Simpan' }
          </Button>
        </form>
      </Paper>

      <Paper sx={{ p:2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Modal Awal</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokoData.map((t)=>(
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.nama}</TableCell>
                <TableCell>{t.modalAwal}</TableCell>
                <TableCell>{t.lokasi}</TableCell>
                <TableCell>{t.keterangan}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleEdit(t)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(t.id)}>
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
