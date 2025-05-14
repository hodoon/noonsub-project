import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

const payments = [
  {
    id: '1',
    bank: '네이버 페이',
    logoUri: 'https://cdn.brandfetch.io/naver.com/w/512/h/512?c=1idpGsb4ETZFvJ3g2bp',
  },
  {
    id: '2',
    bank: '토스 페이',
    logoUri: 'https://cdn.brandfetch.io/toss.im/w/400/h/400?c=1idpGsb4ETZFvJ3g2bp',
  },
];

const PayItem = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.logoUri }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.bank}>{item.bank}{item.type ? ` - ${item.type}` : ''}</Text>
      </View>
    </TouchableOpacity>
  );

  const router = useRouter();
  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>내 간편 결제</Text>
      <Text style={styles.subtitle}>{payments.length}개의 간편 결제가 등록되었어요</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>새로운 간편 결제 등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  list: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 50,
  },
  info: {
    flex: 1,
  },
  bank: {
    fontSize: 16,
    fontWeight: '500',
  },
  registerButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#EEF3FF',
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PayItem;