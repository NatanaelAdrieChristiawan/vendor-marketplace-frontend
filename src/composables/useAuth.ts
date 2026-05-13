import { computed, watch } from 'vue'
import { useAuthStore } from '../store/auth.store'
import { useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import api from '../api/axios'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  const isLoggedIn = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.currentUser)
  
  const logout = () => {
    authStore.logout()
    queryClient.clear()
    router.push('/')
  }

  const redirectByRole = (role: string) => {
    if (!role) {
      router.push('/jelajahi')
      return
    }
    const roleUpper = role.toUpperCase()
    if (roleUpper.includes('SUPER_ADMIN') || roleUpper === 'SUPERADMIN') {
      router.push('/super-admin/dashboard')
    } else if (roleUpper.includes('FINANCE')) {
      router.push('/finance-admin/dashboard')
    } else if (roleUpper.includes('VALIDATOR') || roleUpper === 'ADMIN_VALIDATOR') {
      router.push('/admin-validator/dashboard')
    } else if (roleUpper === 'MERCHANT_OWNER' || roleUpper === 'MERCHANT' || roleUpper === 'VENDOR') {
      router.push('/vendor/dashboard')
    } else if (roleUpper === 'MERCHANT_ASSOCIATE') {
      router.push('/vendor/associate/dashboard')
    } else {
      router.push('/jelajahi')
    }
  }

  const loginMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post('/auth/login', payload)
      return response.data
    },
    onSuccess: (res) => {
      if (res.status === 'success' || res.data) {
        const { access_token, user } = res.data
        const mappedUser = {
          ...user,
          id: String(user.id || user.sub),
          name: user.fullName || user.name || 'User'
        }
        authStore.setAuth(mappedUser, access_token)
        
        const isRegisteringMerchant = localStorage.getItem('is_registering_merchant')
        if (isRegisteringMerchant) {
          localStorage.removeItem('is_registering_merchant')
          router.push('/daftar/merchant')
        } else {
          redirectByRole(user.role)
        }
      }
    }
  })

  const signUpMutation = useMutation({
    mutationFn: async (payload: any) => {
      const apiPayload = {
        email: payload.email,
        password: payload.password,
        fullName: payload.username,
        role: payload.role === 'MERCHANT' ? 'MERCHANT_OWNER' : 'CLIENT'
      }
      const response = await api.post('/users', apiPayload)
      return { ...response.data, originalPayload: payload }
    },
    onSuccess: (res, variables) => {
      if (variables.role === 'MERCHANT') {
        localStorage.setItem('is_registering_merchant', 'true')
      }
      
      loginMutation.mutate({
        email: variables.email,
        password: variables.password
      })
    }
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/auth/profile')
      return response.data
    },
    enabled: !!authStore.token && !authStore.user,
    retry: false
  })

  watch(
    () => profileQuery.data.value,
    (newUser) => {
      if (newUser) {
        const mappedUser = {
          ...newUser,
          id: String(newUser.id || newUser.sub),
          name: newUser.fullName || newUser.name || 'User'
        }
        authStore.setAuth(mappedUser, authStore.token!)
      }
    },
    { immediate: true }
  )

  const registerVendorMutation = useMutation({
    mutationFn: async (payload: { shopName: string; description?: string; logoUrl?: string; bannerUrl?: string }) => {
      const response = await api.post('/merchants', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      router.push('/vendor/documents')
    }
  })

  const submitKybMutation = useMutation({
    mutationFn: async (payload: { kybDocumentUrl: string; portfolioUrl: string }) => {
      const response = await api.patch('/merchants/submit-kyb', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })

  const registerMerchantMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post('/merchants/register', payload)
      return response.data
    },
    onSuccess: (res) => {
      if (res.status === 'success' || res.data) {
        const { access_token, user } = res.data
        const mappedUser = {
          ...user,
          id: String(user.id || user.sub),
          name: user.fullName || user.name || 'User'
        }
        authStore.setAuth(mappedUser, access_token)
        router.push('/vendor/dashboard')
      }
    }
  })

  return {
    isLoggedIn,
    user,
    logout,
    loginMutation,
    signUpMutation,
    profileQuery,
    registerVendorMutation,
    submitKybMutation,
    registerMerchantMutation
  }
}
