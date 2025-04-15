import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Image, Vibration } from 'react-native';
import { Camera, useCameraDevices, CameraPermissionStatus, useCodeScanner, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import PermissionsPage from './permissionPage';
import NoCameraDeviceError from './NoCameraDeviceError';
import Input from '../../coponents/input';
import CustomCheckbox from '../../coponents/checkbox';
import Button from '../../coponents/button';

const QRScannerScreen: React.FC = () => {

  type Item = {
    phone_number: string;
    amount: string;
  }
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [vendor, setVendor] = useState("")
  const [item, setItem] = useState<Item>({
    phone_number: "",
    amount: "",
    // confirm_password: ""
  })
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()

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



  if (!hasPermission) return <PermissionsPage />
  if (device == null) return <NoCameraDeviceError />

  const handleChange = (key: keyof Item, value: string) => {
    setItem(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const submit = async () => {
    try {
      if (!item.phone_number || !item.amount) {
        setErrorMessage("Please fill out all fields.");
        return;
      }
      setLoading(true); // Start loading

      const response = await fetch('/wallet/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setShow(false)
    } catch (error: any) {
        setErrorMessage(error.message);
    } finally {
      setLoading(false); 
    }
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
            onChangeText={(text: string) => handleChange("phone_number", text)}
            keyboard="numeric"
          />
          <CustomCheckbox title='Use a different Number' checked={checked} setChecked={() => setChecked(!checked)} />
          {errorMessage !== '' && (
            <View className="bg-red-500 p-2 rounded-md mb-4">
              <Text className="text-white text-center">{errorMessage}</Text>
            </View>
          )}
          <Button title="Pay" handleLogin={() => submit()} />
          <Text className='text-red-500 text-center capitalize mt-10'>{vendor}</Text>
        </View>
      </View>}
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
