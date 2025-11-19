import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { clearSession, getSession } from '../utils/storage';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    setCurrentUser(session);

    const unsubscribe = firestore()
      .collection('mahasiswa')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMahasiswa(data);
      });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth().signOut();
    clearSession();
  };

  const renderMahasiswaCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.nama?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.nama}</Text>
          <Text style={styles.cardNim}>NIM: {item.nim}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.jurusan}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header dengan Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Halo, Selamat Datang!</Text>
            <Text style={styles.email}>{currentUser?.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>Daftar Mahasiswa</Text>
        <Text style={styles.sectionSubtitle}>Total: {mahasiswa.length} mahasiswa</Text>
      </View>

      {/* List Mahasiswa */}
      <FlatList
        data={mahasiswa}
        keyExtractor={item => item.id}
        renderItem={renderMahasiswaCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  titleSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  cardNim: {
    fontSize: 14,
    color: '#666',
  },
  cardBody: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#e8eaf6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
});