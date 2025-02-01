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
  Grid,
  FormHelperText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

// Fungsi helper untuk format rupiah
function formatRupiah(numStr){
  if(!numStr) return "Rp 0";
  const num = parseFloat(numStr) || 0;
  return new Intl.NumberFormat('id-ID', {
    style:'currency',
    currency:'IDR'
  }).format(num);
}

export default function MasterToko() {
  const [tokoData, setTokoData] = useState([]);

  // State form
  const [nama, setNama] = useState('');
  const [modalAwal, setModalAwal] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [keterangan, setKeterangan] = useState('');
  // Tambahan
  const [totalInject, setTotalInject] = useState('');
  const [totalBagi, setTotalBagi] = useState('');
  const [totalProfit, setTotalProfit] = useState('');

  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const payload = {
        nama,
        modalAwal,
        lokasi,
        keterangan,
        totalInject,
        totalBagi,
        totalProfit
      };
      
      if(editingId){
        // update
        await api.put(`/finance/toko/${editingId}`, payload);
      } else {
        // create
        await api.post('/finance/toko', payload);
      }
      
      // reset
      setNama('');
      setModalAwal('');
      setLokasi('');
      setKeterangan('');
      setTotalInject('');
      setTotalBagi('');
      setTotalProfit('');
      setEditingId(null);
      fetchToko();
    } catch(err){
      alert('Error submit Toko');
    }
  };

  const handleEdit = (t)=>{
    setEditingId(t.id);
    setNama(t.nama);
    setModalAwal(t.modalAwal);
    setLokasi(t.lokasi || '');
    setKeterangan(t.keterangan || '');
    setTotalInject(t.totalInject || '');
    setTotalBagi(t.totalBagi || '');
    setTotalProfit(t.totalProfit || '');
  };

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
    <Box sx={{ p:2 }}>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Master Toko
      </Typography>

      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight:600 }}>
          { editingId ? 'Edit Toko' : 'Tambah Toko' }
        </Typography>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt:1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Nama Toko"
                value={nama}
                onChange={(e)=>setNama(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Modal Awal (Rp)"
                type="number"
                value={modalAwal}
                onChange={(e)=>setModalAwal(e.target.value)}
                fullWidth
                helperText="Nominal awal modal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Lokasi"
                value={lokasi}
                onChange={(e)=>setLokasi(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Keterangan"
                value={keterangan}
                onChange={(e)=>setKeterangan(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Total Inject (Rp)"
                type="number"
                value={totalInject}
                onChange={(e)=>setTotalInject(e.target.value)}
                fullWidth
                helperText="Modal tambahan yang sudah disuntikkan"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Total Bagi (Rp)"
                type="number"
                value={totalBagi}
                onChange={(e)=>setTotalBagi(e.target.value)}
                fullWidth
                helperText="Berapa total dividen sudah dibagikan"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Total Profit (Rp)"
                type="number"
                value={totalProfit}
                onChange={(e)=>setTotalProfit(e.target.value)}
                fullWidth
                helperText="Keuntungan Toko hingga saat ini"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt:2, textAlign:'right' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mr:2 }}
            >
              { editingId ? 'Update' : 'Simpan' }
            </Button>
          </Box>
        </form>
      </Paper>

      {/* TABEL */}
      <Paper sx={{ p:2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Modal Awal (Rp)</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Total Inject (Rp)</TableCell>
              <TableCell>Total Bagi (Rp)</TableCell>
              <TableCell>Total Profit (Rp)</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokoData.map((t)=>(
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.nama}</TableCell>
                <TableCell>{formatRupiah(t.modalAwal)}</TableCell>
                <TableCell>{t.lokasi}</TableCell>
                <TableCell>{t.keterangan}</TableCell>
                <TableCell>{formatRupiah(t.totalInject)}</TableCell>
                <TableCell>{formatRupiah(t.totalBagi)}</TableCell>
                <TableCell>{formatRupiah(t.totalProfit)}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleEdit(t)} size="small">
                    <EditIcon fontSize="inherit"/>
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(t.id)} size="small">
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
