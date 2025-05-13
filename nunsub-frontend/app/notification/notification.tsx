import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NotificationScreen() {
  const router = useRouter();

  const [newSubscription, setNewSubscription] = useState(true);
  const [threeDaysBefore, setThreeDaysBefore] = useState(true);
  const [oneDayBefore, setOneDayBefore] = useState(true);

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
             {/* 뒤로가기 */}
              <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#007AFF"
                    style={styles.backIcon}
                    />
              </TouchableOpacity>
        <Text style={styles.headerTitle}>알림 설정</Text>
        <View style={{width:24}} />
      </View>

      {/* 설명 */}
      <Text style={styles.description}>눈썹이 보내드릴 알림을 설정할 수 있어요. 📩</Text>
      <View style={styles.thickdivider} />
      {/* 섹션 제목 */}
      <Text style={styles.sectionTitle}>전체 구독 알림</Text>
      <Text style={styles.sectionSubText}>
        눈썰이 보내는 구독 알림을 설정해요. 여기서 알림을 비활성화하면, 모든 알림을 보내지 않아요.
      </Text>

      {/* 알림 항목 */}
      <View style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>새로운 구독</Text>
          <Text style={styles.itemDesc}>구독 중이있는 새로운 구독을 찾으면{'\n'}눈썰이 알림을 보내드려요</Text>
        </View>
        <Switch
          value={newSubscription}
          onValueChange={setNewSubscription}
          trackColor={{ false: '#ccc', true: '#387CFF' }}
          thumbColor={newSubscription ? '#fff' : '#fff'}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>결제 3일 전</Text>
          <Text style={styles.itemDesc}>정기지출이 결제되기 3일전에{'\n'}미리 알려드려요</Text>
        </View>
        <Switch
          value={threeDaysBefore}
          onValueChange={setThreeDaysBefore}
          trackColor={{ false: '#ccc', true: '#387CFF' }}
          thumbColor={threeDaysBefore ? '#fff' : '#fff'}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>결제 하루 전</Text>
          <Text style={styles.itemDesc}>정기지출이 결제되기 하루 전에{'\n'}미리 알려드려요</Text>
        </View>
        <Switch
          value={oneDayBefore}
          onValueChange={setOneDayBefore}
          trackColor={{ false: '#ccc', true: '#387CFF' }}
          thumbColor={oneDayBefore ? '#fff' : '#fff'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  backButton: {
    paddingVertical: 12,
  },
  
  backIcon: {
    width: 24,
    left: -8,
  },

  header: {
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:20,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionSubText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
    lineHeight: 18,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginTop:2,
  },

  thickdivider:{
    height: 10,
    backgroundColor: '#F2F6FF',
    marginBottom: 24,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 24,
  },
});
