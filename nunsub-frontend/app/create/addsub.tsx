import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddSubscription() {
  const router = useRouter();
  const { price: priceParam } = useLocalSearchParams();
  const [price, setPrice] = useState(priceParam || '');

  const [name, setName] = useState('');
  const [cycle, setCycle] = useState('1달');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleSubmit = () => {
    console.log('등록 완료');
    router.push('/home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* 뒤로가기 */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
            <Ionicons name="chevron-back" size={28} color="#007AFF" style={styles.backIcon} />
          </TouchableOpacity>

          {/* 타이틀 */}
          <Text style={styles.title}>구독 서비스 정보를{'\n'}입력해주세요 ✍🏻</Text>

          {/* 서비스 이름 입력 */}
          <View style={styles.inputBox}>
            <Text style={styles.inputTitle}>서비스 이름</Text>
            <TextInput
              style={styles.input}
              placeholder="어떤 구독을 등록할까요?"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* 구독 요금 선택 */}
          <TouchableOpacity style={styles.inputBox} onPress={() => router.push('./price')}>
            <Text style={styles.inputTitle}>구독 요금</Text>
            <Text style={styles.inputPlaceholder}>
              {price ? `${price}원` : '얼마에 구독하고 계신가요?'}
            </Text>
          </TouchableOpacity>

          {/* 구독 정보 섹션 */}
          <Text style={styles.sectionTitle}>구독 정보</Text>

          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>구독 주기</Text>
            <Text style={styles.infoValue}>{cycle}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoRow} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.infoLabel}>구독 시작</Text>
            <Text style={styles.infoValue}>
              {startDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={handleDateChange}
            />
          )}

          {/* 하단 등록 버튼 (스크롤 안에 포함되도록 이동) */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>등록</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40, // 스크롤 마지막 요소 여유 공간
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
    marginBottom: 24,
  },
  inputBox: {
    backgroundColor: '#F2F6FF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 16,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#387CFF',
    marginBottom: 6,
  },
  input: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  inputPlaceholder: {
    fontSize: 20,
    color: '#999',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
  },
  footer: {
    marginTop: 40,
  },
  submitButton: {
    backgroundColor: '#72A9FF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
