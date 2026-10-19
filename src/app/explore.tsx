import { externalStyles } from "@/constants/serviceStyles";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// 1. Tipe Data Profil Teknisi
interface TeknisiProfile {
  id: number;
  nama: string;
  spesialisasi: string;
  pengalamanTahun: number;
  avatarUrl: string;
  rating: number;
  kontak: string;
}

// 2. Tipe Data Tips Perawatan Laptop
interface TipsLaptop {
  id: number;
  judul: string;
  kategori: string;
  penjelasan: string;
  icon: string;
}

// Array of Objects: Daftar Teknisi
const TIM_TEKNISI: TeknisiProfile[] = [
  {
    id: 1,
    nama: "Rofi Naufal Farid",
    spesialisasi: "Hardware, Motherboard & IC Power",
    pengalamanTahun: 5,
    avatarUrl: "https://scontent.fmlg1-1.fna.fbcdn.net/v/t39.30808-6/472298055_947631697291085_4043497079065891994_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1200&ctp=s1200x1200&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGWz7pygjlP3o5H8ITeNyUoUS7Iyyw3WpZRLsjLLDdalnzveoh2yoEUipBAD5T5OiUtIsqPdQD9kEtncNlGE-GE&_nc_ohc=iKIvi0tbtAkQ7kNvwG6OmJ6&_nc_oc=Adop1zXQusOVbNKaQ0dXvDktn95pVq8qzcHKxLN_nTnMjxs6OCYgoMaQ2muAcIuveCI&_nc_zt=23&_nc_ht=scontent.fmlg1-1.fna&_nc_gid=F_rW6Lu8KAfff_fGkgwMVg&_nc_ss=7b2a8&oh=00_AQOw6etU20aO8c5dD5pl4YKYgC-iOwkdGfeKmm3uGsa_3A&oe=6AC9BB4E",
    rating: 4.9,
    kontak: "0822-3932-8378",
  },
  {
    id: 2,
    nama: "Ryan Ahmmad Setiawa",
    spesialisasi: "Sound, Hardware & IC Power",
    pengalamanTahun: 3,
   avatarUrl: require('../../assets/images/Ryan.png'),
    rating: 4.8,
    kontak: "0816-1592-8618",
  },
  {
    id: 3,
    nama: "Tri Agung Wijaksono",
    spesialisasi: "Cleaning, Thermal Repasting, LCD",
    pengalamanTahun: 4,
    avatarUrl: require('../../assets/images/agung.png'),
    rating: 4.9,
    kontak: "0899-1122-3344",
  },
];

// Array of Objects: Tips Perawatan Laptop
const DAFTAR_TIPS: TipsLaptop[] = [
  {
    id: 1,
    judul: "Ganti Thermal Paste Setiap 6-12 Bulan",
    kategori: "Hardware",
    penjelasan: "Pasta thermal yang kering menyebabkan suhu prosesor overheat dan throttle.",
    icon: "thermometer-outline",
  },
  {
    id: 2,
    judul: "Hindari Menggunakan Laptop di Atas Kasur",
    kategori: "Maintenance",
    penjelasan: "Sirkulasi udara bawah tersumbat serat kasur dan mempercepat penumpukan debu kipas.",
    icon: "warning-outline",
  },
  {
    id: 3,
    judul: "Jangan Biarkan Baterai 0% Terlalu Lama",
    kategori: "Battery",
    penjelasan: "Pengurasan baterai sampai drop total dapat merusak sel lithium baterai laptop.",
    icon: "battery-charging-outline",
  },
];

export default function ExploreScreen() {
  // Custom Function: Menampilkan kontak teknisi
  const hubungiTeknisi = (teknisi: TeknisiProfile) => {
    Alert.alert(
      `Hubungi ${teknisi.nama}`,
      `Spesialis: ${teknisi.spesialisasi}\nPengalaman: ${teknisi.pengalamanTahun} Tahun\nNomor: ${teknisi.kontak}`,
      [{ text: "Tutup" }]
    );
  };

  return (
    <SafeAreaView style={externalStyles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={externalStyles.scrollContent}>
        {/* Header Profil TeknisiKu */}
        <View style={externalStyles.headerBanner}>
          <Text style={externalStyles.brandTitle}>Info & Tim Teknisi 🛠️</Text>
          <Text style={externalStyles.brandSubtitle}>
            Profil Teknisi Bersertifikat & Tips Perawatan Laptop
          </Text>
        </View>

        {/* Section Tim Teknisi */}
        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>Tim Teknisi Ahli</Text>
          <View style={externalStyles.sectionBadge}>
            <Text style={externalStyles.sectionBadgeText}>{TIM_TEKNISI.length} Teknisi</Text>
          </View>
        </View>

        {/* Looping Daftar Teknisi menggunakan .map() */}
        {TIM_TEKNISI.map((tech) => (
          <View key={tech.id} style={externalStyles.serviceCardBase}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: tech.avatarUrl }} style={styles.techAvatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.techName}>{tech.nama}</Text>
                <Text style={styles.techSpec}>{tech.spesialisasi}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                  <Ionicons name="star" size={14} color="#EAB308" />
                  <Text style={styles.techRating}> {tech.rating} </Text>
                  <Text style={styles.techExp}>• {tech.pengalamanTahun} Th Pengalaman</Text>
                </View>
              </View>
            </View>

            <View style={externalStyles.cardFooter}>
              <Text style={{ fontSize: 12, color: "#64748B" }}>Status: Siap Menerima Order</Text>
              <Pressable
                onPress={() => hubungiTeknisi(tech)}
                style={{
                  backgroundColor: "#2563EB",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}>Konsultasi</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Section Tips Perawatan */}
        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>Tips Perawatan Laptop</Text>
        </View>

        {/* Looping Tips dengan .map() */}
        {DAFTAR_TIPS.map((tip) => (
          <View
            key={tip.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 14,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#EFF6FF",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                marginTop: 2,
              }}
            >
              <Ionicons name={tip.icon as any} size={20} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#0F172A" }}>{tip.judul}</Text>
              <Text style={{ fontSize: 12, color: "#64748B", marginTop: 4, lineHeight: 17 }}>
                {tip.penjelasan}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  techAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
  },
  techName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
  },
  techSpec: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "500",
    marginTop: 2,
  },
  techRating: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F172A",
  },
  techExp: {
    fontSize: 11,
    color: "#64748B",
  },
});
