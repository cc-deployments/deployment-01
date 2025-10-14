// packages/shared-auth/hooks/useOffRamp.ts

import { useState, useCallback } from 'react';
import { basePayService } from '../services/basePayService';
import type { OffRampConfig, OffRampTransactionStatus, OffRampConfigResponse } from '../types/basePay';

export interface OffRampState {
  isProcessing: boolean;
  offRampUrl?: string;
  sessionToken?: string;
  transactionStatus?: OffRampTransactionStatus;
  config?: OffRampConfigResponse;
  error?: string;
}

export function useOffRamp() {
  const [state, setState] = useState<OffRampState>({
    isProcessing: false,
  });

  const createOffRampSession = useCallback(async (config: OffRampConfig) => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: undefined }));
      
      const result = await basePayService.createOffRampSession(config);
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        offRampUrl: result.offRampUrl,
        sessionToken: result.sessionToken,
      }));
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create offramp session';
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const getTransactionStatus = useCallback(async (partnerUserId: string) => {
    try {
      setState(prev => ({ ...prev, error: undefined }));
      
      const status = await basePayService.getOffRampTransactionStatus(partnerUserId);
      
      setState(prev => ({
        ...prev,
        transactionStatus: status,
      }));
      
      return status;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get transaction status';
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const getConfig = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: undefined }));
      
      const config = await basePayService.getOffRampConfig();
      
      setState(prev => ({
        ...prev,
        config,
      }));
      
      return config;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get offramp config';
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isProcessing: false,
    });
  }, []);

  return {
    ...state,
    createOffRampSession,
    getTransactionStatus,
    getConfig,
    reset,
  };
}


