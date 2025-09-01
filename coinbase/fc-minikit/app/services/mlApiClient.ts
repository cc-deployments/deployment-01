/**
 * ML API Client Service
 * Handles communication between MiniApp and your trained ML models
 */

export interface MLAnalysisRequest {
  image_base64: string;
  token_id: string;
  collection_address: string;
  user_message?: string;
}

export interface MLAnalysisResponse {
  success: boolean;
  car_info: {
    caption: string;
    image_size: [number, number];
    format: string;
  };
  ml_insights: {
    model_used: string;
    analysis_timestamp: string;
    image_analysis: any;
  };
  chat_response: string;
  token_id: string;
}

export interface MLHealthStatus {
  status: 'healthy' | 'degraded' | 'unavailable';
  models: {
    car_chat_model: boolean;
    blip_model: boolean;
    models_loaded: boolean;
  };
  message: string;
}

class MLApiClient {
  private baseUrl: string;
  private isConnected: boolean = false;

  constructor(baseUrl: string = 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if ML API is available and healthy
   */
  async checkHealth(): Promise<MLHealthStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (response.ok) {
        const data = await response.json();
        this.isConnected = data.status === 'healthy';
        return data;
      } else {
        this.isConnected = false;
        return {
          status: 'unavailable',
          models: {
            car_chat_model: false,
            blip_model: false,
            models_loaded: false
          },
          message: 'ML API is not responding'
        };
      }
    } catch (error) {
      this.isConnected = false;
      return {
        status: 'unavailable',
        models: {
          car_chat_model: false,
          blip_model: false,
          models_loaded: false
        },
        message: 'Cannot connect to ML API'
      };
    }
  }

  /**
   * Analyze NFT image with trained ML models
   */
  async analyzeNFT(request: MLAnalysisRequest): Promise<MLAnalysisResponse> {
    if (!this.isConnected) {
      throw new Error('ML API is not connected. Please check the service status.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/analyze-nft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ML Analysis failed: ${response.statusText} - ${errorText}`);
      }

      const result: MLAnalysisResponse = await response.json();
      return result;
    } catch (error) {
      console.error('ML API request failed:', error);
      throw error;
    }
  }

  /**
   * Convert image URL to base64 for ML analysis
   */
  async imageUrlToBase64(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert image to base64'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Failed to convert image to base64:', error);
      throw new Error('Failed to process image for ML analysis');
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Update base URL (useful for different environments)
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
    this.isConnected = false; // Reset connection status
  }
}

// Export singleton instance
export const mlApiClient = new MLApiClient();

// Export the class for testing
export { MLApiClient };


