export type RootStackParamList = {
    home: undefined;
    login: undefined;
    profile: { userId: string };
    transactions: undefined
    AdminDashboard: undefined
    Home: undefined
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
    phone_number?: string,
    password?: string,
    confirm_password?: string,
    username?: string,
    otp?: string
    code?: string
}
export type Transaction = {
    id?: string;
    type?: 'Sent' | 'Received';
    amount: number;
    party?: string;
    date?: string;
};
