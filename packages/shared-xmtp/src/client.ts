// Shared XMTP client utilities
import { Client, type XmtpEnv } from '@xmtp/browser-sdk';
import { Client as NodeClient } from '@xmtp/node-sdk';
import { DRIVRXMTPConfig, DRIVRMessage, DRIVRResponse } from './types';

export class SharedXMTPClient {
  /**
   * Create XMTP client for browser/frontend use
   */
  static async createBrowserClient(config: DRIVRXMTPConfig): Promise<Client> {
    if (!config.wallet) {
      throw new Error('Wallet required for browser client');
    }

    return await Client.create({
      wallet: config.wallet,
      env: config.env as XmtpEnv,
    });
  }

  /**
   * Create XMTP client for Node.js/backend use
   */
  static async createNodeClient(config: DRIVRXMTPConfig): Promise<NodeClient> {
    if (!config.privateKey) {
      throw new Error('Private key required for node client');
    }

    const client = new NodeClient();
    await client.init({
      privateKey: config.privateKey,
      env: config.env as XmtpEnv,
    });

    return client;
  }

  /**
   * Format message for DRIVR platform
   */
  static formatDRIVRMessage(
    senderAddress: string,
    content: string,
    type: DRIVRMessage['type'] = 'text',
    metadata?: DRIVRMessage['metadata']
  ): DRIVRMessage {
    return {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderAddress,
      content,
      timestamp: Date.now(),
      type,
      metadata,
    };
  }

  /**
   * Parse XMTP message to DRIVR format
   */
  static parseXMTPMessage(xmtpMessage: any): DRIVRMessage {
    return {
      id: xmtpMessage.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderAddress: xmtpMessage.senderAddress,
      content: xmtpMessage.content || '',
      timestamp: xmtpMessage.sentAt || Date.now(),
      type: this.detectMessageType(xmtpMessage.content),
      metadata: this.extractMetadata(xmtpMessage),
    };
  }

  /**
   * Detect message type from content
   */
  private static detectMessageType(content: string): DRIVRMessage['type'] {
    if (content.includes('payment') || content.includes('$') || content.includes('ETH')) {
      return 'payment';
    }
    if (content.includes('nft') || content.includes('NFT')) {
      return 'nft';
    }
    if (content.includes('action:') || content.includes('quick:')) {
      return 'quick_action';
    }
    return 'text';
  }

  /**
   * Extract metadata from XMTP message
   */
  private static extractMetadata(xmtpMessage: any): DRIVRMessage['metadata'] {
    const metadata: DRIVRMessage['metadata'] = {};

    // Extract payment information
    if (xmtpMessage.content?.includes('$')) {
      const amountMatch = xmtpMessage.content.match(/\$(\d+\.?\d*)/);
      if (amountMatch) {
        metadata.paymentAmount = amountMatch[1];
      }
    }

    // Extract NFT information
    if (xmtpMessage.content?.includes('nft')) {
      const nftMatch = xmtpMessage.content.match(/nft[:\s]+(\w+)/i);
      if (nftMatch) {
        metadata.nftId = nftMatch[1];
      }
    }

    // Extract action information
    if (xmtpMessage.content?.includes('action:')) {
      const actionMatch = xmtpMessage.content.match(/action:(\w+)/i);
      if (actionMatch) {
        metadata.actionType = actionMatch[1];
      }
    }

    return metadata;
  }

  /**
   * Format DRIVR response for XMTP
   */
  static formatDRIVRResponse(response: DRIVRResponse): string {
    let content = response.content;

    // Add quick actions as text
    if (response.quickActions && response.quickActions.length > 0) {
      content += '\n\n**Quick Actions:**\n';
      response.quickActions.forEach((action, index) => {
        content += `${index + 1}. ${action.label}`;
        if (action.requiresPayment && action.paymentAmount) {
          content += ` (${action.paymentAmount})`;
        }
        content += '\n';
      });
    }

    // Add payment request info
    if (response.paymentRequest) {
      content += `\n\n**Payment Required:** ${response.paymentRequest.amount} ${response.paymentRequest.currency}`;
      content += `\n**Description:** ${response.paymentRequest.description}`;
    }

    // Add NFT data
    if (response.nftData) {
      content += `\n\n**NFT:** ${response.nftData.name}`;
      content += `\n**Contract:** ${response.nftData.contractAddress}`;
      content += `\n**Token ID:** ${response.nftData.tokenId}`;
    }

    return content;
  }
}































