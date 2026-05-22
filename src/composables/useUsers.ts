import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import api from '../api/axios'

export function useUserDetail(userId: string | number) {
  return useQuery({
    queryKey: ['user', String(userId)],
    queryFn: async () => {
      const res = await api.get(`/users/${userId}`)
      return res.data
    },
    enabled: computed(() => !!userId)
  })
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await api.get('/transactions')
      return res.data
    }
  })
}
