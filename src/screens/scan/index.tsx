import React from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScanScreen = () => {
  const onSuccess = (e: { data: string }) => {
    Alert.alert("QR Code Scanned", e.data, [
      {
        text: "Open Link",
        onPress: () => Linking.openURL(e.data),
      },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker
        topContent={<Text style={styles.centerText}>Scan a QR Code</Text>}
        bottomContent={<Text style={styles.bottomText}>Align the QR inside the frame</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#000',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 16,
    padding: 20,
    color: '#777',
    textAlign: 'center',
  },
});

export default QRScanScreen;
