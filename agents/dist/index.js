"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAgent = exports.getConfigForEnvironment = exports.validateConfig = exports.config = exports.IntentHandlerService = exports.NFTVerificationService = exports.XMTPService = exports.DRIVRAgent = void 0;
// Main exports for Drivr Base App Chat Agent
var carmania_agent_1 = require("./carmania-agent");
Object.defineProperty(exports, "DRIVRAgent", { enumerable: true, get: function () { return carmania_agent_1.DRIVRAgent; } });
var xmtp_service_1 = require("./services/xmtp-service");
Object.defineProperty(exports, "XMTPService", { enumerable: true, get: function () { return xmtp_service_1.XMTPService; } });
var nft_verification_1 = require("./services/nft-verification");
Object.defineProperty(exports, "NFTVerificationService", { enumerable: true, get: function () { return nft_verification_1.NFTVerificationService; } });
var intent_handler_1 = require("./services/intent-handler");
Object.defineProperty(exports, "IntentHandlerService", { enumerable: true, get: function () { return intent_handler_1.IntentHandlerService; } });
// Configuration and utilities
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
Object.defineProperty(exports, "validateConfig", { enumerable: true, get: function () { return config_1.validateConfig; } });
Object.defineProperty(exports, "getConfigForEnvironment", { enumerable: true, get: function () { return config_1.getConfigForEnvironment; } });
var test_agent_1 = require("./test-agent");
Object.defineProperty(exports, "testAgent", { enumerable: true, get: function () { return test_agent_1.testAgent; } });
// Main entry point
const carmania_agent_2 = require("./carmania-agent");
const config_2 = require("./config");
// Main function
async function main() {
    try {
        console.log('🚗 Drivr Base App Chat Agent');
        console.log('================================');
        // Validate configuration
        (0, config_2.validateConfig)(config_2.config);
        console.log('✅ Configuration validated');
        // Create and start agent
        const agent = new carmania_agent_2.DRIVRAgent(config_2.config);
        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\n🛑 Received SIGINT, shutting down gracefully...');
            await agent.stop();
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
            await agent.stop();
            process.exit(0);
        });
        // Start the agent
        await agent.start();
        // Keep the process running
        console.log('🔄 Agent is running. Press Ctrl+C to stop.');
    }
    catch (error) {
        console.error('❌ Failed to start Drivr Agent:', error);
        process.exit(1);
    }
}
// Start the agent if this file is run directly
if (require.main === module) {
    main().catch((error) => {
        console.error('❌ Unhandled error:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map