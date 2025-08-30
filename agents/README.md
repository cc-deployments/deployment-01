# 🚗 Drivr - CarMania Base App Chat Agent

A sophisticated XMTP-based chat agent for the CarMania platform, featuring NFT-gated responses, Quick Actions, and seamless Base App integration.

## ✨ Features

- **🤖 AI-Powered Responses** - Intelligent message analysis and contextual responses
- **🔐 NFT-Gated Access** - Different response levels based on NFT ownership
- **🔘 Quick Actions** - Interactive buttons for minting, gallery access, and community
- **📱 XMTP Integration** - Secure, decentralized messaging protocol
- **⚡ Base Chain Support** - Native integration with Base network
- **🎨 OpenSea Integration** - Real-time NFT verification and metadata
- **🔄 Caching System** - Optimized performance with intelligent caching
- **🛡️ Security First** - Private key management and secure communications
- **🔘 BASE AI Compliant** - Full fallback support for all XMTP clients

## 🏗️ Architecture

```
Drivr Agent
├── XMTP Service          # Message handling and client management
├── NFT Verification      # OpenSea API integration and access control
├── Intent Handler        # AI-powered message analysis and responses
├── Quick Actions        # Interactive button system with fallbacks
└── Base Integration     # Base App compliance and features
```

## 🚀 Quick Start

### 1. Installation

```bash
cd agents
npm install
```

### 2. Configuration

Copy the environment template and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

```env
# Required: Agent wallet private key
CARMANIA_AGENT_PRIVATE_KEY=your_private_key_here

# Required: OpenSea API key
OPENSEA_API_KEY=your_opensea_api_key_here

# Required: Base RPC endpoint
BASE_RPC_URL=https://mainnet.base.org

# Required: NFT collection addresses
CARMANIA_COLLECTION_1=0x1234567890123456789012345678901234567890
```

### 3. Build and Run

```bash
# Build the project
npm run build

# Start the agent
npm start

# Or run in development mode
npm run dev
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CARMANIA_AGENT_PRIVATE_KEY` | ✅ | Private key for agent wallet |
| `OPENSEA_API_KEY` | ✅ | OpenSea API key for NFT verification |
| `BASE_RPC_URL` | ✅ | Base network RPC endpoint |
| `CARMANIA_COLLECTION_*` | ✅ | NFT collection contract addresses |

### NFT Collection Setup

Add your CarMania NFT collection addresses to the configuration:

```typescript
// In src/config.ts
supportedCollections: [
  '0x1234567890123456789012345678901234567890', // Basic tier
  '0x0987654321098765432109876543210987654321', // Premium tier
  '0xabcdef0123456789abcdef0123456789abcdef',   // VIP tier
],
```

## 🎯 Usage Examples

### Basic Message Handling

The agent automatically:
- Analyzes user messages for intent
- Verifies NFT ownership
- Generates contextual responses
- Provides appropriate Quick Actions with fallback text

### Quick Actions

Users can interact with:
- **Mint NFT** - Create new CarMania NFTs (Premium/VIP only)
- **View Gallery** - Access NFT galleries based on tier
- **Join Community** - Connect to Discord/Telegram groups
- **Custom Actions** - VIP-only special features

### NFT Verification

The agent checks:
- ERC-721 token balances
- Collection metadata from OpenSea
- Access level determination (Basic/Premium/VIP)
- Cached results for performance

## 🔌 Integration

### Base App Integration

The agent is designed to comply with Base App requirements:
- XMTP messaging protocol
- NFT-gated responses
- Quick Actions support with automatic fallbacks
- Transaction tray integration (coming soon)

### External Services

- **OpenSea API** - NFT metadata and verification
- **Base RPC** - Blockchain interactions
- **XMTP Network** - Decentralized messaging

## 🔘 Quick Actions Implementation

### BASE AI Compliant Fallbacks

Drivr automatically generates fallback text for every Quick Actions message, ensuring maximum compatibility across all XMTP clients:

```
Choose your premium gallery access option:

[1] View Gallery
[2] Premium Gallery Access
[3] Join Community

Reply with the number to select
```

### Content Type Support

- **Supported Clients**: Render interactive buttons via `coinbase.com/actions:1.0`
- **Unsupported Clients**: Display fallback text automatically
- **No Detection Needed**: Fallbacks are always generated and sent

### Implementation Details

```typescript
// Automatic fallback generation
const fallbackText = generateFallbackText(actionsContent);

// Send with both content types
await conversation.send(fallbackText, {
  contentType: 'coinbase.com/actions:1.0',
  content: actionsContent
});
```

## 🛠️ Development

### Project Structure

```
src/
├── types/           # TypeScript interfaces and types
├── services/        # Core service implementations
│   ├── xmtp-service.ts
│   ├── nft-verification.ts
│   └── intent-handler.ts
├── carmania-agent.ts # Main agent orchestration
└── index.ts         # Entry point and configuration
```

### Available Scripts

```bash
npm run build        # Build the project
npm run dev          # Development mode with watch
npm start            # Start the agent
npm test             # Run tests
npm run lint         # Lint code
npm run clean        # Clean build artifacts
```

### Adding New Features

1. **New Intent Types** - Add patterns to `IntentHandlerService`
2. **New Quick Actions** - Extend the `Action` interface
3. **New NFT Collections** - Add addresses to configuration
4. **Custom Responses** - Modify response generation logic

## 🔒 Security Considerations

- **Private Key Management** - Store securely, never commit to version control
- **API Key Security** - Use environment variables for sensitive data
- **Rate Limiting** - Implement appropriate limits for external APIs
- **Input Validation** - Validate all user inputs and message content
- **Error Handling** - Don't expose sensitive information in error messages

## 🚨 Troubleshooting

### Common Issues

1. **XMTP Connection Failed**
   - Check wallet private key
   - Verify network connectivity
   - Ensure XMTP client is properly initialized

2. **NFT Verification Errors**
   - Verify OpenSea API key
   - Check collection contract addresses
   - Ensure Base RPC endpoint is accessible

3. **Build Errors**
   - Check TypeScript version compatibility
   - Verify all dependencies are installed
   - Clear `dist/` directory and rebuild

### Debug Mode

Enable detailed logging by setting environment variables:

```env
LOG_LEVEL=debug
LOG_FORMAT=json
```

## 📚 API Reference

### DrivrAgent Class

```typescript
class DrivrAgent {
  async start(): Promise<void>           // Start the agent
  async stop(): Promise<void>            // Stop the agent
  async sendDirectMessage(address: string, content: string): Promise<void>
  async executeAction(actionId: string, userAddress: string): Promise<void>
  getState(): AgentState                 // Get current agent state
  isAgentRunning(): boolean              // Check if agent is running
}
```

### Services

- **XMTPService** - XMTP client management and messaging
- **NFTVerificationService** - NFT ownership verification
- **IntentHandlerService** - Message analysis and response generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Check the troubleshooting section above
- Review Base App documentation
- Contact the CarMania team

---

**Built with ❤️ for the CarMania community by Drivr** 🚗✨

