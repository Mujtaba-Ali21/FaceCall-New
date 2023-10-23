import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const OTPInput = ({ navigation, route }) => {
  const [otpValue, setOtpValue] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const { verificationId } = route.params;
  const inputRefs = useRef([]);

  let codeCount = 6;

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedOtpValue = otpValue.split("");
      updatedOtpValue[index] = value;
      setOtpValue(updatedOtpValue.join(""));

      if (value && index < codeCount - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (index) => {
    setFocusedInput(index);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handleOTPVerification = () => {
    if (otpValue.length === codeCount) {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otpValue
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          Alert.alert("Success", "OTP Verification Successful");
        })
        .catch((error) => {
          console.log("Error during OTP verification:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the Verification Code</Text>
      <Text style={styles.subtitle}>
        A {codeCount}-digit code has been sent to your phone
      </Text>
      <View style={styles.otpContainer}>
        {Array(codeCount)
          .fill()
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                focusedInput === index && styles.otpInputFocused,
              ]}
              value={otpValue[index] || ""}
              onChangeText={(text) => handleChange(index, text)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, nativeEvent.key)
              }
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
      </View>
      <Button
        title="Verify OTP"
        onPress={handleOTPVerification}
        style={styles.verifyButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 5,
    borderColor: "#ccc",
  },
  otpInputFocused: {
    borderColor: "#4CAF50",
  },
  verifyButton: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default OTPInput;
