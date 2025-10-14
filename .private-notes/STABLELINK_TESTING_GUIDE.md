# 🧪 StableLink Commerce Testing Guide

## 🎯 Testing Overview

This guide provides comprehensive testing procedures for the StableLink-powered AI commerce system. Test the complete flow from user request to NFT delivery.

## ⚠️ Current Status (Updated: September 5, 2024)

### 🚫 BLOCKED: BASE Smart Wallet Connection Issue
- **Issue**: BASE smart wallet (L3ldrivr.base.eth) not connecting to any dApp
- **Impact**: All payment flows blocked until wallet connection is resolved
- **Status**: Reported to BASE Discord and debug tool
- **Resolution**: Waiting for BASE team response (Monday morning)

### 🔄 Workaround Testing
- **Direct Manifold Integration**: Test NFT gallery and purchase flow
- **Wallet Test Page**: Use `/wallet-test` to diagnose connection issues
- **Alternative Wallets**: Consider Rainbow Wallet or MetaMask for testing

## 🔧 Prerequisites

### Environment Setup
```bash
# 1. Install dependencies
cd agents
npm install

# 2. Configure environment variables
cp env.example .env
```

### Required Environment Variables
```env
# StableLink Configuration
STABLELINK_API_URL=https://api.stablelink.xyz
STABLELINK_API_KEY=your_stablelink_api_key
STABLELINK_WEBHOOK_SECRET=your_webhook_secret

# Network Configuration
BASE_RPC_URL=https://mainnet.base.org
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Agent Configuration
CARMANIA_AGENT_PRIVATE_KEY=your_private_key
OPENSEA_API_KEY=your_opensea_api_key
```

## 🧪 Test Scenarios

### Test 1: Basic Commerce Request

**Objective**: Test basic NFT purchase request processing

**Steps**:
1. Start the DRIVR agent
2. Send message: "I want to buy a CarMania NFT"
3. Verify response includes:
   - Product details (CarMania Classic NFT, $79.99)
   - Payment link generation
   - Credit card payment options

**Expected Result**:
```
🛒 AI-Powered NFT Commerce

I found the perfect NFT for you: CarMania Classic NFT

💰 Price: $79.99 USD
🔗 Network: BASE
📄 Standard: ERC-721

A classic NFT from the CarMania collection celebrating automotive culture and heritage.

💳 Pay with Credit Card: [Buy Now](https://stablelink.xyz/pay/...)
```

### Test 2: Specific NFT Request

**Objective**: Test specific NFT product creation

**Steps**:
1. Send message: "I want the Summertime Blues NFT"
2. Verify response includes:
   - Correct product name (Summertime Blues NFT)
   - Correct price ($99.99)
   - Detailed description

**Expected Result**:
```
🛒 AI-Powered NFT Commerce

I found the perfect NFT for you: Summertime Blues NFT

💰 Price: $99.99 USD
🔗 Network: BASE
📄 Standard: ERC-721

A legendary automotive NFT from the CarMania collection, featuring classic summer vibes and car culture nostalgia.
```

### Test 3: Premium Tier Request

**Objective**: Test premium/VIP NFT handling

**Steps**:
1. Send message: "I want a VIP NFT"
2. Verify response includes:
   - VIP tier pricing ($299.99)
   - Exclusive benefits description
   - Correct contract address

**Expected Result**:
```
🛒 AI-Powered NFT Commerce

I found the perfect NFT for you: CarMania VIP NFT

💰 Price: $299.99 USD
🔗 Network: BASE
📄 Standard: ERC-721

A vip tier NFT from the CarMania collection with exclusive benefits and access.
```

### Test 4: Payment Flow Simulation

**Objective**: Test complete payment processing flow

**Steps**:
1. Generate payment link from commerce request
2. Simulate payment completion webhook
3. Verify NFT minting trigger
4. Check user confirmation message

**Expected Result**:
```
✅ Payment completed: payment_123 for product product_456
🎨 Starting NFT minting for payment payment_123
🎨 NFT minted successfully: 0x1234...
📧 Sending payment confirmation for payment_123
```

### Test 5: Error Handling

**Objective**: Test error scenarios and recovery

**Steps**:
1. Send invalid commerce request: "I want to buy a unicorn"
2. Simulate payment failure webhook
3. Test minting failure recovery

**Expected Result**:
```
I'd be happy to help you buy NFTs! Please tell me which CarMania NFT you're interested in, or describe what you're looking for.
```

## 🔍 Manual Testing Checklist

### Commerce Functionality
- [ ] Basic NFT purchase request processing
- [ ] Specific NFT product creation
- [ ] Premium tier handling
- [ ] Payment link generation
- [ ] Intent parsing accuracy

### Payment Processing
- [ ] StableLink product creation
- [ ] Payment link generation
- [ ] Webhook handling
- [ ] Payment status tracking
- [ ] Error notification

### NFT Minting
- [ ] Post-payment minting trigger
- [ ] ERC-721 minting simulation
- [ ] ERC-1155 minting simulation
- [ ] Metadata generation
- [ ] Transaction tracking

### User Communication
- [ ] Commerce response formatting
- [ ] Payment confirmation messages
- [ ] Error notifications
- [ ] Status updates

## 🚀 Automated Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run specific test suites
npm test -- --grep "StableLink"
npm test -- --grep "Commerce"
npm test -- --grep "Minting"
```

### Integration Tests
```bash
# Run integration tests
npm run test:integration

# Test webhook handling
npm run test:webhooks
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Test complete commerce flow
npm run test:commerce-flow
```

## 📊 Performance Testing

### Load Testing
```bash
# Test concurrent commerce requests
npm run test:load

# Test payment processing under load
npm run test:payment-load
```

### Stress Testing
```bash
# Test system limits
npm run test:stress

# Test error recovery
npm run test:error-recovery
```

## 🔒 Security Testing

### Webhook Security
- [ ] Signature verification
- [ ] Request validation
- [ ] Rate limiting
- [ ] Input sanitization

### Payment Security
- [ ] Tokenization verification
- [ ] PCI compliance
- [ ] Fraud detection
- [ ] Data encryption

## 📱 UI Testing

### Component Testing
```bash
# Test StableLinkCommerce component
npm run test:components

# Test payment flow UI
npm run test:payment-ui
```

### Browser Testing
- [ ] Chrome compatibility
- [ ] Firefox compatibility
- [ ] Safari compatibility
- [ ] Mobile responsiveness

## 🐛 Debugging

### Common Issues

#### Payment Link Generation Fails
```bash
# Check StableLink API credentials
echo $STABLELINK_API_KEY

# Verify API endpoint
curl -H "Authorization: Bearer $STABLELINK_API_KEY" https://api.stablelink.xyz/health
```

#### Webhook Not Received
```bash
# Check webhook endpoint configuration
# Verify webhook secret
# Test webhook locally with ngrok
```

#### NFT Minting Fails
```bash
# Check contract addresses
# Verify network connectivity
# Check gas estimation
```

### Debug Logging
```bash
# Enable debug logging
DEBUG=stablelink,commerce,minting npm start

# View detailed logs
tail -f logs/stablelink.log
```

## 📈 Monitoring

### Key Metrics
- [ ] Commerce request success rate
- [ ] Payment completion rate
- [ ] NFT minting success rate
- [ ] User satisfaction scores

### Alerts
- [ ] Payment processing failures
- [ ] Minting errors
- [ ] Webhook delivery failures
- [ ] High error rates

## 🎯 Success Criteria

### Functional Requirements
- [ ] 95%+ commerce request success rate
- [ ] 99%+ payment processing success rate
- [ ] 98%+ NFT minting success rate
- [ ] <2 second response time for commerce requests

### User Experience
- [ ] Intuitive commerce flow
- [ ] Clear error messages
- [ ] Responsive UI components
- [ ] Mobile-friendly interface

### Security
- [ ] All webhooks verified
- [ ] Payment data tokenized
- [ ] No sensitive data exposure
- [ ] Fraud detection active

## 🚀 Deployment Testing

### Staging Environment
```bash
# Deploy to staging
npm run deploy:staging

# Run staging tests
npm run test:staging
```

### Production Deployment
```bash
# Deploy to production
npm run deploy:production

# Monitor production metrics
npm run monitor:production
```

## 📞 Support

### Testing Issues
- Check logs for error details
- Verify environment configuration
- Test with minimal examples
- Contact StableLink support if needed

### Documentation
- Review implementation files
- Check API documentation
- Consult testing guides
- Update tests as needed

---

## 🎉 Conclusion

This testing guide ensures comprehensive validation of the StableLink commerce system. Follow the test scenarios systematically to verify all functionality before deployment.

**Next Steps:**
1. Complete all test scenarios
2. Fix any identified issues
3. Deploy to staging environment
4. Conduct user acceptance testing
5. Deploy to production

The system is ready for testing and deployment! 🚀


