import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Input from '../../../coponents/input'
import Button from '../../../coponents/button'

const RegisterLogin = ({ item, handleChange, handleLogin, setIslogin, hide, setHide, setHideConfirm, hideconfirm, islogin }: { setIslogin: any, handleLogin: any, setHideConfirm: any, hideconfirm: boolean, item: any, handleChange: any, hide: boolean, setHide: any, islogin: boolean }) => {
    return (
        <View className="flex-1 w-full">
            <Input
                label="Phone Number"
                placeholder="Phone nunber"
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
    )
}

export const OtpView = ({ item, handleChange, handleLogin, setIslogin, hide, setHide, setHideConfirm, hideconfirm, islogin }: { setIslogin: any, handleLogin: any, setHideConfirm: any, hideconfirm: boolean, item: any, handleChange: any, hide: boolean, setHide: any, islogin: boolean }) => {
    return (
        <View className="flex-1 w-full">
            <Input
                label="OTP"
                placeholder="one time pin"
                value={item.otp}
                onChangeText={(text: string) => handleChange("otp", text)}
                keyboard="numeric"
            />


            <Button title="confirm otp" handleLogin={handleLogin} />
            <View className="flex flex-row  py-2 justify-center gap-x-4">
              
                <TouchableOpacity  activeOpacity={1} onPress={() => setIslogin(!islogin)} >
                    <Text className="text-gold-400">
                        Resend OTP 
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default RegisterLogin