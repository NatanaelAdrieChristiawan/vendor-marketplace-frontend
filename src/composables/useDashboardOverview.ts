import { useQuery } from '@tanstack/vue-query'
import api from '../api/axios'

// ─── TypeScript Interfaces ─────────────────────────────────────
export interface ServerHealth {
  cpuUsage: number
  memoryUsage: number
  uptime: number
}

export interface PaymentGatewayStatus {
  name: string
  status: 'active' | 'slow' | 'error' | 'offline'
  latency: number
}

export interface DatabaseHealth {
  storagePercent: number
  connectionsUsed: number
  connectionsMax: number
  avgQueryMs: number
}

export interface NotificationServices {
  pushNotif: 'active' | 'error' | 'offline'
  emailSmtp: 'active' | 'error' | 'offline'
  whatsappApi: 'active' | 'error' | 'offline'
}

export interface TeamMemberPerformance {
  name: string
  ticketCount?: number
  amount?: number
  progressPercent: number
}

export interface TeamSummary {
  completed?: number
  pending?: number
  rejected?: number
  totalDisbursed?: number
  queued?: number
  failed?: number
}

export interface TeamPerformanceData {
  totalTicketsToday?: number
  totalDisbursementsToday?: number
  dailyTarget: number
  progressPercent: number
  members: TeamMemberPerformance[]
  summary: TeamSummary
}

export interface GlobalMetricsData {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  userGrowthPercent: number
  revenueToday: number
  totalTransactions: number
  transactionGrowthPercent: number
  activeSessions: number
}

export interface DashboardOverview {
  serverHealth: ServerHealth
  paymentGateways: PaymentGatewayStatus[]
  database: DatabaseHealth
  notifications: NotificationServices
  teamPerformance: {
    adminValidator: TeamPerformanceData
    financeAdmin: TeamPerformanceData
  }
  globalMetrics: GlobalMetricsData
}

// ─── Fallback Mock Data (dipakai saat BE belum siap) ───────────
const FALLBACK_DATA: DashboardOverview = {
  serverHealth: {
    cpuUsage: 34,
    memoryUsage: 58,
    uptime: 99.98
  },
  paymentGateways: [
    { name: 'Midtrans', status: 'active', latency: 142 },
    { name: 'Xendit', status: 'active', latency: 98 },
    { name: 'DOKU', status: 'slow', latency: 320 }
  ],
  database: {
    storagePercent: 71,
    connectionsUsed: 247,
    connectionsMax: 500,
    avgQueryMs: 8
  },
  notifications: {
    pushNotif: 'active',
    emailSmtp: 'error',
    whatsappApi: 'active'
  },
  teamPerformance: {
    adminValidator: {
      totalTicketsToday: 24,
      dailyTarget: 300,
      progressPercent: 82,
      members: [
        { name: 'Siti Rahayu', ticketCount: 9, progressPercent: 60 },
        { name: 'Andi Pratama', ticketCount: 6, progressPercent: 40 },
        { name: 'Maya Dewi', ticketCount: 2, progressPercent: 15 }
      ],
      summary: { completed: 24, pending: 3, rejected: 5 }
    },
    financeAdmin: {
      totalDisbursementsToday: 18,
      dailyTarget: 200,
      progressPercent: 91,
      members: [
        { name: 'Reza Firmansyah', amount: 4000000, progressPercent: 45 },
        { name: 'Lina Kusuma', amount: 8000000, progressPercent: 80 },
        { name: 'Doni Setiawan', amount: 7000000, progressPercent: 70 }
      ],
      summary: { totalDisbursed: 32000000, queued: 1, failed: 3 }
    }
  },
  globalMetrics: {
    totalUsers: 1240000,
    activeUsers: 892000,
    newUsersToday: 8200,
    userGrowthPercent: 12.4,
    revenueToday: 327000000,
    totalTransactions: 201,
    transactionGrowthPercent: 9.3,
    activeSessions: 12847
  }
}

// ─── Avatar color palette for team members ─────────────────────
const AVATAR_COLORS: { bg: string; text: string }[] = [
  { bg: '#EEF2FF', text: '#4F46E5' },
  { bg: '#E0F2FE', text: '#0369A1' },
  { bg: '#FDF2F8', text: '#BE185D' },
  { bg: '#E6F4EA', text: '#137333' },
  { bg: '#ECFDF5', text: '#0D9488' },
  { bg: '#FFF7ED', text: '#C2410C' },
]

export function getAvatarColor(index: number): { bg: string; text: string } {
  return AVATAR_COLORS[index % AVATAR_COLORS.length] ?? { bg: '#EEF2FF', text: '#4F46E5' }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ─── Composable Hook ───────────────────────────────────────────
// Saat BE endpoint `GET /system-config/dashboard-overview` sudah siap,
// data real akan otomatis menggantikan fallback.
export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: ['dashboardOverview'],
    queryFn: async () => {
      try {
        const res = await api.get('/system-config/dashboard-overview')
        return res.data as DashboardOverview
      } catch {
        // BE endpoint belum ada → return fallback mock data
        return FALLBACK_DATA
      }
    },
    // Retry once, then use fallback
    retry: 1,
    // Stale after 30 seconds for dashboard freshness
    staleTime: 30_000,
    // Cache for 60 seconds
    gcTime: 60_000,
  })
}

// ─── Format helpers ────────────────────────────────────────────
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + ' Jt'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toLocaleString('id-ID')
}

export function formatCompactCurrency(num: number): string {
  if (num >= 1_000_000_000) return 'Rp ' + (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' M'
  if (num >= 1_000_000) return 'Rp ' + (num / 1_000_000).toFixed(0) + ' Jt'
  if (num >= 1_000) return 'Rp ' + (num / 1_000).toFixed(0) + 'K'
  return 'Rp ' + num.toLocaleString('id-ID')
}

export function gatewayStatusLabel(status: string): string {
  const map: Record<string, string> = {
    active: 'Aktif',
    slow: 'Lambat',
    error: 'Error',
    offline: 'Offline'
  }
  return map[status] || status
}

export function gatewayStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: '#10B981',
    slow: '#F59E0B',
    error: '#EF4444',
    offline: '#6B7280'
  }
  return map[status] || '#6B7280'
}

export function notifStatusLabel(status: string): string {
  const map: Record<string, string> = {
    active: 'Aktif',
    error: 'Error',
    offline: 'Offline'
  }
  return map[status] || status
}

export function notifStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: '#10B981',
    error: '#EF4444',
    offline: '#6B7280'
  }
  return map[status] || '#6B7280'
}
