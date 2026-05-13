<script setup lang="ts">
import { ref } from 'vue'

const profile = ref({
  name: 'Budi Pratama',
  email: 'budi.pratama@example.com',
  phone: '+62 812-3456-7890',
  role: 'Vendor Owner'
})

const isEditing = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const saveProfile = () => {
  isEditing.value = false
  // Call API to save changes
}
</script>

<template>
  <div class="profile-view p-8 font-sans">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Profil Saya</h1>
        <button v-if="!isEditing" @click="toggleEdit" class="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
          Edit Profil
        </button>
      </div>

      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Avatar Section -->
          <div class="flex flex-col items-center gap-4">
            <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <button v-if="isEditing" class="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Ubah Foto
            </button>
          </div>

          <!-- Form Section -->
          <div class="flex-1 w-full space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
              <input 
                v-model="profile.name" 
                type="text" 
                :disabled="!isEditing"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                v-model="profile.email" 
                type="email" 
                :disabled="!isEditing"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
              <input 
                v-model="profile.phone" 
                type="tel" 
                :disabled="!isEditing"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Peran</label>
              <input 
                v-model="profile.role" 
                type="text" 
                disabled
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none cursor-not-allowed disabled:border-transparent"
              />
            </div>

            <!-- Action Buttons -->
            <div v-if="isEditing" class="flex justify-end gap-3 pt-4">
              <button @click="toggleEdit" class="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                Batal
              </button>
              <button @click="saveProfile" class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No specific scoped styles needed since we are using Tailwind utilities */
</style>
