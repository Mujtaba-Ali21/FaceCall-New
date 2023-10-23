import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";


const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    setDropdownVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>FaceCall</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <MaterialCommunityIcons name="dots-vertical" size={21} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {dropdownVisible && (
        <>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.dropdownOption}>
              <Text style={styles.dropdownOptionText}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.dropdownContainerBorder}> 
            
          </View>
        </>
      )}
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008DFE",
    paddingTop: 15,
    paddingBottom: 15,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },

  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginLeft: 20,
  },

  dropdownContainer: {
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "flex-end",
    width: 85,
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 40,
    position: "absolute",
    bottom: 4, 
  },

  dropdownContainerBorder: {
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "flex-end",
    width: 15,
    borderBottomEndRadius: 10,
    paddingVertical: 6,
    marginRight: 30,
    position: "absolute",
    bottom: 20,
  },
  
  dropdownOption: {
    paddingVertical: 8,
  },
  
  dropdownOptionText: {
    fontSize: 16,
    color: "black",
  },
  
});

export default Header;
