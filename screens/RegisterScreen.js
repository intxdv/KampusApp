import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setSession } from '../utils/storage';
import LinearGradient from 'react-native-linear-gradient';

export default function RegisterScreen({ navigation }) {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nama || !nim || !jurusan || !email || !password) {
      return Alert.alert('Error', 'Mohon isi semua kolom!');
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firestore().collection('mahasiswa').doc(user.uid).set({
        nama: nama,
        nim: nim,
        jurusan: jurusan,
        email: email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setSession({ 
        uid: user.uid, 
        email: user.email,
        nama: nama
      });

      Alert.alert('Sukses', 'Akun berhasil dibuat!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Gagal', 'Email sudah terdaftar!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Gagal', 'Format email salah!');
      } else {
        Alert.alert('Gagal', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#f093fb', '#f5576c']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Kembali</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Daftar Akun</Text>
          <Text style={styles.subtitle}>Buat akun mahasiswa baru</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            placeholderTextColor="#999"
            value={nama}
            onChangeText={setNama}
          />
          
          <TextInput
            style={styles.input}
            placeholder="NIM"
            placeholderTextColor="#999"
            value={nim}
            onChangeText={setNim}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Jurusan"
            placeholderTextColor="#999"
            value={jurusan}
            onChangeText={setJurusan}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Login di sini</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#f5576c',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#f5576c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});