import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([
    { name: '넷플릭스', price: 13500, cycle: '1달', remaining: '5일 전' },
    { name: 'YouTube Premium', price: 14900, cycle: '1달', remaining: '2일 뒤' },
    { name: 'App Store', price: 3300, cycle: '1달', remaining: '4월 8일' },
  ]);

  const totalPrice = subscriptions.reduce((sum, item) => sum + item.price, 0);
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  const handleAddSubscription = () => {
    router.push('/create/addsub');
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const y = event.nativeEvent.contentOffset.y;

    Animated.timing(buttonTranslateY, {
      toValue: y > 10 ? -10 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.profile} onPress={() => router.push('/mypage')}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.avatar}
            />
            <Text style={styles.headerText}>홈</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/notification/index')}>
            <Ionicons name="notifications-outline" size={24} color="#387CFF" />
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/633/633611.png',
          }}
          style={styles.cardImage}
        />

        <Text style={styles.mainTitle}>다음 OTT{'\n'}결제일이 언제더라?</Text>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>은행계좌 등록</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>내 구독</Text>
            <Text style={styles.totalAmount}>총 {totalPrice.toLocaleString()}원</Text>
          </View>

          {subscriptions.length > 0 ? (
            subscriptions.map((item, index) => (
              <View key={index} style={styles.subscriptionItem}>
                <View style={styles.subscriptionInfo}>
                  <View style={styles.iconCircle} />
                  <View>
                    <Text style={styles.subscriptionName}>{item.name}</Text>
                    <Text style={styles.subscriptionDetail}>
                      {item.price.toLocaleString()}원 / {item.cycle}
                    </Text>
                  </View>
                </View>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeText}>{item.remaining}</Text>
                </View>
              </View>
            ))
          ) : (
            <TouchableOpacity style={styles.emptyBox} onPress={handleAddSubscription}>
              <Text style={styles.emptyText}>등록된 구독이 없어요</Text>
              <Text style={styles.emptySubText}>눌러서 구독 추가</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* 하단 고정 애니메이션 버튼 */}
      <Animated.View
        style={[
          styles.addButtonContainer,
          { transform: [{ translateY: buttonTranslateY }] },
        ]}
      >
        <TouchableOpacity style={styles.addButton} onPress={handleAddSubscription}>
          <Text style={styles.addButtonText}>+ 구독 추가</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 500, // 하단 버튼 공간 확보
    backgroundColor: '#fff',
  },
  header: {
    marginTop:20,
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
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  totalAmount: {
    color: '#999',
    fontSize: 13,
  },
  subscriptionItem: {
    backgroundColor: '#7EACFF1A',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    marginRight: 12,
  },
  subscriptionName: {
    fontWeight: '600',
    fontSize: 15,
  },
  subscriptionDetail: {
    color: '#666',
    fontSize: 13,
  },
  dateBadge: {
    backgroundColor: '#E0EBFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dateBadgeText: {
    fontSize: 12,
    color: '#387CFF',
    fontWeight: '600',
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
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#72A9FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    shadowColor: '#387CFF',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
