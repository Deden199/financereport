import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Paper
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import api from '../services/api';

// Helper format rupiah
function formatRupiah(numStr){
  const num = parseFloat(numStr) || 0;
  return new Intl.NumberFormat('id-ID', {
    style:'currency',
    currency:'IDR'
  }).format(num);
}

// Fungsi menghitung dividen investor
function hitungDividenInvestor(dividenProfit, persenSaham){
  // Contoh logic: (totalProfit * persenSaham / 100)
  const profit = parseFloat(dividenProfit) || 0;
  const p = parseFloat(persenSaham) || 0;
  const portion = (profit * p) / 100;
  return portion; 
}

export default function LaporanKeuangan() {
  const [reportData, setReportData] = useState([]);   // Toko + Ownership + Dividen
  const [openRows, setOpenRows] = useState({});
  
  // ringkasan global
  const [totalToko, setTotalToko] = useState(0);
  const [totalInvestor, setTotalInvestor] = useState(0);
  const [totalProfitAll, setTotalProfitAll] = useState(0);

  // Dividen global
  const [dividenList, setDividenList] = useState([]);
  const [totalDividen, setTotalDividen] = useState(0);
  const [totalDividenProfit, setTotalDividenProfit] = useState(0);

  useEffect(()=>{
    fetchReport();
    fetchAllDividen();
  },[]);

  // Ambil data Toko (dengan Ownership + Dividen)
  const fetchReport = async()=>{
    try {
      const res = await api.get('/finance/report-full'); // getFullReport
      const data = res.data || [];
      setReportData(data);

      // Hitung ringkasan
      let sumProfit = 0;
      let investorSet = new Set();
      data.forEach(toko=>{
        sumProfit += parseFloat(toko.totalProfit || 0);
        toko.Ownerships?.forEach(os=>{
          if(os.Investor) investorSet.add(os.Investor.id);
        });
      });
      setTotalToko(data.length);
      setTotalInvestor(investorSet.size);
      setTotalProfitAll(sumProfit);

    } catch(err){
      console.error(err);
      alert('Gagal memuat laporan keuangan');
    }
  };

  // Ambil data Dividen global
  const fetchAllDividen = async()=>{
    try {
      const res = await api.get('/finance/dividen');
      const list = res.data || [];
      setDividenList(list);

      setTotalDividen(list.length);
      let sumProfitDiv = 0;
      list.forEach(dv=>{
        sumProfitDiv += parseFloat(dv.totalProfit || 0);
      });
      setTotalDividenProfit(sumProfitDiv);
    } catch(err){
      console.error(err);
      alert('Gagal memuat data Dividen global');
    }
  };

  // Toggle row Toko
  const toggleRow = (id)=>{
    setOpenRows(prev=>({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Box sx={{ p:2 }}>
      <Typography variant="h4" sx={{ fontWeight:700, mb:3 }}>
        Laporan Keuangan (Saham + Modal + Dividen)
      </Typography>

      {/* RINGKASAN CARD */}
      <Box sx={{ display:'flex', gap:2, flexWrap:'wrap', mb:3 }}>
        <Card sx={{ flex:'1 1 250px', background:'linear-gradient(135deg, #512DA8 30%, #303F9F 100%)', color:'#fff' }}>
          <CardContent>
            <Typography variant="body2">Total Toko</Typography>
            <Typography variant="h5" sx={{ fontWeight:700 }}>{totalToko}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex:'1 1 250px', background:'linear-gradient(135deg, #7E57C2 30%, #5C6BC0 100%)', color:'#fff' }}>
          <CardContent>
            <Typography variant="body2">Total Investor (unik)</Typography>
            <Typography variant="h5" sx={{ fontWeight:700 }}>{totalInvestor}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex:'1 1 250px', background:'linear-gradient(135deg, #AB47BC 30%, #7E57C2 100%)', color:'#fff' }}>
          <CardContent>
            <Typography variant="body2">Total Profit (All Toko)</Typography>
            <Typography variant="h5" sx={{ fontWeight:700 }}>
              {formatRupiah(totalProfitAll)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex:'1 1 250px', background:'linear-gradient(135deg, #5B2C6F 30%, #8E44AD 100%)', color:'#fff' }}>
          <CardContent>
            <Typography variant="body2">Total Dividen (All)</Typography>
            <Typography variant="h5" sx={{ fontWeight:700 }}>{totalDividen}</Typography>
            <Typography variant="body2" sx={{ mt:1 }}>
              Total Profit Dividen: {formatRupiah(totalDividenProfit)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* TABLE Toko + Investor + Dividen */}
      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="h6" sx={{ fontWeight:700, mb:2 }}>
          Detail Toko & Pemegang Saham (+ Dividen)
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell />
              <TableCell>Nama Toko</TableCell>
              <TableCell>Modal Awal</TableCell>
              <TableCell>Total Inject</TableCell>
              <TableCell>Total Bagi</TableCell>
              <TableCell>Total Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((toko)=>{
              const open = openRows[toko.id] || false;
              return (
                <React.Fragment key={toko.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={()=>toggleRow(toko.id)}>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                      </IconButton>
                    </TableCell>
                    <TableCell>{toko.nama}</TableCell>
                    <TableCell>{formatRupiah(toko.modalAwal)}</TableCell>
                    <TableCell>{formatRupiah(toko.totalInject)}</TableCell>
                    <TableCell>{formatRupiah(toko.totalBagi)}</TableCell>
                    <TableCell>{formatRupiah(toko.totalProfit)}</TableCell>
                  </TableRow>

                  {/* Collapsible row */}
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p:0 }}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ m:2 }}>
                          {/* SECTION 1: Pemegang Saham */}
                          <Typography variant="subtitle1" sx={{ fontWeight:700, mb:1 }}>
                            Pemegang Saham di {toko.nama}
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ backgroundColor:'#fafafa' }}>
                                <TableCell>Nama Investor</TableCell>
                                <TableCell>% Saham</TableCell>
                                <TableCell>Modal Awal Inv</TableCell>
                                <TableCell>Total Inject Inv</TableCell>
                                <TableCell>Total Bagi Inv</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {toko.Ownerships?.map(os=>(
                                <TableRow key={os.id}>
                                  <TableCell>{os.Investor?.namaInvestor}</TableCell>
                                  <TableCell>{os.persentase}%</TableCell>
                                  <TableCell>{formatRupiah(os.modalAwalInv)}</TableCell>
                                  <TableCell>{formatRupiah(os.totalInjectInv)}</TableCell>
                                  <TableCell>{formatRupiah(os.totalBagiInv)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>

                          {/* SECTION 2: Daftar Dividen Toko */}
                          <Typography variant="subtitle1" sx={{ fontWeight:700, mt:3, mb:1 }}>
                            Dividen yang Tercatat di {toko.nama}
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ backgroundColor:'#fafafa' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Tanggal</TableCell>
                                <TableCell>Total Profit (Rp)</TableCell>
                                <TableCell>Catatan</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell style={{ width:200 }}>Rincian Pembagian</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {toko.Dividens?.map(div => {
                                const divProfit = parseFloat(div.totalProfit || 0);
                                return (
                                  <TableRow key={div.id}>
                                    <TableCell>{div.id}</TableCell>
                                    <TableCell>
                                      {div.distributedAt
                                        ? new Date(div.distributedAt).toLocaleDateString()
                                        : '-'
                                      }
                                    </TableCell>
                                    <TableCell>{formatRupiah(div.totalProfit)}</TableCell>
                                    <TableCell>{div.notes}</TableCell>
                                    <TableCell>{div.status || '-'}</TableCell>
                                    <TableCell>
                                      {/* Tombol Collapsible tambahan (opsional) 
                                          Atau langsung tampil sub-tabel investor */}
                                      <Table size="small">
                                        <TableHead>
                                          <TableRow sx={{ backgroundColor:'#f0f0f0' }}>
                                            <TableCell>Investor</TableCell>
                                            <TableCell>Bagi (Rp)</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {toko.Ownerships?.map(os=>(
                                            <TableRow key={`${div.id}-${os.id}`}>
                                              <TableCell>{os.Investor?.namaInvestor}</TableCell>
                                              <TableCell>
                                                {formatRupiah(
                                                  hitungDividenInvestor(divProfit, os.persentase)
                                                )}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {/* TABEL GLOBAL DIVIDEN */}
      <Paper sx={{ p:2 }}>
        <Typography variant="h6" sx={{ fontWeight:700, mb:2 }}>
          Tabel Dividen Global
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor:'#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Total Profit (Rp)</TableCell>
              <TableCell>Catatan</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dividenList.map(dv=>(
              <TableRow key={dv.id}>
                <TableCell>{dv.id}</TableCell>
                <TableCell>
                  {dv.distributedAt
                    ? new Date(dv.distributedAt).toLocaleDateString()
                    : '-'
                  }
                </TableCell>
                <TableCell>{formatRupiah(dv.totalProfit)}</TableCell>
                <TableCell>{dv.notes}</TableCell>
                <TableCell>{dv.status || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
