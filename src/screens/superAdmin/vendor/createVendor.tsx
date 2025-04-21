import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { User } from '../../../../types';
import { InputContainer } from '../../../coponents/input';
import SelectInput from '../../../coponents/selectInput';
import { requestLocationPermission } from '../../../../App';
const AddProductScreen = () => {
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState('');
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const [item, setItem] = useState({
        confirm_password: "",
        vendorName: "",
        fullname: "",
        role: "admin",
        ID_No: "",
        business: "",
        phone_number: "",
        password: "",
        username: "",
        lat: "",
        lng: "",

    })
    const { confirm_password,
        vendorName,
        fullname,
        role,
        ID_No,
        business,
        phone_number,
        password,
        username,
        lat,
        lng, } = item

    const handleChange = (key: keyof User, value: string) => {
        // setMsg({ msg: "", state: "" });

        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = () => {

        try {
            console.log(item)
        } catch (error) {

        }


    };
    useEffect(() => {
        if (useCurrentLocation) {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    setItem(prev => ({
                        ...prev,
                        lat: latitude.toString(),
                        lng: longitude.toString()

                    }));

                },
                error => {
                    console.warn(error.message);
                    requestLocationPermission()
                    // Alert.alert('Location Error', error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }, [useCurrentLocation]);
    
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position: any) => {
                console.log(position)
                // setItem({
                //   lat: position?.coords?.latitude,
                //   lng: position?.coords?.longitude,
                // //   latitudeDelta: 0.0001,
                // //   longitudeDelta: 0.001,
                // });
            },
            (error: any) => {
                Alert.alert('Error', `Error: ${JSON.stringify(error)}`);
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
        );
        return () => { };
    }, []);
    return (
        <KeyboardAvoidingView
            className="flex-1   bg-black-50  py-14"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView className="px-4  pt-6">
                <InputContainer value={fullname} onchange={(e: any) => handleChange("fullname", e)} placeholder="Business Owner's Name" />
                <InputContainer value={ID_No} onchange={(e: any) => handleChange("ID_No", e)} placeholder="Business Owner's Identification Number" />
                <InputContainer value={phone_number} onchange={(e: any) => handleChange("phone_number", e)} placeholder="Business Owner's Phone Number" />
                <InputContainer value={username} onchange={(e: any) => handleChange("username", e)} placeholder="Business Owner's username" />
                {/* <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                    className="mb-4 border border-green-600 rounded-xl py-3"
                >
                    <Text className="text-center text-green-600 font-medium">
                        {useCurrentLocation ? 'Switch to Manual Location' : 'Use My Current Location'}
                    </Text>
                </TouchableOpacity>
                <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lat} latlng="yes" onchange={(e: any) => handleChange("lat", e)} multiline={true} placeholder="latitude" />
                <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lng} latlng="yes" onchange={(e: any) => handleChange("lng", e)} multiline={true} placeholder="longitude" /> */}

                <View className="flex">
                    <View className="flex flex-row items-center">
                        <View className="flex w-[20%] ">
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                                className=" "
                            >
                                <Text className="text-center text-green-600 font-medium">
                                    T
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex w-[80%]"><InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lat} latlng="yes" onchange={(e: any) => handleChange("lat", e)} multiline={true} placeholder="latitude" /></View>

                    </View>
                    <View className="flex">
                        <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lng} latlng="yes" onchange={(e: any) => handleChange("lng", e)} multiline={true} placeholder="longitude" />
                    </View>
                </View>

                {/* <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)} className={`border border-gray-300 flex items-center justify-center rounded-xl px-4 py-3 mb-4 text-base `}>
                    <Icon name="camera" className='pr-1 text-scondary' size={26} color="#3fa41a" />
                </TouchableOpacity> */}

                {/* <Button title="Submit Product" submit={handleSubmit} /> */}
                <SelectInput
                    label="Select business category"
                    value={business}
                    onChange={(e: any) => handleChange("business", e)}
                    options={[
                        { label: 'Cosmetics', value: 'Cosmetics' },
                        { label: 'Agriculture', value: 'Agriculture' },
                        { label: 'Stationaries', value: 'Stationaries' },
                    ]}
                />
                <InputContainer value={vendorName} onchange={(e: any) => handleChange("vendorName", e)} placeholder="Name of business" />
                <InputContainer value={password} onchange={(e: any) => handleChange("password", e)} placeholder="Password" />
                <InputContainer value={confirm_password} onchange={(e: any) => handleChange("confirm_password", e)} placeholder="confirm password" />
                <TouchableOpacity activeOpacity={1}
                    className="bg-gold-500 py-3 rounded-xl"
                    onPress={handleSubmit}
                >
                    <Text className="text-center tracking-widest uppercase font-bold text-primary-700 font-semibold text-lg">
                        Submit
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            {/* <CameraModal visible={visible} setVisible={() => setVisible(!visible)} /> */}
        </KeyboardAvoidingView>
    );
};

export default AddProductScreen;
