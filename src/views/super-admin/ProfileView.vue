<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { user: authUser, logout } = useAuth()

const user = computed(() => ({
  name: authUser.value?.fullName || 'Super Admin',
  email: authUser.value?.email || 'N/A',
  role: authUser.value?.role || 'SUPER_ADMIN',
  department: 'System Administration',
}))

function handleLogout() {
  logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="space-y-8 animate-fade-in w-full pb-10">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Profil Pengguna</h1>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-start">
      <div class="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-gray-50 bg-gray-100 flex items-center justify-center">
        <img v-if="authUser" :src="`https://ui-avatars.com/api/?name=${user.name}&background=1E3A8A&color=fff`" alt="User Profile" class="w-full h-full object-cover" />
        <svg v-else class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
      </div>
      
      <div class="flex-1 w-full space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Nama Lengkap</label>
            <p class="text-gray-900 font-bold text-lg">{{ user.name }}</p>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Alamat Email</label>
            <p class="text-gray-900 font-medium">{{ user.email }}</p>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Peran Sistem</label>
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wide">
                {{ user.role }}
              </div>
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-500">Departemen</label>
            <p class="text-gray-900 font-medium">{{ user.department }}</p>
          </div>
        </div>
        
        <div class="pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div class="flex gap-4">
            <button class="bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-sm shadow-sm">
              Edit Profil
            </button>
            <button class="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition-colors text-sm shadow-sm">
              Ubah Password
            </button>
          </div>
          <button @click="handleLogout" class="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-2.5 px-6 rounded-xl transition-colors text-sm shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Keluar (Logout)
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
