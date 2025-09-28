// DRIVR Agent Main Entry Point
import dotenv from 'dotenv';
import { DRIVRAgent } from './drivr-agent';

// Load environment variables
dotenv.config();

async function main() {
  console.log('🚀 Starting DRIVR Agent...\n');

  try {
    // Create and start DRIVR agent
    const agent = new DRIVRAgent();
    await agent.start();

    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down DRIVR Agent...');
      await agent.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Shutting down DRIVR Agent...');
      await agent.stop();
      process.exit(0);
    });

    // Log status every 30 seconds
    setInterval(() => {
      const status = agent.getStatus();
      console.log(`📊 DRIVR Agent Status: ${status.isRunning ? 'Running' : 'Stopped'}`);
    }, 30000);

  } catch (error) {
    console.error('❌ Failed to start DRIVR Agent:', error);
    process.exit(1);
  }
}

// Run main function
main().catch(console.error);