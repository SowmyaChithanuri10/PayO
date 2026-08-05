

import api from './axios';

export const createOrder = async (amount) => {
  const response = await api.post('/api/cashfree/deposit/create-order', {
    amount,
  });

  return response.data;
};

export const verifyPayment = async (orderId) => {
  const response = await api.post('/api/cashfree/deposit/verify', {
    orderId,
  });

  return response.data;
};

export const getWalletBalance = async () => {
  const response = await api.get('/api/wallet/balance');

  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get('/api/wallet/transactions');

  return response.data;
};