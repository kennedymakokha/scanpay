import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransState {
  balance: string | null;
 
}

const initialState: TransState = {
  balance: null,
};

const TransSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBalance: (
      state,
      action: PayloadAction<{ balance: string; }>
    ) => {
      state.balance = action.payload.balance;
      
    },
   
  },
});

export const { setBalance } = TransSlice.actions;
export default TransSlice.reducer;
