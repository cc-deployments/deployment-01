# 🚀 CarMania Agent Deployment Guide

This guide covers deploying your CarMania Base App Chat Agent to different environments and integrating it with Base App.

## 🌍 Environment Setup

### 1. Development Environment

```bash
# Set environment variables
export NODE_ENV=development
export BASE_RPC_URL=https://sepolia.base.org

# Install dependencies
npm install

# Build and test
npm run build
npm run test:dev

# Start in development mode
npm run dev
```

### 2. Testnet Environment

```bash
# Set environment variables
export NODE_ENV=testnet
export BASE_RPC_URL=https://sepolia.base.org
export CARMANIA_AGENT_PRIVATE_KEY=your_testnet_private_key
export OPENSEA_API_KEY=your_opensea_api_key

# Build and deploy
npm run build
npm start
```

### 3. Production Environment

```bash
# Set environment variables
export NODE_ENV=production
export BASE_RPC_URL=https://mainnet.base.org
export CARMANIA_AGENT_PRIVATE_KEY=your_production_private_key
export OPENSEA_API_KEY=your_production_opensea_api_key

# Build and deploy
npm run build
npm start
```

## 🔐 Wallet Setup

### 1. Generate Agent Wallet

```bash
# Using ethers.js (included in dependencies)
node -e "
const { ethers } = require('ethers');
const wallet = ethers.Wallet.createRandom();
console.log('Private Key:', wallet.privateKey);
console.log('Address:', wallet.address);
"
```

### 2. Fund the Wallet

- **Testnet**: Use Base Sepolia faucet
- **Production**: Transfer funds from your main wallet

### 3. Set Environment Variable

```bash
export CARMANIA_AGENT_PRIVATE_KEY=0x...
```

## 🎨 NFT Collection Configuration

### 1. Add Collection Addresses

Edit `src/config.ts`:

```typescript
supportedCollections: [
  '0x1234567890123456789012345678901234567890', // Basic tier
  '0x0987654321098765432109876543210987654321', // Premium tier
  '0xabcdef0123456789abcdef0123456789abcdef',   // VIP tier
],
```

### 2. Verify Collections

Ensure your collections are:
- Deployed on Base network
- ERC-721 compatible
- Accessible via OpenSea API

## 📱 XMTP Integration

### 1. XMTP Network Access

The agent automatically connects to:
- **Development/Testnet**: XMTP dev network
- **Production**: XMTP mainnet

### 2. First Message

Users can start conversations by sending a message to your agent's wallet address.

### 3. Message Format

The agent responds to:
- Greetings
- NFT inquiries
- Gallery access requests
- Minting requests
- Community questions
- Help requests

## 🔌 Base App Integration

### 1. Base App Requirements

Your agent meets Base App requirements:
- ✅ XMTP messaging protocol
- ✅ NFT-gated responses
- ✅ Quick Actions support
- ✅ Base chain integration

### 2. Submission Process

1. **Test on Base testnet** first
2. **Verify all features** work correctly
3. **Submit for review** via Base App platform
4. **Provide documentation** and use cases

### 3. Quick Actions Integration

The agent provides:
- **Mint NFT** buttons (Premium/VIP only)
- **View Gallery** links (tier-based access)
- **Join Community** links (Discord/Telegram)
- **Custom actions** (VIP only)

## 🚀 Deployment Options

### 1. Local Deployment

```bash
# Run locally for development
npm run dev

# Run locally for production testing
npm run build && npm start
```

### 2. Cloud Deployment

#### Option A: Cloudflare Workers

```bash
# Install Wrangler CLI
npm install -g wrangler

# Configure wrangler.toml
# Deploy to Cloudflare
wrangler publish
```

#### Option B: AWS Lambda

```bash
# Install Serverless Framework
npm install -g serverless

# Configure serverless.yml
# Deploy to AWS
serverless deploy
```

#### Option C: Vercel Functions

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### 3. Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/index.js"]
```

```bash
# Build and run
docker build -t carmania-agent .
docker run -d --env-file .env carmania-agent
```

## 🔍 Monitoring & Logging

### 1. Log Levels

```bash
# Set log level
export LOG_LEVEL=debug  # info, warn, error, debug
export LOG_FORMAT=json  # text, json
```

### 2. Health Checks

The agent provides:
- Connection status
- Message processing stats
- NFT verification cache stats
- Error reporting

### 3. Metrics

Monitor:
- Messages processed per minute
- NFT verification success rate
- Response generation time
- Error rates

## 🛡️ Security Checklist

- [ ] Private keys stored securely
- [ ] Environment variables protected
- [ ] API keys have appropriate limits
- [ ] Input validation implemented
- [ ] Error messages don't expose sensitive data
- [ ] Rate limiting configured
- [ ] SSL/TLS enabled for production
- [ ] Regular security updates

## 🧪 Testing

### 1. Unit Tests

```bash
# Run tests
npm test

# Run tests in development
npm run test:dev
```

### 2. Integration Tests

Test with:
- Base testnet
- XMTP dev network
- OpenSea test API
- Sample NFT collections

### 3. Load Testing

Test agent performance with:
- Multiple concurrent users
- High message volumes
- NFT verification requests

## 📊 Performance Optimization

### 1. Caching

- NFT verification results cached for 5 minutes
- Collection metadata cached
- User access levels cached

### 2. Rate Limiting

- OpenSea API calls limited
- XMTP message processing throttled
- Base RPC calls optimized

### 3. Resource Management

- Memory usage monitored
- Connection pooling
- Efficient error handling

## 🔄 Updates & Maintenance

### 1. Regular Updates

- Monitor XMTP library updates
- Update OpenSea API usage
- Review Base network changes

### 2. Backup & Recovery

- Configuration backups
- Wallet backup procedures
- Disaster recovery plans

### 3. Monitoring

- Set up alerts for errors
- Monitor agent uptime
- Track user engagement

## 📞 Support

For deployment issues:
1. Check the troubleshooting section in README.md
2. Verify environment configuration
3. Test on testnet first
4. Contact CarMania team

---

**Happy deploying! 🚗✨**
