export type RootStackParamList = {
    home: undefined;
    login: undefined;
    profile: { userId: string };
    transactions: undefined
    // Add other routes here
};

export type ItemData = {
    id: string;
    title: string;
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
};