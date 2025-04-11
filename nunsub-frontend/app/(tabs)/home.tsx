import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handleAddSubscription = () => {
    console.log('구독 추가');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={{ uri: '@/assets/images/profile.png' }}
            style={styles.avatar}
          />
          <Text style={styles.headerText}>홈</Text>
        </View>
        <Ionicons name="lock-closed-outline" size={24} color="#A3A3A3" />
      </View>

      {/* 카드 이미지 */}
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/633/633611.png', // 예시 카드 이미지
        }}
        style={styles.cardImage}
      />


      <Text style={styles.mainTitle}>다음 OTT{'\n'}결제일이 언제더라?</Text>

   
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>은행계좌 등록</Text>
      </TouchableOpacity>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 구독</Text>

        <TouchableOpacity
          style={styles.emptyBox}
          onPress={handleAddSubscription}
        >
          <Text style={styles.emptyText}>등록된 구독이 없어요</Text>
          <Text style={styles.emptySubText}>눌러서 구독 추가</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardImage: {
    width: 100,
    height: 70,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    lineHeight: 30,
  },
  registerButton: {
    alignSelf: 'center',
    backgroundColor: '#EEF3FF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  registerButtonText: {
    color: '#387CFF',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  emptyBox: {
    backgroundColor: '#EEF3FF',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  emptySubText: {
    color: '#A3A3A3',
    fontSize: 13,
  },
});
