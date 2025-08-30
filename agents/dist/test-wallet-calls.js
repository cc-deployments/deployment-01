"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testWalletCalls = testWalletCalls;
const wallet_call_service_1 = require("./services/wallet-call-service");
const config_1 = require("./config");
async function testWalletCalls() {
    console.log('🧪 Testing DRIVR Wallet Call Service...\n');
    // Initialize wallet call service
    const walletCallService = new wallet_call_service_1.WalletCallService(config_1.config);
    // Test 1: Car Story Transaction
    console.log('📝 Test 1: Creating Car Story Transaction');
    try {
        const carStory = {
            title: "My 1967 Shelby GT500",
            description: "A beautiful classic muscle car with incredible history",
            carDetails: {
                make: "Shelby",
                model: "GT500",
                year: 1967,
                vin: "7R02C123456"
            },
            provenance: {
                ownershipHistory: ["Original Owner", "Second Owner", "Current Owner"],
                maintenanceRecords: ["Engine rebuild 2010", "Paint restoration 2015"],
                modifications: ["Custom exhaust", "Performance intake"]
            }
        };
        const walletCalls = await walletCallService.createCarStoryTransaction("0x1234567890123456789012345678901234567890", carStory, "123", "0x0987654321098765432109876543210987654321");
        console.log('✅ Car Story Transaction Created:');
        console.log(`   ID: ${walletCalls.id}`);
        console.log(`   Calls: ${walletCalls.calls.length}`);
        console.log(`   Description: ${walletCalls.calls[0].description}`);
        console.log(`   Expires: ${walletCalls.expiresAt}\n`);
    }
    catch (error) {
        console.error('❌ Car Story Transaction Failed:', error);
    }
    // Test 2: Mint Transaction
    console.log('🎨 Test 2: Creating Mint Transaction');
    try {
        const walletCalls = await walletCallService.createMintTransaction("0x1234567890123456789012345678901234567890", "premium", {
            make: "Ferrari",
            model: "F40",
            year: 1990,
            vin: "ZFFGJ34B000000000"
        });
        console.log('✅ Mint Transaction Created:');
        console.log(`   ID: ${walletCalls.id}`);
        console.log(`   Calls: ${walletCalls.calls.length}`);
        console.log(`   Description: ${walletCalls.calls[0].description}`);
        console.log(`   Value: ${walletCalls.calls[0].value} ETH\n`);
    }
    catch (error) {
        console.error('❌ Mint Transaction Failed:', error);
    }
    // Test 3: Community Transaction
    console.log('🏘️ Test 3: Creating Community Transaction');
    try {
        const walletCalls = await walletCallService.createCommunityTransaction("0x1234567890123456789012345678901234567890", "vote", { proposalId: "123", vote: "yes" });
        console.log('✅ Community Transaction Created:');
        console.log(`   ID: ${walletCalls.id}`);
        console.log(`   Calls: ${walletCalls.calls.length}`);
        console.log(`   Description: ${walletCalls.calls[0].description}\n`);
    }
    catch (error) {
        console.error('❌ Community Transaction Failed:', error);
    }
    console.log('🎉 Wallet Call Service Tests Complete!');
}
// Run tests if this file is executed directly
if (require.main === module) {
    testWalletCalls().catch(console.error);
}
//# sourceMappingURL=test-wallet-calls.js.map