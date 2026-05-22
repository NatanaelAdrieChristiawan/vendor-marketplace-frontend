<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '../../components/ui/Toast.vue'

const router = useRouter()
const nominal = ref('')
const isPinModalOpen = ref(false)
const showSuccessToast = ref(false)
const pinDigits = ref<string[]>([])

const handleWithdrawClick = () => {
  isPinModalOpen.value = true
}

const handleNumberClick = (num: number) => {
  if (pinDigits.value.length < 6) {
    pinDigits.value.push(num.toString())
    if (pinDigits.value.length === 6) {
      setTimeout(handleConfirm, 300)
    }
  }
}

const handleDelete = () => {
  pinDigits.value.pop()
}

const handleConfirm = () => {
  if (pinDigits.value.length === 6) {
    isPinModalOpen.value = false
    pinDigits.value = []
    
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
      router.push('/vendor/finance')
    }, 2000)
  }
}


const closePinModal = () => {
  isPinModalOpen.value = false
  pinDigits.value = []
}
</script>

<template>
  <div class="py-6 px-4">
    <div class="mb-12">
      <h1 class="text-[32px] font-bold text-gray-900 mb-1">Withdraw Menu</h1>
    </div>

    <div class="max-w-xl space-y-8">
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-500">Nominal</label>
        <div class="relative">
          <input 
            v-model="nominal"
            type="text" 
            placeholder="Rp. 00.000,00"
            class="w-full px-4 py-3 bg-white border border-[#1E3A8A] rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] outline-none text-gray-900 font-medium"
          />
        </div>
      </div>

      <button 
        @click="handleWithdrawClick"
        class="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/95 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl group"
      >
        <span class="text-xl font-bold">Tarik Duit (Withdraw)</span>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
          <svg class="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>

    <!-- Safety Pin Modal -->
    <Teleport to="body">
      <div v-if="isPinModalOpen" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
        <div class="bg-[#214CCB] rounded-[40px] w-full max-w-[400px] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
          <div class="text-center mb-10">
            <h3 class="text-2xl font-bold text-white">Input Safety Pin</h3>
          </div>

          <!-- Pin Display -->
          <div class="flex justify-center gap-4 mb-12">
            <div 
              v-for="i in 6" 
              :key="i"
              class="w-5 h-5 rounded-full shadow-lg transition-all duration-200"
              :class="pinDigits.length >= i ? 'bg-white scale-110' : 'bg-white/30'"
            ></div>
          </div>

          <!-- Keypad -->
          <div class="grid grid-cols-3 gap-6">
            <button 
              v-for="n in 9" 
              :key="n"
              @click="handleNumberClick(n)"
              class="w-16 h-16 rounded-full bg-white text-gray-900 text-2xl font-bold flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all shadow-md mx-auto"
            >
              {{ n }}
            </button>
            
            <button 
              @click="closePinModal"
              class="w-16 h-16 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] active:scale-90 transition-all shadow-md mx-auto"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <button 
              @click="handleNumberClick(0)"
              class="w-16 h-16 rounded-full bg-white text-gray-900 text-2xl font-bold flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all shadow-md mx-auto"
            >
              0
            </button>

            <button 
              @click="handleDelete"
              class="w-16 h-16 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-all shadow-md mx-auto"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Success Toast -->
    <Teleport to="body">
      <div 
        v-if="showSuccessToast" 
        class="fixed top-8 right-8 z-[300] animate-in slide-in-from-right duration-300"
      >
        <Toast 
          type="success"
          title="Berhasil!"
          subtitle="Penarikan dana sedang diproses"
        />
      </div>
    </Teleport>
  </div>
</template>
