import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SubscriptionDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                >
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#007AFF"
                    style={styles.backIcon}
                />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                // 편집 버튼 눌렀을 때 동작
                console.log('편집 버튼 클릭됨');
                }}
            >
                <Text style={styles.editText}>편집</Text>
            </TouchableOpacity>
            </View>


      {/* 앱 로고 및 이름 */}
      <View style={styles.logoContainer}>
            <Image
            source={{ uri: 'https://cdn.brandfetch.io/netflix.com/w/400/h/400?c=1idvtb1T9J7e9VVLZVo' }}
            style={styles.logo}
            />

        <Text style={styles.appName}>넷플릭스</Text>
        <Text style={styles.price}>13,500원 / 1달</Text>
      </View>

      {/* 결제일 정보 */}
      <View style={styles.paymentInfoBox}>
        <Text style={styles.daysLeft}>29일 뒤 결제</Text>
        <Text style={styles.subscribedText}>3달 전에 구독 시작했어요</Text>

        <View style={styles.paymentDates}>
          <View style={styles.dateItem}>
            <Text style={styles.date}>✓ 5월 12일</Text>
          </View>
          <View style={[styles.dateItem, styles.nextPayment]}>
            <Text style={styles.date}>6월 12일</Text>
          </View>
        </View>
      </View>

      {/* 버튼 */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.notifyButton}>
          <Ionicons name="notifications-outline" size={20} color="#000" />
          <Text style={styles.buttonText}>알림 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>해지하기</Text>
        </TouchableOpacity>
      </View>

      {/* 결제 수단 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>결제 수단</Text>
        <View style={styles.paymentMethod}>
          <Ionicons name="card-outline" size={20} color="#000" />
          <Text style={styles.cardText}>국민카드 (1개 카드)</Text>
        </View>
      </View>

      {/* 메모 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>메모</Text>
        <Text style={styles.memoPlaceholder}>여기를 눌러서 메모를 등록하세요</Text>
      </View>

        {/* 지출 내역 */}
        <View style={styles.section}>
                <Text style={styles.sectionTitle}>지출 내역</Text>
                {[5, 4, 3, 2].map((month) => (
                <View key={month} style={styles.historyItem}>
                <Image
        source={{ uri: 'https://cdn.brandfetch.io/netflix.com/w/400/h/400?c=1idvtb1T9J7e9VVLZVo' }}
        style={styles.historyLogo}
        />

            <View>
              <Text style={styles.historyText}>13,500원</Text>
              <Text style={styles.historyDate}>{month}월 12일</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SubscriptionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  
  editText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  
  logoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  paymentInfoBox: {
    backgroundColor: '#f0f4fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  daysLeft: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscribedText: {
    fontSize: 13,
    color: '#888',
    marginVertical: 4,
  },
  paymentDates: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dateItem: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  nextPayment: {
    backgroundColor: '#007AFF',
  },
  date: {
    color: '#fff',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3F7',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: '500',
    justifyContent:'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#F24E4E',
    fontWeight: '500',
    justifyContent:'center',
  },
  section: {
    marginTop: 50,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
  },
  cardText: {
    marginLeft: 8,
  },
  memoPlaceholder: {
    color: '#aaa',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginTop:20,
  },
  historyLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  historyTitle:{
    color:'#8F8F8F',
    fontSize:12,
  },
  historyText: {
    fontWeight: '500',
  },
  historyDate: {
    color: '#888',
    fontSize: 12,
    marginTop:3,
  },

  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
  },
  backButton: {
    paddingVertical: 12,
    marginLeft: -8,
  },
  backIcon: {
    width: 24,
  },

  
});
