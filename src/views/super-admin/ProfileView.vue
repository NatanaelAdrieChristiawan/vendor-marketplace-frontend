<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import api from '../../api/axios'

const router = useRouter()
const route = useRoute()
const appealId = route.params.id as string

const activeTab = ref<'bukti' | 'log'>('bukti')
const showDecisionModal = ref(false)

const appealQuery = useQuery({
  queryKey: ['appeal', appealId],
  queryFn: async () => {
    const res = await api.get(`/appeals/${appealId}`)
    return res.data
  },
  enabled: computed(() => !!appealId)
})

const appeal = computed(() => appealQuery.data.value)
const vendor = computed(() => appeal.value?.merchant || appeal.value?.vendor || null)
const buktiFiles = computed(() => appeal.value?.evidenceFiles || [])
const logAktivitas = computed(() => appeal.value?.activityLogs || [])
const pesanBanding = computed(() => appeal.value?.reason || '-')

const closeDecisionModal = () => { showDecisionModal.value = false }

const handleDecision = async (type: 'cabut' | 'tolak') => {
  try {
    await api.patch(`/appeals/${appealId}/resolve`, {
      resolution: type === 'cabut' ? 'Suspend dicabut' : 'Banding ditolak',
      isApproved: type === 'cabut'
    })
  } finally {
    closeDecisionModal()
  }
}

const handleLogout = () => { router.push('/admin/login') }
const goBack = () => { router.back() }
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
      <button @click="handleLogout" class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-red-100 shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>

    <!-- Header Card -->
    <div class="bg-[#FFF5F0] rounded-2xl px-8 py-6 flex items-center justify-between mb-6">
      <div class="flex items-center gap-5">
        <!-- Avatar -->
        <div class="w-14 h-14 rounded-full bg-gray-300 shrink-0 overflow-hidden">
          <img src="https://i.pravatar.cc/150?img=32" alt="Vendor Avatar" class="w-full h-full object-cover" />
        </div>
        <div>
          <h1 class="text-2xl font-extrabold text-gray-900">Creativ Studio</h1>
          <span class="inline-flex items-center gap-1.5 mt-1 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            Status pengajuan: Diterima
          </span>
        </div>
      </div>
      <button class="bg-brand-navy hover:bg-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
        Lihat Profil
      </button>
    </div>

    <!-- Detail Info Card -->
    <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm">
      <div v-if="!vendor" class="text-sm text-gray-400">Memuat data vendor...</div>
      <div v-else class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-gray-900">{{ vendor.shopName || vendor.name }}</h2>
          <p class="text-sm text-gray-500 mt-0.5">#VDR-{{ vendor.id }}</p>
        </div>
        <span class="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-red-50 text-red-600 border border-red-200">
          {{ vendor.status || 'DIBATASI' }}
        </span>
      </div>

      <div v-if="appeal" class="space-y-3 text-sm">
        <div class="flex">
          <span class="text-gray-500 w-40 shrink-0">Alasan Ban:</span>
          <span class="text-gray-800 font-medium">{{ appeal.banReason || '-' }}</span>
        </div>
        <div class="flex">
          <span class="text-gray-500 w-40 shrink-0">Diblokir oleh:</span>
          <span class="text-gray-800 font-medium">{{ appeal.bannedBy || '-' }}</span>
        </div>
        <div class="flex">
          <span class="text-gray-500 w-40 shrink-0">Tanggal Banned:</span>
          <span class="text-gray-800 font-medium">{{ appeal.bannedAt ? new Date(appeal.bannedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }}</span>
        </div>
        <div class="flex">
          <span class="text-gray-500 w-40 shrink-0">Tanggal Appeal:</span>
          <span class="text-gray-800 font-medium">{{ appeal.createdAt ? new Date(appeal.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }}</span>
        </div>
      </div>
    </div>

    <!-- Bukti / Log Aktivitas Card -->
    <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm">
      <!-- Tab Buttons -->
      <div class="flex items-center gap-2 mb-6">
        <button
          @click="activeTab = 'bukti'"
          class="px-5 py-2 rounded-full text-sm font-semibold transition-all"
          :class="activeTab === 'bukti' ? 'bg-brand-navy text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          Bukti
        </button>
        <button
          @click="activeTab = 'log'"
          class="px-5 py-2 rounded-full text-sm font-semibold transition-all"
          :class="activeTab === 'log' ? 'bg-brand-navy text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          Log Aktivitas
        </button>
      </div>

      <!-- Bukti Tab Content -->
      <div v-if="activeTab === 'bukti'" class="space-y-3">
        <div v-for="(file, idx) in buktiFiles" :key="idx" class="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <!-- File Icon -->
            <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold text-gray-900">{{ file.name || file.fileName }}</p>
              <p class="text-xs text-gray-500">{{ file.format || file.fileType || 'FILE' }} · {{ file.size || file.fileSize || '-' }}</p>
            </div>
          </div>
          <a v-if="file.url" :href="file.url" target="_blank" class="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Log Aktivitas Tab Content -->
      <div v-if="activeTab === 'log'" class="pl-2">
        <div class="relative">
          <!-- Vertical Timeline Line -->
          <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-blue-200"></div>

          <div class="space-y-6">
            <div v-for="(log, idx) in logAktivitas" :key="idx" class="flex items-start gap-5 relative">
              <!-- Timeline Dot -->
              <div class="relative z-10 shrink-0 mt-1">
                <div class="w-4 h-4 rounded-full border-[3px]" :class="log.isCurrent || idx === 0 ? 'border-blue-600 bg-white' : 'border-blue-400 bg-white'"></div>
              </div>

              <!-- Content -->
              <div class="flex-1 flex items-start justify-between pb-0">
                <div>
                  <p class="text-sm font-bold" :class="log.isCurrent || idx === 0 ? 'text-blue-600' : 'text-gray-900'">{{ log.title || log.action }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ log.subtitle || log.actor }}</p>
                </div>
                <span class="text-xs text-gray-400 whitespace-nowrap ml-4 mt-0.5">{{ log.date || (log.createdAt ? new Date(log.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pesan Banding dari Pengaju Card -->
    <div class="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
      <h3 class="text-lg font-bold text-gray-900 mb-5">Pesan Banding dari Pengaju</h3>
      <div class="bg-[#FFF9F5] border border-orange-100 rounded-2xl p-6">
        <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ pesanBanding }}</p>
      </div>
    </div>

    <!-- Buat Keputusan Button - Positioned to the right -->
    <div class="flex justify-end">
      <button 
        @click="showDecisionModal = true"
        class="bg-brand-navy hover:bg-blue-800 text-white font-semibold text-sm px-16 py-3 rounded-2xl transition-colors shadow-lg hover:shadow-xl"
      >
        Buat Keputusan
      </button>
    </div>

    <!-- Decision Modal -->
    <Teleport to="body">
      <div 
        v-if="showDecisionModal" 
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="closeDecisionModal"></div>
        
        <!-- Modal Content - Keputusan Banding Card -->
        <div class="relative bg-gray-100 rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
          <!-- Close Button -->
          <button 
            @click="closeDecisionModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 class="text-base font-bold text-gray-900 mb-2">Keputusan Banding</h3>
          <p class="text-sm text-gray-500 mb-6">Periksa bukti dan log aktivitas sebelum mengambil keputusan.</p>
          
          <div class="space-y-3">
            <button 
              @click="handleDecision('cabut')"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors"
            >
              Cabut Suspend
            </button>
            <button 
              @click="handleDecision('tolak')"
              class="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3 px-4 rounded-xl border border-gray-300 transition-colors"
            >
              Tolak Banding
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* No scoped styles needed */
</style>
