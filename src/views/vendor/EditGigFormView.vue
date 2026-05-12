<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import FileUpload from '../../components/ui/FileUpload.vue'
import Button from '../../components/ui/Button.vue'
import Input from '../../components/ui/Input.vue'
import Toast from '../../components/ui/Toast.vue'

const router = useRouter()
const title = ref('Jasa Desain Keren Banget')
const description = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
const mediaFile = ref<File | null>(null)
const showToast = ref(false)
const toastData = reactive<{type: 'info' | 'success' | 'error', title: string, subtitle: string}>({
  type: 'success',
  title: '',
  subtitle: ''
})

const packages = ref([
  { id: 1, name: 'Basic', nominal: 'Rp. 150.000,00', color: 'bg-gray-500' },
  { id: 2, name: 'Premium', nominal: 'Rp. 250.000,00', color: 'bg-emerald-500' },
  { id: 3, name: 'Platinum', nominal: 'Rp. 400.000,00', color: 'bg-[#2F4DC4]' }
])

function handlePublish() {
  toastData.type = 'success'
  toastData.title = "Gig's kamu di Aprove!"
  toastData.subtitle = 'ACTIVE'
  showToast.value = true
  
  setTimeout(() => {
    router.push('/vendor/catalog')
  }, 2000)
}

function handleBoost() {
  router.push('/vendor/catalog/promote/1')
}
</script>

<template>
  <div class="p-8 max-w-4xl relative">
    <div v-if="showToast" class="fixed top-8 right-8 z-50">
      <Toast :type="toastData.type" :title="toastData.title" :subtitle="toastData.subtitle" />
    </div>

    <div class="mb-8">
      <h1 class="text-[28px] font-bold text-gray-900 mb-2">Edit My Gigs</h1>
    </div>

    <form @submit.prevent="handlePublish" class="flex flex-col gap-6 max-w-3xl">
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-gray-700">Judul</label>
        <Input 
          v-model="title" 
          placeholder="Insert Text Here" 
          class="h-11 rounded-lg border-gray-300 focus:border-brand-navy focus:ring-brand-navy"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea 
          v-model="description"
          placeholder="Insert Text Here"
          class="w-full px-4 py-3 rounded-lg border border-brand-navy/30 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors resize-none h-32 text-gray-700 text-sm"
        ></textarea>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-gray-700">Harga Paket</label>
        <div class="flex flex-wrap gap-4 items-center">
          <div 
            v-for="pkg in packages" 
            :key="pkg.id" 
            class="flex items-center gap-3 p-3 border border-brand-navy rounded-xl min-w-[200px]"
          >
            <div :class="[pkg.color, 'w-12 h-12 rounded-lg text-white flex items-center justify-center shrink-0']">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
            </div>
            <div class="flex flex-col gap-1 w-full">
              <input type="text" v-model="pkg.name" placeholder="Nama Paket" class="text-sm font-medium text-black placeholder:text-gray-300 outline-none border-b border-gray-200 pb-0.5" />
              <input type="text" v-model="pkg.nominal" placeholder="Nominal" class="text-xs text-black placeholder:text-gray-300 outline-none border-b border-gray-200 pb-0.5" />
            </div>
          </div>
          
          <button type="button" class="w-[60px] h-[60px] rounded-xl bg-[#2F4DC4] text-white flex items-center justify-center hover:bg-brand-navy/90 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM11 14h-2v2h2v2h2v-2h2v-2h-2v-2h-2v2z"/>
            </svg>
          </button>
        </div>
      </div>

      <FileUpload 
        v-model:file="mediaFile"
        accept="image/jpeg, image/png, video/mp4"
        dragText="Choose Document or drag and drop it here"
        formatText="JPEG, PNG, and MP4"
      >
        <template #label>
          Media - Upload <span class="font-bold">Media Sampul</span> disini
        </template>
      </FileUpload>

      <div class="flex gap-4 mt-4">
        <button type="button" @click="handleBoost" class="flex-1 h-14 rounded-xl text-xl font-medium relative flex items-center justify-center bg-[#F1B44C] text-white hover:bg-[#E5A840] transition-colors">
          Boost / Promote
          <span class="absolute right-4 w-8 h-8 bg-white text-[#F1B44C] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
            </svg>
          </span>
        </button>

        <Button type="submit" variant="primary" class="flex-1 h-14 rounded-xl text-xl font-medium relative flex items-center justify-center">
          Publish
          <span class="absolute right-4 w-8 h-8 bg-white text-brand-navy rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </span>
        </Button>
      </div>
    </form>
  </div>
</template>
