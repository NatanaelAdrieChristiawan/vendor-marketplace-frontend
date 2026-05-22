<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '../../components/ui/Button.vue'
import { useAuth } from '../../composables/useAuth'

const { profileQuery } = useAuth()
const user = computed(() => profileQuery.data.value)
const merchantStatus = computed(() => user.value?.merchant?.status || 'INCOMPLETE')
const fullName = computed(() => user.value?.fullName || 'User')
const isVerified = computed(() => {
  const s = merchantStatus.value
  return s === 'ACTIVE' || s === 'VACATION'
})
const tasks = ref([
  {
    id: '#ORD-8821',
    title: 'Desain Postingan Media Sosial - Paket Premium',
    user: 'Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah1',
    time: '13 Jam',
    status: 'BARU',
  },
  {
    id: '#ORD-8815',
    title: 'Fotografi Produk - Gadget Teknologi',
    user: 'Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah2',
    date: '24 Okt 2023',
    status: 'SEDANG DIPROSES',
  },
  {
    id: '#ORD-8790',
    title: 'Penulisan Konten',
    user: 'Sarah',
    avatar: 'https://i.pravatar.cc/150?u=sarah3',
    time: 'Due Today',
    status: 'DALAM REVISI',
  },
])

const messages = ref([
  {
    id: 1,
    name: 'Andi',
    avatar: 'https://i.pravatar.cc/150?u=andi',
    time: '10m ago',
    text: 'Misi bang, boleh buat penawaran khusus untuk 3 video...',
    unread: 1,
  }
])
</script>

<template>
  <div class="py-2 relative">
    <div v-if="!isVerified" class="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[8px]">
      <div class="flex items-center gap-6">
        <div class="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-[56px] font-bold leading-none">
          <span v-if="merchantStatus === 'REJECTED'" class="text-red-500">!</span>
          <span v-else>!</span>
        </div>
        
        <div v-if="merchantStatus === 'INCOMPLETE'" class="flex flex-col gap-1.5">
          <h2 class="text-[32px] font-bold text-gray-900">Dokumen kamu belum lengkap!</h2>
          <p class="text-[17px] text-gray-800">Lengkapi dokumen yang diperlukan, <router-link to="/vendor/documents" class="text-[#2F4DC4] font-bold hover:underline">disini</router-link></p>
        </div>

        <div v-else-if="merchantStatus === 'PENDING_VERIFICATION'" class="flex flex-col gap-1.5">
          <h2 class="text-[32px] font-bold text-gray-900">Profil kamu lagi di cek sama admin</h2>
          <p class="text-[17px] text-gray-800">Status Merchant <span class="text-[#2F4DC4] font-bold">PENDING_VERIFICATION</span></p>
        </div>

        <div v-else-if="merchantStatus === 'REJECTED'" class="flex flex-col gap-1.5">
          <h2 class="text-[32px] font-bold text-gray-900">Verifikasi dokumen kamu ditolak</h2>
          <p class="text-[17px] text-gray-800">Status Merchant <span class="text-red-600 font-bold">REJECTED</span>. Silakan <router-link to="/vendor/documents" class="text-[#2F4DC4] font-bold hover:underline">upload ulang</router-link></p>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-gray-900">Welcome back, {{ fullName }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div class="flex justify-between items-start mb-6">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </div>
          <span class="text-sm font-medium text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Berdasarkan 124 ulasan</span>
        </div>
        <div>
          <div class="flex items-baseline gap-1 mb-1">
            <span class="text-[32px] font-bold text-gray-900 leading-none">4.9</span>
            <span class="text-gray-500 font-medium text-lg">/5.0</span>
          </div>
          <p class="text-gray-400 text-sm font-medium">Rata-rata Penilaian</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div class="flex justify-between items-start mb-6">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span class="text-sm font-medium text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+2% dibanding bulan lalu</span>
        </div>
        <div>
          <div class="text-[32px] font-bold text-gray-900 leading-none mb-2">5</div>
          <p class="text-gray-400 text-sm font-medium">Ketetapan Waktu Pelayanan</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div class="flex justify-between items-start mb-6">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
        </div>
        <div>
          <div class="text-[32px] font-bold text-gray-900 leading-none mb-2">5</div>
          <p class="text-gray-400 text-sm font-medium">Pesanan Aktif</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Daftar Tugas (Pesanan Aktif)</h2>
          <router-link to="/vendor/orders" class="text-[#4B6BFB] font-semibold hover:text-[#4B6BFB]/80 transition-colors text-right">Lihat<br/>Semua</router-link>
        </div>
        
        <div class="p-6 flex flex-col gap-4">
          <div 
            v-for="task in tasks" 
            :key="task.id"
            class="border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FCFCFD]"
          >
            <div class="flex-1">
              <span class="text-brand-blue text-sm font-semibold mb-1 block">{{ task.id }}</span>
              <h3 class="text-base font-bold text-gray-900 mb-3">{{ task.title }}</h3>
              
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <img :src="task.avatar" alt="Avatar" class="w-6 h-6 rounded-full object-cover" />
                  <span class="text-sm font-medium text-gray-600">{{ task.user }}</span>
                </div>
                
                <div v-if="task.time" class="flex items-center gap-1.5" :class="task.status === 'DALAM REVISI' ? 'text-orange-500' : 'text-orange-400'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span class="text-sm font-medium">{{ task.time }}</span>
                </div>

                <div v-if="task.date" class="flex items-center gap-1.5 text-brand-navy font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span class="text-sm">{{ task.date }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
              <span v-if="task.status === 'BARU'" class="px-3 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg shrink-0">BARU</span>
              <span v-else-if="task.status === 'SEDANG DIPROSES'" class="text-blue-500 text-xs font-bold uppercase tracking-wider shrink-0">{{ task.status }}</span>
              <span v-else-if="task.status === 'DALAM REVISI'" class="px-3 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg shrink-0">DALAM REVISI</span>
              
              <Button v-if="task.status === 'BARU'" variant="primary" class="w-full sm:w-auto px-6 py-2 rounded-xl text-sm whitespace-nowrap">
                Terima Pesanan
              </Button>
              <button v-else class="w-full sm:w-auto px-6 py-2 rounded-xl text-sm font-bold text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap">
                Lihat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Pesan Belum Dibaca</h2>
          <span class="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">3</span>
        </div>
        
        <div class="flex flex-col flex-1">
          <router-link 
            v-for="msg in messages" 
            :key="msg.id"
            to="/vendor/messages"
            class="p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4"
          >
            <img :src="msg.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <h4 class="font-bold text-gray-900 text-sm">{{ msg.name }}</h4>
                <span class="text-xs text-[#4B6BFB] font-medium">{{ msg.time }}</span>
              </div>
              <p class="text-sm text-gray-600 truncate">{{ msg.text }}</p>
            </div>
            <div v-if="msg.unread" class="flex flex-col justify-center shrink-0">
              <span class="w-5 h-5 rounded-full bg-[#4B6BFB] text-white text-[10px] font-bold flex items-center justify-center">{{ msg.unread }}</span>
            </div>
          </router-link>
        </div>
        
        <div class="p-6 mt-auto text-center">
          <router-link to="/vendor/messages" class="text-[#4B6BFB] font-bold text-sm hover:text-brand-navy flex items-center justify-center gap-2 mx-auto">
            Lihat semua pesan
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
