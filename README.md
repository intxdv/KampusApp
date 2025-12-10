# KampusApp

Aplikasi mobile sederhana untuk mahasiswa yang dibangun menggunakan **React Native** dan **Firebase**. Aplikasi ini memiliki fitur autentikasi (Login & Register) dan halaman utama.

## Fitur

- **Autentikasi**: Login dan Register menggunakan Email & Password.
- **Database**: Menyimpan data mahasiswa di Cloud Firestore.
- **Navigasi**: Menggunakan React Navigation untuk perpindahan antar layar.

## Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:

- Node.js
- React Native CLI
- Android Studio (untuk Android)
- Xcode (untuk iOS, hanya macOS)
- Java Development Kit (JDK)

## Konfigurasi Firebase (PENTING)

Project ini menggunakan Firebase untuk backend. Karena file konfigurasi Firebase bersifat rahasia, file tersebut **tidak disertakan** dalam repository ini. Anda perlu membuat project Firebase Anda sendiri.

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/).
2. Buat project baru.

### 2. Aktifkan Layanan
1. Masuk ke menu **Authentication** -> **Sign-in method** -> Aktifkan **Email/Password**.
2. Masuk ke menu **Firestore Database** -> **Create Database**.

### 3. Konfigurasi Android
1. Di dashboard Firebase, klik ikon **Android** untuk menambahkan aplikasi Android.
2. Masukkan package name: `com.kampusapp` (sesuaikan dengan `android/app/build.gradle` jika Anda mengubahnya).
3. Download file `google-services.json`.
4. Letakkan file tersebut di folder:
   ```
   android/app/google-services.json
   ```

### 4. Konfigurasi iOS (Opsional)
1. Di dashboard Firebase, klik ikon **iOS** untuk menambahkan aplikasi iOS.
2. Masukkan Bundle ID.
3. Download file `GoogleService-Info.plist`.
4. Buka project `ios/KampusApp.xcodeproj` di Xcode.
5. Klik kanan pada folder `KampusApp` di sidebar kiri -> **Add Files to "KampusApp"**.
6. Pilih file `GoogleService-Info.plist` yang sudah didownload.

## Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

2. **Jalankan Metro Server**
   ```bash
   npm start
   ```

3. **Jalankan di Android**
   ```bash
   npm run android
   ```

4. **Jalankan di iOS** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

## Struktur Folder

- `screens/`: Berisi halaman-halaman aplikasi (Login, Register, Home).
- `utils/`: Berisi fungsi utilitas (seperti penyimpanan sesi).
- `android/`: Native code untuk Android.
- `ios/`: Native code untuk iOS.

## Catatan Keamanan

File `google-services.json` dan `GoogleService-Info.plist` telah ditambahkan ke `.gitignore` untuk mencegah kebocoran kredensial. Jangan pernah meng-commit file-file ini ke repository publik.
