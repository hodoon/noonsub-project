import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import ProgressRing from "@/components/ProgressRing";

export default function HomeScreen() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([
    {
      name: "넷플릭스",
      price: 13500,
      cycle: "1달",
      remaining: "1일 뒤",
      imageUrl:
        "https://cdn.brandfetch.io/netflix.com/w/400/h/400?c=1idvtb1T9J7e9VVLZVo",
    },
    {
      name: "YouTube Premium",
      price: 14900,
      cycle: "1달",
      remaining: "2일 뒤",
      imageUrl:
        "https://cdn.brandfetch.io/youtube.com/w/400/h/400?c=1idvtb1T9J7e9VVLZVo",
    },
    {
      name: "Apple",
      price: 3300,
      cycle: "1달",
      remaining: "4월 8일",
      imageUrl:
        "https://cdn.brandfetch.io/appletvapp.apple/w/400/h/400?c=1idvtb1T9J7e9VVLZVo",
    },
    {
      name: "애플TV",
      price: 12300,
      cycle: "1달",
      remaining: "6월 8일",
      imageUrl:
        "https://cdn.brandfetch.io/appletvplus.com/w/400/h/400?c=1idvtb1T9J7e9VVLZVo",
    },
    {
      name: "라이엇",
      price: 3500,
      cycle: "1달",
      remaining: "6월 10일",
      imageUrl:
        "https://cdn.brandfetch.io/riotgames.com/w/400/h/400?c=1idvtb1T9J7e9VVLZVo",
    },
  ]);

  const totalPrice = subscriptions.reduce((sum, item) => sum + item.price, 0);
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const carrierOptions = ["카드 연동하기", "직적입력하기"];
  const [carrier, setCarrier] = useState("");

  const handleAddSubscription = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: any } };
  }) => {
    const y = event.nativeEvent.contentOffset.y;

    Animated.timing(buttonTranslateY, {
      toValue: y > 10 ? -10 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profile}

          onPress={() => router.push("./menu/mypage")}

          onPress={() => router.push("./menu/menu")}

        >
          <Image
            source={require("../../assets/images/profile.png")}
            style={styles.avatar}
          />
          <Text style={styles.headerText}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/notification/notification")}
        >
          <Ionicons name="notifications-outline" size={24} color="#387CFF" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <Image

          // source={{
          //   uri: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
          // }}
          source={require("../../assets/images/card.png")}

          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
          }}

          // source={require('../../assets/images/card3D.jpg')}
          style={styles.cardImage}
        />

        <Text style={styles.mainTitle}>다음 OTT{"\n"}결제일이 언제더라?</Text>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/create/RegisterSubscriptionScreen")}
        >
          <Text style={styles.registerButtonText}>은행계좌 등록</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.monthBadge}>
                <ProgressRing progress={0.3} text="5월" />
              </View>
              <Text style={styles.spendingText}>
                <Text style={{ color: "#387CFF" }}> 결제완료 13,500원</Text> /
                43,200원
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </View>
            <View style={styles.divider} />

            <View style={styles.summaryButtons}>
              {[
                {
                  label: "내 마음대로\n직접 등록하기",
                  icon: <FontAwesome name="edit" size={24} color="#007AFF" />,
                },
                {
                  label: "결제 전에\n미리 알림",
                  icon: <FontAwesome name="bell" size={24} color="#007AFF" />,
                },
                {
                  label: "간편하게\n해지하기",
                  icon: (
                    <FontAwesome5 name="scissors" size={24} color="#007AFF" />
                  ),
                },
                {
                  label: "내 구독\n한눈에 보기",
                  icon: <FontAwesome name="eye" size={24} color="#007AFF" />,
                },
                {
                  label: "결제 기록에서\n한번에 찾기",
                  icon: (
                    <FontAwesome5
                      name="file-invoice-dollar"
                      size={24}
                      color="#007AFF"
                    />
                  ),
                },
              ].map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.circleButton}>
                  <View style={styles.circleIcon}>{item.icon}</View>
                  <Text style={styles.circleLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>내 구독</Text>
            <Text style={styles.totalAmount}>
              총 {totalPrice.toLocaleString()}원
            </Text>
          </View>

          {subscriptions.length > 0 ? (
            subscriptions.map((item, index) => {
              const handleDelete = () => {
                const updated = [...subscriptions];
                updated.splice(index, 1);
                setSubscriptions(updated);
              };

              const renderRightActions = () => (
                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>해지</Text>
                </TouchableOpacity>
              );

              return (
                <Swipeable
                  key={index}
                  renderRightActions={renderRightActions}
                  overshootRight={false}
                >
                  <View style={styles.subscriptionItem}>
                    <View style={styles.subscriptionInfo}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.subscriptionIcon}
                      />
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
                </Swipeable>
              );
            })
          ) : (
            <TouchableOpacity
              style={styles.emptyBox}
              onPress={handleAddSubscription}
            >
              <Text style={styles.emptyText}>등록된 구독이 없어요</Text>
              <Text style={styles.emptySubText}>눌러서 구독 추가</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <Animated.View
        style={[
          styles.addButtonContainer,
          { transform: [{ translateY: buttonTranslateY }] },
        ]}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddSubscription}
        >
          <Text style={styles.addButtonText}>+ 구독 추가</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 하단 모달 */}
      {isModalVisible && (
        <Modal
          transparent
          visible
          animationType="none"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.modalTitle}>
              새로운 카드를 어떻게 추가할까요?
            </Text>

            {carrierOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItemRow}
                onPress={() => {
                  setCarrier(item);
                  closeModal();

                  // 경로에 따라 라우팅
                  if (item === "카드 연동하기") {
                    router.push("/create/RegisterSubscriptionScreen");
                  } else if (item === "직적입력하기") {
                    router.push("/create/addsub");
                  }
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
                {carrier === item && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Modal>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardImage: {
    width: 140,
    height: 110,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    lineHeight: 30,
  },
  registerButton: {
    alignSelf: "center",
    backgroundColor: "#EEF3FF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  registerButtonText: {
    color: "#387CFF",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: "#F7F9FD",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  monthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },

  spendingText: {
    fontSize: 16,
    color: "#666",
    // flex: 1,
    fontWeight: "600",
    left: -5,
  },
  divider: {
    height: 2,
    backgroundColor: "#eee",
    marginBottom: 24,
  },

  summaryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  circleButton: {
    width: "18%",
    alignItems: "center",
    marginBottom: 12,
  },
  circleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2, // 테두리 두께
    borderColor: "#007AFF", // 원하는 테두리 색
    backgroundColor: "transparent", // 배경 투명
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  circleLabel: {
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },

  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  totalAmount: {
    color: "#999",
    fontSize: 13,
  },
  subscriptionItem: {
    backgroundColor: "#7EACFF1A",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subscriptionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    marginRight: 12,
  },
  subscriptionName: {
    fontWeight: "600",
    fontSize: 15,
  },
  subscriptionDetail: {
    color: "#666",
    fontSize: 13,
  },
  dateBadge: {
    backgroundColor: "#E0EBFF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dateBadgeText: {
    fontSize: 12,
    color: "#387CFF",
    fontWeight: "600",
  },
  emptyBox: {
    backgroundColor: "#EEF3FF",
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 4,
  },
  emptySubText: {
    color: "#A3A3A3",
    fontSize: 13,
  },
  addButtonContainer: {
    position: "absolute",
    bottom:0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#72A9FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 26,
    shadowColor: "#387CFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FF5B5B",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 50,
    marginBottom: 12,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  modalItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  modalItemText: {
    fontSize: 15,
    color: "#333",
  },
  subscriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
});
