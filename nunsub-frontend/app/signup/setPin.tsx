import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const SetPin = () => {
  const [step, setStep] = useState<"set" | "confirm">("set");
  const [pin, setPin] = useState("");
  const [firstPin, setFirstPin] = useState("");
  const router = useRouter();

  const handlePress = (value: string) => {
    const current = pin + value;
    if (current.length > 6) return;
    setPin(current);

    if (current.length === 6) {
      if (step === "set") {
        if (isInvalidPattern(current)) {
          Alert.alert(
            "사용할 수 없는 비밀번호",
            "3자리 이상 반복되거나, 연속된 숫자는 사용할 수 없습니다."
          );
          setPin("");
          return;
        }
        setFirstPin(current);
        setPin("");
        setStep("confirm");
      } else {
        if (current === firstPin) {
          router.push({ pathname: "/welcome_splash", params: { pin: current } });
        } else {
          Vibration.vibrate(200);
          Alert.alert("비밀번호가 일치하지 않아요", "다시 입력해주세요.");
          setPin("");
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    Vibration.vibrate(10);
  };

  const isInvalidPattern = (pin: string): boolean => {
    // 1. 3자리 이상 연속 숫자 검사
    for (let i = 0; i <= pin.length - 3; i++) {
      const a = parseInt(pin[i]);
      const b = parseInt(pin[i + 1]);
      const c = parseInt(pin[i + 2]);

      if (b === a + 1 && c === b + 1) return true; // 오름차순 연속
      if (b === a - 1 && c === b - 1) return true; // 내림차순 연속
    }

    // 2. 3자리 이상 반복 숫자 검사
    for (let i = 0; i <= pin.length - 3; i++) {
      if (pin[i] === pin[i + 1] && pin[i + 1] === pin[i + 2]) return true;
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { marginBottom: step === "set" ? 160 : 156 }]}
      >
        {step === "set"
          ? "사용하실 비밀번호를\n입력해주세요"
          : "사용하실 비밀번호를\n다시 한 번 입력해주세요"}
      </Text>

      <View style={styles.dots}>
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i < pin.length ? "#000" : "#aaa",
              },
            ]}
          />
        ))}
      </View>

      <Text style={styles.helperText}>
        {step === "set"
          ? "3자리 이상 반복되거나, 연속되지 않도록,\n생년월일, 전화번호가 포함되지 않도록 입력해주세요."
          : "앞서 입력한 비밀번호와\n동일하게 입력해주세요"}
      </Text>

      <View style={styles.pad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.key}
              onPress={() => {
                if (item === "⌫") handleBackspace();
                else if (item !== "") handlePress(item);
              }}
            >
              <Text style={styles.keyText}>{item}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 160,
    width: "100%",
    paddingHorizontal: 20,
    color: "#000",
  },
  dots: {
    flexDirection: "row",
    marginVertical: 24,
    gap: 16,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  helperText: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 18,
    color: "#888",
  },
  pad: {
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  key: {
    width: 72,
    height: 72,
    marginHorizontal: 24,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});

export default SetPin;
