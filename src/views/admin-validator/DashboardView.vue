<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdmin } from '../../composables/useAdmin'
import Toast from '../../components/ui/Toast.vue'

const router = useRouter()
const { pendingMerchantsQuery, pendingDisputesQuery, pendingGigsQuery, verifyGigMutation } = useAdmin()

const showToast = ref(false)
const toastData = ref({ type: 'success' as 'success' | 'info' | 'error', title: '', subtitle: '' })

function showToastMsg(type: 'success' | 'info' | 'error', title: string, subtitle: string) {
  toastData.value = { type, title, subtitle }
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 3000)
}

const stats = computed(() => [
  {
    title: 'Vendor baru yang membutuhkan validasi',
    value: pendingMerchantsQuery.data.value?.length || 0,
    icon: 'store',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
  },
  {
    title: 'Layanan baru menunggu persetujuan',
    value: pendingGigsQuery.data.value?.length || 0,
    icon: 'briefcase',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
  },
  {
    title: 'Kasus transaksi tertunda atau klaim pengembalian dana',
    value: pendingDisputesQuery.data.value?.length || 0,
    icon: 'scale',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
  },
])

const pendingReviews = computed(() => {
  const merchants = pendingMerchantsQuery.data.value || []
  return merchants.slice(0, 5).map((m: any) => ({
    id: m.id,
    name: m.shopName,
    type: 'Creative Services',
    email: m.user?.email || 'N/A'
  }))
})

const pendingGigs = computed(() => {
  return pendingGigsQuery.data.value || []
})

function goToVerification(id: number) {
  router.push(`/admin-validator/vendor-verification/${id}`)
}

// Rejection Modal state for Gigs
const activeGigToReject = ref<any>(null)
const rejectReason = ref('')
const showRejectModal = ref(false)

async function handleApproveGig(gigId: number) {
  try {
    await verifyGigMutation.mutateAsync({ id: gigId, isApproved: true })
    showToastMsg('success', 'Layanan Disetujui', 'Layanan berhasil diterbitkan ke katalog publik.')
  } catch (err) {
    console.error(err)
    showToastMsg('error', 'Gagal Memproses', 'Terjadi kesalahan saat menyetujui layanan.')
  }
}

function openRejectGigModal(gig: any) {
  activeGigToReject.value = gig
  rejectReason.value = ''
  showRejectModal.value = true
}

async function submitRejectGig() {
  if (!activeGigToReject.value) return
  if (!rejectReason.value.trim()) {
    showToastMsg('error', 'Alasan Wajib Diisi', 'Silakan masukkan alasan penolakan layanan.')
    return
  }

  try {
    await verifyGigMutation.mutateAsync({
      id: activeGigToReject.value.id,
      isApproved: false,
      rejectionReason: rejectReason.value
    })
    showRejectModal.value = false
    activeGigToReject.value = null
    rejectReason.value = ''
    showToastMsg('info', 'Layanan Ditolak', 'Layanan telah ditolak dengan alasan yang ditentukan.')
  } catch (err) {
    console.error(err)
    showToastMsg('error', 'Gagal Memproses', 'Terjadi kesalahan saat menolak layanan.')
  }
}

function formatPrice(val: any) {
  const num = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(num)) return 'Rp 0'
  return 'Rp ' + num.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-8 animate-fade-in w-full pb-10">
    <!-- Success/Error Toast -->
    <div v-if="showToast" class="fixed top-8 right-8 z-50">
      <Toast :type="toastData.type" :title="toastData.title" :subtitle="toastData.subtitle" />
    </div>

    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.iconBg, stat.iconColor]">
            <svg v-if="stat.icon === 'store'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <svg v-else-if="stat.icon === 'briefcase'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <svg v-else-if="stat.icon === 'scale'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-[32px] font-bold text-gray-900 mb-2 leading-none">{{ stat.value }}</h3>
          <p class="text-sm text-gray-500 font-medium leading-snug">{{ stat.title }}</p>
        </div>
      </div>
    </div>

    <!-- Antrian Peninjauan Vendor -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-800">Antrian Verifikasi Vendor Baru</h2>
        <button @click="router.push('/admin-validator/vendor-verification')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500">
          <thead class="text-xs text-gray-400 bg-gray-50/50 uppercase border-b border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Nama Vendor</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tipe</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Email</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="pendingReviews.length > 0" class="divide-y divide-gray-100">
            <tr v-for="user in pendingReviews" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4 font-semibold text-gray-800">{{ user.name }}</td>
              <td class="px-6 py-4 font-medium text-gray-600">{{ user.type }}</td>
              <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="goToVerification(user.id)" class="bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
                  Lihat
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="px-6 py-10 text-center text-gray-400 italic">Tidak ada antrean verifikasi vendor tertunda</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Antrian Validasi Layanan (Gig) Baru -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-800">Antrian Validasi Layanan (Gig) Baru</h2>
        <span class="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full" v-if="pendingGigs.length > 0">
          {{ pendingGigs.length }} menunggu
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500">
          <thead class="text-xs text-gray-400 bg-gray-50/50 uppercase border-b border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Layanan</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Kategori</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Merchant / Vendor</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Harga Standard</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="pendingGigs.length > 0" class="divide-y divide-gray-100">
            <tr v-for="gigItem in pendingGigs" :key="gigItem.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="gigItem.mediaUrls || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&q=80'" class="w-12 h-10 object-cover rounded-lg border border-gray-100" />
                  <div>
                    <div class="font-bold text-gray-800">{{ gigItem.title }}</div>
                    <div class="text-[11px] text-gray-400 max-w-[240px] truncate">{{ gigItem.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 font-medium text-gray-600">
                {{ gigItem.category?.name || 'Umum' }}
              </td>
              <td class="px-6 py-4 text-gray-700 font-semibold">
                {{ gigItem.merchant?.shopName || 'Vendor' }}
              </td>
              <td class="px-6 py-4 text-gray-900 font-bold">
                {{ formatPrice(gigItem.price) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click="handleApproveGig(gigItem.id)" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                    Setujui
                  </button>
                  <button @click="openRejectGigModal(gigItem)" class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                    Tolak
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="px-6 py-10 text-center text-gray-400 italic">Tidak ada antrean validasi layanan tertunda</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rejection Reason Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100 animate-fade-in">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Tolak Pengajuan Layanan</h3>
        <p class="text-sm text-gray-500 mb-4">
          Silakan tuliskan alasan penolakan layanan <strong class="text-gray-700">"{{ activeGigToReject?.title }}"</strong>. Vendor akan menerima pemberitahuan ini.
        </p>
        <textarea
          v-model="rejectReason"
          rows="4"
          placeholder="Tuliskan alasan penolakan secara jelas dan solutif..."
          class="w-full rounded-xl border-gray-200 border p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none mb-4"
        ></textarea>
        <div class="flex items-center justify-end gap-3">
          <button @click="showRejectModal = false" class="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button @click="submitRejectGig" class="px-4 py-2 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 transition-colors">
            Kirim Penolakan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>


<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
