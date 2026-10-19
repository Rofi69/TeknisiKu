import { externalStyles } from "@/constants/serviceStyles";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface TeknisiProfile {
  id: number;
  nama: string;
  spesialisasi: string;
  pengalamanTahun: number;
  avatar: ImageSourcePropType;
  rating: number;
  kontak: string;
}

interface TipsLaptop {
  id: number;
  judul: string;
  kategori: string;
  penjelasan: string;
  icon: string;
}

const TIM_TEKNISI: TeknisiProfile[] = [
  {
    id: 1,
    nama: "Rofi Naufal Farid",
    spesialisasi: "Hardware, Motherboard & IC Power",
    pengalamanTahun: 5,
    avatar: {
      uri: "https://scontent.fsub8-2.fna.fbcdn.net/v/t39.30808-6/545493030_780589341253084_783169651151179765_n.jpg?stp=dst-jpg_tt6&cstp=mx720x1280&ctp=s720x1280&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFttMDBpLaP-pjACO1mEpnUfOCqMb7FnvZ84KoxvsWe9hXZ9aM5jVgW7tqRaRjn6beDwTl6Cw7KrLn0rIB2EDCU&_nc_ohc=L9788VdD3Y0Q7kNvwF9eTWR&_nc_oc=Adq6_0mjnGs7SPy1bBB6ySQ1kVCIPDD50gXQQWdgI6JTVG8OHiQHa9tHQVbaBE8zW7kdiLGpUn6yF2KiYTNq_5KU&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=ORUTzLwJ2uv6xwuT9uoe4g&_nc_ss=7b2a8&oh=00_AQMx7dqBvbtLykG-y3t_uWX12thlFjbXRiVN6IILrioU2Q&oe=6ADC4FFD",
    },
    rating: 4.9,
    kontak: "0822-3932-8378",
  },
  {
    id: 2,
    nama: "Ryan Ahmmad Setiawa",
    spesialisasi: "Sound, Hardware & IC Power",
    pengalamanTahun: 3,
    avatar: require("../../../assets/images/Ryan.png"),
    rating: 4.8,
    kontak: "0816-1592-8618",
  },
  {
    id: 3,
    nama: "Tri Agung Wijaksono",
    spesialisasi: "Cleaning, Thermal Repasting, LCD",
    pengalamanTahun: 4,
    avatar: require("../../../assets/images/agung.png"),
    rating: 4.9,
    kontak: "0899-1122-3344",
  },
];

const DAFTAR_TIPS: TipsLaptop[] = [
  {
    id: 1,
    judul: "Ganti Thermal Paste Setiap 6-12 Bulan",
    kategori: "Hardware",
    penjelasan:
      "Pasta thermal yang kering menyebabkan suhu prosesor overheat dan throttle.",
    icon: "thermometer-outline",
  },
  {
    id: 2,
    judul: "Hindari Menggunakan Laptop di Atas Kasur",
    kategori: "Maintenance",
    penjelasan:
      "Sirkulasi udara bawah tersumbat serat kasur dan mempercepat penumpukan debu kipas.",
    icon: "warning-outline",
  },
  {
    id: 3,
    judul: "Jangan Biarkan Baterai 0% Terlalu Lama",
    kategori: "Battery",
    penjelasan:
      "Pengurasan baterai sampai drop total dapat merusak sel lithium baterai laptop.",
    icon: "battery-charging-outline",
  },
];

export default function ExploreScreen() {
  const hubungiTeknisi = (teknisi: TeknisiProfile) => {
    Alert.alert(
      `Hubungi ${teknisi.nama}`,
      `Spesialis: ${teknisi.spesialisasi}\nPengalaman: ${teknisi.pengalamanTahun} Tahun\nNomor: ${teknisi.kontak}`,
      [{ text: "Tutup" }],
    );
  };

  return (
    <SafeAreaView style={externalStyles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={externalStyles.scrollContent}
      >
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
            <Text style={externalStyles.sectionBadgeText}>
              {TIM_TEKNISI.length} Teknisi
            </Text>
          </View>
        </View>

        {/* Looping Daftar Teknisi menggunakan .map() */}
        {TIM_TEKNISI.map((tech) => (
          <View key={tech.id} style={externalStyles.serviceCardBase}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={tech.avatar} style={styles.techAvatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.techName}>{tech.nama}</Text>
                <Text style={styles.techSpec}>{tech.spesialisasi}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Ionicons name="star" size={14} color="#EAB308" />
                  <Text style={styles.techRating}> {tech.rating} </Text>
                  <Text style={styles.techExp}>
                    • {tech.pengalamanTahun} Th Pengalaman
                  </Text>
                </View>
              </View>
            </View>

            <View style={externalStyles.cardFooter}>
              <Text style={{ fontSize: 12, color: "#64748B" }}>
                Status: Siap Menerima Order
              </Text>
              <Pressable
                onPress={() => hubungiTeknisi(tech)}
                style={{
                  backgroundColor: "#2563EB",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}
                >
                  Konsultasi
                </Text>
              </Pressable>
            </View>
          </View>
        ))}

        <View style={externalStyles.sectionHeader}>
          <Text style={externalStyles.sectionTitle}>Tips Perawatan Laptop</Text>
        </View>

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
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#0F172A" }}
              >
                {tip.judul}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  marginTop: 4,
                  lineHeight: 17,
                }}
              >
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
