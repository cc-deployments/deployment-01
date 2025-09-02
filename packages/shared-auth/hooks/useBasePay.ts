// packages/shared-auth/hooks/useBasePay.ts

import { useState, useCallback } from 'react';
import { basePayService } from '../services/basePayService';
import type { BasePayConfig, BasePayResult, BasePayState } from '../types/basePay';

export function useBasePay() {
  const [state, setState] = useState<BasePayState>({
    isProcessing: false,
  });

  const pay = useCallback(async (config: BasePayConfig): Promise<BasePayResult> => {
    setState(prev => ({ ...prev, isProcessing: true, error: undefined }));

    try {
      const result = await basePayService.pay(config);
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        lastPayment: result,
        error: undefined 
      }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: errorMessage 
      }));
      throw error;
    }
  }, []);

  const getPaymentStatus = useCallback(async (paymentId: string): Promise<BasePayResult> => {
    try {
      const result = await basePayService.getPaymentStatus(paymentId);
      setState(prev => ({ 
        ...prev, 
        lastPayment: result,
        error: undefined 
      }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get payment status';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage 
      }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    basePayService.reset();
    setState({
      isProcessing: false,
    });
  }, []);

  return {
    ...state,
    pay,
    getPaymentStatus,
    reset,
  };
}
