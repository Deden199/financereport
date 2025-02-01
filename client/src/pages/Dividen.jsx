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
  Grid,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import api from '../services/api';

// Helper format Rupiah
function formatRupiah(numStr) {
  if(!numStr) return "Rp 0";
  const num = parseFloat(numStr) || 0;
  return new Intl.NumberFormat('id-ID', {
    style:'currency',
    currency:'IDR'
  }).format(num);
}

// Helper parse number
function parseNumber(str){
  if(!str || str.trim() === "") return 0;
  return Number(str);
}

export default function Dividen() {
  const [data, setData] = useState([]);

  // Jika Dividen menempel ke Toko, sediakan dropdown toko:
  const [allToko, setAllToko] = useState([]);
  const [tokoId, setTokoId] = useState('');

  // State form input
  const [totalProfit, setTotalProfit] = useState('');
  const [notes, setNotes] = useState('');
  // (opsional) distributedAt, status
  const [distributedAt, setDistributedAt] = useState('');
  const [status, setStatus] = useState('PENDING'); // default?

  // Fetch data
  useEffect(()=>{
    fetchDividen();
    fetchToko();  // jika dibutuhkan
  },[]);

  const fetchDividen = async()=>{
    try {
      const res = await api.get('/finance/dividen');
      setData(res.data);
    } catch(err){
      console.error(err);
      alert('Gagal memuat data Dividen');
    }
  };

  const fetchToko = async()=>{
    // Jika Dividen punya tokoId
    try {
      const res = await api.get('/finance/toko');
      setAllToko(res.data);
    } catch(err){
      console.error(err);
      alert('Gagal memuat Toko');
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // Pastikan numeric tidak string kosong
      const payload = {
        totalProfit: parseNumber(totalProfit),
        notes,
        distributedAt: distributedAt || null,
        status
      };
      // Jika Dividen menempel ke Toko
      if (tokoId) {
        payload.tokoId = tokoId; // pastikan model Dividen ada tokoId
      }

      await api.post('/finance/dividen', payload);
      setTotalProfit('');
      setNotes('');
      setStatus('PENDING');
      setDistributedAt('');
      setTokoId('');
      fetchDividen();
    } catch(err){
      console.error(err);
      alert('Gagal tambah dividen');
    }
  };

  return (
    <Box sx={{ p:2 }}>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Dividen Management
      </Typography>

      {/* FORM INPUT DIVIDEN */}
      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight:600, mb:1 }}>
          Tambah Dividen
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Pilih Toko (opsional) */}
            <Grid item xs={12} sm={6}>
              <Select
                size="small"
                value={tokoId}
                onChange={(e)=>setTokoId(e.target.value)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="">
                  <em>-- Pilih Toko (opsional) --</em>
                </MenuItem>
                {allToko.map(t=>(
                  <MenuItem key={t.id} value={t.id}>
                    {t.nama}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Toko terkait dividen ini</FormHelperText>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Total Profit (Rp)"
                type="number"
                fullWidth
                value={totalProfit}
                onChange={(e)=>setTotalProfit(e.target.value)}
                helperText="Nominal profit yang akan dibagikan"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Catatan"
                fullWidth
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}
                helperText="Contoh: Dividen Q1 / catatan lain"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                size="small"
                label="Distributed At"
                type="date"
                fullWidth
                value={distributedAt}
                onChange={(e)=>setDistributedAt(e.target.value)}
                helperText="Tanggal pembagian"
                InputLabelProps={{ shrink:true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                size="small"
                label="Status"
                fullWidth
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                helperText="PENDING / DONE / dsb."
              />
            </Grid>
          </Grid>

          <Box sx={{ mt:2, textAlign:'right' }}>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </Box>
        </form>
      </Paper>

      {/* TABEL LIST DIVIDEN */}
      <Paper sx={{ p:2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight:600, mb:1 }}>
          Daftar Dividen
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Toko</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Total Profit (Rp)</TableCell>
              <TableCell>Catatan</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row)=>(
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                {/* Toko? => row.Toko?.nama (jika di back-end Dividen -> belongsTo Toko) */}
                <TableCell>
                  {row.Toko ? row.Toko.nama : row.tokoId || '-'}
                </TableCell>
                <TableCell>
                  { row.distributedAt 
                    ? new Date(row.distributedAt).toLocaleDateString() 
                    : '-'
                  }
                </TableCell>
                <TableCell>{formatRupiah(row.totalProfit)}</TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>{row.status || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
