<script setup lang="ts">
import { ref } from 'vue'

const storeData = ref({
  name: 'Pixel Perfect Design Studio',
  category: 'Creative Services',
  description: 'Kami menyediakan jasa desain UI/UX modern, branding identitas, dan ilustrasi kustom untuk startup dan UMKM. Berpengalaman lebih dari 5 tahun di industri kreatif.',
  serviceCategory: 'Creative',
  paymentMethod: {
    bank: 'Bank Central Asia (BCA)',
    account: 'Rek: **** 8892'
  }
})
</script>

<template>
  <div class="max-w-4xl py-6 font-sans">
    <!-- Page Title -->
    <h1 class="text-[28px] font-bold text-gray-900 mb-8">Profil Toko</h1>

    <!-- Main Profile Card -->
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-10">
      <!-- Banner -->
      <div class="h-48 w-full bg-gradient-to-r from-yellow-400 via-green-400 to-purple-600 relative overflow-hidden">
        <!-- Colorful abstract banner placeholder to simulate the spiral -->
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover mix-blend-overlay opacity-60" alt="Banner" />
      </div>

      <!-- Content Container -->
      <div class="px-8 pb-8 relative">
        <!-- Avatar -->
        <div class="absolute -top-16 left-8 w-32 h-32 rounded-full border-[6px] border-white bg-[#FCE8ED] flex items-center justify-center overflow-hidden shadow-sm">
          <img src="https://api.dicebear.com/7.x/shapes/svg?seed=PixelPerfect&backgroundColor=transparent" alt="Logo" class="w-16 h-16 object-contain" />
        </div>

        <!-- Spacer for Avatar -->
        <div class="h-20"></div>

        <!-- Store Name & Badge -->
        <div class="mb-8">
          <h2 class="text-[26px] font-bold text-gray-900 mb-3">{{ storeData.name }}</h2>
          <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200 shadow-sm">
            {{ storeData.category }}
          </span>
        </div>

        <!-- Short Description -->
        <div class="mb-6">
          <h3 class="text-xs font-bold text-gray-500 tracking-wider mb-3 uppercase">Deskripsi Singkat</h3>
          <p class="text-[15px] text-gray-700 leading-relaxed max-w-3xl">
            {{ storeData.description }}
          </p>
        </div>

        <div class="w-full h-[1px] bg-gray-100 my-6"></div>

        <!-- Service Category -->
        <div>
          <h3 class="text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">Kategori Layanan</h3>
          <p class="text-[15px] font-medium text-gray-900">{{ storeData.serviceCategory }}</p>
        </div>
      </div>
    </div>

    <!-- Payment Method Section -->
    <div class="mb-12">
      <h3 class="text-xs font-bold text-gray-500 tracking-wider mb-3 uppercase px-1">Metode Pembayaran</h3>
      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <h4 class="text-[14px] font-bold text-gray-900 mb-1">{{ storeData.paymentMethod.bank }}</h4>
          <p class="text-sm text-gray-500">{{ storeData.paymentMethod.account }}</p>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="flex justify-end">
      <button class="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-sm hover:shadow-md">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Ubah
      </button>
    </div>
  </div>
</template>

<style scoped>
/* No specific scoped styles needed since we are using Tailwind utilities */
</style>
