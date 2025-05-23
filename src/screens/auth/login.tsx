
import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, User } from "../../../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterLogin, { OtpView } from "./components/registerLogin";
import OverlayLoader from "../../coponents/Loader";
import AlertContainer from "../../coponents/alert";
import { useLoginMutation, useSignupMutation, useActivateMutation } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useAuth } from "../../../contexts/AuthContext";
import { io, Socket } from 'socket.io-client'
import { useAuthContext } from "../../../contexts/AuthContext1";

const SOCKET_URL = `${process.env.SOCKET_SERVER_URL}`;
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
    const [msg, setMsg] = useState({ msg: "", state: "" });
    const [step, setStep] = useState(1);

    const [item, setItem] = useState<any>({
        // 254712345678
        phone_number: "0706203245",
        password: "MikeMike",
        fcmToken: "",
        confirm_password: "",
        username: "Champion intel",
        code: ""
    })
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const [loginUser, { isLoading, error }] = useLoginMutation();
    const [register, { isLoading: registrationLoading }] = useSignupMutation();
    const [activate, { isLoading: activationLoading }] = useActivateMutation();
    const dispatch = useDispatch()
    const { login } = useAuthContext();
    const handleChange = (key: keyof Item, value: string) => {
        setMsg({ msg: "", state: "" });
        setItem((prev: any) => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = async (e?: any) => {
        try {
            let fcmToken = await AsyncStorage.getItem('fcmToken');
            console.log(fcmToken)

            setItem((prev: any) => ({
                ...prev,
                fcmToken: fcmToken
            }))

            setMsg({ msg: "", state: "" });

            if (!item.phone_number || !item.password) {
                setMsg({ msg: "Both fields are required", state: "error" });
                return;
            }

            if (!islogin && item.password !== item.confirm_password) {
                setMsg({ msg: "Passwords do not match", state: "error" });
                return;
            }
            const data = islogin ? await loginUser(item).unwrap() : await register(item).unwrap();

            if (data.ok === true) {
                if (islogin) {
                    dispatch(setCredentials({ ...data }))
                    await AsyncStorage.setItem("accessToken", data.token);
                    if (data?.exp) {
                        await AsyncStorage.setItem("tokenExpiry", data.exp.toString());
                        await login(data.token);
                    }
                }
                setMsg({ msg: `${islogin ? "Login successful! Redirecting..." : "Registration successful! Please verify your account."}`, state: "success" });
                if (!islogin) {

                    setTimeout(() => {
                        setStep(2);
                        setIslogin(false);
                    },
                        2000);
                }

            } else {
                if (data === "Kindly activate your account to continue") {
                    setStep(2);
                    setIslogin(false);
                } else {
                    setMsg({ msg: data.message || data, state: "" });
                }
            }
        } catch (error: any) {
            console.error(error);
            setMsg({ msg: error.message || error.data || "Error Occured try again 😧😧😧 !!!", state: "error" });

        } finally {

        }
    };
    const getToken = async () => {
        let token = await AsyncStorage.getItem('fcmToken');
        setItem((prev: any) => ({
            ...prev,
            fcmToken: token
        }));
    }

    const handleVerification = async (e: React.FormEvent) => {

        try {
            if (e?.preventDefault) e.preventDefault();
            setMsg({ msg: "", state: "" });
            if (!item.otp) {
                setMsg({ msg: "Enter the OTP sent on", state: "error" });
                return;
            }
            item.code = item.otp
            const data = await activate(item).unwrap();
            if (data.ok === true) {
                setMsg({ msg: "Account activated successfully! Now Login...", state: "success" });
                setTimeout(() => {
                    setStep(1)
                    setIslogin(true)
                    setMsg({ msg: "", state: "" });

                }, 2000); // Delay to show success message
            } else {

                setMsg({ msg: data.message || data, state: "error" });

            }

        } catch (error: any) {
            setMsg({ msg: error.message || error.data || "Error Occured try again 😧😧😧 !!!", state: "error" });;
        } finally {

        }
    };
    useEffect(() => {
        getToken()
        // if (user) {
        //     navigation.replace("home")
        // }
    }, [])


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
