import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import userIcon from "../../assets/user-icon.png";

const Chat = ({ user }) => {
  const DATA = [
    {
      id: 1,
      name: "Mujtaba",
      photos: userIcon,
      lastMessage: "Noice",
      time: "10:00 AM",
      totalUnread: 1,
    },
    {
      id: 2,
      name: "Cool Dog",
      photos: userIcon,
      lastMessage: "Whoof! Whoof!",
      time: "2:00 AM",
      totalUnread: 2,
    },
    {
      id: 3,
      name: "Alice",
      photos: userIcon,
      lastMessage: "Hey, how are you?",
      time: "12:30 PM",
      totalUnread: 0,
    },
    {
      id: 4,
      name: "Bob",
      photos: userIcon,
      lastMessage: "See you later!",
      time: "6:45 PM",
      totalUnread: 3,
    },
    {
      id: 5,
      name: "Emily",
      photos: userIcon,
      lastMessage: "I'm excited for the concert!",
      time: "9:15 AM",
      totalUnread: 0,
    },
  ];

  const [chatData, setChatData] = useState(DATA);

  useEffect(() => {
    setChatData(DATA);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.chatContainer}>
            <Image source={item.picture} style={styles.image} />
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <View style={styles.chatInfo}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                </View>
                <View>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  {item.totalUnread > 0 && (
                    <View style={styles.unreadContainer}>
                      <Text style={styles.totalUnread}>{item.totalUnread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chatContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },

  image: {
    width: 50,
    height: 50,
    backgroundColor: "#128C7E",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  chatContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },

  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },

  chatName: {
    fontSize: 16,
    marginRight: 8,
  },

  lastMessage: {
    fontSize: 12,
    marginTop: 10,
    color: "#555555",
  },

  unreadContainer: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#0A298F',
    alignItems: "center",
    justifyContent: 'center',
    marginStart: 30,
    marginTop: 12
  },

  totalUnread: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600'
  },

  chatTime: {
    fontSize: 12,
    marginTop: 3,
    color: "gray",
  },
});