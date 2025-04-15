import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Image, Vibration } from 'react-native';
import { Camera, useCameraDevices, CameraPermissionStatus, useCodeScanner, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import PermissionsPage from './permissionPage';
import NoCameraDeviceError from './NoCameraDeviceError';
import Input from '../../coponents/input';
import CustomCheckbox from '../../coponents/checkbox';
import Button from '../../coponents/button';
import AlertContainer from '../../coponents/alert';
import { authorizedFetch } from '../../utility/authorisedFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OverlayLoader from '../../coponents/Loader';

const QRScannerScreen: React.FC = () => {
  const { hasPermission } = useCameraPermission()
  const device = useCameraDevice('back') // <- Always call this
  type Item = {
    phone_number: string | null;
    amount: string;
  }
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [vendor, setVendor] = useState("")
  const [item, setItem] = useState<Item>({
    phone_number: null,
    amount: "",

  })

  const submitForm = async () => {
    try {
      setLoading(true)
      const data = {
        phone_number: item.phone_number,
        amount: item.amount
      };

      const res = await authorizedFetch('https://api.marapesa.com/api/wallet/pay', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setLoading(false)
      setShow(false)
      setItem({
        phone_number: null,
        amount: "",
      })
      console.log('Login response:', res);
    } catch (err) {
      setLoading(false)
      setShow(false)
      console.error('Login error:', err);
    }
  };
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      Vibration.vibrate(500)
      setShow(true)
      let url: string | any = codes[0].value
      const lastSegment: any = url.split('/').pop();
      setVendor(lastSegment.replace(/-/g, ' '))

    }
  })



  // if (!hasPermission) return <PermissionsPage />
  // if (device == null) return <NoCameraDeviceError />

  const handleChange = (key: keyof Item, value: string) => {
    setItem(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (

    <View className={`flex-1 relative items-center z-10 justify-center ${show ? "bg-black-200" : "bg-black-50"} `}>
      {loading && <OverlayLoader />}

      <Camera
        style={{ width: 200, height: 200 }}
        device={device}
        codeScanner={codeScanner}
        isActive={true}
      />
      {show && <View className=" absolute object-contain bg-black-50  self-center z-20  w-3/4 rounded-md p-4">

        <View className="flex-1 w-full py-10">
          {checked && <Input
            label="Phone Number"
            placeholder="Phone number"
            value={item.phone_number}
            onChangeText={(text: string) => handleChange("phone_number", text)}
            keyboard="numeric"
          />}
          <Input
            label="amount"
            placeholder="Amount"
            value={item.amount}
            onChangeText={(text: string) => handleChange("amount", text)}
            keyboard="numeric"
          />
          <CustomCheckbox title='Use a different Number' checked={checked} setChecked={() => setChecked(!checked)} />
          {errorMessage !== '' && (
            <AlertContainer msg={errorMessage} state="error" />
          )}
          <Button title="Pay" handleLogin={() => submitForm()} />
          <Text className='text-red-500 text-center capitalize mt-10'>{vendor}</Text>
        </View>
      </View>}
      {/* <View className=" absolute  bottom-[10%]  items-center flex h-10  w-1/2 py-2">
        <Text className='text-gold-300'>Error</Text>
      </View> */}
      <Image
        className=" absolute object-contain  self-center z-10 size-48 rounded-md p-4"
        source={require('./../../assets/logo.png')}
        resizeMode="cover" // or 'contain', 'stretch'
      />
      {!show && <View className='absolute bottom-10 self-center bg-black-50 rounded-md p-4 ' >
        <Text
          className='font-bold text-md text-white'
        >Scan a QR code</Text>
      </View>}
    </View>
  );
};






export default QRScannerScreen;
