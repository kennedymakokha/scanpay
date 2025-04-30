// features/balance/balanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceState {
  amount: number | null;
  lastUpdated: string | null;
}

const initialState: BalanceState = {
  amount: null,
  lastUpdated: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance(state, action: PayloadAction<{ amount: number; updatedAt: string }>) {
      state.amount = action.payload.amount;
      state.lastUpdated = action.payload.updatedAt;
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
