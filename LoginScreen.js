import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState(""); //email bilgilerini tuttuk
  const [password, setPassword] = useState(""); //password bilgilerini tuttuk

  const navigation = useNavigation();
  //kullanıcı kayıtlıysa ve login olduysa Home ekranına yönlendirme yapıyor
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            navigation.navigate('Home');
        }
    })
  })

  //kullanıcının kayıt olmasını sağlıyoruz
  const handleSignUp = () => {
    //handleSignUp adında bir sabit bir fonksiyon tanımlanır
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        //Kullanıcı başarıyla kaydolduğunda, bu satırda verilen işlevi çalıştırır.
        const user = userCredentials.user; //Bu satır, userCredentials içinden user adında bir nesneyi çıkarır. Bu kullanıcı bilgilerini temsil eder.
        console.log("Kullanıcı ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  //kullanıcı eğer kayıtlıysa giriş yapıyor
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user; //Bu satır, userCredentials içinden user adında bir nesneyi çıkarır. Bu kullanıcı bilgilerini temsil eder.
        console.log("Kullanıcı giriş yaptı ", user.email);
      })
      .catch((error) => alert(error.message));
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)} // email text kaydedildi
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={(text) => setPassword(text)} // password text kaydedildi
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.outlineButton]}
        >
          <Text style={styles.outlineButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 15,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  outlineButton: {
    backgroundColor: "white",
    marginTop: 10,
  },
  outlineButtonText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
});
