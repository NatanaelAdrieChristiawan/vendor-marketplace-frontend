<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Message {
  id?: number
  sender: string
  time: string
  type?: string
  text?: string
  title?: string
  description?: string
  price?: string
  duration?: string
}

const contacts = ref([
  { id: 1, name: 'Jennifer Markus', lastMsg: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?', time: 'Today | 05:30 PM', avatar: 'https://i.pravatar.cc/150?u=jennifer' },
  { id: 2, name: 'Iva Ryan', lastMsg: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?', time: 'Today | 05:30 PM', avatar: 'https://i.pravatar.cc/150?u=iva' },
  { id: 3, name: 'Jerry Helfer', lastMsg: 'Hey! Did you finish the Hi-Fi wireframes for flora app design?', time: 'Today | 05:30 PM', avatar: 'https://i.pravatar.cc/150?u=jerry' }
])

const activeChat = ref({
  name: 'Ammi Watts',
  avatar: 'https://i.pravatar.cc/150?u=ammi',
  messages: [
    { sender: 'other', text: 'Oh, hello! All perfectly. I will check it and get back to you soon', time: '04:45 PM' },
    { sender: 'self', text: 'Oh, hello! All perfectly. I will check it and get back to you soon', time: '04:45 PM' },
    { sender: 'other', text: 'p nawar', time: '04:45 PM' },
    { 
      type: 'custom_offer',
      sender: 'self',
      time: '04:45 PM',
      title: 'Desain Logo Premium (3 Konsep)',
      description: 'Pembuatan 3 alternatif desain logo minimalis premium, dan 2 kali revisi minor.',
      price: 'Rp 1.500.000',
      duration: '3 Hari'
    }
  ] as Message[]
})

const showOfferModal = ref(false)
const offerForm = reactive({
  description: '',
  price: '',
  deadline: ''
})

function sendOffer() {
  if (!offerForm.description || !offerForm.price) return
  
  activeChat.value.messages.push({
    sender: 'self',
    time: '05:45 PM',
    type: 'custom_offer',
    title: 'Penawaran Kustom Baru',
    description: offerForm.description,
    price: `Rp ${offerForm.price}`,
    duration: offerForm.deadline || '7 Hari'
  })
  showOfferModal.value = false
  offerForm.description = ''
  offerForm.price = ''
  offerForm.deadline = ''
}
</script>

<template>
  <div class="py-6 px-4 space-y-6">
    <h1 class="text-2xl font-bold text-gray-900">Komunikasi</h1>

    <div class="flex h-[calc(100vh-160px)] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
      <Teleport to="body">
        <div v-if="showOfferModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div class="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl">
            <div class="bg-[#5BB0FF] px-8 py-6 flex justify-between items-center text-white">
              <h3 class="text-xl font-bold">Buat Penawaran Kustom</h3>
              <button @click="showOfferModal = false" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div class="p-10 space-y-8">
              <div class="space-y-3">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deskripsi Penawaran</label>
                <textarea 
                  v-model="offerForm.description"
                  class="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#5BB0FF]/20 outline-none h-32 resize-none transition-all"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Harga</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1E3A8A]">Rp</span>
                    <input 
                      v-model="offerForm.price"
                      type="number" 
                      placeholder="0"
                      class="w-full pl-11 pr-4 py-4 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#5BB0FF]/20 outline-none font-bold text-gray-700"
                    />
                  </div>
                </div>
                <div class="space-y-3">
                  <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Batas Waktu</label>
                  <input 
                    v-model="offerForm.deadline"
                    type="text" 
                    placeholder="mm /dd / yyyy"
                    class="w-full px-4 py-4 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#5BB0FF]/20 outline-none text-gray-700 font-medium"
                  />
                </div>
              </div>

              <div class="flex items-center justify-center gap-6 pt-4">
                <button @click="showOfferModal = false" class="flex-1 max-w-[180px] py-4 border border-[#D1D5DB] text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-all">Batal</button>
                <button @click="sendOffer" class="flex-1 max-w-[180px] py-4 bg-[#5BB0FF] text-white font-bold rounded-2xl hover:bg-[#4DA3FF] shadow-lg shadow-[#5BB0FF]/30 transition-all">Kirim</button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <div class="w-[360px] border-r border-gray-100 flex flex-col bg-white">
        <div class="p-6 space-y-6">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div class="flex items-center gap-2 cursor-pointer group">
              <h2 class="text-base font-bold text-gray-900">All Messages</h2>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
            <button class="text-gray-900">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </button>
          </div>

          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center text-[#4B6BFB]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search or start a new chat"
              class="w-full pl-11 pr-4 py-3 bg-[#F8F9FE] border-none rounded-xl text-[13px] focus:ring-2 focus:ring-[#4B6BFB]/10 outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div 
            v-for="contact in contacts" 
            :key="contact.id"
            :class="[
              'p-6 flex gap-4 cursor-pointer transition-colors border-b border-gray-50 relative',
              contact.id === 1 ? 'bg-white' : 'hover:bg-gray-50'
            ]"
          >
            <img :src="contact.avatar" class="w-12 h-12 rounded-xl object-cover shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start mb-1">
                <h4 class="font-bold text-gray-900 truncate">{{ contact.name }}</h4>
                <svg class="w-4 h-4 text-[#4B6BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.11L12.63 15.89a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <p class="text-xs text-gray-400 line-clamp-2 mb-2 leading-relaxed">{{ contact.lastMsg }}</p>
              <div class="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ contact.time }}
              </div>
            </div>
            <div v-if="contact.id === 1" class="absolute left-0 top-0 w-1 h-full bg-[#4B6BFB]"></div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col bg-white">
        <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img :src="activeChat.avatar" class="w-10 h-10 rounded-xl object-cover" />
            <h3 class="font-bold text-gray-900">{{ activeChat.name }}</h3>
          </div>
          <button @click="showOfferModal = true" class="bg-[#5BB0FF] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#4B6BFB] transition-all shadow-lg shadow-[#5BB0FF]/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Buat Penawaran
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-8 space-y-8">
          <div v-for="(msg, index) in activeChat.messages" :key="index" class="flex flex-col" :class="msg.sender === 'self' ? 'items-end' : 'items-start'">
            <div v-if="msg.type === 'custom_offer'" class="w-full max-w-[440px]">
              <div class="bg-[#F8F9FE] border border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
                <div class="p-5 bg-[#E6F0FF]">
                  <h4 class="text-base font-bold text-[#4B6BFB]">Penawaran Kustom</h4>
                </div>
                <div class="p-6 space-y-6 bg-white">
                  <div>
                    <h3 class="text-base font-bold text-gray-900 mb-2">{{ msg.title }}</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">{{ msg.description }}</p>
                  </div>
                  
                  <div class="flex gap-16 border-t border-gray-50 pt-4">
                    <div class="space-y-1">
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HARGA</p>
                      <p class="text-sm font-bold text-gray-900">{{ msg.price }}</p>
                    </div>
                    <div class="space-y-1">
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WAKTU KERJA</p>
                      <div class="flex items-center gap-2 text-gray-900">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span class="text-sm font-bold">{{ msg.duration }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <button disabled class="w-full text-center text-xs font-bold text-gray-400">
                      {{ msg.sender === 'self' ? 'Menunggu Respon' : 'Terima Tawaran' }}
                    </button>
                  </div>
                </div>
              </div>
              <span class="text-[10px] font-bold text-gray-400 mt-2 block" :class="msg.sender === 'self' ? 'mr-4 text-right' : 'ml-4 text-left'">{{ msg.time }}</span>
            </div>

            <div v-else class="max-w-[70%] flex flex-col" :class="msg.sender === 'self' ? 'items-end' : 'items-start'">
              <div 
                :class="[
                  'p-4 rounded-2xl text-sm leading-relaxed',
                  msg.sender === 'self' 
                    ? 'bg-[#5BB0FF] text-white rounded-tr-none' 
                    : 'bg-[#E6F0FF] text-gray-800 rounded-tl-none'
                ]"
              >
                {{ msg.text }}
              </div>
              <span class="text-[10px] font-bold text-gray-400 mt-2">{{ msg.time }}</span>
            </div>
          </div>
        </div>

        <div class="px-8 py-6">
          <div class="flex items-center gap-4 bg-[#F8F9FE] rounded-2xl px-6 py-2 border border-gray-50">
            <button class="text-[#4B6BFB] hover:opacity-80 transition-opacity">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
            </button>
            <input 
              type="text" 
              placeholder="Type your message here ..."
              class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 placeholder-gray-400 text-gray-800"
            />
            <button class="text-[#5BB0FF] hover:opacity-80">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #CBD5E1;
}
</style>

