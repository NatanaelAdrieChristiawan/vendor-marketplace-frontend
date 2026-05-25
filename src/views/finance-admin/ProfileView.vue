<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()
const activeTab = ref<'log' | 'pengaturan'>('log')

const adminInfo = computed(() => {
  const u = (user.value || {}) as any
  const joinedDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '10 Januari 2024'

  return {
    name: u.fullName || 'Admin Finance',
    id: u.id ? `#FIN-${u.id}` : '#FIN-1234',
    statusBadge: u.isSuspended ? 'DITANGGUHKAN' : 'AKTIF',
    role: u.role === 'ADMIN_FINANCE' ? 'Finance Administrator' : u.role || 'Finance Administrator',
    department: 'Finance & Accounting',
    email: u.email || 'finance@vendormarketplace.com',
    tanggalBergabung: joinedDate
  }
})

const logAktivitas = [
  {
    title: 'Konfirmasi pengembalian dana untuk Buyer A',
    subtitle: 'Modul Refund',
    date: 'Hari ini, 10:45 AM',
    isCurrent: true,
  },
  {
    title: 'Memproses pencairan dana (Withdrawal) Creativ Studio',
    subtitle: 'Modul Pencairan Dana',
    date: 'Kemarin, 14:20 PM',
    isCurrent: false,
  },
  {
    title: 'Memverifikasi pembayaran manual PAY-99201',
    subtitle: 'Modul Verifikasi Pembayaran',
    date: '24 Maret 2026',
    isCurrent: false,
  },
  {
    title: 'Menutup periode pembukuan bulan Februari 2026',
    subtitle: 'Modul Laporan & Dividen',
    date: '28 Februari 2026',
    isCurrent: false,
  },
]

const handleLogout = () => {
  logout()
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto pb-12 font-sans">
    <!-- Top Actions -->
    <div class="flex items-center justify-between mb-6">
      <!-- Kembali Button -->
      <button @click="goBack" class="flex items-center gap-2 text-gray-800 hover:text-gray-600 group transition-colors">
        <svg class="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm font-medium">Kembali</span>
      </button>

      <!-- Logout Button -->
      <button @click="handleLogout" class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors border border-red-100 shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>

    <!-- Header Card -->
    <div class="bg-[#F0F4FF] rounded-2xl px-8 py-6 flex items-center justify-between mb-6 border border-blue-50">
      <div class="flex items-center gap-5">
        <!-- Avatar -->
        <div class="w-16 h-16 rounded-full bg-[#2A437E] shrink-0 overflow-hidden flex items-center justify-center text-white text-xl font-bold shadow-sm">
          AF
        </div>
        <div>
          <h1 class="text-2xl font-extrabold text-[#0B4086]">{{ adminInfo.name }}</h1>
          <span class="inline-flex items-center gap-1.5 mt-1 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            Status: {{ adminInfo.statusBadge }}
          </span>
        </div>
      </div>
      <button class="bg-[#2A437E] hover:bg-[#1e305a] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-sm">
        Edit Profil
      </button>
    </div>

    <!-- Detail Info Card -->
    <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-gray-900">Informasi Karyawan</h2>
          <p class="text-sm text-gray-500 mt-0.5">Detail identitas dan peran di dalam sistem.</p>
        </div>
        <span class="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-[#F0F4FF] text-[#2A437E] border border-[#D1DDF7]">
          {{ adminInfo.id }}
        </span>
      </div>

      <div class="space-y-4 text-sm bg-gray-50/50 p-6 rounded-xl border border-gray-100">
        <div class="flex border-b border-gray-100 pb-3">
          <span class="text-gray-500 w-48 shrink-0 font-medium">Peran / Role:</span>
          <span class="text-gray-900 font-bold">{{ adminInfo.role }}</span>
        </div>
        <div class="flex border-b border-gray-100 pb-3">
          <span class="text-gray-500 w-48 shrink-0 font-medium">Departemen:</span>
          <span class="text-gray-900 font-bold">{{ adminInfo.department }}</span>
        </div>
        <div class="flex border-b border-gray-100 pb-3">
          <span class="text-gray-500 w-48 shrink-0 font-medium">Email Pekerjaan:</span>
          <span class="text-blue-600 font-bold">{{ adminInfo.email }}</span>
        </div>
        <div class="flex">
          <span class="text-gray-500 w-48 shrink-0 font-medium">Tanggal Bergabung:</span>
          <span class="text-gray-900 font-bold">{{ adminInfo.tanggalBergabung }}</span>
        </div>
      </div>
    </div>

    <!-- Log Aktivitas Card -->
    <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm">
      <!-- Tab Buttons -->
      <div class="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
        <button
          @click="activeTab = 'log'"
          class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          :class="activeTab === 'log' ? 'bg-[#2A437E] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'"
        >
          Riwayat Aktivitas Sistem
        </button>
        <button
          @click="activeTab = 'pengaturan'"
          class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          disabled
          :class="activeTab === 'pengaturan' ? 'bg-[#2A437E] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'"
        >
          Pengaturan Akun (Segera Hadir)
        </button>
      </div>

      <!-- Log Aktivitas Tab Content -->
      <div v-if="activeTab === 'log'" class="pl-2">
        <div class="relative">
          <!-- Vertical Timeline Line -->
          <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-blue-100"></div>

          <div class="space-y-8">
            <div
              v-for="(log, idx) in logAktivitas"
              :key="idx"
              class="flex items-start gap-6 relative group"
            >
              <!-- Timeline Dot -->
              <div class="relative z-10 shrink-0 mt-1">
                <div
                  class="w-4 h-4 rounded-full border-[3.5px] transition-colors"
                  :class="log.isCurrent ? 'border-[#2A437E] bg-white' : 'border-blue-200 bg-white group-hover:border-blue-400'"
                ></div>
              </div>

              <!-- Content -->
              <div class="flex-1 flex flex-col sm:flex-row sm:items-start justify-between bg-white px-1">
                <div>
                  <p
                    class="text-[15px] font-bold mb-1"
                    :class="log.isCurrent ? 'text-[#2A437E]' : 'text-gray-800'"
                  >
                    {{ log.title }}
                  </p>
                  <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">{{ log.subtitle }}</p>
                </div>
                <span class="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full mt-3 sm:mt-0 whitespace-nowrap">{{ log.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
