// ============================================================================
// MODUL 1: TYPE & INTERFACE DEFINITION
// Tema: TeknisiKu (Aplikasi Jasa Service Laptop)
// ============================================================================

// 1. Union Types untuk Status dan Kategori Servis
export type ServiceStatus = "Menunggu" | "Proses" | "Selesai" | "Bisa Diambil";
export type ServiceCategory = "Semua" | "Hardware" | "Software" | "Cleaning" | "Upgrade";

// 2. Interface untuk Data Antrean / Pesanan Servis Laptop
export interface ServiceItem {
  readonly id: string | number; // Union type (string atau number) & Readonly
  customerName: string;
  phone: string;
  laptopModel: string;
  issue: string;
  category: "Hardware" | "Software" | "Cleaning" | "Upgrade";
  estimatedCost: number;
  status: ServiceStatus;
  technician?: string; // Properti opsional (?)
  isUrgent?: boolean;   // Properti opsional (?)
  entryDate: string;
}

// 3. Interface untuk Paket Layanan Service Laptop
export interface ServicePackage {
  readonly id: number;
  title: string;
  category: "Hardware" | "Software" | "Cleaning" | "Upgrade";
  price: number;
  estimatedDuration: string;
  iconName: string;
  description: string;
}

// 4. Interface untuk Data Ringkasan / Statistik Servis (dihitung dengan Loop)
export interface ServiceSummary {
  totalOrders: number;
  totalRevenue: number;
  inProgressCount: number;
  completedCount: number;
  pendingCount: number;
}
