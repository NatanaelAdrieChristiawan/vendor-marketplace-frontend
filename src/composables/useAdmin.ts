import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import api from '../api/axios'

export function useAdmin() {
  const queryClient = useQueryClient()

  // --- MERCHANTS ---
  
  const pendingMerchantsQuery = useQuery({
    queryKey: ['admin', 'merchants', 'pending'],
    queryFn: async () => {
      const response = await api.get('/admin/validator/merchants/pending')
      return response.data
    }
  })

  const verifyMerchantMutation = useMutation({
    mutationFn: async ({ id, isApproved, rejectionReason }: { id: number, isApproved: boolean, rejectionReason?: string }) => {
      const response = await api.patch(`/admin/validator/merchants/${id}/verify`, { isApproved, rejectionReason })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'merchants', 'pending'] })
    }
  })

  const suspendMerchantMutation = useMutation({
    mutationFn: async ({ id, isSuspended, reason, days }: { id: number, isSuspended: boolean, reason?: string, days?: number }) => {
      const response = await api.patch(`/admin/validator/merchants/${id}/suspend`, { isSuspended, reason, days })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'merchants', 'pending'] })
    }
  })

  // --- GIGS ---

  const pendingGigsQuery = useQuery({
    queryKey: ['admin', 'gigs', 'pending'],
    queryFn: async () => {
      const response = await api.get('/admin/validator/gigs/pending')
      return response.data
    }
  })

  const verifyGigMutation = useMutation({
    mutationFn: async ({ id, isApproved, rejectionReason }: { id: number, isApproved: boolean, rejectionReason?: string }) => {
      const response = await api.patch(`/admin/validator/gigs/${id}/verify`, { isApproved, rejectionReason })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'gigs', 'pending'] })
    }
  })

  // --- DISPUTES ---

  const pendingDisputesQuery = useQuery({
    queryKey: ['admin', 'disputes', 'pending'],
    queryFn: async () => {
      const response = await api.get('/admin/validator/disputes/pending')
      return response.data
    }
  })

  const resolveDisputeMutation = useMutation({
    mutationFn: async ({ id, decision }: { id: number, decision: 'APPROVE_REFUND' | 'REJECT_COMPLAINT' }) => {
      const response = await api.patch(`/admin/validator/${id}/resolve`, { decision })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'disputes', 'pending'] })
    }
  })

  return {
    pendingMerchantsQuery,
    verifyMerchantMutation,
    suspendMerchantMutation,
    pendingGigsQuery,
    verifyGigMutation,
    pendingDisputesQuery,
    resolveDisputeMutation
  }
}
