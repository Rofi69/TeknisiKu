import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 1. IMPORT TYPE & INTERFACE (Materi Modul 1: Type & Interface)
import {
  ServiceCategory,
  ServiceItem,
  ServicePackage,
  ServiceStatus,
  ServiceSummary,
} from "@/types/service";

// 2. IMPORT EXTERNAL STYLING (Materi Modul 1: External Styling)
import { externalStyles } from "@/constants/serviceStyles";

// ============================================================================
// DATA AWAL: ARRAY OF OBJECTS (Materi Modul 1: Array of Objects)
// ============================================================================

// Daftar Paket Jasa Service Laptop
const DAFTAR_PAKET: ServicePackage[] = [
  {
    id: 1,
    title: "Deep Cleaning & Thermal Paste",
    category: "Cleaning",
    price: 150000,
    estimatedDuration: "1 - 2 Jam",
    iconName: "snow-outline",
    description: "Pembersihan debu kipas, heatsink, dan repaste pasta thermal premium.",
  },
  {
    id: 2,
    title: "Install Ulang OS + Software",
    category: "Software",
    price: 100000,
    estimatedDuration: "2 - 3 Jam",
    iconName: "desktop-outline",
    description: "Instalasi Windows/Linux/macOS bersih, driver, dan aplikasi standar.",
  },
  {
    id: 3,
    title: "Upgrade SSD & RAM",
    category: "Upgrade",
    price: 75000,
    estimatedDuration: "1 Jam",
    iconName: "hardware-chip-outline",
    description: "Jasa pasang SSD NVMe/SATA dan RAM + cloning data (belum termasuk part).",
  },
  {
    id: 4,
    title: "Ganti Keyboard & Baterai",
    category: "Hardware",
    price: 120000,
    estimatedDuration: "1 Hari",
    iconName: "keypad-outline",
    description: "Penggantian modul keyboard eror atau baterai laptop drop/kembung.",
  },
  {
    id: 5,
    title: "Servis Motherboard / IC Power",
    category: "Hardware",
    price: 450000,
    estimatedDuration: "2 - 4 Hari",
    iconName: "construct-outline",
    description: "Perbaikan mati total, no display, korsleting jalur daya motherboard.",
  },
];

// Data Antrean Awal Servis Laptop Pelanggan
const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "TK-001",
    customerName: "Budi Santoso",
    phone: "081234567890",
    laptopModel: "Asus ROG Strix G15",
    issue: "Overheating & mati mendadak saat render 3D",
    category: "Cleaning",
    estimatedCost: 150000,
    status: "Proses",
    technician: "Rian (Senior Tech)",
    isUrgent: true,
    entryDate: "2026-10-04",
  },
  {
    id: "TK-002",
    customerName: "Siti Rahma",
    phone: "085712345678",
    laptopModel: "MacBook Air M1",
    issue: "Layar blank hitam setelah jatuh dari meja",
    category: "Hardware",
    estimatedCost: 2200000,
    status: "Menunggu",
    technician: "Fajar",
    isUrgent: false,
    entryDate: "2026-10-05",
  },
  {
    id: "TK-003",
    customerName: "Dewi Lestari",
    phone: "089988776655",
    laptopModel: "Lenovo ThinkPad X1",
    issue: "Upgrade SSD NVMe 1TB & backup data kerja",
    category: "Upgrade",
    estimatedCost: 350000,
    status: "Selesai",
    technician: "Rian (Senior Tech)",
    isUrgent: false,
    entryDate: "2026-10-03",
  },
  {
    id: "TK-004",
    customerName: "Ahmad Fauzi",
    phone: "082133445566",
    laptopModel: "Acer Nitro 5",
    issue: "Keyboard tombol WASD tidak merespon",
    category: "Hardware",
    estimatedCost: 280000,
    status: "Bisa Diambil",
    technician: "Ahmad",
    isUrgent: false,
    entryDate: "2026-10-02",
  },
];

// Kategori Filter
const KATEGORI_LIST: ServiceCategory[] = ["Semua", "Hardware", "Software", "Cleaning", "Upgrade"];

// ============================================================================
// KOMPONEN UTAMA (ENTRY POINT)
// ============================================================================
export default function TeknisiKuHomeScreen() {
  // State Management Sederhana
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("Semua");

  // State Form Input Tambah Servis
  const [inputNama, setInputNama] = useState<string>("");
  const [inputModel, setInputModel] = useState<string>("");
  const [inputKeluhan, setInputKeluhan] = useState<string>("");
  const [inputBiaya, setInputBiaya] = useState<string>("");
  const [isUrgentInput, setIsUrgentInput] = useState<boolean>(false);

  // ==========================================================================
  // MATERI 5.3: CUSTOM FUNCTIONS
  // ==========================================================================

  // 1. Custom Function: Format Angka ke Rupiah
  const formatRupiah = (nominal: number): string => {
    return "Rp " + nominal.toLocaleString("id-ID");
  };

  // 2. Custom Function dengan Primitive Loop (for & while): Menghitung Statistik Servis
  // (Materi Modul 1: 5.4.C Primitive Loop)
  const hitungRingkasanServis = (dataList: ServiceItem[]): ServiceSummary => {
    let totalPendapatan = 0;
    let prosesCount = 0;
    let selesaiCount = 0;
    let menungguCount = 0;

    // Primitive Loop: for loop untuk menghitung total nominal
    for (let i = 0; i < dataList.length; i = i + 1) {
      totalPendapatan += dataList[i].estimatedCost;
    }

    // Primitive Loop: while loop untuk menghitung jumlah status
    let j = 0;
    while (j < dataList.length) {
      const statusSaatIni = dataList[j].status;
      if (statusSaatIni === "Proses") {
        prosesCount++;
      } else if (statusSaatIni === "Selesai" || statusSaatIni === "Bisa Diambil") {
        selesaiCount++;
      } else if (statusSaatIni === "Menunggu") {
        menungguCount++;
      }
      j++;
    }

    return {
      totalOrders: dataList.length,
      totalRevenue: totalPendapatan,
      inProgressCount: prosesCount,
      completedCount: selesaiCount,
      pendingCount: menungguCount,
    };
  };

  // Menjalankan Custom Function kalkulasi data
  const summary: ServiceSummary = hitungRingkasanServis(services);

  // 3. Custom Function: Menampilkan Detail Servis & Alert Bawaan
  // (Materi Modul 1: 5.3.A Function Bawaan Alert & 5.3.B Custom Function)
  const handleTampilkanDetail = (item: ServiceItem) => {
    const technicianInfo = item.technician ? item.technician : "Belum Ditugaskan";
    const urgentInfo = item.isUrgent ? "Ya (Prioritas Cepat)" : "Reguler";

    Alert.alert(
      `Detail Servis: ${item.id}`,
      `Pelanggan: ${item.customerName}\nModel Laptop: ${item.laptopModel}\nKeluhan: ${item.issue}\nKategori: ${item.category}\nStatus: ${item.status}\nTeknisi: ${technicianInfo}\nPrioritas: ${urgentInfo}\nEstimasi Biaya: ${formatRupiah(item.estimatedCost)}`,
      [
        {
          text: "Update Status",
          onPress: () => handleGantiStatus(item.id),
        },
        {
          text: "Tutup",
          style: "cancel",
        },
      ]
    );
  };

  // 4. Custom Function: Mengubah Status Servis
  const handleGantiStatus = (id: string | number) => {
    const updated = services.map((item) => {
      if (item.id === id) {
        let statusBerikutnya: ServiceStatus = "Menunggu";
        if (item.status === "Menunggu") statusBerikutnya = "Proses";
        else if (item.status === "Proses") statusBerikutnya = "Selesai";
        else if (item.status === "Selesai") statusBerikutnya = "Bisa Diambil";
        else statusBerikutnya = "Selesai";

        return { ...item, status: statusBerikutnya };
      }
      return item;
    });

    setServices(updated);
    Alert.alert("Berhasil", "Status servis laptop berhasil diperbarui!");
  };

  // 5. Custom Function: Menambahkan Antrean Servis Baru
  const handleTambahServis = () => {
    if (inputNama.trim() === "" || inputModel.trim() === "" || inputKeluhan.trim() === "") {
      Alert.alert("Peringatan", "Mohon lengkapi Nama, Model Laptop, dan Keluhan!");
      return;
    }

    const biayaAngka = parseInt(inputBiaya, 10) || 100000;
    const newId = `TK-${String(services.length + 1).padStart(3, "0")}`;

    const newService: ServiceItem = {
      id: newId,
      customerName: inputNama,
      phone: "08123xxxxxxx",
      laptopModel: inputModel,
      issue: inputKeluhan,
      category: "Hardware",
      estimatedCost: biayaAngka,
      status: "Menunggu",
      technician: "Teknisi Standby",
      isUrgent: isUrgentInput,
      entryDate: new Date().toISOString().split("T")[0],
    };

    setServices([newService, ...services]);
    setInputNama("");
    setInputModel("");
    setInputKeluhan("");
    setInputBiaya("");
    setIsUrgentInput(false);

    Alert.alert("Sukses", `Servis laptop untuk ${inputNama} berhasil didaftarkan ke antrean!`);
  };

  // 6. Custom Function: Helper untuk Mendapatkan Warna Status (untuk Inline Styling Dinamis)
  const getStatusColor = (status: ServiceStatus): { bg: string; text: string } => {
    switch (status) {
      case "Proses":
        return { bg: "#FEF3C7", text: "#B45309" }; // Kuning Amber
      case "Selesai":
        return { bg: "#DCFCE7", text: "#15803D" }; // Hijau Muda
      case "Bisa Diambil":
        return { bg: "#DBEAFE", text: "#1D4ED8" }; // Biru Muda
      case "Menunggu":
      default:
        return { bg: "#F1F5F9", text: "#475569" }; // Abu-abu Slate
    }
  };

  // 7. Custom Function: Custom Card Renderer untuk Paket Layanan
  // (Materi Modul 1: 5.3.B Custom Function yang mengembalikan JSX)
  const renderPackageCard = (pkg: ServicePackage) => {
    return (
      <View key={pkg.id} style={localStyles.packageCard}>
        <View style={localStyles.packageIconWrapper}>
          <Ionicons name={pkg.iconName as any} size={24} color="#2563EB" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={localStyles.packageTitle}>{pkg.title}</Text>
          <Text style={localStyles.packageDesc}>{pkg.description}</Text>
          <View style={localStyles.packageMetaRow}>
            <Text style={localStyles.packagePrice}>{formatRupiah(pkg.price)}</Text>
            <Text style={localStyles.packageDuration}>⏱ {pkg.estimatedDuration}</Text>
          </View>
        </View>
      </View>
    );
  };

  // Filter list antrean berdasarkan kategori yang dipilih
  const filteredServices =
    selectedCategory === "Semua"
      ? services
      : services.filter((item) => item.category === selectedCategory);

  return (
    <SafeAreaView style={externalStyles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={externalStyles.scrollContent}
      >
        {/* ================================================================== */}
        {/* HEADER APLIKASI TEKNISIKU                                          */}
        {/* ================================================================== */}
        <View style={externalStyles.headerBanner}>
          <View style={externalStyles.headerTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={externalStyles.brandTitle}>TeknisiKu 💻</Text>
              <Text style={externalStyles.brandSubtitle}>
                Aplikasi Manajemen & Jasa Service Laptop Profesional
              </Text>
            </View>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&q=80" }}
              style={localStyles.headerAvatar}
            />
          </View>

          {/* Inline Styling: Status Buka Toko dengan Badge */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              marginTop: 14,
              alignSelf: "flex-start",
            }}
          >
            <Ionicons name="checkmark-circle" size={16} color="#86EFAC" />
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600", marginLeft: 6 }}>
              Workshop Buka: 08.00 - 21.00 WIB
            </Text>
          </View>
        </View>

        {/* ================================================================== */}
        {/* WIDGET RINGKASAN STATISTIK (Dihitung Menggunakan Loop for & while)  */}
        {/* ================================================================== */}
        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>Ringkasan Bengkel</Text>
          <View style={externalStyles.sectionBadge}>
            <Text style={externalStyles.sectionBadgeText}>{summary.totalOrders} Unit Masuk</Text>
          </View>
        </View>

        <View style={externalStyles.statsGrid}>
          {/* Card 1: Dalam Proses */}
          <View style={externalStyles.statCard}>
            <Ionicons name="construct-outline" size={20} color="#D97706" />
            <Text style={externalStyles.statNumber}>{summary.inProgressCount}</Text>
            <Text style={externalStyles.statLabel}>Pengerjaan</Text>
          </View>

          {/* Card 2: Menunggu Antrean */}
          <View style={externalStyles.statCard}>
            <Ionicons name="time-outline" size={20} color="#64748B" />
            <Text style={externalStyles.statNumber}>{summary.pendingCount}</Text>
            <Text style={externalStyles.statLabel}>Antrean</Text>
          </View>

          {/* Card 3: Selesai */}
          <View style={externalStyles.statCard}>
            <Ionicons name="checkmark-done-circle-outline" size={20} color="#16A34A" />
            <Text style={externalStyles.statNumber}>{summary.completedCount}</Text>
            <Text style={externalStyles.statLabel}>Selesai</Text>
          </View>
        </View>

        {/* Card Total Estimasi Biaya dengan Inline Styling */}
        <View
          style={{
            backgroundColor: "#EFF6FF",
            borderColor: "#BFDBFE",
            borderWidth: 1,
            borderRadius: 12,
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: "#1E40AF", fontWeight: "600" }}>
              Total Nilai Estimasi Servis Aktif
            </Text>
            <Text style={{ fontSize: 18, color: "#1D4ED8", fontWeight: "bold", marginTop: 2 }}>
              {formatRupiah(summary.totalRevenue)}
            </Text>
          </View>
          <Ionicons name="wallet-outline" size={28} color="#2563EB" />
        </View>

        {/* ================================================================== */}
        {/* FORM INPUT DAFTAR SERVIS BARU (TextInput & Button Dasar)          */}
        {/* ================================================================== */}
        <View style={localStyles.formContainer}>
          <Text style={localStyles.formHeaderTitle}>📝 Tambah Antrean Servis Baru</Text>

          <TextInput
            style={externalStyles.inputBox}
            placeholder="Nama Pelanggan (cth: Joko Santoso)"
            placeholderTextColor="#94A3B8"
            value={inputNama}
            onChangeText={setInputNama}
          />

          <TextInput
            style={externalStyles.inputBox}
            placeholder="Tipe/Model Laptop (cth: Asus TUF Gaming A15)"
            placeholderTextColor="#94A3B8"
            value={inputModel}
            onChangeText={setInputModel}
          />

          <TextInput
            style={externalStyles.inputBox}
            placeholder="Keluhan Kerusakan (cth: Layar bergaris & mati total)"
            placeholderTextColor="#94A3B8"
            value={inputKeluhan}
            onChangeText={setInputKeluhan}
          />

          <TextInput
            style={externalStyles.inputBox}
            placeholder="Estimasi Biaya (Rp) (cth: 250000)"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={inputBiaya}
            onChangeText={setInputBiaya}
          />

          {/* Checkbox / Tombol Urgent Menggunakan Pressable & Inline Styling */}
          <Pressable
            onPress={() => setIsUrgentInput(!isUrgentInput)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 14,
              paddingVertical: 4,
            }}
          >
            <Ionicons
              name={isUrgentInput ? "checkbox" : "square-outline"}
              size={22}
              color={isUrgentInput ? "#DC2626" : "#64748B"}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 13,
                fontWeight: isUrgentInput ? "bold" : "normal",
                color: isUrgentInput ? "#DC2626" : "#334155",
              }}
            >
              Servis Prioritas / Butuh Cepat (Urgent)
            </Text>
          </Pressable>

          {/* Button Bawaan React Native */}
          <Button title="Simpan ke Daftar Antrean" color="#2563EB" onPress={handleTambahServis} />
        </View>

        {/* ================================================================== */}
        {/* MATERI 5.4.A: LOOPING .map() UNTUK FILTER KATEGORI                */}
        {/* ================================================================== */}
        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>Filter Kategori Layanan</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
          {/* Looping kategori dengan .map() */}
          {KATEGORI_LIST.map((kategori, index) => {
            const isSelected = selectedCategory === kategori;
            return (
              <Pressable
                key={index}
                onPress={() => setSelectedCategory(kategori)}
                // Inline Styling Dinamis berdasarkan kondisi isSelected
                style={{
                  backgroundColor: isSelected ? "#2563EB" : "#FFFFFF",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: isSelected ? "#2563EB" : "#CBD5E1",
                }}
              >
                <Text
                  style={{
                    color: isSelected ? "#FFFFFF" : "#475569",
                    fontWeight: isSelected ? "bold" : "500",
                    fontSize: 13,
                  }}
                >
                  {kategori}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ================================================================== */}
        {/* DAFTAR ANTREAN SERVIS (Array of Objects & Inline + External Style) */}
        {/* ================================================================== */}
        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>
            Daftar Unit Diservis ({filteredServices.length})
          </Text>
        </View>

        {/* Looping array of objects menggunakan .map() */}
        {filteredServices.map((service, index) => {
          const statusStyle = getStatusColor(service.status);

          return (
            <View
              key={service.id}
              style={[
                externalStyles.serviceCardBase,
                // Inline Styling Dinamis: Tambah border merah jika servis Urgent
                service.isUrgent ? { borderColor: "#FCA5A5", borderWidth: 1.5 } : {},
              ]}
            >
              {/* Header Card */}
              <View style={externalStyles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={externalStyles.customerName}>{service.customerName}</Text>
                    {service.isUrgent && (
                      <View
                        style={{
                          backgroundColor: "#FEE2E2",
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: "#DC2626", fontSize: 10, fontWeight: "bold" }}>
                          ⚡ URGENT
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={externalStyles.laptopModel}>{service.laptopModel}</Text>
                </View>

                {/* Badge Status dengan Inline Styling */}
                <View
                  style={{
                    backgroundColor: statusStyle.bg,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: statusStyle.text, fontSize: 12, fontWeight: "bold" }}>
                    {service.status}
                  </Text>
                </View>
              </View>

              {/* Keluhan Kerusakan */}
              <Text style={externalStyles.issueText}>
                <Text style={{ fontWeight: "600", color: "#334155" }}>Keluhan: </Text>
                {service.issue}
              </Text>

              {/* Teknisi Bertugas (Properti Opsional ?) */}
              <Text style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                Teknisi: {service.technician ?? "Belum Ditugaskan"} • Masuk: {service.entryDate}
              </Text>

              {/* Footer Card & Tombol Aksi */}
              <View style={externalStyles.cardFooter}>
                <View>
                  <Text style={externalStyles.costLabel}>Estimasi Biaya</Text>
                  <Text style={externalStyles.costValue}>{formatRupiah(service.estimatedCost)}</Text>
                </View>

                {/* Pressable untuk memanggil Custom Function */}
                <Pressable
                  onPress={() => handleTampilkanDetail(service)}
                  style={localStyles.actionButton}
                >
                  <Ionicons name="eye-outline" size={14} color="#2563EB" />
                  <Text style={localStyles.actionButtonText}>Detail & Update</Text>
                </Pressable>
              </View>
            </View>
          );
        })}

        {/* ================================================================== */}
        {/* PAKET LAYANAN SERVIS KILAT (Custom Function Renderer)              */}
        {/* ================================================================== */}
        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>Pilihan Paket Jasa TeknisiKu</Text>
          <View style={externalStyles.sectionBadge}>
            <Text style={externalStyles.sectionBadgeText}>Garansi Servis</Text>
          </View>
        </View>

        {/* Looping Paket Layanan menggunakan Custom Function renderPackageCard */}
        {DAFTAR_PAKET.map((pkg) => renderPackageCard(pkg))}

        {/* Banner Info Bantuan */}
        <View
          style={{
            backgroundColor: "#1E293B",
            borderRadius: 14,
            padding: 16,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="headset-outline" size={32} color="#60A5FA" />
          <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "bold", marginTop: 6 }}>
            Butuh Konsultasi Kerusakan Laptop?
          </Text>
          <Text
            style={{
              color: "#94A3B8",
              fontSize: 12,
              textAlign: "center",
              marginTop: 4,
              marginBottom: 12,
            }}
          >
            Hubungi Customer Care TeknisiKu untuk diagnosa awal secara gratis.
          </Text>
          <Pressable
            onPress={() =>
              Alert.alert("Customer Care", "Layanan CS TeknisiKu dapat dihubungi di: 0812-3456-7890")
            }
            style={{
              backgroundColor: "#2563EB",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "bold" }}>
              Hubungi WhatsApp Teknisi
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// MATERI 3.1: INTERNAL STYLING (StyleSheet.create di dalam file yang sama)
// ============================================================================
const localStyles = StyleSheet.create({
  headerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#93C5FD",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  formHeaderTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  packageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  packageIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
  },
  packageDesc: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 16,
  },
  packageMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  packagePrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#16A34A",
  },
  packageDuration: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
});
