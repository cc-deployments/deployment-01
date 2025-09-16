import { CarManiaAgentConfig, XMTPMessage, AgentResponse, AgentState, WalletSendCallsContent } from '../types/agent';
export declare class XMTPService {
    private client;
    private wallet;
    private config;
    private state;
    private messageHandlers;
    constructor(config: CarManiaAgentConfig);
    initialize(): Promise<void>;
    private startMessageListener;
    private handleMessage;
    sendMessage(conversationId: string, content: string): Promise<void>;
    sendDirectMessage(userAddress: string, content: string): Promise<void>;
    replyToMessage(message: XMTPMessage, content: string): Promise<void>;
    sendMessageWithQuickActions(conversationId: string, response: AgentResponse): Promise<void>;
    replyWithQuickActions(message: XMTPMessage, response: AgentResponse): Promise<void>;
    sendMessageWithWalletCalls(conversationId: string, content: string, walletCalls: WalletSendCallsContent): Promise<void>;
    replyWithWalletCalls(message: XMTPMessage, content: string, walletCalls: WalletSendCallsContent): Promise<void>;
    registerMessageHandler(id: string, handler: (message: XMTPMessage) => Promise<void>): void;
    unregisterMessageHandler(id: string): void;
    getState(): AgentState;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=xmtp-service.d.ts.map