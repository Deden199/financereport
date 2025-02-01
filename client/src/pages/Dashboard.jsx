import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Pemasukan',
        data: [120, 190, 170, 220],
        backgroundColor: '#7E57C2',
      },
      {
        label: 'Pengeluaran',
        data: [80, 160, 140, 200],
        backgroundColor: '#5C6BC0',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ mb:3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p:2, textAlign:'center' }}>
            <Typography variant="body2" color="text.secondary">Total Toko</Typography>
            <Typography variant="h5" sx={{ fontWeight:700 }}>4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p:2, textAlign:'center' }}>
            <Typography variant="body2" color="text.secondary">Total Investor</Typography>
            <Typography variant="h5" sx={{ fontWeight:700 }}>7</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p:2 }}>
        <Typography variant="h6" sx={{ fontWeight:600, mb:2 }}>
          Ringkasan Keuangan
        </Typography>
        <Box sx={{ height:300 }}>
          <Bar data={data} options={options} />
        </Box>
      </Paper>
    </Box>
  );
}
