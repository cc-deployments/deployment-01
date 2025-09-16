"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentHandlerService = void 0;
class IntentHandlerService {
    constructor() {
        this.intentPatterns = new Map();
        this.quickActionTemplates = new Map();
        this.initializeIntentPatterns();
        this.initializeQuickActionTemplates();
    }
    initializeIntentPatterns() {
        // Greeting patterns
        this.intentPatterns.set('greeting', [
            /^(hi|hello|hey|sup|what's up|howdy)/i,
            /^(good morning|good afternoon|good evening)/i,
            /^(yo|greetings|salutations)/i,
        ]);
        // NFT inquiry patterns
        this.intentPatterns.set('nft_inquiry', [
            /(nft|token|collection)/i,
            /(what do i have|what nfts|show me my)/i,
            /(balance|holdings|portfolio)/i,
        ]);
        // Gallery access patterns
        this.intentPatterns.set('gallery_access', [
            /(gallery|view|show|display)/i,
            /(browse|explore|look at)/i,
            /(car|vehicle|automotive)/i,
        ]);
        // Minting patterns
        this.intentPatterns.set('minting', [
            /(mint|create|generate)/i,
            /(new nft|new token)/i,
            /(drop|launch|release)/i,
        ]);
        // Community patterns
        this.intentPatterns.set('community', [
            /(community|group|discord|telegram)/i,
            /(join|connect|network)/i,
            /(other holders|members)/i,
        ]);
        // Help patterns
        this.intentPatterns.set('help', [
            /(help|support|assist)/i,
            /(what can you do|how does this work)/i,
            /(tutorial|guide|instructions)/i,
        ]);
        // Drive command patterns
        this.intentPatterns.set('drive', [
            /^\$drive/i,
            /^(drive|explore|discover)/i,
            /^(show me cars|car exploration|car discovery)/i,
        ]);
    }
    initializeQuickActionTemplates() {
        // Basic access quick actions
        this.quickActionTemplates.set('basic', [
            {
                id: 'view_gallery_basic',
                label: 'View Gallery',
                imageUrl: 'https://carmania.carculture.com/gallery-icon.png',
                style: 'primary',
            },
            {
                id: 'join_community_basic',
                label: 'Join Community',
                imageUrl: 'https://carmania.carculture.com/community-icon.png',
                style: 'secondary',
            },
        ]);
        // Drive-specific quick actions
        this.quickActionTemplates.set('drive', [
            {
                id: 'explore_classic_cars',
                label: 'Classic Cars',
                imageUrl: 'https://carmania.carculture.com/classic-cars-icon.png',
                style: 'primary',
            },
            {
                id: 'explore_supercars',
                label: 'Supercars',
                imageUrl: 'https://carmania.carculture.com/supercars-icon.png',
                style: 'primary',
            },
            {
                id: 'explore_racing_cars',
                label: 'Racing Cars',
                imageUrl: 'https://carmania.carculture.com/racing-cars-icon.png',
                style: 'primary',
            },
            {
                id: 'car_quiz',
                label: 'Car Quiz',
                imageUrl: 'https://carmania.carculture.com/quiz-icon.png',
                style: 'secondary',
            },
            {
                id: 'random_car',
                label: 'Random Car',
                imageUrl: 'https://carmania.carculture.com/random-icon.png',
                style: 'secondary',
            },
        ]);
        // Premium access quick actions
        this.quickActionTemplates.set('premium', [
            {
                id: 'mint_nft_premium',
                label: 'Mint Premium NFT',
                imageUrl: 'https://carmania.carculture.com/mint-icon.png',
                style: 'primary',
            },
            {
                id: 'view_gallery_premium',
                label: 'Premium Gallery Access',
                imageUrl: 'https://carmania.carculture.com/premium-icon.png',
                style: 'primary',
            },
            {
                id: 'join_community_premium',
                label: 'Premium Community',
                imageUrl: 'https://carmania.carculture.com/premium-community-icon.png',
                style: 'secondary',
            },
        ]);
        // VIP access quick actions
        this.quickActionTemplates.set('vip', [
            {
                id: 'mint_nft_vip',
                label: 'Mint VIP NFT',
                imageUrl: 'https://carmania.carculture.com/vip-mint-icon.png',
                style: 'primary',
            },
            {
                id: 'view_gallery_vip',
                label: 'VIP Gallery Access',
                imageUrl: 'https://carmania.carculture.com/vip-gallery-icon.png',
                style: 'primary',
            },
            {
                id: 'join_community_vip',
                label: 'VIP Community',
                imageUrl: 'https://carmania.carculture.com/vip-community-icon.png',
                style: 'primary',
            },
            {
                id: 'custom_action_vip',
                label: 'Custom Action',
                imageUrl: 'https://carmania.carculture.com/custom-icon.png',
                style: 'secondary',
            },
        ]);
    }
    async analyzeIntent(message) {
        const content = message.content.toLowerCase();
        let bestMatch = {
            type: 'help',
            confidence: 0,
            entities: {},
        };
        // Check each intent pattern
        for (const [intentType, patterns] of this.intentPatterns) {
            for (const pattern of patterns) {
                if (pattern.test(content)) {
                    const confidence = this.calculateConfidence(content, pattern);
                    if (confidence > bestMatch.confidence) {
                        bestMatch = {
                            type: intentType,
                            confidence,
                            entities: this.extractEntities(content, intentType),
                        };
                    }
                }
            }
        }
        return bestMatch;
    }
    calculateConfidence(content, pattern) {
        const match = content.match(pattern);
        if (!match)
            return 0;
        // Base confidence from pattern match
        let confidence = 0.5;
        // Boost confidence for exact matches
        if (match[0].length === content.length) {
            confidence += 0.3;
        }
        // Boost confidence for longer, more specific patterns
        if (pattern.source.length > 20) {
            confidence += 0.2;
        }
        return Math.min(confidence, 1.0);
    }
    extractEntities(content, intentType) {
        const entities = {};
        switch (intentType) {
            case 'nft_inquiry':
                // Extract collection names or specific NFT references
                const collectionMatch = content.match(/(?:from|in|of)\s+([a-zA-Z0-9\s]+)/i);
                if (collectionMatch) {
                    entities.collection = collectionMatch[1].trim();
                }
                break;
            case 'minting':
                // Extract tier information
                const tierMatch = content.match(/(premium|vip|basic|standard)/i);
                if (tierMatch) {
                    entities.tier = tierMatch[1].toLowerCase();
                }
                break;
            case 'gallery_access':
                // Extract specific gallery section
                const galleryMatch = content.match(/(premium|vip|basic|standard)\s+gallery/i);
                if (galleryMatch) {
                    entities.galleryType = galleryMatch[1].toLowerCase();
                }
                break;
        }
        return entities;
    }
    generateResponse(intent, nftVerification) {
        const accessLevel = nftVerification.hasAccess ? nftVerification.accessLevel : 'basic';
        const actions = this.getQuickActionsForLevel(accessLevel);
        // Create ActionsContent in Base App format
        const quickActions = {
            id: `DRIVR_${intent.type}_${Date.now()}`,
            description: this.generateDescriptionForIntent(intent, nftVerification),
            actions: actions,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        };
        // Generate fallback text as primary message content (BASE AI requirement)
        const fallbackText = this.generateFallbackText(quickActions);
        // Combine intent response with fallback text
        const intentResponse = this.generateContentForIntent(intent, nftVerification);
        const fullContent = `${intentResponse}\n\n${fallbackText}`;
        return {
            content: fullContent,
            quickActions,
            metadata: {
                nftVerified: nftVerification.hasAccess,
                collectionName: nftVerification.collectionName,
                accessLevel,
            },
        };
    }
    generateDescriptionForIntent(intent, nftVerification) {
        const accessLevel = nftVerification.hasAccess ? nftVerification.accessLevel : 'basic';
        switch (intent.type) {
            case 'gallery_access':
                return `Choose your ${accessLevel} gallery access option:`;
            case 'minting':
                return `Select your ${accessLevel} minting option:`;
            case 'community':
                return `Choose your ${accessLevel} community access:`;
            default:
                return 'Select an action:';
        }
    }
    generateContentForIntent(intent, nftVerification) {
        const accessLevel = nftVerification.hasAccess ? nftVerification.accessLevel : 'basic';
        const hasAccess = nftVerification.hasAccess;
        switch (intent.type) {
            case 'greeting':
                if (hasAccess) {
                    return `Hey there! 🚗 Welcome to CarMania! I can see you have ${accessLevel} access. What would you like to do today?`;
                }
                else {
                    return `Hey there! 🚗 Welcome to CarMania! To unlock all features, you'll need to own one of our NFTs. What would you like to know?`;
                }
            case 'nft_inquiry':
                if (hasAccess) {
                    return `Great! You have access to our ${nftVerification.collectionName} collection with ${accessLevel} privileges. You own ${nftVerification.tokenIds?.length || 0} NFT(s). What would you like to do?`;
                }
                else {
                    return `You don't have any CarMania NFTs yet. Check out our collections to get started and unlock premium features!`;
                }
            case 'gallery_access':
                if (hasAccess) {
                    return `Perfect! You have ${accessLevel} access to our galleries. Choose from the options below:`;
                }
                else {
                    return `Our galleries are NFT-gated. Get a CarMania NFT to unlock access to exclusive car content and features!`;
                }
            case 'minting':
                if (hasAccess && accessLevel !== 'basic') {
                    return `Awesome! You have ${accessLevel} access and can mint new NFTs. Choose from the options below:`;
                }
                else if (hasAccess) {
                    return `You have basic access. Upgrade to premium or VIP to unlock minting capabilities!`;
                }
                else {
                    return `Minting is available to NFT holders. Get your first CarMania NFT to start minting!`;
                }
            case 'community':
                if (hasAccess) {
                    return `Great! You have ${accessLevel} access to our community. Choose from the options below:`;
                }
                else {
                    return `Join our community by getting a CarMania NFT! Different tiers unlock different community access levels.`;
                }
            case 'help':
            default:
                if (hasAccess) {
                    return `I'm your CarMania assistant! You have ${accessLevel} access. I can help you with galleries, minting, community access, and more. What would you like to know?`;
                }
                else {
                    return `I'm your CarMania assistant! I can help you learn about our NFTs, galleries, and community. To unlock all features, you'll need to own one of our NFTs. What would you like to know?`;
                }
        }
    }
    getQuickActionsForLevel(accessLevel) {
        const actions = this.quickActionTemplates.get(accessLevel) || [];
        // Always include basic actions
        const basicActions = this.quickActionTemplates.get('basic') || [];
        // Combine based on access level
        if (accessLevel === 'basic') {
            return basicActions;
        }
        else if (accessLevel === 'premium') {
            return [...basicActions, ...actions];
        }
        else if (accessLevel === 'vip') {
            return [...basicActions, ...actions];
        }
        return basicActions;
    }
    // Generate fallback text for clients that don't support Quick Actions (BASE AI requirement)
    generateFallbackText(actionsContent) {
        let fallback = `${actionsContent.description}\n\n`;
        actionsContent.actions.forEach((action, index) => {
            fallback += `[${index + 1}] ${action.label}\n`;
        });
        fallback += '\nReply with the number to select';
        return fallback;
    }
    getActionById(actionId) {
        for (const actions of this.quickActionTemplates.values()) {
            const action = actions.find(a => a.id === actionId);
            if (action)
                return action;
        }
        return null;
    }
    // Legacy method for backward compatibility
    getQuickActionById(actionId) {
        return this.getActionById(actionId);
    }
}
exports.IntentHandlerService = IntentHandlerService;
//# sourceMappingURL=intent-handler.js.map