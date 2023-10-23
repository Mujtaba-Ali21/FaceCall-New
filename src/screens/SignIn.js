import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";

import { Picker } from "@react-native-picker/picker";

import countries from "../assets/countries.json";
import { rules } from "../assets/rules.js";

import auth from "@react-native-firebase/auth";

const SignIn = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);

  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const [error, setError] = useState("");

  const handleCountryChange = (itemValue) => {
    const country = countries.find((c) => c.name === itemValue);
    setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setPhoneNumber(numericValue);
    const isValid = numericValue.length >= 7;
    setPhoneNumberIsValid(isValid);
    setError(isValid ? "" : "Please enter a valid phone number.");
  };

  const signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(selectedCountry.code + phoneNumber);
    console.log(confirmation);
    console.log('done');
  };

  return (
    <View style={styles.loginContainer}>
     
      <Image
        source={require("../../assets/facecall-img.jpeg")}
        style={styles.welcomeImage}
      />

      <Text style={styles.welcomeText}>Enter Your Phone Number</Text>

      <Text style={{ color: "red" }}>{error}</Text>

      <View style={styles.phoneContainer}>
        <View style={styles.countryContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.countryPicker}
              selectedValue={selectedCountry.name}
              onValueChange={handleCountryChange}
            >
              {countries.map((country) => (
                <Picker.Item
                  key={country.name}
                  label={country.code + "  |  " + country.name}
                  value={country.name}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>{selectedCountry.code}</Text>
          <TextInput
            style={styles.countryCodeInput}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            maxLength={15}
            minLength={7}
            onChangeText={handlePhoneNumberChange}
          />
        </View>
      </View>

      <View style={styles.submitBtn}>
        <Button
          title="Send Code"
          disabled={rules.disableBtn(phoneNumber)}
          onPress={() => {
            signInWithPhoneNumber()
          }}
        />
      </View>

      {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.countryCodeInput}
            placeholder="Enter Code"
            keyboardType="numeric"
            maxLength={6}
            minLength={6}
            onChangeText={setCode}
          />
        </View>
        <View style={styles.submitBtn}>
          <Button
            title={code.length != 6 ? "OPT Must be 6 Digits" : "Confirm Code"}
            disabled={code.length != 6}
            onPress={confirmCode}
          />
        </View> 
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  welcomeImage: {
    width: 280,
    height: 280,
    resizeMode: "cover",
  },

  phoneContainer: {
    width: 250,
    alignItems: "center",
  },

  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  pickerContainer: {
    flex: 2,
    marginRight: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#0093FE",
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 20,
  },

  countryCode: {
    color: "gray",
    fontSize: 18,
    marginRight: 5,
    paddingRight: 5,
    borderRightWidth: 1,
    borderRightColor: "gray",
  },

  countryCodeInput: {
    color: "gray",
    fontSize: 18,
    flex: 1,
  },

  submitBtn: {
    width: 150,
  },
});

export default SignIn;
