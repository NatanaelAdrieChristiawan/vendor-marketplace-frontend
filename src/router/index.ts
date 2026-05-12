import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import ClientLayout from '../layouts/ClientLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import SuperAdminLayout from '../layouts/SuperAdminLayout.vue'
import AdminFinanceLayout from '../layouts/AdminFinanceLayout.vue'
import AdminValidatorLayout from '../layouts/AdminValidatorLayout.vue'

// Views - Auth
import AdminLoginView from '../views/auth/AdminLoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import MerchantRegisterView from '../views/auth/MerchantRegisterView.vue'

// Views - Client
import HomeView from '../views/client/HomeView.vue'
import UserLoginView from '../views/auth/UserLoginView.vue'
import VendorRegisterView from '../views/auth/VendorRegisterView.vue'
import VendorRegisterUploadView from '../views/auth/VendorRegisterUploadView.vue'
import VendorRegisterBankView from '../views/auth/VendorRegisterBankView.vue'
import VendorRegisterSuccessView from '../views/auth/VendorRegisterSuccessView.vue'

// Views - Super Admin
import DashboardView from '../views/super-admin/DashboardView.vue'
import SystemConfigView from '../views/super-admin/SystemConfigView.vue'
import UserManagementView from '../views/super-admin/UserManagementView.vue'
import ProfileView from '../views/super-admin/ProfileView.vue'

// Views - Finance Admin
import FinanceDashboardView from '../views/finance-admin/DashboardView.vue'

// Vendor Layout & Views
import VendorLayout from '../layouts/VendorLayout.vue'
import VendorDashboardView from '../views/vendor/DashboardView.vue'
import DocumentVerificationView from '../views/vendor/DocumentVerificationView.vue'
import CatalogView from '../views/vendor/CatalogView.vue'
import AddGigView from '../views/vendor/AddGigView.vue'
import MyStoreView from '../views/vendor/MyStoreView.vue'

const routes = [
  // ========================================
  // CLIENT ROUTES (Default — public facing)
  // ========================================
  {
    path: '/',
    component: ClientLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'jelajahi',
        name: 'Explore',
        component: () => import('../views/client/ExploreView.vue'),
      },
      {
        path: 'jelajahi/:id',
        name: 'ProductDetail',
        component: () => import('../views/client/ProductDetailView.vue'),
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('../views/client/ChatView.vue'),
      },
      {
        path: 'pesanan',
        name: 'Orders',
        component: () => import('../views/client/OrdersView.vue'),
      },
      {
        path: 'pesanan/:id',
        name: 'OrderDetail',
        component: () => import('../views/client/OrderDetailView.vue'),
      },
      {
        path: 'pesanan/:id/revisi',
        name: 'OrderRevision',
        component: () => import('../views/client/OrderRevisionView.vue'),
      },
      {
        path: 'jelajahi/:id/konfirmasi',
        name: 'OrderConfirmation',
        component: () => import('../views/client/OrderConfirmationView.vue'),
      },
      {
        path: 'jelajahi/:id/checkout',
        name: 'Checkout',
        component: () => import('../views/client/CheckoutView.vue'),
      },
      {
        path: 'jelajahi/:id/verifikasi',
        name: 'PaymentVerification',
        component: () => import('../views/client/PaymentVerificationView.vue'),
      },
    ],
  },

  // ========================================
  // CLIENT AUTH (Role Selection & Login)
  // ========================================
  {
    path: '/daftar',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/masuk',
    name: 'UserLogin',
    component: UserLoginView,
    alias: '/masuk/user',
  },
  // Legacy vendor register sub-routes (kept for backward compat)
  {
    path: '/daftar/merchant',
    name: 'MerchantRegister',
    component: MerchantRegisterView,
  },
  {
    path: '/daftar/vendor',
    name: 'VendorRegister',
    component: VendorRegisterView,
  },
  {
    path: '/daftar/vendor/upload',
    name: 'VendorRegisterUpload',
    component: VendorRegisterUploadView,
  },
  {
    path: '/daftar/vendor/bank',
    name: 'VendorRegisterBank',
    component: VendorRegisterBankView,
  },
  {
    path: '/daftar/vendor/success',
    name: 'VendorRegisterSuccess',
    component: VendorRegisterSuccessView,
  },

  // ========================================
  // ADMIN AUTH
  // ========================================
  {
    path: '/admin',
    component: AuthLayout,
    redirect: '/admin/login',
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: AdminLoginView,
      },
    ],
  },

  // ========================================
  // SUPER ADMIN
  // ========================================
  {
    path: '/super-admin',
    component: SuperAdminLayout,
    redirect: '/super-admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagementView,
      },
      {
        path: 'system-config',
        name: 'SystemConfig',
        component: SystemConfigView,
      },
      {
        path: 'disputes',
        name: 'Disputes',
        component: () => import('../views/super-admin/DisputesView.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView,
      },
    ],
  },

  // ========================================
  // FINANCE ADMIN
  // ========================================
  {
    path: '/finance-admin',
    component: AdminFinanceLayout,
    redirect: '/finance-admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'FinanceDashboard',
        component: FinanceDashboardView,
      },
      {
        path: 'payment-verification',
        name: 'PaymentVerification',
        component: () => import('../views/finance-admin/PaymentVerificationView.vue'),
      },
      {
        path: 'payment-history',
        name: 'PaymentHistory',
        component: () => import('../views/finance-admin/PaymentHistoryView.vue'),
      },
      {
        path: 'disbursement',
        name: 'Disbursement',
        component: () => import('../views/finance-admin/DisbursementView.vue'),
      },
      {
        path: 'refund',
        name: 'Refund',
        component: () => import('../views/finance-admin/RefundView.vue'),
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../views/finance-admin/ReportsView.vue'),
      },
      {
        path: 'profile',
        name: 'FinanceProfile',
        component: () => import('../views/finance-admin/ProfileView.vue'),
      },
    ],
  },

  // ========================================
  // ADMIN VALIDATOR
  // ========================================
  {
    path: '/admin-validator',
    component: AdminValidatorLayout,
    redirect: '/admin-validator/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'ValidatorDashboard',
        component: () => import('../views/admin-validator/DashboardView.vue'),
      },
      {
        path: 'profile',
        name: 'ValidatorProfile',
        component: () => import('../views/admin-validator/ProfileView.vue'),
      },
      {
        path: 'user-moderation',
        name: 'ValidatorUserModeration',
        component: () => import('../views/admin-validator/UserModerationView.vue'),
      },
      {
        path: 'user-moderation/:id/activity',
        name: 'ValidatorUserActivity',
        component: () => import('../views/admin-validator/UserActivityView.vue'),
      },
      {
        path: 'vendor-verification',
        name: 'ValidatorVendorVerification',
        component: () => import('../views/admin-validator/VendorVerificationView.vue'),
      },
      {
        path: 'vendor-verification/:id',
        name: 'ValidatorVendorVerificationDetail',
        component: () => import('../views/admin-validator/VendorVerificationDetailView.vue'),
      },
      {
        path: 'disputes',
        name: 'ValidatorDisputes',
        component: () => import('../views/admin-validator/DisputesView.vue'),
      },
      {
        path: 'disputes/:id',
        name: 'ValidatorDisputeDetail',
        component: () => import('../views/admin-validator/DisputeDetailView.vue'),
      },
    ],
  },

  // ========================================
  // VENDOR ROUTES
  // ========================================
  {
    path: '/vendor',
    component: VendorLayout,
    redirect: '/vendor/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'VendorDashboard',
        component: VendorDashboardView,
      },
      {
        path: 'my-store',
        name: 'VendorMyStore',
        component: MyStoreView,
      },
      {
        path: 'associate/dashboard',
        name: 'VendorAssociateDashboard',
        component: () => import('../views/vendor/AssociateDashboardView.vue'),
      },
      {
        path: 'associate/catalog',
        name: 'VendorAssociateCatalog',
        component: () => import('../views/vendor/AssociateCatalogView.vue'),
      },
      {
        path: 'associate/messages',
        name: 'VendorAssociateMessages',
        component: () => import('../views/vendor/AssociateMessagesView.vue'),
      },
      {
        path: 'associate/orders',
        name: 'VendorAssociateOrders',
        component: () => import('../views/vendor/AssociateOrdersView.vue'),
      },
      {
        path: 'associate/orders/:id',
        name: 'VendorAssociateOrderDetail',
        component: () => import('../views/vendor/AssociateOrderDetailView.vue'),
      },
      {
        path: 'finance',
        name: 'VendorFinance',
        component: () => import('../views/vendor/WalletView.vue'),
      },
      {
        path: 'finance/history',
        name: 'VendorTransactionHistory',
        component: () => import('../views/vendor/WalletView.vue'),
      },
      {
        path: 'withdraw',
        name: 'VendorWithdraw',
        component: () => import('../views/vendor/WithdrawView.vue'),
      },
      {
        path: 'orders',
        name: 'VendorOrders',
        component: () => import('../views/vendor/TasksView.vue'),
      },
      {
        path: 'orders/:id',
        name: 'VendorOrderDetail',
        component: () => import('../views/vendor/TaskDetailView.vue'),
      },
      {
        path: 'orders/:id/appeal',
        name: 'VendorOrderAppeal',
        component: () => import('../views/vendor/AppealView.vue'),
      },
      {
        path: 'documents',
        name: 'VendorDocuments',
        component: DocumentVerificationView,
      },
      {
        path: 'messages',
        name: 'VendorMessages',
        component: () => import('../views/vendor/MessagesView.vue'),
      },
      {
        path: 'catalog',
        name: 'VendorCatalog',
        component: CatalogView,
      },
      {
        path: 'catalog/add',
        name: 'VendorCatalogAdd',
        component: AddGigView,
      },
      {
        path: 'catalog/edit/:id',
        name: 'VendorCatalogEdit',
        component: () => import('../views/vendor/EditGigView.vue'),
      },
      {
        path: 'catalog/edit/:id/form',
        name: 'VendorCatalogEditForm',
        component: () => import('../views/vendor/EditGigFormView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
