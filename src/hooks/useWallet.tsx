
import { useState, useCallback, useEffect } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to connect your wallet!');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      });

      const balanceInEth = parseFloat(parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);

      setWallet({
        isConnected: true,
        address: accounts[0],
        balance: balanceInEth,
        chainId: parseInt(chainId, 16),
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
    });
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [connectWallet, disconnectWallet]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    isConnecting,
  };
};
