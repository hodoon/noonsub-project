import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Bank = {
  id: string;
  name: string;
  iconUri: string;
};

const TABS = ['카드', '은행', '간편결제'];

const banks: Bank[] = [
  { id: '1', name: '국민카드', iconUri: 'https://cdn.brandfetch.io/kbfg.com/w/512/h/365/symbol?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '2', name: '우리카드', iconUri: 'https://cdn.brandfetch.io/wooribank.com/w/512/h/512/symbol?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '3', name: '하나카드', iconUri: 'https://cdn.brandfetch.io/hanafn.com/w/512/h/466/symbol?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '4', name: '현대카드', iconUri: 'https://cdn.brandfetch.io/hyundaicard.com/w/512/h/102/logo?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '5', name: '삼성카드', iconUri: 'https://cdn.brandfetch.io/samsungcard.com/w/173/h/20/logo?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '6', name: '카카오 뱅크', iconUri: 'https://cdn.brandfetch.io/kakaobank.com/w/512/h/512?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '7', name: '토스뱅크', iconUri: 'https://cdn.brandfetch.io/toss.im/w/400/h/400?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '8', name: 'BC카드', iconUri: 'https://cdn.brandfetch.io/bccard.com/w/512/h/512/logo?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '9', name: 'BC카드', iconUri: 'https://cdn.brandfetch.io/bccard.com/w/512/h/512/logo?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '10', name: 'BC카드', iconUri: 'https://cdn.brandfetch.io/bccard.com/w/512/h/512/logo?c=1idpGsb4ETZFvJ3g2bp' },
  { id: '11', name: 'BC카드', iconUri: 'https://cdn.brandfetch.io/bccard.com/w/512/h/512/logo?c=1idpGsb4ETZFvJ3g2bp' },
];

const RegisterSubscriptionScreen = () => {
  const [activeTab, setActiveTab] = useState('카드');
  const scrollRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    const y = sectionPositions.current[tab];
    if (y !== undefined && scrollRef.current) {
      scrollRef.current.scrollTo({ y, animated: true });
    }
  };

  const onLayoutCapture = (tab: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    sectionPositions.current[tab] = y;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
     <TouchableOpacity
             style={styles.backButton}
             onPress={() => router.push("/home")}
           >
             <Ionicons
               name="chevron-back"
               size={28}
               color="#007AFF"
               style={styles.backIcon}
             />
           </TouchableOpacity>

      {/* Title */}
      <Text style={styles.subtitle}>새로운 구독 등록하기</Text>
      <Text style={styles.title}>어디서 결제 중인{'\n'}구독을 등록할까요?</Text>

      {/* Fixed Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {TABS.map(tab => (
            <TouchableOpacity key={tab} onPress={() => handleTabPress(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scrollable Content */}
      <ScrollView ref={scrollRef} style={styles.scrollContent}>
        <View onLayout={(e) => onLayoutCapture('카드', e)}>
          <Text style={styles.sectionTitle}>카드</Text>
          <FlatList
            data={banks.slice(0, 5)}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.bankItem}>
                <Image source={{ uri: item.iconUri }} style={styles.icon} />
                <Text style={styles.bankName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        <View onLayout={(e) => onLayoutCapture('은행', e)}>
          <Text style={styles.sectionTitle}>은행</Text>
          <FlatList
            data={banks.slice(5, 6)}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.bankItem}>
                <Image source={{ uri: item.iconUri }} style={styles.icon} />
                <Text style={styles.bankName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        <View onLayout={(e) => onLayoutCapture('간편결제', e)}>
          <Text style={styles.sectionTitle}>간편결제</Text>
          <FlatList
            data={banks.slice(6)}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.bankItem}>
                <Image source={{ uri: item.iconUri }} style={styles.icon} />
                <Text style={styles.bankName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterSubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
  },
  subtitle: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  tabsWrapper: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  tabsContainer: {
    marginTop: 24,
    // paddingHorizontal: 120,
    
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    marginHorizontal:50,
    paddingBottom: 12,
  },
  activeTabText: {
    color: '#387CFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 12,
    resizeMode: 'contain',
  },
  bankName: {
    fontSize: 16,
  },
  backButton: {
    paddingVertical: 12,
  },
  backIcon: {
    width: 24,
    marginLeft:16,
  },
});
