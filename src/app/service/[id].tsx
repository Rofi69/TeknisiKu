import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { externalStyles } from "@/constants/serviceStyles";
import { ServiceStatus } from "@/types/service";

const URUTAN_STATUS: ServiceStatus[] = [
  "Menunggu",
  "Proses",
  "Selesai",
  "Bisa Diambil",
];

export default function ServiceDetailScreen() {
  const router = useRouter();

  const { id, customerName, laptopModel, issue, status, estimatedCost } =
    useLocalSearchParams<{
      id: string;
      customerName: string;
      laptopModel: string;
      issue: string;
      status: string;
      estimatedCost: string;
    }>();

  const [statusSaatIni, setStatusSaatIni] = useState<ServiceStatus>(
    status as ServiceStatus,
  );
  const [diperbarui, setDiperbarui] = useState<string>("Belum ada perubahan");

  useEffect(() => {
    if (statusSaatIni !== status) {
      setDiperbarui(new Date().toLocaleTimeString("id-ID"));
    }
  }, [statusSaatIni, status]);

  const handleStatusBerikutnya = () => {
    const index = URUTAN_STATUS.indexOf(statusSaatIni);
    if (index < URUTAN_STATUS.length - 1) {
      setStatusSaatIni(URUTAN_STATUS[index + 1]);
    }
  };

  const handleKembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={externalStyles.screenContainer}>
      <ScrollView contentContainerStyle={externalStyles.scrollContent}>
        <View style={[externalStyles.serviceCardBase, { marginTop: 16 }]}>
          <Text style={externalStyles.customerName}>{customerName}</Text>
          <Text style={externalStyles.laptopModel}>{laptopModel}</Text>
          <Text style={externalStyles.issueText}>Keluhan: {issue}</Text>

          <View style={externalStyles.cardFooter}>
            <View>
              <Text style={externalStyles.costLabel}>Estimasi Biaya</Text>
              <Text style={externalStyles.costValue}>
                Rp {Number(estimatedCost).toLocaleString("id-ID")}
              </Text>
            </View>
            <View>
              <Text style={externalStyles.costLabel}>ID Servis</Text>
              <Text style={externalStyles.customerName}>{id}</Text>
            </View>
          </View>
        </View>

        <View style={externalStyles.serviceCardBase}>
          <Text style={externalStyles.sectionTitle}>
            Status: {statusSaatIni}
          </Text>
          <Text style={externalStyles.costLabel}>
            Terakhir diperbarui: {diperbarui}
          </Text>

          <Pressable
            onPress={handleStatusBerikutnya}
            style={[externalStyles.primaryButton, { marginTop: 12 }]}
          >
            <Ionicons
              name="arrow-forward-circle-outline"
              size={18}
              color="#FFFFFF"
            />
            <Text style={externalStyles.primaryButtonText}>
              Status Berikutnya
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleKembali}
          style={[externalStyles.primaryButton, { backgroundColor: "#475569" }]}
        >
          <Ionicons name="arrow-back-outline" size={18} color="#FFFFFF" />
          <Text style={externalStyles.primaryButtonText}>Kembali</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
