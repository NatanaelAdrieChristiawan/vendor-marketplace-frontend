<script setup lang="ts">
import { ref } from 'vue'

const currentView = ref('list') // 'list' | 'detail'

const searchQuery = ref('')
const selectedStatus = ref('Semua Status')
const selectedPriority = ref('Semua Prioritas')

const disputes = ref([
  {
    id: '#VDR-4567',
    vendor: 'Creativ Studio',
    priority: 'Tinggi',
    status: 'Menunggu Review',
  },
  {
    id: '#VDR-4567',
    vendor: 'Creativ Studio',
    priority: 'Tinggi',
    status: 'Menunggu Review',
  },
  {
    id: '#VDR-4567',
    vendor: 'Creativ Studio',
    priority: 'Tinggi',
    status: 'Menunggu Review',
  }
])

function openDetail() {
  currentView.value = 'detail'
}

function goBack() {
  currentView.value = 'list'
}

const activeTab = ref('Log Aktivitas') // 'Bukti' | 'Log Aktivitas'
</script>

<template>
  <div class="pb-12 w-full max-w-5xl mx-auto font-sans">
    
    <!-- Header: Only show in list view -->
    <div v-if="currentView === 'list'" class="flex items-center justify-between border-b border-gray-200 pb-4 h-16 mb-6">
      <h1 class="text-[22px] font-semibold text-gray-900 border-none">Permintaan Banding</h1>
      <button class="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full border border-white bg-red-500"></span>
      </button>
    </div>

    <!-- LIST VIEW -->
    <div v-if="currentView === 'list'" class="space-y-8">
      <!-- Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <div class="text-[32px] font-bold text-gray-900 leading-none">7</div>
            <div class="text-sm font-medium text-gray-400 mt-2">Banding yang Menunggu</div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <div class="text-[32px] font-bold text-gray-900 leading-none">5</div>
            <div class="text-sm font-medium text-gray-400 mt-2">Sengketa Aktif</div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          </div>
          <div>
            <div class="text-[32px] font-bold text-gray-900 leading-none">5</div>
            <div class="text-sm font-medium text-gray-400 mt-2">Diselesaikan Hari Ini</div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="cari nama toko atau ID..." class="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="flex gap-4">
          <div class="relative">
            <select v-model="selectedStatus" class="appearance-none bg-white border border-gray-300 text-gray-700 py-3 pl-5 pr-10 rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Semua Status</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div class="relative">
            <select v-model="selectedPriority" class="appearance-none bg-white border border-gray-300 text-gray-700 py-3 pl-5 pr-10 rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Semua Prioritas</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class="space-y-4">
        <div v-for="(item, index) in disputes" :key="index" class="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-bold text-gray-900">{{ item.vendor }}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-200 text-red-500">{{ item.priority }}</span>
            </div>
            <p class="text-sm text-gray-500">{{ item.id }}</p>
            <button @click="openDetail" class="w-fit bg-[#1E3A8A] hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Review Banding
            </button>
          </div>
          <div class="flex items-center bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full text-sm font-medium self-start md:self-start border border-amber-100">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
            {{ item.status }}
          </div>
        </div>
      </div>
    </div>

    <!-- DETAIL VIEW -->
    <div v-if="currentView === 'detail'" class="space-y-6 pt-4">
      <!-- Back button -->
      <button @click="goBack" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors mb-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        Kembali
      </button>

      <!-- Profile Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" class="w-14 h-14 rounded-full object-cover" />
          <div>
            <h1 class="text-xl font-bold text-gray-900 mb-1">Creativ Studio</h1>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              Status pengajuan: Diterima
            </div>
          </div>
        </div>
        <button class="bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          Lihat Profil
        </button>
      </div>

      <!-- Card 1: Details -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-900 mb-1">Creativ Studio</h2>
            <p class="text-sm text-gray-500">#VDR-4567</p>
          </div>
          <span class="px-3 py-1 rounded-md text-[11px] tracking-wider font-bold text-red-500 bg-red-50 border border-red-100">DIBATASI</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-4 gap-x-6 text-sm">
          <div class="text-gray-500">Alasan Ban:</div>
          <div class="font-medium text-gray-900">Spam promosi berlebihan</div>

          <div class="text-gray-500">Diblokir oleh:</div>
          <div class="font-medium text-blue-600 cursor-pointer hover:underline">Mufti Afrizah</div>

          <div class="text-gray-500">Tanggal Banned:</div>
          <div class="font-medium text-gray-900">3 Januari 2026</div>

          <div class="text-gray-500">Tanggal Appeal:</div>
          <div class="font-medium text-gray-900">5 Januari 2026</div>
        </div>
      </div>

      <!-- Card 2: Logs -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div class="flex gap-3 mb-8">
          <button 
            @click="activeTab = 'Bukti'"
            :class="activeTab === 'Bukti' ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            class="px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Bukti
          </button>
          <button 
            @click="activeTab = 'Log Aktivitas'"
            :class="activeTab === 'Log Aktivitas' ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            class="px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Log Aktivitas
          </button>
        </div>

        <div v-if="activeTab === 'Log Aktivitas'" class="relative pl-3 space-y-8 before:absolute before:inset-y-2 before:left-[17.5px] before:w-[2px] before:bg-blue-100">
          <!-- Timeline Item 1 -->
          <div class="relative pl-8">
            <span class="absolute left-[-2px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-blue-400 bg-white ring-4 ring-white z-10"></span>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h4 class="text-sm font-bold text-gray-900">Sistem mendeteksi aktivitas spam posting</h4>
                <p class="text-[13px] text-gray-400 mt-0.5">System Moderation</p>
              </div>
              <span class="text-[13px] text-gray-400 shrink-0">09 Februari 2026</span>
            </div>
          </div>
          <!-- Timeline Item 2 -->
          <div class="relative pl-8">
            <span class="absolute left-[-2px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-blue-400 bg-white ring-4 ring-white z-10"></span>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h4 class="text-sm font-bold text-gray-900">Admin Validator meninjau aktivitas posting</h4>
                <p class="text-[13px] text-gray-400 mt-0.5">Admin Validator A</p>
              </div>
              <span class="text-[13px] text-gray-400 shrink-0">10 Februari 2026</span>
            </div>
          </div>
          <!-- Timeline Item 3 -->
          <div class="relative pl-8">
            <span class="absolute left-[-2px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-blue-400 bg-white ring-4 ring-white z-10"></span>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h4 class="text-sm font-bold text-gray-900">Vendor di-suspend karena spam posting berulang</h4>
                <p class="text-[13px] text-gray-400 mt-0.5">Admin Validator A</p>
              </div>
              <span class="text-[13px] text-gray-400 shrink-0">14 - 16 Februari 2026</span>
            </div>
          </div>
          <!-- Timeline Item 4 -->
          <div class="relative pl-8">
            <span class="absolute left-[-2px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-blue-400 bg-white ring-4 ring-white z-10"></span>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h4 class="text-sm font-bold text-gray-900">Vendor mengunggah bukti gangguan koneksi</h4>
                <p class="text-[13px] text-gray-400 mt-0.5">Menunggu keputusan akhir</p>
              </div>
              <span class="text-[13px] text-gray-400 shrink-0">17 Februari 2026</span>
            </div>
          </div>
          <!-- Timeline Item 5 -->
          <div class="relative pl-8">
            <span class="absolute left-[-2px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-blue-600 bg-white ring-4 ring-white z-10"></span>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h4 class="text-sm font-bold text-blue-600">Vendor mengajukan banding atas suspend</h4>
                <p class="text-[13px] text-gray-400 mt-0.5">Creativ Studio</p>
              </div>
              <span class="text-[13px] text-gray-400 shrink-0">20 Februari 2026</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Pesan -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-10">
        <h3 class="text-base font-bold text-gray-900 mb-4">Pesan Banding dari Pengaju</h3>
        <div class="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed min-h-[120px]">
          <!-- Add message content if needed -->
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
