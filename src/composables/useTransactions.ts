import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import api from '../api/axios'

export function useTransactions() {
  const queryClient = useQueryClient()

  const allTransactionsQuery = useQuery({
    queryKey: ['transactions', 'all'],
    queryFn: async () => {
      const { data } = await api.get('/transactions/all')
      return data
    }
  })

  const verifyTransactionMutation = useMutation({
    mutationFn: async ({ id, status, verificationNote }: { id: number; status: 'VERIFIED' | 'REJECTED'; verificationNote?: string }) => {
      const { data } = await api.patch(`/transactions/${id}/verify`, { status, verificationNote })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', 'all'] })
    }
  })

  return {
    allTransactionsQuery,
    verifyTransactionMutation
  }
}
