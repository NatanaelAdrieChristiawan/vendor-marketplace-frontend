<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock data
const orderId = '#ORD-8829'
const orderTitle = 'Desain Logo'
const orderPrice = 'Rp 750.000'
const decisionDate = '30 April 2026, 09:14'
const resolvedDate = '30 April 2026, 14:22'

// Toggle for demonstration: 'win' or 'lose'
const disputeResult = ref<'win' | 'lose'>('win')

function toggleResult() {
  disputeResult.value = disputeResult.value === 'win' ? 'lose' : 'win'
}

function goBack() {
  router.push('/vendor/orders')
}
</script>

<template>
  <div class="py-6 px-4 max-w-5xl">
    <!-- Back Button & Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <button @click="goBack" class="hover:text-gray-900 transition-colors p-1 -ml-1">
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      </button>
      <span>Sengketa</span>
      <span class="mx-1">&rsaquo;</span>
      <span class="font-bold text-gray-900">{{ orderId }}</span>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-[32px] font-bold text-gray-900">
        {{ orderId }} | {{ orderTitle }}
      </h1>
      <span
        v-if="disputeResult === 'win'"
        class="px-4 py-1.5 text-xs font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] rounded-full uppercase tracking-wider"
      >
        COMPLETED
      </span>
      <span
        v-else
        class="px-4 py-1.5 text-xs font-bold text-[#E11D48] bg-[#FFF1F2] border border-[#FECDD3] rounded-full uppercase tracking-wider"
      >
        CANCELLED
      </span>
    </div>

    <div class="space-y-6">
      <!-- Verdict Banner -->
      <div
        v-if="disputeResult === 'win'"
        class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 flex items-start gap-4"
      >
        <div class="w-10 h-10 rounded-full bg-[#86EFAC] text-[#166534] flex items-center justify-center shrink-0 mt-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div>
          <h3 class="text-[18px] font-bold text-[#166534] mb-1">Kamu memenangkan kasus ini</h3>
          <p class="text-sm font-medium text-[#166534]/80 mb-3">REJECT-COMPLAINT - {{ resolvedDate }}</p>
          <p class="text-sm text-[#166534] leading-relaxed">
            Admin Validator telah memutuskan bahwa komplain client tidak valid. Hasil kerja kamu dinilai sudah sesuai brief yang disepakati.
          </p>
        </div>
      </div>

      <div
        v-else
        class="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-6 flex items-start gap-4"
      >
        <div class="w-10 h-10 rounded-full bg-[#FECACA] text-[#991B1B] flex items-center justify-center shrink-0 mt-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <div>
          <h3 class="text-[18px] font-bold text-[#991B1B] mb-1">Kasus Ditutup</h3>
          <p class="text-sm font-medium text-[#991B1B]/80 mb-3">ACCEPT-COMPLAINT - {{ resolvedDate }}</p>
          <p class="text-sm text-[#991B1B] leading-relaxed">
            Admin Validator telah memutuskan bahwa komplain client valid. Dana akan dikembalikan kepada client.
          </p>
        </div>
      </div>

      <!-- Details Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Dana Order Card -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">DANA ORDER</h4>
          <div
            class="rounded-2xl p-6 flex items-center justify-between"
            :class="disputeResult === 'win' ? 'bg-[#F8FAFC]' : 'bg-[#FFF1F2]'"
          >
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Total nilai order</p>
              <p class="text-3xl font-bold text-[#991B1B]" v-if="disputeResult === 'lose'">{{ orderPrice }}</p>
              <p class="text-3xl font-bold text-gray-900" v-else>{{ orderPrice }}</p>
            </div>
            
            <span
              v-if="disputeResult === 'win'"
              class="px-4 py-1.5 text-[11px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] rounded-full uppercase tracking-widest"
            >
              SELESAI
            </span>
            <span
              v-else
              class="px-4 py-1.5 text-[11px] font-bold text-[#E11D48] bg-transparent border border-[#E11D48] rounded-full uppercase tracking-widest"
            >
              Refund
            </span>
          </div>
        </div>

        <!-- Detail Order Card -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">DETAIL ORDER</h4>
          
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-6 border-b border-gray-100">
              <span class="text-sm font-bold text-gray-500">Keputusan</span>
              <span class="text-sm font-bold text-gray-900">{{ decisionDate }}</span>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-gray-500">Status Order</span>
              <span
                v-if="disputeResult === 'win'"
                class="px-4 py-1.5 text-[11px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] rounded-full uppercase tracking-widest"
              >
                SELESAI
              </span>
              <span
                v-else
                class="px-4 py-1.5 text-[11px] font-bold text-[#E11D48] bg-[#FFF1F2] border border-[#FECDD3] rounded-full uppercase tracking-widest"
              >
                CANCELLED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Temporary button to toggle state for demonstration -->
    <div class="mt-12 text-center">
      <button @click="toggleResult" class="text-xs font-bold text-gray-400 hover:text-gray-600 underline">
        Toggle Win/Lose State (Demo)
      </button>
    </div>
  </div>
</template>
