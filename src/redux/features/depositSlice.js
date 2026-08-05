
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConversionRates = createAsyncThunk(
  'deposit/fetchConversionRates',
  async ({ amount, paymentMethod }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 0));

      return {
        cryptoRate: 0.00012,
        expectedCrypto: amount * 0.00012,
        processingFee: 0,
        upiId: 'payo@mockupi',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=mock',
        estimatedTime: 'INSTANT',
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch conversion rates');
    }
  }
);

const initialState = {
  amount: 0,
  currency: 'INR',
  walletData: null,
  walletLoading: false,
  walletError: null,
  profileData: null,
  dashboardStats: null,
  paymentMethod: null,
  cryptoRate: 0,
  expectedCrypto: 0,
  processingFee: 0,
  promoCode: '',
  rewardsEarned: 0,
  upiId: '',
  qrCodeUrl: '',
  estimatedTime: 'INSTANT',
  paymentStatus: 'IDLE',
  loading: false,
  error: null,
};

const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    setWalletData: (state, action) => {
      state.walletData = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setDashboardStats: (state, action) => {
      state.dashboardStats = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    applyPromoCode: (state, action) => {
      state.promoCode = action.payload;
      state.rewardsEarned = 10;
    },
    updatePaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    resetDepositFlow: () => initialState,
  },

  extraReducers: builder => {
    builder
     
      .addCase(fetchConversionRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversionRates.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoRate = action.payload.cryptoRate;
        state.expectedCrypto = action.payload.expectedCrypto;
        state.processingFee = action.payload.processingFee;
        state.upiId = action.payload.upiId;
        state.qrCodeUrl = action.payload.qrCodeUrl;
        state.estimatedTime = action.payload.estimatedTime || 'INSTANT';
      })
      .addCase(fetchConversionRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setWalletData,
  setProfileData,
  setDashboardStats,
  setAmount,
  setPaymentMethod,
  applyPromoCode,
  updatePaymentStatus,
  resetDepositFlow,
} = depositSlice.actions;

export default depositSlice.reducer;