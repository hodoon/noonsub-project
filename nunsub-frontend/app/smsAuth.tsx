import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";

const SmsAuth = () => {
  const router = useRouter();
  const [step, setStep] = useState<"start" | "otp">("start");
  const [otp, setOtp] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleStart = () => {
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      router.push("/setPin");
    } else {
      Alert.alert("오류", "6자리 인증번호를 입력해주세요.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {step === "start" ? (
        <>
          <Text style={styles.text}>
            nunsub에 가입하기 위해{"\n"}본인 인증을 진행할게요
          </Text>
          <TouchableOpacity style={[styles.button, { marginBottom: 72 }]} onPress={handleStart}>
            <Text style={styles.buttonText}>인증 요청하기</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>문자로 온 인증번호를{"\n"}입력해주세요</Text>

            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                placeholder="인증번호"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { marginBottom: isKeyboardVisible ? 32 : 72 }]}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>인증완료</Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 56,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 36,
    marginTop: 320,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    color: "#000",
    lineHeight: 32,
  },
  inputBox: {
    backgroundColor: "#F5F8FF",
    padding: 20,
    borderRadius: 16,
  },
  textInput: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#7EACFF",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SmsAuth;