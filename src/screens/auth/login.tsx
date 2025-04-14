
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";
import Input from "../../coponents/input";
import Button from "../../coponents/button";






export default function LoginScreen() {

    type Item = {
        phone_number: string;
        password: string;
        confirm_password: string;
    };
    const [hide, setHide] = useState(true)
    const [hideconfirm, setHideConfirm] = useState(true)
    const [islogin, setIslogin] = useState(true)
    const [item, setItem] = useState<Item>({
        phone_number: "",
        password: "",
        confirm_password: ""
    })
    const handleLogin = () => {
        console.log("Logging in with", item);
        // Handle auth here
    };

    const handleChange = (key: keyof Item, value: string) => {
        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    return (
        <KeyboardAvoidingView className=""
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
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
                        <View className="flex-1 w-full">
                            <Input
                                label="Phone Number"
                                placeholder="Email"
                                value={item.phone_number}
                                onChangeText={(text: string) => handleChange("phone_number", text)}
                                keyboard="numeric"
                            />
                            <Input
                                label="Password"
                                hide={hide}
                                setHide={() => setHide(!hide)}
                                placeholder="password"
                                value={item.password}
                                onChangeText={(text: string) => handleChange("password", text)}
                                keyboard="text"
                            />
                            {!islogin && <Input
                                label="confirm Password"
                                hide={hideconfirm}
                                setHide={() => setHideConfirm(!hideconfirm)}
                                placeholder="confirm password"
                                value={item.confirm_password}
                                onChangeText={(text: string) => handleChange("confirm_password", text)}
                                keyboard="text"
                            />}
                            <Button title="login" handleLogin={handleLogin} />
                            <View className="flex flex-row  py-2 justify-center gap-x-4">
                                <Text className="text-white">{islogin ? "Dont have an account yet" : "Have an account already"}</Text>
                                <TouchableOpacity activeOpacity={1} onPress={() => setIslogin(!islogin)} >
                                    <Text className="text-gold-400">
                                        {islogin ? "Register" : "Login"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
