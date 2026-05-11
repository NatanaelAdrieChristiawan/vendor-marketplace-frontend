<script setup lang="ts">
</script>

<template>
  <div class="my-store-view">
    <!-- Header -->
    <div class="header">
      <h1>Toko Saya</h1>
      <p class="subtitle">Kelola informasi dan pengaturan toko Anda</p>
    </div>

    <!-- Store Info Card -->
    <div class="store-card">
      <div class="store-card-header">
        <div class="store-avatar">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 class="store-name">Nama Toko Anda</h2>
          <span class="store-badge">Terverifikasi</span>
        </div>
      </div>
      <div class="store-stats">
        <div class="stat-item">
          <span class="stat-value">0</span>
          <span class="stat-label">Layanan Aktif</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">0</span>
          <span class="stat-label">Pesanan Selesai</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">0</span>
          <span class="stat-label">Rating</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="actions-grid">
      <div class="action-card">
        <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <h3>Edit Profil Toko</h3>
        <p>Ubah nama, deskripsi, dan foto toko</p>
      </div>
      <div class="action-card">
        <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3>Pengaturan Toko</h3>
        <p>Atur jam operasional dan preferensi</p>
      </div>
      <div class="action-card">
        <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3>Dokumen Verifikasi</h3>
        <p>Kelola dokumen dan sertifikasi</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-store-view {
  padding: 0;
}

.header {
  margin-bottom: 28px;
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px 0;
}

.subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
}

.store-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  margin-bottom: 24px;
}

.store-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.store-avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #4DA3FF, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.store-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.store-badge {
  display: inline-block;
  padding: 2px 10px;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.store-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 2px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.action-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.action-icon {
  width: 32px;
  height: 32px;
  color: #4DA3FF;
  margin-bottom: 12px;
}

.action-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px 0;
}

.action-card p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.4;
}
</style>
