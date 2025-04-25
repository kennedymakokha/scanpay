import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { User } from '../../../../types';
import { InputContainer } from '../../../coponents/input';
import SelectInput from '../../../coponents/selectInput';

import { useRegistervendorMutation } from '../../../services/CategoryApi';
import AlertContainer from '../../../coponents/alert';

import { toDropdownOptions } from '../../../utility/selectoptions';
import OverlayLoader from '../../../coponents/Loader';
import { useGetbusinessQuery } from '../../../services/businessApi';
import { requestLocationPermission } from '../../../utility/locationPermisionRequest';
import { authorizedFetch } from '../../../utility/authorisedFetch';
import { API_URL } from '@env';
const AddProductScreen = () => {
    const initialitem = {
        confirm_password: "",
        vendorName: "",
        fullname: "",
        role: "admin",
        ID_No: "",
        business: "68049ab92eef9ba9cf2761f6",
        phone_number: "",
        password: "",
        username: "",
        lat: "",
        lng: "",

    }
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState('');
    const { data, error: Er, isError: Er11 } = useGetbusinessQuery({})
    console.log(data, Er, Er11)
    const [hide, setHide] = useState(true)
    const [hideconfirm, setHideConfirm] = useState(true)
    const [msg, setMsg] = useState({ msg: "", state: "" });
    const [postVendor, { isError, error, isLoading }] = useRegistervendorMutation()
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const [item, setItem] = useState<any>(initialitem)
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
        setMsg({ msg: "", state: "" });

        setItem((prev: any) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            let res = await postVendor(item).unwrap()
            console.log(res)
            setItem(initialitem)
            setMsg({ msg: "Vendor added Successfully", state: "success" });
        } catch (err) {
            console.log(error)
            setMsg({ msg: `${error ? error?.data : ""}`, state: "error" })

        }
    };


    useEffect(() => {
        if (useCurrentLocation) {
            Geolocation.getCurrentPosition(
                (position: any) => {

                    setItem((prev: any) => ({
                        ...prev,
                        lat: position?.coords?.latitude.toString(),
                        lng: position?.coords?.longitude.toString()

                    }));
                },
                (error: any) => {
                    Alert.alert('Error', `Error: ${JSON.stringify(error)}`);
                    requestLocationPermission()
                },
                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
            );
            return () => { };
        }
    }, [useCurrentLocation]);

    const getBusiness = async () => {
        const res = await authorizedFetch(`${API_URL}/api/business`);
        console.log(res)
    }
    useEffect(() => {
        getBusiness()
    }, [])

    return (
        <KeyboardAvoidingView
            className="flex-1   bg-black-50  py-14"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            {isLoading && <OverlayLoader />}
            {msg.msg && <AlertContainer msg={msg.msg} state={msg.state} />}
            <ScrollView className="px-4  pt-6">
                <InputContainer value={fullname} onChangeText={(e: any) => handleChange("fullname", e)} placeholder="Business Owner's Name" />
                <InputContainer value={ID_No} keyboardType="numeric" onChangeText={(e: any) => handleChange("ID_No", e)} placeholder="Business Owner's Identification Number" />
                <InputContainer value={phone_number} keyboardType="numeric" onChangeText={(e: any) => handleChange("phone_number", e)} placeholder="Business Owner's Phone Number" />
                <InputContainer value={username} onChangeText={(e: any) => handleChange("username", e)} placeholder="Business Owner's username" />
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
                        <View className="flex w-[80%]">
                            <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lat} latlng="yes" onChangeText={(e: any) => handleChange("lat", e)} multiline={true} placeholder="latitude" /></View>

                    </View>
                    <View className="flex">
                        <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lng} latlng="yes" onChangeText={(e: any) => handleChange("lng", e)} multiline={true} placeholder="longitude" />
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
                    options={toDropdownOptions([
                        {
                            "_id": "68049ab92eef9ba9cf2761f6",
                            "business_name": "hardware ",
                            "description": "a hardware  shop  ",
                            "createdBy": "680496ae6f153c5098308659",
                            "state": "active",
                            "deletedAt": null,
                            "createdAt": "2025-04-20T06:56:58.011Z",
                            "updatedAt": "2025-04-20T06:56:58.011Z",
                            "__v": 0
                        }
                    ], "business_name")}
                />

                <InputContainer value={vendorName} onChangeText={(e: any) => handleChange("vendorName", e)} placeholder="Name of business" />
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
