
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
import Input from "../../coponents/input";
import Button from "../../coponents/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterLogin, { OtpView } from "./components/registerLogin";
import OverlayLoader from "../../coponents/Loader";
import AlertContainer from "../../coponents/alert";





export default function LoginScreen() {

    type Item = {
        phone_number: string;
        password: string;
        confirm_password: string;
        username: string,
        otp?: any,
        code?: any
    };
    const [hide, setHide] = useState(true)
    const [hideconfirm, setHideConfirm] = useState(true)
    const [islogin, setIslogin] = useState(true)
    const [isLoading, setIsloading] = useState(false)
    const [msg, setMsg] = useState({ msg: "", state: "" });

    const [step, setStep] = useState(1);
    const [user, setUser] = useState({});
    const [item, setItem] = useState<Item>({
        phone_number: "",
        password: "",
        confirm_password: "",
        username: "suggeted",
        code: ""
    })
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    const handleChange = (key: keyof Item, value: string) => {
        setMsg({ msg: "", state: "" });

        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = async (e?: any) => {
        try {
            setIsloading(true)
            if (e?.preventDefault) e.preventDefault();

            setMsg({ msg: "", state: "" });

            if (!item.phone_number || !item.password) {
                setMsg({ msg: "Both fields are required", state: "error" });
                setIsloading(false)
                return;
            }

            if (!islogin && item.password !== item.confirm_password) {
                setMsg({ msg: "Passwords do not match", state: "error" });
                setIsloading(false)
                return;
            }

            const endpoint = islogin ? "https://api.marapesa.com/api/auth/login" : "https://api.marapesa.com/api/auth/register";

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            const data = await response.json();

            if (data.ok === true) {
                if (islogin) {
                    await AsyncStorage.setItem("accessToken", data.token);
                    if (data?.exp) {
                        await AsyncStorage.setItem("tokenExpiry", data.exp.toString());
                    }
                }
                setMsg({ msg: `${islogin ? "Login successful! Redirecting..." : "Registration successful! Please verify your account."}`, state: "success" });
                setIsloading(false)
                setTimeout(() => {
                    if (islogin) {
                        navigation.navigate("home");
                    } else {
                        setStep(2);
                        setIslogin(false);

                    }
                }, 2000);

            } else {
                if (data === "Kindly activate your account to continue") {
                    setStep(2);
                    setIslogin(false);
                }

                setMsg({ msg: data.message || data, state: "" });
                setIsloading(false)
            }

        } catch (error) {
            console.error(error);
            setMsg({ msg: "An error occurred. Please try again.", state: "error" });
            setIsloading(false)
        } finally {
            setIsloading(false)
        }
    };
    const handleVerification = async (e: React.FormEvent) => {
        try {
            setIsloading(true)
            if (e?.preventDefault) e.preventDefault();
            setMsg({ msg: "", state: "" });
            if (!item.otp) {
                setMsg({ msg: "Enter the OTP sent on", state: "error" });
                setIsloading(false)
                return;
            }
            item.code = item.otp
            const response = await fetch("https://api.marapesa.com/api/auth/activate-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            const data = await response.json();
            if (data.ok === true) {
                setMsg({ msg: "Account activated successfully! Redirecting...", state: "success" });
                setTimeout(() => {
                    setStep(1)
                    setIslogin(true)
                    setIsloading(false)
                }, 2000); // Delay to show success message
            } else {
                setMsg({ msg: data.message || data, state: "error" });
                setIsloading(false)
            }

        } catch (error) {
            console.log(error)
            setMsg({ msg: "Enter the OTP sent on ", state: "error" });
            setIsloading(false)

        } finally {
            setIsloading(false)
        }
    };
    return (
        <KeyboardAvoidingView className=""
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            {isLoading && <OverlayLoader />}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 justify-center  items-center bg-black-50 px-6">
                        <View className="flex-1 items-center justify-center">
                            <Image
                                className="w-60 h-60"
                                source={require('./../../assets/logo.png')}
                                resizeMode="cover" // or 'contain', 'stretch'
                            />
                        </View>
                        {msg.msg && <AlertContainer msg={msg.msg} state={msg.state} />}
                        {step === 1 && <RegisterLogin
                            item={item}
                            handleChange={handleChange}
                            handleLogin={handleSubmit}
                            setIslogin={setIslogin}
                            hide={hide}
                            setHide={setHide}
                            setHideConfirm={setHideConfirm}
                            hideconfirm={hideconfirm}
                            islogin={islogin}
                        />}
                        {step === 2 && <OtpView
                            item={item}
                            handleChange={handleChange}
                            handleLogin={handleVerification}
                            setIslogin={setIslogin}
                            hide={hide}
                            setHide={setHide}
                            setHideConfirm={setHideConfirm}
                            hideconfirm={hideconfirm}
                            islogin={islogin}
                        />}

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
