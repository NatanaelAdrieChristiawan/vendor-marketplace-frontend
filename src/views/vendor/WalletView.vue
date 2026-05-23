<script setup lang="ts">
import { useWallet } from '../../composables/useWallet'
import { useWithdrawals } from '../../composables/useWithdrawals'

const { merchantProfileQuery } = useWallet()
const { myWithdrawalsQuery } = useWithdrawals()

function formatCurrency(amount: any) {
  if (!amount) return 'Rp 0'
  return `Rp ${Number(amount).toLocaleString('id-ID')}`
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-50 text-green-600 border border-green-100'
    case 'REJECTED':
      return 'bg-red-50 text-red-600 border border-red-100'
    case 'PENDING':
      return 'bg-yellow-50 text-yellow-600 border border-yellow-100'
    default:
      return 'bg-gray-50 text-gray-600 border border-gray-100'
  }
}

function translateStatus(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'Selesai'
    case 'REJECTED':
      return 'Ditolak'
    case 'PENDING':
      return 'Diproses'
    default:
      return status
  }
}
</script>

<template>
  <div class="py-8 px-4 max-w-5xl mx-auto font-sans animate-fade-in">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Dompet Saya</h1>
      <p class="text-sm text-gray-500 mt-1">Kelola saldo, pendapatan, dan pengajuan penarikan dana Anda.</p>
    </div>

    <div v-if="merchantProfileQuery.isLoading.value" class="p-12 text-center text-gray-500">
      Memuat data dompet...
    </div>

    <div v-else class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg h-[220px] flex flex-col justify-between">
          <div class="relative z-10">
            <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div class="space-y-1">
              <div class="text-3xl font-extrabold leading-tight">
                {{ formatCurrency(merchantProfileQuery.data.value?.walletBalance) }}
              </div>
              <div class="text-white/80 text-xs font-bold uppercase tracking-wider">Saldo Utama</div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg h-[220px] flex flex-col justify-between">
          <div class="relative z-10">
            <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div class="space-y-1">
              <div class="text-3xl font-extrabold leading-tight">
                {{ formatCurrency(merchantProfileQuery.data.value?.pendingBalance) }}
              </div>
              <div class="text-white/80 text-xs font-bold uppercase tracking-wider">Saldo Tertahan (On-Hold)</div>
            </div>
          </div>
        </div>
      </div>

      <router-link
        to="/vendor/withdraw"
        class="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-md group font-bold text-lg"
      >
        <span>Tarik Dana (Withdraw)</span>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm">
          <svg class="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </router-link>

      <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mt-8">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Riwayat Penarikan Dana</h2>
        </div>

        <div v-if="myWithdrawalsQuery.isLoading.value" class="p-8 text-center text-gray-500">
          Memuat riwayat penarikan...
        </div>

        <div v-else-if="!myWithdrawalsQuery.data.value || myWithdrawalsQuery.data.value.length === 0" class="p-12 text-center text-gray-400">
          Belum ada riwayat penarikan dana.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50">
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rekening Tujuan</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Jumlah</th>
                <th class="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx, index) in myWithdrawalsQuery.data.value" :key="index" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                <td class="px-6 py-5 text-xs font-medium text-gray-600">{{ formatDate(tx.createdAt) }}</td>
                <td class="px-6 py-5 text-xs font-bold text-gray-800">
                  {{ tx.bankAccount?.bankName }} - {{ tx.bankAccount?.accountNumber }} a/n {{ tx.bankAccount?.accountHolderName }}
                </td>
                <td class="px-6 py-5 text-xs font-extrabold text-center text-gray-900">
                  {{ formatCurrency(tx.amount) }}
                </td>
                <td class="px-6 py-5 text-center">
                  <span class="px-3 py-1 rounded-full text-[10px] font-bold" :class="getStatusClasses(tx.status)">
                    {{ translateStatus(tx.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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

