import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../contexts/UserContext";
import Ionicons from "react-native-vector-icons/Octicons";

const MyPage = () => {
  const router = useRouter();
  const { user } = useUser(); // ← UserContext에서 user 가져오기

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/home")}
        >
          <Ionicons
            name="home"
            size={28}
            color="#007AFF"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      {/* 프로필 이미지 */}
      <TouchableOpacity>
        <Image
          source={require("../../assets/images/profile.png")}
          style={styles.avatar}
        />
        <Text style={styles.selectPhoto}>사진 선택</Text>
      </TouchableOpacity>

      {/* 이름 */}
      <Text style={styles.name}>{user.name}</Text>

      {/* 정보 카드 */}
      <View style={styles.infoContainer}>
        <View style={[styles.infoBox, { marginRight: 5 }]}>
          <Text style={styles.label}>생일</Text>
          <Text style={styles.value}>{user.birth}</Text>
        </View>
        <View style={[styles.infoBox, { marginLeft: 5 }]}>
          <Text style={styles.label}>통신사</Text>
          <Text style={styles.value}>{user.carrier}</Text>
        </View>
      </View>

      <View style={styles.phoneBox}>
        <Text style={styles.label}>전화번호</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>

      {/* 수정 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/updateMypage")}
      >
        <Text style={styles.buttonText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
  },
  backButton: {
    paddingVertical: 12,
  },
  backIcon: {
    width: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  selectPhoto: {
    color: "#007AFF",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 32,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#EEF3FF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 13,
    color: "#555",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },
  phoneBox: {
    width: "100%",
    backgroundColor: "#EEF3FF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: "flex-start",
  },
  phone: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },
  button: {
    width: "100%",
    backgroundColor: "#EEF3FF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MyPage;
