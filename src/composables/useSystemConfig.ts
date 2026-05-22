import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import api from '../api/axios'

export function useSystemConfig() {
  const queryClient = useQueryClient()

  const configsQuery = useQuery({
    queryKey: ['systemConfigs'],
    queryFn: async () => {
      const response = await api.get('/system-config')
      return response.data
    }
  })

  const auditLogsQuery = useQuery({
    queryKey: ['systemConfigAuditLogs'],
    queryFn: async () => {
      const response = await api.get('/system-config/audit-logs')
      return response.data
    }
  })

  const updateConfigMutation = useMutation({
    mutationFn: async ({ key, value, confirmPassword }: { key: string; value: string; confirmPassword: string }) => {
      const response = await api.put(`/system-config/${key}`, { value, confirmPassword })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemConfigs'] })
      queryClient.invalidateQueries({ queryKey: ['systemConfigAuditLogs'] })
    }
  })

  return {
    configsQuery,
    auditLogsQuery,
    updateConfigMutation
  }
}
