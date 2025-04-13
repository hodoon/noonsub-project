import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUser } from "../../contexts/UserContext";

const UpdateMypage = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState(user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const carrierOptions = ["SKT", "KT", "LG U+", "알뜰폰"];

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setUser(formData);
    console.log("Updated:", formData);
    router.push("/mypage");
  };

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  // 전화번호 형식 고정 및 자릿수 제한
  const formatPhone = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, '');
    let formatted = '';

    if (numbersOnly.length >= 10) {
      formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
    } else if (numbersOnly.length >= 4) {
      formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    } else {
      formatted = numbersOnly;
    }

    if (formatted.length > 13) {
      formatted = formatted.slice(0, 13); // 13자리 제한
    }

    handleChange("phone", formatted);
  };

  const formatBirth = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, '');
    let formatted = '';

    // 생년월일 자릿수에 따라 형식화
    if (numbersOnly.length >= 8) {
        formatted = `${numbersOnly.slice(0, 4)}.${numbersOnly.slice(4, 6)}.${numbersOnly.slice(6, 8)}`;
    } else if (numbersOnly.length >= 5) {
        formatted = `${numbersOnly.slice(0, 4)}.${numbersOnly.slice(4)}`;
    } else {
        formatted = numbersOnly;
    }

    if (formatted.length > 10) {
        formatted = formatted.slice(0, 10); // 10자리 제한
    }

    // 현재 포맷된 값을 호출
    handleChange("birth", formatted);
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/mypage")}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color="#007AFF"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>내 정보 수정</Text>

      {/* 이름 */}
      <View style={styles.field}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>

      {/* 생년월일 */}
      <View style={styles.field}>
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          style={styles.input}
          value={formData.birth}
          onChangeText={formatBirth}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 전화번호 */}
      <View style={styles.field}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={formatPhone}
          keyboardType="phone-pad"
          maxLength={13} // 전화번호 최대 13자리
        />
      </View>

      {/* 통신사 선택 */}
      <View style={styles.field}>
        <Text style={styles.label}>통신사</Text>
        <TouchableOpacity style={styles.dropdown} onPress={openModal}>
          <Text style={styles.dropdownText}>
            {formData.carrier || "통신사를 선택해주세요"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 수정완료 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>수정완료</Text>
      </TouchableOpacity>

      {/* 하단 모달 */}
      {isModalVisible && (
        <Modal transparent visible animationType="none" onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.modalTitle}>통신사를 선택해주세요</Text>

            {carrierOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItemRow}
                onPress={() => {
                  handleChange("carrier", item);
                  closeModal();
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
                {formData.carrier === item && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  backButton: {
    paddingVertical: 12,
  },
  backIcon: {
    width: 24,
    left: -10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 32,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  input: {
    backgroundColor: "#F1F5FF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  dropdown: {
    backgroundColor: "#F1F5FF",
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginTop: 180,
    backgroundColor: "#F1F5FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 17,
    color: '#333',
  },
});

export default UpdateMypage;