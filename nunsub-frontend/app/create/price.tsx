import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PricePage() {
  const router = useRouter();
  const [price, setPrice] = useState('');

  const handleConfirm = () => {
    router.push({
      pathname: './addsub',
      params: { price },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* 뒤로가기 */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons
            name="chevron-back"
            size={28}
            color="#007AFF"
            style={styles.backIcon}
            />
      </TouchableOpacity>

      {/* 타이틀 */}
      <Text style={styles.title}>결제 금액 바꾸기</Text>

      {/* 라벨 */}
      <Text style={styles.label}>결제 금액</Text>

      {/* 입력박스 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.unitBox}>
          <Text style={styles.unitText}>원</Text>
          <Ionicons name="chevron-down" size={14} color="#555" />
        </TouchableOpacity>
      </View>

      {/* 확인 버튼 */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

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
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 32,
  },
  label: {
    color: '#387CFF',
    fontSize: 14,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F6FF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    borderWidth: 0,
  },
  unitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F6FF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginLeft: 8,
  },
  unitText: {
    fontSize: 16,
    marginRight: 4,
    color: '#000',
  },
  bottomArea: {
    position: 'absolute',
    bottom:58,
    left: 24,
    right: 24,
  },
  confirmButton: {
    backgroundColor: '#72A9FF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
