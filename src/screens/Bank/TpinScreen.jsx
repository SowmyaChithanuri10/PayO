

import React, { useState } from "react";
import { View, Text, StatusBar,TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "./TpinStyles";
import api from "../../api/axios";
import { SafeAreaView } from 'react-native-safe-area-context';

const TpinScreen = ({ navigation, route }) => {

  const account = String(route?.params?.account || "").trim();
  const bankResponse = route?.params?.bankResponse?._id || {};
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = (num) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = async () => {
  if (pin.length !== 4) {
    alert("Enter 4 digit TPIN");
    return;
  }

  if (!account) {
    alert("Account not found ❌");
    return;
  }

  if (loading) return;

  try {
    setLoading(true);

    const res = await api.post(
      "api/bank/set-tpin",
      {
        // account: account,
        tpin: pin,
        bankId: bankResponse   // ✅ send previous API response also
      }
    );

    console.log("TPIN API RESPONSE:", res.data);

    if (res?.data?.success) {
      alert("TPIN Created Successfully");
      navigation.navigate("BankAddedScreen");
    } else {
      alert("Account not found ❌");
    }

  } catch (err) {
    console.log("TPIN API ERROR:", err?.response?.data || err.message);
    alert("Error saving TPIN");
  } finally {
    setLoading(false);
  }
};
  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        pin.length > index && styles.dotFilled,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* <Text style={{paddingLeft: "30"}}>ACCOUNT: {account}</Text> */}

      <Text style={styles.title}>Create TPIN</Text>
      <Text style={styles.subtitle}>Enter 4-digit secure PIN</Text>

      <View style={styles.dotContainer}>
        {[0, 1, 2, 3].map((i) => renderDot(i))}
      </View>

      <View style={styles.numpad}>

  <View style={styles.row}>
    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(1)}
    >
      <Text style={styles.keyText}>1</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(2)}
    >
      <Text style={styles.keyText}>2</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(3)}
    >
      <Text style={styles.keyText}>3</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.row}>
    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(4)}
    >
      <Text style={styles.keyText}>4</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(5)}
    >
      <Text style={styles.keyText}>5</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(6)}
    >
      <Text style={styles.keyText}>6</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.row}>
    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(7)}
    >
      <Text style={styles.keyText}>7</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(8)}
    >
      <Text style={styles.keyText}>8</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(9)}
    >
      <Text style={styles.keyText}>9</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.row}>
    <View style={styles.keyEmpty} />

    <TouchableOpacity
      style={styles.key}
      onPress={() => handlePress(0)}
    >
      <Text style={styles.keyText}>0</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.key}
      onPress={handleDelete}
    >
      <Text style={styles.keyText}>⌫</Text>
    </TouchableOpacity>
  </View>

</View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Submit"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default TpinScreen;
