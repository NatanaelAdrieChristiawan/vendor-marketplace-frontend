<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const gigId = 1 // Mock ID
const title = 'Desain Produk Untuk Bisnis Anda'
const description = 'Apakah Anda mencari desain produk yang tidak hanya terlihat cantik tetapi juga unik untuk bisnis Anda? Saya menawarkan solusi desain produk kelas dunia yang disesuaikan dengan kebutuhan spesifik industri Anda.'

const activeTab = ref('standard')
const showBoostModal = ref(false)

const duration = ref('3')
const paymentMethod = ref('saldo')

function handleEdit() {
  router.push(`/vendor/catalog/edit/${gigId}/form`)
}

function handleBoost() {
  showBoostModal.value = true
}

function confirmBoost() {
  showBoostModal.value = false
  // show toast or update status
}
</script>

<template>
  <div class="preview-page max-w-6xl mx-auto pb-24">
    <!-- Header -->
    <button class="back-btn mb-6" @click="router.push('/vendor/catalog')">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Left Column (Content) -->
      <div class="lg:col-span-2 space-y-12">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ title }}</h1>
          <div class="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1542314831-c6a4d14b8fc5?auto=format&fit=crop&q=80" alt="Gig preview" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Tentang Jasa Ini -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Tentang Jasa Ini</h2>
          <p class="text-gray-600 leading-relaxed mb-6">{{ description }}</p>
          
          <!-- Provider Info -->
          <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm w-max pr-12">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <img src="https://ui-avatars.com/api/?name=Sarah&background=random" alt="Avatar" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900">Sarah</h4>
              <p class="text-xs text-gray-500">Expert Product Designer</p>
              <div class="flex items-center gap-1 mt-1 text-xs font-medium text-gray-700">
                <svg class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                4.9 <span class="text-gray-400">(20 ulasan)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bandingkan Paket -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Bandingkan Paket</h2>
          <div class="border border-gray-100 rounded-xl overflow-hidden bg-white">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="py-4 px-6 font-medium text-gray-500">Fitur</th>
                  <th class="py-4 px-6 font-medium text-gray-500">Dasar</th>
                  <th class="py-4 px-6 font-medium text-gray-500">Standar</th>
                  <th class="py-4 px-6 font-medium text-gray-500">Premium</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">Pilihan Desain</td>
                  <td class="py-4 px-6 text-gray-600">1 Section</td>
                  <td class="py-4 px-6 text-gray-600">5 Section</td>
                  <td class="py-4 px-6 text-gray-600">12 Section</td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">Revisi</td>
                  <td class="py-4 px-6 text-gray-600">1x</td>
                  <td class="py-4 px-6 text-gray-600">3x</td>
                  <td class="py-4 px-6 text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">Pengerjaan</td>
                  <td class="py-4 px-6 text-gray-600">3 Hari</td>
                  <td class="py-4 px-6 text-gray-600">7 Hari</td>
                  <td class="py-4 px-6 text-gray-600">14 Hari</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Ulasan Pelanggan -->
        <div class="pt-6 border-t border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Ulasan Pelanggan</h2>
            <div class="flex items-center gap-1 text-sm font-bold text-gray-900">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              4.9 <span class="text-gray-400 font-medium text-xs ml-1">dari 20 ulasan</span>
            </div>
          </div>

          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <img src="https://ui-avatars.com/api/?name=Andi+Pratama&background=random" alt="Avatar" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-bold text-gray-900 text-sm">Andi Pratama</h4>
                  <span class="text-xs text-gray-500">2 minggu yang lalu</span>
                </div>
                <div class="flex items-center gap-0.5 mb-2 text-yellow-400">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed mb-3">Respon sangat cepat dan revisi dilakukan dengan teliti.</p>
                <button class="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
                  Membantu
                </button>
              </div>
            </div>
            
            <button class="w-full py-3.5 border border-brand-light/30 rounded-xl text-sm font-bold text-brand-light hover:bg-blue-50 transition-colors mt-2">
              Lihat Semua Ulasan
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column (Sidebar) -->
      <div class="space-y-6">
        <!-- Pricing Card -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
          <!-- Tabs -->
          <div class="flex p-1 bg-gray-50 rounded-xl mb-6">
            <button 
              @click="activeTab = 'basic'"
              class="flex-1 py-2 text-xs font-bold rounded-lg transition-colors"
              :class="activeTab === 'basic' ? 'bg-white shadow-sm text-brand-navy' : 'text-gray-500 hover:text-gray-700'"
            >Basic</button>
            <button 
              @click="activeTab = 'standard'"
              class="flex-1 py-2 text-xs font-bold rounded-lg transition-colors"
              :class="activeTab === 'standard' ? 'bg-white shadow-sm text-brand-navy' : 'text-gray-500 hover:text-gray-700'"
            >Standard</button>
            <button 
              @click="activeTab = 'premium'"
              class="flex-1 py-2 text-xs font-bold rounded-lg transition-colors"
              :class="activeTab === 'premium' ? 'bg-white shadow-sm text-brand-navy' : 'text-gray-500 hover:text-gray-700'"
            >Premium</button>
          </div>

          <div class="flex justify-between items-start mb-6">
            <h3 class="text-xl font-bold text-gray-900 leading-tight">Paket<br/><span class="capitalize">{{ activeTab }}</span></h3>
            <span class="text-2xl font-bold text-brand-navy">Rp50.000</span>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-sm text-gray-700">
              <svg class="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Full Product Design
            </li>
            <li class="flex items-center gap-3 text-sm text-gray-700">
              <svg class="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Banyak Pilihan
            </li>
            <li class="flex items-center gap-3 text-sm text-gray-700">
              <svg class="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Dasar Desain sistem
            </li>
          </ul>

          <div class="space-y-3">
            <button @click="handleEdit" class="w-full py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Edit Gig Ini
            </button>
            <button @click="handleBoost" class="w-full py-3.5 bg-[#059669] rounded-xl text-sm font-bold text-white hover:bg-[#047857] transition-colors flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Boost Layanan
            </button>
          </div>
        </div>

        <!-- Status Featured -->
        <div class="bg-[#F0F7FF] rounded-2xl p-5 border border-blue-100">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-brand-navy">Status Featured Aktif</h4>
              <p class="text-xs text-blue-600/80">Gig Anda sedang diprioritaskan di hasil pencarian.</p>
            </div>
          </div>

          <div class="bg-white rounded-xl p-4">
            <p class="text-xs font-bold text-brand-navy mb-3 text-center">Berakhir Dalam</p>
            <div class="flex justify-center gap-4">
              <div class="text-center">
                <div class="text-xl font-black text-gray-900">02</div>
                <div class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Hari</div>
              </div>
              <div class="text-xl font-bold text-gray-200">:</div>
              <div class="text-center">
                <div class="text-xl font-black text-gray-900">04</div>
                <div class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Jam</div>
              </div>
              <div class="text-xl font-bold text-gray-200">:</div>
              <div class="text-center">
                <div class="text-xl font-black text-gray-900">12</div>
                <div class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Menit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boost Modal -->
    <Transition name="fade">
      <div v-if="showBoostModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="showBoostModal = false"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[32px] w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
          <!-- Header -->
          <div class="bg-brand-light p-8 rounded-t-[32px] text-white">
            <h2 class="text-2xl font-bold mb-3">Boost Your Sales!</h2>
            <p class="text-sm text-blue-50/90 leading-relaxed">Tampilkan Gig Anda di halaman utama dan peringkat teratas hasil pencarian untuk mendapatkan lebih banyak pesanan.</p>
          </div>

          <!-- Body -->
          <div class="p-8 space-y-8 bg-[#FFF5F5]/30">
            <!-- Step 1 -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">1</div>
                <h3 class="text-sm font-bold text-gray-900">Pilih Durasi Promosi</h3>
              </div>
              
              <div class="space-y-3">
                <label class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors" :class="duration === '3' ? 'border-brand-light bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'">
                  <div class="flex items-center gap-4">
                    <input type="radio" value="3" v-model="duration" class="w-4 h-4 text-brand-light focus:ring-brand-light border-gray-300" />
                    <div>
                      <div class="text-sm font-bold text-gray-900">3 Hari</div>
                      <div class="text-[10px] text-gray-500">Booster Ringan</div>
                    </div>
                  </div>
                  <div class="font-bold text-gray-900">Rp 50.000</div>
                </label>

                <label class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors" :class="duration === '7' ? 'border-brand-light bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'">
                  <div class="flex items-center gap-4">
                    <input type="radio" value="7" v-model="duration" class="w-4 h-4 text-brand-light focus:ring-brand-light border-gray-300" />
                    <div>
                      <div class="text-sm font-bold text-gray-900">7 Hari</div>
                      <div class="text-[10px] text-gray-500">Pilihan Populer</div>
                    </div>
                  </div>
                  <div class="font-bold text-gray-900">Rp 110.000</div>
                </label>

                <label class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors" :class="duration === '30' ? 'border-brand-light bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'">
                  <div class="flex items-center gap-4">
                    <input type="radio" value="30" v-model="duration" class="w-4 h-4 text-brand-light focus:ring-brand-light border-gray-300" />
                    <div>
                      <div class="text-sm font-bold text-gray-900">30 Hari</div>
                      <div class="text-[10px] text-gray-500">Dominasi Pasar</div>
                    </div>
                  </div>
                  <div class="font-bold text-gray-900">Rp 450.000</div>
                </label>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">2</div>
                <h3 class="text-sm font-bold text-gray-900">Metode Pembayaran</h3>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <label class="p-4 rounded-xl border-2 cursor-pointer text-center transition-colors" :class="paymentMethod === 'saldo' ? 'border-brand-light bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'">
                  <input type="radio" value="saldo" v-model="paymentMethod" class="sr-only" />
                  <svg class="w-8 h-8 mx-auto mb-2 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  <div class="text-xs font-bold" :class="paymentMethod === 'saldo' ? 'text-brand-light' : 'text-gray-600'">Potong Saldo</div>
                  <div class="text-[9px] text-gray-400 mt-1">(Saldo: Rp 200.000)</div>
                </label>

                <label class="p-4 rounded-xl border-2 cursor-pointer text-center transition-colors" :class="paymentMethod === 'transfer' ? 'border-brand-light bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'">
                  <input type="radio" value="transfer" v-model="paymentMethod" class="sr-only" />
                  <svg class="w-8 h-8 mx-auto mb-2" :class="paymentMethod === 'transfer' ? 'text-brand-light' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  <div class="text-xs font-bold" :class="paymentMethod === 'transfer' ? 'text-brand-light' : 'text-gray-600'">Transfer Bank</div>
                  <div class="text-[9px] text-gray-400 mt-1">Verifikasi Manual</div>
                </label>
              </div>
            </div>

            <!-- Step 3 (Only if transfer) -->
            <div v-if="paymentMethod === 'transfer'" class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">3</div>
                <h3 class="text-sm font-bold text-gray-900">Verifikasi Pembayaran</h3>
              </div>
              
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-white hover:border-brand-light transition-colors cursor-pointer">
                <svg class="w-8 h-8 mx-auto mb-3 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                <p class="text-xs font-bold text-brand-navy mb-1">Drop files here or click to browse</p>
                <p class="text-[9px] text-gray-400 uppercase tracking-widest">PDF, JPG, or ZIP (Max 150MB)</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-gray-100 bg-white rounded-b-[32px] flex items-center justify-between sticky bottom-0">
            <div>
              <div class="text-xs text-gray-500 font-medium mb-1">Total Pembayaran</div>
              <div class="text-xl font-bold text-gray-900">
                Rp{{ duration === '3' ? '50.000' : duration === '7' ? '110.000' : '450.000' }}
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button @click="showBoostModal = false" class="text-sm font-bold text-gray-900 hover:text-gray-600">Batal</button>
              <button @click="confirmBoost" class="px-6 py-3 bg-brand-light hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                Konfirmasi & Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.preview-page {
  padding: 24px;
  font-family: 'Inter', system-ui, sans-serif;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover { background: #f3f4f6; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active > div:nth-child(2) {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
}
.fade-leave-active > div:nth-child(2) {
  transition: transform 0.2s ease, opacity 0.2s;
}

.fade-enter-from > div:nth-child(2) {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.fade-leave-to > div:nth-child(2) {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
