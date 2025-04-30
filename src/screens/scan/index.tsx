import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Image, Vibration } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import PermissionsPage from './permissionPage';
import NoCameraDeviceError from './NoCameraDeviceError';
import Input from '../../coponents/input';
import CustomCheckbox from '../../coponents/checkbox';
import Button from '../../coponents/button';
import AlertContainer from '../../coponents/alert';
import { authorizedFetch } from '../../utility/authorisedFetch';
import OverlayLoader from '../../coponents/Loader';
import { Item } from '../../../types';
import { API_URL } from '@env';

const QRScannerScreen: React.FC = () => {


  // const { hasPermission } = useCameraPermission()
  // const device = useCameraDevice("back")
  const devices = Camera.getAvailableCameraDevices()
  console.log(devices)
  const device = devices.filter(d => d.position === 'back')[0] || null
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [vendor, setVendor] = useState('');
  const [item, setItem] = useState<Item>({
    phone_number: null,
    amount: '',
    to: "",
  });

  const isScanning = useRef(false); // 👈 prevent duplicate scans

  const submitForm = async () => {
    try {
      setLoading(true);
      if (item.amount === "") {
        setErrorMessage("Kindly enter amount")
        setLoading(false)
        return
      }
      const data = {
        phone_number: item.phone_number,
        amount: item.amount,
        to: vendor
      };
      const res = await authorizedFetch(`${API_URL}/api/stk/pay`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setLoading(false);
      setShow(false);
      setItem({ phone_number: null, amount: '', to: '' });
      console.log('Payment response:', res);
    } catch (err) {
      setLoading(false);
      setShow(false);
      console.error('Payment error:', err);
    }
  };
  function getDomain(url: any) {
    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
    return match ? match[1] : null;
  }
  const codeScanner = useCodeScanner({

    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {

      if (isScanning.current) return; // 👈 prevent re-trigger
      const url: any = codes?.[0]?.value;
      const domain = getDomain(`${url}`);
      if (!url) return;
      isScanning.current = true;
      setTimeout(() => {
        if (domain !== "marapesa.com") {
          setCodeError(true)
          setErrorMessage("wrong QR")
          Vibration.vibrate(500);
          return
        }
        Vibration.vibrate(500);
        setShow(true);
      }, 2000);
      const lastSegment = url.split('/').pop();
      setVendor(lastSegment?.replace(/-/g, ' ') ?? '');
      setCodeError(false)
      // Optional cooldown before allowing next scan
      setTimeout(() => {
        isScanning.current = false;
      }, 3000);
    },
  });
  const handleChange = (key: keyof Item, value: string) => {
    setItem(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);
  useEffect(() => {
    (async () => {
      let status = await Camera.getCameraPermissionStatus();

      if (status !== 'granted') {
        status = await Camera.requestCameraPermission();
      }

      if (status === 'denied') {
        // show a prompt or navigate away
        console.warn('Camera permission denied');
      }
    })();
  }, []);

  // if (hasPermission === false) {
  //   return <PermissionsPage />;
  // }

  if (!device) {
    return <NoCameraDeviceError />;
  }




  return (
    <View className={`flex-1 relative items-center justify-center ${show ? 'bg-black-200' : 'bg-black-50'}`}>
      {loading && <OverlayLoader />}
      {codeError && errorMessage !== "" && <AlertContainer msg={errorMessage} state="error" />}
      <View className="w-1/2 self-center  ">
      
      </View>
      <Camera
        style={{ width: 200, height: 200 }}
        device={device}
        codeScanner={codeScanner}
        isActive={!loading}
      />

      {show && (
        <View className="absolute z-20 w-3/4 self-center bg-black-50 rounded-md p-4">
          <View className="flex-1 w-full py-10">
            <AlertContainer msg={errorMessage} state="error" />
            {checked && (
              <Input
                label="Phone Number"
                placeholder="Phone number"
                value={item.phone_number}
                onChangeText={(text: string) => handleChange('phone_number', text)}
                keyboardType="numeric"
              />
            )}
            <Input
              label="Amount"
              placeholder="Amount"
              value={item.amount}
              onChangeText={(text: string) => handleChange('amount', text)}
              keyboardType="numeric"
            />
            <CustomCheckbox title="Use a different Number" checked={checked} setChecked={() => setChecked(!checked)} />
            {errorMessage !== '' && <AlertContainer msg={errorMessage} state="error" />}
            <Button title="Pay" handleLogin={submitForm} />
            <Text className="text-red-500 text-center capitalize mt-10">{vendor.split('').reverse().join('')}</Text>
          </View>
        </View>
      )}

      <Image
        className="absolute z-10 self-center size-48 rounded-md p-4"
        source={require('./../../assets/logo.png')}
        resizeMode="cover"
      />
      {!show && (
        <View className="absolute bottom-10 self-center bg-black-50 rounded-md p-4">
          <Text className="font-bold text-md text-white">Scan a QR code</Text>
        </View>
      )}
    </View>
  );
};

export default QRScannerScreen;
