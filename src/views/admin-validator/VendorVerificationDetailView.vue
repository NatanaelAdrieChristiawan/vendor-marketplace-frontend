<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdmin } from '../../composables/useAdmin'

const router = useRouter()
const route = useRoute()
const { pendingMerchantsQuery, verifyMerchantMutation } = useAdmin()

const merchantId = Number(route.params.id)

const merchant = computed(() => {
  return pendingMerchantsQuery.data.value?.find((v: any) => v.id === merchantId)
})

const parsedKyb = computed(() => {
  if (!merchant.value?.kybDocuments) return null
  try {
    return JSON.parse(merchant.value.kybDocuments)
  } catch (e) {
    return null
  }
})

const rejectReason = ref('')
const showRejectModal = ref(false)

function goBack() {
  router.push('/admin-validator/vendor-verification')
}

function openRejectModal() {
  showRejectModal.value = true
}

function closeRejectModal() {
  showRejectModal.value = false
  rejectReason.value = ''
}

async function submitReject() {
  if (!rejectReason.value) return
  
  await verifyMerchantMutation.mutateAsync({
    id: merchantId,
    isApproved: false,
    rejectionReason: rejectReason.value
  })
  
  closeRejectModal()
  goBack()
}

async function submitApprove() {
  await verifyMerchantMutation.mutateAsync({
    id: merchantId,
    isApproved: true
  })
  goBack()
}
</script>

<template>
  <div v-if="merchant" class="space-y-6 animate-fade-in w-full pb-20 max-w-[900px] mx-auto">
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4">
      <button @click="goBack" class="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-800 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <h1 class="text-xl font-bold">Detail Verifikasi Vendor</h1>
    </div>

    <!-- Profile Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
          <img v-if="merchant.logoUrl" :src="merchant.logoUrl" alt="Logo" class="w-full h-full object-cover" />
          <span v-else class="text-xl font-bold text-gray-400">{{ merchant.shopName[0] }}</span>
        </div>
        <div>
          <h2 class="text-2xl font-extrabold text-[#0B152A]">{{ merchant.shopName }}</h2>
          <p class="text-sm text-gray-500">{{ merchant.user?.email }}</p>
        </div>
      </div>
      <div class="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold border border-orange-100">
        Menunggu Verifikasi
      </div>
    </div>

    <!-- Dokumen Verifikasi -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h3 class="font-extrabold text-gray-900 text-[15px]">Dokumen Verifikasi</h3>
      </div>
      <div class="p-6 space-y-4">
        <!-- KTM / SK -->
        <div class="border border-gray-100 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1E3A8A]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-sm">KTM / SK Organisasi</h4>
              <p class="text-xs text-gray-500 mt-0.5 truncate max-w-[300px]">{{ parsedKyb?.kybDocumentUrl || 'Tidak ada file' }}</p>
            </div>
          </div>
          <a v-if="parsedKyb?.kybDocumentUrl" :href="parsedKyb.kybDocumentUrl" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1">
            Buka File
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <!-- Portofolio -->
        <div class="border border-gray-100 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1E3A8A]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-sm">Website Portofolio</h4>
              <p class="text-xs text-gray-500 mt-0.5 truncate max-w-[300px]">{{ parsedKyb?.portfolioUrl || 'Tidak ada link' }}</p>
            </div>
          </div>
          <a v-if="parsedKyb?.portfolioUrl" :href="parsedKyb.portfolioUrl" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1">
            Buka Link
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Informasi Bisnis -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h3 class="font-extrabold text-gray-900 text-[15px]">Informasi Bisnis</h3>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nama Pemilik</p>
          <p class="font-extrabold text-gray-900 text-sm">{{ merchant.user?.fullName }}</p>
        </div>
        <div>
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Terdaftar Pada</p>
          <p class="font-extrabold text-gray-900 text-sm">{{ new Date(merchant.createdAt).toLocaleDateString() }}</p>
        </div>
        <div class="col-span-full">
          <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Deskripsi Toko</p>
          <p class="font-medium text-gray-700 text-sm leading-relaxed">{{ merchant.description || 'Tidak ada deskripsi' }}</p>
        </div>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="flex flex-col items-end gap-3 mt-8 pt-4">
      <button 
        @click="submitApprove" 
        :disabled="verifyMerchantMutation.isPending.value"
        class="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-extrabold py-3.5 px-10 rounded-xl uppercase tracking-wide text-sm transition-colors shadow-sm w-auto min-w-[200px]"
      >
        {{ verifyMerchantMutation.isPending.value ? 'Memproses...' : 'Setujui Vendor' }}
      </button>
      <button 
        @click="openRejectModal" 
        :disabled="verifyMerchantMutation.isPending.value"
        class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-extrabold py-3.5 px-10 rounded-xl uppercase tracking-wide text-sm transition-colors shadow-sm w-auto min-w-[200px]"
      >
        Tolak Pengajuan
      </button>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div class="absolute inset-0" @click="closeRejectModal"></div>
      <div class="relative w-full max-w-[450px] bg-white rounded-[20px] shadow-2xl overflow-hidden">
        <div class="bg-[#DF4A4A] px-6 py-5 flex items-center justify-between">
          <h3 class="text-white font-bold text-lg">Tolak Pengajuan</h3>
          <button @click="closeRejectModal" class="text-white hover:text-red-200 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-8">
          <p class="text-sm text-gray-600 mb-6">Berikan alasan yang jelas agar vendor dapat melakukan perbaikan data.</p>
          <label class="block text-base font-bold text-gray-900 mb-3">Catatan Alasan</label>
          <textarea 
            v-model="rejectReason"
            rows="5"
            placeholder="Tulis alasan penolakan di sini..."
            class="w-full p-4 border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#DF4A4A] focus:border-transparent resize-none bg-white"
          ></textarea>
          
          <div class="flex justify-end mt-8">
            <button 
              @click="submitReject" 
              :disabled="verifyMerchantMutation.isPending.value"
              class="bg-[#DF4A4A] hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 px-10 rounded-[12px] transition-colors text-base shadow-sm"
            >
              {{ verifyMerchantMutation.isPending.value ? 'Memproses...' : 'Tolak' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-20 text-center text-gray-500 animate-fade-in">
    Memuat data toko...
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
