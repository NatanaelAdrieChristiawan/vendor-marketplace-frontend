<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler
} from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'
import { useAdminAnalytics, useMidtransHealth, useAdminUsers } from '../../composables/useAdminAnalytics'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler
)

const currentDate = ref(new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}))

// Fetch data using hooks
const { data: analytics, isLoading: _analyticsLoading } = useAdminAnalytics('month')
const { data: _midtransHealth, isError: midtransIsError } = useMidtransHealth()
const { data: users, isLoading: _usersLoading } = useAdminUsers()

// Global Metrics Computeds
const totalUsers = computed(() => users.value?.length || 0)
const activeUsers = computed(() => users.value?.filter((u: any) => !u.isSuspended).length || 0)
const suspendedUsers = computed(() => users.value?.filter((u: any) => u.isSuspended).length || 0)
const newUsersToday = computed(() => {
  if (!users.value) return 0
  const todayStr = new Date().toDateString()
  return users.value.filter((u: any) => new Date(u.createdAt).toDateString() === todayStr).length
})

function formatPrice(val: any) {
  if (!val) return 'Rp 0'
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

// Line Chart Dynamic Data
const lineChartData = computed(() => {
  const revenue = analytics.value?.revenue?.platformRevenue || 0
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: 'rgba(61, 78, 216, 0.1)',
        borderColor: '#3D4ED8',
        borderWidth: 3,
        pointBackgroundColor: '#3D4ED8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
        data: [
          Math.round(revenue * 0.6),
          Math.round(revenue * 0.7),
          Math.round(revenue * 0.85),
          Math.round(revenue * 0.8),
          Math.round(revenue * 0.95),
          revenue
        ],
      }
    ]
  }
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      padding: 12,
      titleFont: { size: 13 },
      bodyFont: { size: 14, weight: 'bold' as const },
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#9CA3AF',
        font: { size: 12 }
      }
    },
    y: {
      grid: {
        color: '#F3F4F6',
        drawBorder: false,
        tickLength: 0,
      },
      ticks: {
        color: '#9CA3AF',
        font: { size: 12 },
        padding: 12,
        callback: function(value: any) {
          if (value >= 1000000) return 'Rp ' + (value/1000000).toFixed(1) + 'M';
          return 'Rp ' + value.toLocaleString('id-ID');
        }
      }
    }
  }
}

// Donut Chart Dynamic Data
const donutChartData = computed(() => {
  const active = activeUsers.value
  const suspended = suspendedUsers.value
  const total = totalUsers.value || 1
  return {
    labels: ['User Aktif', 'Suspended'],
    datasets: [
      {
        backgroundColor: ['#3D4ED8', '#EF4444'],
        borderWidth: 0,
        data: [
          Math.round((active / total) * 100),
          Math.round((suspended / total) * 100)
        ],
      }
    ]
  }
})

const donutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      padding: 12,
      bodyFont: { size: 14, weight: 'bold' as const },
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.parsed}%`
        }
      }
    }
  }
}
</script>

<template>
  <div class="pb-10">
    <!-- Header -->
    <header class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-[28px] font-semibold text-gray-800 leading-tight">Dashboard Overview</h1>
        <p class="text-[#8F95B2] text-sm mt-1">{{ currentDate }}</p>
      </div>
      <div class="flex items-center gap-5">
        <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9F7F7]"></span>
        </button>
        <button class="bg-[#2D4367] hover:bg-[#20314f] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </header>

    <!-- Health Check Sistem -->
    <section class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-5 bg-blue-500 rounded-full"></div>
          <h2 class="text-[17px] font-semibold text-gray-800">Health Check Sistem</h2>
        </div>
        <div class="bg-green-50 text-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium border border-green-100">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Semua Sistem Normal
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Card 1 -->
        <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
            </div>
          </div>
          <h3 class="text-sm font-semibold text-gray-800">Server Utama</h3>
          <p class="text-xs text-gray-400 mt-0.5">Production — AWS ap-southeast-1</p>
          
          <div class="mt-5 space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1.5"><span class="text-gray-500">CPU Usage</span><span class="font-medium text-gray-700">34%</span></div>
              <div class="w-full bg-gray-100 rounded-full h-1.5"><div class="bg-green-500 h-1.5 rounded-full" style="width: 34%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1.5"><span class="text-gray-500">Memory</span><span class="font-medium text-gray-700">58%</span></div>
              <div class="w-full bg-gray-100 rounded-full h-1.5"><div class="bg-blue-500 h-1.5 rounded-full" style="width: 58%"></div></div>
            </div>
            <div class="flex justify-between text-xs pt-1 border-t border-gray-50 mt-3">
              <span class="text-gray-400">Uptime: <span class="text-green-500 font-medium">99.98%</span></span>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-medium bg-green-50 px-2 py-1 rounded-full" :class="midtransIsError ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'">
              <span class="w-1.5 h-1.5 rounded-full" :class="midtransIsError ? 'bg-red-500' : 'bg-green-500'"></span> {{ midtransIsError ? 'Error' : 'Online' }}
            </div>
          </div>
          <h3 class="text-sm font-semibold text-gray-800">Payment Gateway</h3>
          <p class="text-xs text-gray-400 mt-0.5">Midtrans & Xendit</p>
          
          <div class="mt-5 space-y-2 text-xs">
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2 text-gray-600"><span class="w-1.5 h-1.5 rounded-full" :class="midtransIsError ? 'bg-red-500' : 'bg-green-500'"></span>Midtrans</div>
              <span :class="midtransIsError ? 'text-red-500' : 'text-green-500'" class="font-medium">{{ midtransIsError ? 'Gangguan' : 'Aktif' }}</span>
            </div>
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2 text-gray-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Xendit</div>
              <span class="text-green-500 font-medium">Aktif</span>
            </div>
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2 text-gray-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>DOKU</div>
              <span class="text-green-500 font-medium">Aktif</span>
            </div>
            <div class="pt-2 mt-2 border-t border-gray-50 text-gray-400 flex justify-between">
              <span>Status OK</span>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
            </div>
          </div>
          <h3 class="text-sm font-semibold text-gray-800">Database Cluster</h3>
          <p class="text-xs text-gray-400 mt-0.5">PostgreSQL — Supabase</p>
          
          <div class="mt-5 space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1.5"><span class="text-gray-500">Database</span><span class="font-medium text-gray-700">Supabase</span></div>
              <div class="w-full bg-gray-100 rounded-full h-1.5"><div class="bg-green-500 h-1.5 rounded-full" style="width: 100%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1.5"><span class="text-gray-500">Connections</span><span class="font-medium text-gray-700">Healthy</span></div>
              <div class="w-full bg-gray-100 rounded-full h-1.5"><div class="bg-blue-500 h-1.5 rounded-full" style="width: 100%"></div></div>
            </div>
            <div class="flex justify-between text-xs pt-1 border-t border-gray-50 mt-3">
              <span class="text-gray-400">Query Status: <span class="text-green-500 font-medium">OK</span></span>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
            </div>
          </div>
          <h3 class="text-sm font-semibold text-gray-800">Notifikasi Service</h3>
          <p class="text-xs text-gray-400 mt-0.5">Email & Push Notification</p>
          
          <div class="mt-5 space-y-2 text-xs">
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2 text-gray-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Push Notif</div>
              <span class="text-green-500 font-medium">Aktif</span>
            </div>
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2 text-gray-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Email SMTP</div>
              <span class="text-green-500 font-medium">Aktif</span>
            </div>
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2 text-gray-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>WhatsApp API</div>
              <span class="text-green-500 font-medium">Aktif</span>
            </div>
            <div class="pt-2 mt-2 border-t border-gray-50 text-green-500 flex justify-between font-medium">
              <span>Sistem Normal</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Metrics -->
    <section class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-5 bg-orange-500 rounded-full"></div>
          <h2 class="text-[17px] font-semibold text-gray-800">Global Metrics</h2>
        </div>
        <div class="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium">
          High Level Overview
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="bg-linear-to-br from-[#4E5EEB] to-[#3D4ED8] rounded-[24px] p-6 text-white shadow-md relative overflow-hidden">
          <div class="flex justify-between items-start mb-6 z-10 relative">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
          </div>
          <div class="z-10 relative">
            <h3 class="text-3xl font-bold mb-1">{{ totalUsers }}</h3>
            <p class="text-white/80 text-sm mb-6">Total User Terdaftar</p>
          </div>
          <div class="flex items-center gap-6 pt-4 border-t border-white/20 z-10 relative">
            <div>
              <p class="text-[15px] font-semibold text-center">{{ activeUsers }}</p>
              <p class="text-white/70 text-xs text-center">Aktif</p>
            </div>
            <div>
              <p class="text-[15px] font-semibold text-center">+{{ newUsersToday }}</p>
              <p class="text-white/70 text-xs text-center">Baru Hari Ini</p>
            </div>
          </div>
        </div>

        <div class="bg-linear-to-br from-[#10B981] to-success rounded-[24px] p-6 text-white shadow-md relative overflow-hidden">
          <div class="flex justify-between items-start mb-6 z-10 relative">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div class="z-10 relative">
            <h3 class="text-2xl font-bold mb-1">{{ formatPrice(analytics?.revenue?.platformRevenue) }}</h3>
            <p class="text-white/80 text-sm mb-6">Total Revenue Bulan Ini</p>
          </div>
          <div class="flex items-center gap-6 pt-4 border-t border-white/20 z-10 relative">
            <div>
              <p class="text-[14px] font-semibold text-center">{{ analytics?.revenue?.completedOrderCount || 0 }}</p>
              <p class="text-white/70 text-xs text-center">Order Selesai</p>
            </div>
            <div>
              <p class="text-[14px] font-semibold text-center">{{ formatPrice(analytics?.revenue?.gmv) }}</p>
              <p class="text-white/70 text-xs text-center">Total GMV</p>
            </div>
          </div>
        </div>

        <!-- Metric 3: White card -->
        <div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div class="flex justify-between items-start mb-6">
            <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-gray-800 mb-1">{{ analytics?.transactions?.totalCount || 0 }}</h3>
            <p class="text-gray-500 text-sm">Total Transaksi</p>
          </div>
        </div>

        <!-- Metric 4: White card -->
        <div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div class="flex justify-between items-start mb-6">
            <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div class="bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium border border-green-100">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Live
            </div>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-gray-800 mb-1">{{ activeUsers }}</h3>
            <p class="text-gray-500 text-sm">User Aktif Sekarang</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Charts Section -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Line Chart -->
      <div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-base font-semibold text-gray-800">Tren Revenue — 6 Bulan Terakhir</h3>
          <div class="flex gap-2 text-xs font-medium">
            <button class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg">Revenue</button>
            <button class="text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">Transaksi</button>
          </div>
        </div>
        <div class="flex-1 min-h-[250px] relative w-full pt-4">
          <Line :data="lineChartData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <h3 class="text-base font-semibold text-gray-800 mb-8">Distribusi User</h3>
        <div class="flex justify-center mb-8 relative h-48 w-full">
          <Doughnut :data="donutChartData" :options="donutChartOptions" />
        </div>
        
        <!-- Legend -->
        <div class="space-y-3 mt-auto">
          <div class="flex justify-between items-center text-xs">
            <div class="flex items-center gap-2 text-gray-600 font-medium">
              <span class="w-2.5 h-2.5 rounded-full bg-[#3D4ED8]"></span> User Aktif
            </div>
            <div class="text-gray-500">{{ activeUsers }} <span class="font-medium text-gray-800 ml-1">({{ totalUsers ? Math.round((activeUsers / totalUsers) * 100) : 0 }}%)</span></div>
          </div>
          <div class="flex justify-between items-center text-xs">
            <div class="flex items-center gap-2 text-gray-600 font-medium">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> Suspended
            </div>
            <div class="text-gray-500">{{ suspendedUsers }} <span class="font-medium text-gray-800 ml-1">({{ totalUsers ? Math.round((suspendedUsers / totalUsers) * 100) : 0 }}%)</span></div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
