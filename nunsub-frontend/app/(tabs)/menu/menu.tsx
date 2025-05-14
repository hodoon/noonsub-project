import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MenuScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text style={styles.logo}>nunsub</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.profile}
        onPress={() => router.push("/menu/mypage")}
      >
        <Image
          source={require("../../../assets/images/profile.png")}
          style={styles.avatar}
        />
        <View style={styles.profileText}>
          <Text style={styles.userName}>사용자</Text>
          <Text style={styles.userSubText}>눌러서 내 정보 편집</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      {/* Wallet Section */}
      <Text style={styles.sectionTitle}>내 지갑</Text>
      <View style={styles.section}>
        <MenuItem
          label="신용 및 체크카드"
          badge="2개 카드"
          onPress={() => router.push("/menu/wallet/card")}
        />
        <MenuItem
          label="은행 계좌"
          badge="4개 계좌"
          onPress={() => router.push("/menu/wallet/account")}
        />
        <MenuItem
          label="간편결제"
          badge="2개 서비스"
          onPress={() => router.push("/menu/wallet/pay")}
        />
      </View>

      {/* Subscription Section */}
      <Text style={styles.sectionTitle}>내 구독</Text>
      <View style={styles.section}>
        <MenuItem label="내 구독 모아보기" />
        <MenuItem label="은행 계좌" />
        <MenuItem label="간편결제" />
      </View>
    </ScrollView>
  );
}

function MenuItem({
  label,
  badge,
  onPress,
}: {
  label: string;
  badge?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons name="folder-outline" size={20} color="#333" />
        <Text style={styles.itemText}>{label}</Text>
      </View>
      {badge && <Text style={styles.badge}>{badge}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userSubText: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  badge: {
    fontSize: 12,
    backgroundColor: "#E5EDFF",
    color: "#3E5EFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
});