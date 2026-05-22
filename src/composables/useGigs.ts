import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import api from '../api/axios'

export function useGigDetail(gigId: string | number) {
  return useQuery({
    queryKey: ['gig', String(gigId)],
    queryFn: async () => {
      const res = await api.get(`/gigs/details/${gigId}`)
      return res.data
    },
    enabled: computed(() => !!gigId)
  })
}

export function useGigReviews(gigId: string | number) {
  return useQuery({
    queryKey: ['reviews', 'gig', String(gigId)],
    queryFn: async () => {
      const res = await api.get(`/reviews?gigId=${gigId}`)
      return res.data
    },
    enabled: computed(() => !!gigId)
  })
}

export function useFeaturedGigs() {
  return useQuery({
    queryKey: ['gigs', 'featured'],
    queryFn: async () => {
      const res = await api.get('/gigs?limit=3&status=APPROVED')
      return res.data
    },
    staleTime: 1000 * 60 * 5
  })
}
