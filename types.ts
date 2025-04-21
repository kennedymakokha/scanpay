export type RootStackParamList = {
    home: undefined;
    login: undefined;
    profile: { userId: string };
    transactions: undefined
    AdminDashboard: undefined
    Home: undefined
    businesses: undefined
    vendor: undefined
    // Add other routes here
};

export type ItemData = {
    _id: string;
    amount: string;
    ResponseCode?: any
};
export type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

export type Item = {
    phone_number: string | null;
    amount: string;
    to: string
};
export type User = {
    id?: any
    confirm_password?: any
    vendorName?: string;
    fullname?: string
    role: "admin" | "superAdmin" | "client";
    ID_No: string
    business?: any;
    phone_number?: string,
    password?: string,
    username?: string,
    otp?: string
    code?: string
    lat: number
    lng: number
}
export type Transaction = {
    id?: string;
    type?: 'Sent' | 'Received';
    amount: number;
    party?: string;
    date?: string;
};

export type InputProps = {
    latlng?: string;
    keyboardType?: string | any;
    editable?: boolean;
    multiline?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;

    hide?: boolean,
    setHide?: any,


    label?: string
};