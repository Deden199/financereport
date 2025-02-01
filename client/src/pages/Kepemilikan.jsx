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
  IconButton,
  Grid,
  FormHelperText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

// Helper untuk format rupiah
function formatRupiah(numStr) {
  if (!numStr) return "Rp 0";
  const num = parseFloat(numStr) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(num);
}

// Helper parse number: jika string kosong, kembalikan 0
function parseNumber(str) {
  if (!str || str.trim() === "") return 0;
  return Number(str);
}

export default function Kepemilikan() {
  const [ownerships, setOwnerships] = useState([]);
  const [allToko, setAllToko] = useState([]);
  const [allInvestor, setAllInvestor] = useState([]);

  // State form
  const [tokoId, setTokoId] = useState('');
  const [investorId, setInvestorId] = useState('');
  const [persentase, setPersentase] = useState('');

  // Tambahan field untuk investor (nominal)
  const [modalAwalInv, setModalAwalInv] = useState('');
  const [totalInjectInv, setTotalInjectInv] = useState('');
  const [totalBagiInv, setTotalBagiInv] = useState('');

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchOwnership();
    fetchToko();
    fetchInvestor();
  }, []);

  const fetchOwnership = async () => {
    try {
      const res = await api.get('/finance/ownership');
      setOwnerships(res.data);
    } catch (err) {
      alert('Gagal memuat data Kepemilikan');
    }
  };

  const fetchToko = async () => {
    try {
      const res = await api.get('/finance/toko');
      setAllToko(res.data);
    } catch (err) {
      alert('Gagal memuat Toko');
    }
  };

  const fetchInvestor = async () => {
    try {
      const res = await api.get('/finance/investor');
      setAllInvestor(res.data);
    } catch (err) {
      alert('Gagal memuat Investor');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pastikan nilai numeric tidak dikirim sebagai string kosong
      const payload = {
        tokoId,
        investorId,
        persentase: parseNumber(persentase),
        modalAwalInv: parseNumber(modalAwalInv),
        totalInjectInv: parseNumber(totalInjectInv),
        totalBagiInv: parseNumber(totalBagiInv)
      };
      if (editingId) {
        await api.put(`/finance/ownership/${editingId}`, payload);
      } else {
        await api.post('/finance/ownership', payload);
      }
      // Reset form
      setTokoId('');
      setInvestorId('');
      setPersentase('');
      setModalAwalInv('');
      setTotalInjectInv('');
      setTotalBagiInv('');
      setEditingId(null);
      fetchOwnership();
    } catch (err) {
      console.error(err);
      alert('Gagal submit kepemilikan');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTokoId(item.tokoId);
    setInvestorId(item.investorId);
    setPersentase(item.persentase || '');
    setModalAwalInv(String(item.modalAwalInv || ''));
    setTotalInjectInv(String(item.totalInjectInv || ''));
    setTotalBagiInv(String(item.totalBagiInv || ''));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data kepemilikan ini?')) return;
    try {
      await api.delete(`/finance/ownership/${id}`);
      fetchOwnership();
    } catch (err) {
      alert('Gagal hapus kepemilikan');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Kepemilikan Saham
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {editingId ? 'Edit Kepemilikan' : 'Tambah Kepemilikan'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                value={tokoId}
                onChange={(e) => setTokoId(e.target.value)}
                fullWidth
                size="small"
              >
                <MenuItem value="">-- Pilih Toko --</MenuItem>
                {allToko.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.nama}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Pilih Toko yang dimaksud</FormHelperText>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                value={investorId}
                onChange={(e) => setInvestorId(e.target.value)}
                fullWidth
                size="small"
              >
                <MenuItem value="">-- Pilih Investor --</MenuItem>
                {allInvestor.map((inv) => (
                  <MenuItem key={inv.id} value={inv.id}>
                    {inv.namaInvestor}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Pilih investor terkait</FormHelperText>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Persentase Saham (%)"
                type="number"
                value={persentase}
                onChange={(e) => setPersentase(e.target.value)}
                fullWidth
                helperText="Contoh: 20"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Modal Awal Investor (Rp)"
                type="number"
                value={modalAwalInv}
                onChange={(e) => setModalAwalInv(e.target.value)}
                fullWidth
                helperText="Modal awal yang disetor"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Total Inject Investor (Rp)"
                type="number"
                value={totalInjectInv}
                onChange={(e) => setTotalInjectInv(e.target.value)}
                fullWidth
                helperText="Tambahan modal investor"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                size="small"
                label="Total Bagi Investor (Rp)"
                type="number"
                value={totalBagiInv}
                onChange={(e) => setTotalBagiInv(e.target.value)}
                fullWidth
                helperText="Dividen yang diterima"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="contained" type="submit">
              {editingId ? 'Update' : 'Simpan'}
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Toko</TableCell>
              <TableCell>Investor</TableCell>
              <TableCell>% Saham</TableCell>
              <TableCell>Modal Awal Inv (Rp)</TableCell>
              <TableCell>Total Inject Inv (Rp)</TableCell>
              <TableCell>Total Bagi Inv (Rp)</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownerships.map((o) => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.Toko ? o.Toko.nama : o.tokoId}</TableCell>
                <TableCell>{o.Investor ? o.Investor.namaInvestor : o.investorId}</TableCell>
                <TableCell>{o.persentase}</TableCell>
                <TableCell>{formatRupiah(o.modalAwalInv)}</TableCell>
                <TableCell>{formatRupiah(o.totalInjectInv)}</TableCell>
                <TableCell>{formatRupiah(o.totalBagiInv)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(o)} size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(o.id)} size="small">
                    <DeleteIcon fontSize="inherit" color="error" />
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
