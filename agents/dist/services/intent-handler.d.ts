import { XMTPMessage, Intent, AgentResponse, ActionsContent, Action, NFTVerificationResult } from '../types/agent';
export declare class IntentHandlerService {
    private readonly intentPatterns;
    private readonly quickActionTemplates;
    constructor();
    private initializeIntentPatterns;
    private initializeQuickActionTemplates;
    analyzeIntent(message: XMTPMessage): Promise<Intent>;
    private calculateConfidence;
    private extractEntities;
    generateResponse(intent: Intent, nftVerification: NFTVerificationResult): AgentResponse;
    private generateDescriptionForIntent;
    private generateContentForIntent;
    private getQuickActionsForLevel;
    generateFallbackText(actionsContent: ActionsContent): string;
    getActionById(actionId: string): Action | null;
    getQuickActionById(actionId: string): Action | null;
}
//# sourceMappingURL=intent-handler.d.ts.map