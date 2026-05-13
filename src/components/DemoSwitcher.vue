<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isOpen = ref(false)

const roles = [
  { id: 'MERCHANT_OWNER', name: 'Merchant Owner', icon: '👑' },
  { id: 'MERCHANT_ASSOCIATE', name: 'Merchant Associate', icon: '🧑‍💼' },
  { id: 'CLIENT', name: 'Client (Buyer)', icon: '🛒' },
]

const switchRole = (role: string) => {
  const fakeUser = {
    id: 'demo-' + role.toLowerCase(),
    fullName: role === 'CLIENT' ? 'Budi' : 'Demo ' + role.replace('_', ' '),
    name: role === 'CLIENT' ? 'Budi' : 'Demo ' + role.replace('_', ' '),
    email: 'demo@example.com',
    role: role
  }
  
  authStore.setAuth(fakeUser, 'demo_token_' + Date.now())
  
  // Redirect based on role
  if (role === 'MERCHANT_OWNER') {
    router.push('/vendor/dashboard')
  } else if (role === 'MERCHANT_ASSOCIATE') {
    router.push('/vendor/associate/dashboard')
  } else {
    // CLIENT → client pages
    router.push('/jelajahi')
  }
  
  isOpen.value = false
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[9999]">
    <!-- Trigger Button -->
    <button 
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-[#1E3A8A] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      title="Demo Role Switcher"
    >
      <svg v-if="!isOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Role Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" class="absolute bottom-20 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div class="p-4 bg-[#1E3A8A] text-white">
          <p class="text-xs font-bold uppercase tracking-widest opacity-70">Demo Mode</p>
          <h3 class="font-bold">Switch Role</h3>
        </div>
        <div class="p-2">
          <button 
            v-for="role in roles" 
            :key="role.id"
            @click="switchRole(role.id)"
            class="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left group"
          >
            <span class="text-2xl">{{ role.icon }}</span>
            <div>
              <p class="text-sm font-bold text-gray-900 group-hover:text-[#1E3A8A]">{{ role.name }}</p>
              <p class="text-[10px] text-gray-400 uppercase font-bold">{{ role.id }}</p>
            </div>
          </button>
        </div>
        <div class="p-4 bg-gray-50 border-t border-gray-100">
          <p class="text-[10px] text-gray-400 text-center font-medium">
            FE-Only Demo Switcher<br>Doesn't affect real database
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>
