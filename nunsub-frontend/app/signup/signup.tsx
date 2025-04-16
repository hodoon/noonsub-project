import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [carrier, setCarrier] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const idAnim = useRef(new Animated.Value(0)).current;
  const phoneAnim = useRef(new Animated.Value(0)).current;
  const carrierAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const isNameValid = name.trim().length >= 2;
  const isIdValid = id.length === 8;
  const isPhoneValid = phone.length >= 11;

  const carrierOptions = ["SKT", "KT", "LG U+", "알뜰폰"];

  const handleLogin = () => {
    router.replace("/signup/smsAuth");
  };

  useEffect(() => {
    Animated.timing(idAnim, {
      toValue: isNameValid ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isNameValid]);

  useEffect(() => {
    Animated.timing(phoneAnim, {
      toValue: isIdValid ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isIdValid]);

  useEffect(() => {
    Animated.timing(carrierAnim, {
      toValue: isPhoneValid ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isPhoneValid]);

  const handleIdChange = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, "").slice(0, 13);
    let formatted = numbersOnly;

    if (numbersOnly.length > 6) {
      formatted = `${numbersOnly.slice(0, 6)}-${numbersOnly.slice(6)}`;
    }

    setId(formatted);
  };

  const handlePhoneChange = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, "").slice(0, 11);
    let formatted = numbersOnly;

    if (numbersOnly.length >= 7) {
      formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(
        3,
        7
      )}-${numbersOnly.slice(7)}`;
    } else if (numbersOnly.length >= 4) {
      formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    }

    setPhone(formatted);

    if (numbersOnly.length === 11) {
      Keyboard.dismiss();
    }
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        nunsub👀에서{"\n"}사용자님을 어떻게 부를까요?
      </Text>

      <TextInput
        placeholder="이름"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Animated.View
        style={{
          opacity: idAnim,
          transform: [
            {
              translateY: idAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        }}
      >
        {isNameValid && (
          <View style={styles.input}>
            <View style={styles.idInputWrapper}>
              <TextInput
                value={id}
                onChangeText={handleIdChange}
                placeholder="주민등록번호"
                keyboardType="numeric"
                maxLength={8}
                style={styles.idInput}
              />
              {id.length === 8 && <Text style={styles.asterisks}>******</Text>}
            </View>
          </View>
        )}
      </Animated.View>

      <Animated.View
        style={{
          opacity: phoneAnim,
          transform: [
            {
              translateY: phoneAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        }}
      >
        {isIdValid && (
          <TextInput
            placeholder="전화번호"
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
          />
        )}
      </Animated.View>

      <Animated.View
        style={{
          opacity: carrierAnim,
          transform: [
            {
              translateY: carrierAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        }}
      >
        {isPhoneValid && (
          <TouchableOpacity style={styles.dropdown} onPress={openModal}>
            <Text style={styles.dropdownText}>
              {carrier || "통신사를 선택해주세요"}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {carrier && (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      )}

      {/* 하단 모달 */}
      {isModalVisible && (
        <Modal
          transparent
          visible
          animationType="none"
          onRequestClose={closeModal}
        >
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
                  setCarrier(item);
                  closeModal();
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
                {carrier === item && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#7EACFF1A",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdown: {
    height: 80,
    backgroundColor: "#7EACFF1A",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#7EACFF",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 17,
    color: "#333",
    // fontWeight:'bold',
  },
  idText: {
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  idInputWrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  idInput: {
    height: 80,
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
  },
  asterisks: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -9}, { translateX: -140 }],
    fontSize: 22,
    fontWeight: "bold",
    color: "#999",
  },
});
