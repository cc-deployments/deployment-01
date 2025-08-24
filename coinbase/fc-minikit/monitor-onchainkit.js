#!/usr/bin/env node

/**
 * OnchainKit Release Monitor
 * Checks for new npm releases and notifies when the frame-sdk fix is available
 * 
 * Run this script daily to monitor for updates:
 * node monitor-onchainkit.js
 */

const https = require('https');

// Configuration
const PACKAGE_NAME = '@coinbase/onchainkit';
const CURRENT_VERSION = '0.38.19';
const FIX_COMMIT_DATE = '2025-08-15'; // When the frame-sdk fix was committed

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
}

async function checkNpmPackage() {
  try {
    log('🔍 Checking npm registry for OnchainKit updates...', 'blue');
    
    const url = `https://registry.npmjs.org/${PACKAGE_NAME}`;
    const packageInfo = await makeRequest(url);
    
    const latestVersion = packageInfo['dist-tags'].latest;
    const allVersions = Object.keys(packageInfo.versions);
    
    log(`📦 Current installed version: ${colors.yellow}${CURRENT_VERSION}${colors.reset}`, 'cyan');
    log(`🚀 Latest npm version: ${colors.yellow}${latestVersion}${colors.reset}`, 'cyan');
    
    // Check if there's a newer version
    if (latestVersion !== CURRENT_VERSION) {
      log(`\n🎉 ${colors.green}NEW VERSION AVAILABLE!${colors.reset}`, 'green');
      log(`   Current: ${CURRENT_VERSION}`, 'yellow');
      log(`   Latest:  ${latestVersion}`, 'green');
      
      // Check if the new version is after the fix commit date
      const newVersionInfo = packageInfo.versions[latestVersion];
      if (newVersionInfo && newVersionInfo.time) {
        const publishDate = new Date(newVersionInfo.time);
        const fixDate = new Date(FIX_COMMIT_DATE);
        
        if (publishDate > fixDate) {
          log(`\n✅ ${colors.green}This version likely contains the frame-sdk fix!${colors.reset}`, 'green');
          log(`   Fix committed: ${FIX_COMMIT_DATE}`, 'cyan');
          log(`   Version published: ${publishDate.toISOString().split('T')[0]}`, 'cyan');
        }
      }
      
      log(`\n📋 ${colors.blue}Next steps:${colors.reset}`, 'blue');
      log(`   1. Update package: npm update ${PACKAGE_NAME}`, 'cyan');
      log(`   2. Test build: npm run build`, 'cyan');
      log(`   3. Verify buttons work in Mini App`, 'cyan');
      
    } else {
      log(`\n⏳ ${colors.yellow}No new version available yet${colors.reset}`, 'yellow');
      log(`   Still waiting for npm release with frame-sdk fix`, 'cyan');
      log(`   Fix was committed on ${FIX_COMMIT_DATE}`, 'cyan');
    }
    
    // Show recent version history
    log(`\n📚 ${colors.blue}Recent versions:${colors.reset}`, 'blue');
    const recentVersions = allVersions
      .filter(version => packageInfo.versions[version] && packageInfo.versions[version].time)
      .sort((a, b) => new Date(packageInfo.versions[b].time) - new Date(packageInfo.versions[a].time))
      .slice(0, 5);
    
    recentVersions.forEach(version => {
      const versionInfo = packageInfo.versions[version];
      const publishDate = new Date(versionInfo.time).toISOString().split('T')[0];
      const isCurrent = version === CURRENT_VERSION ? ' (current)' : '';
      const isLatest = version === latestVersion ? ' (latest)' : '';
      
      log(`   ${version}${isCurrent}${isLatest} - ${publishDate}`, 'cyan');
    });
    
  } catch (error) {
    log(`❌ Error checking npm package: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function checkGitHubReleases() {
  try {
    log(`\n🔍 ${colors.blue}Checking GitHub for recent commits...${colors.reset}`, 'blue');
    
    // Add User-Agent header to avoid rate limiting
    const options = {
      hostname: 'api.github.com',
      path: '/repos/coinbase/onchainkit/commits?per_page=5',
      headers: {
        'User-Agent': 'OnchainKit-Monitor/1.0'
      }
    };
    
    const commits = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });
      
      req.end();
    });
    
    log(`📝 ${colors.blue}Recent commits:${colors.reset}`, 'blue');
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date).toISOString().split('T')[0];
      const message = commit.commit.message.split('\n')[0];
      const isRecent = date === new Date().toISOString().split('T')[0] ? ' (today)' : '';
      
      log(`   ${date}${isRecent}: ${message}`, 'cyan');
    });
    
  } catch (error) {
    log(`❌ Error checking GitHub: ${error.message}`, 'red');
    log(`   (GitHub API may have rate limiting for unauthenticated requests)`, 'yellow');
    // Don't exit, this is optional
  }
}

async function main() {
  log(`${colors.bright}${colors.blue}🚀 OnchainKit Release Monitor${colors.reset}`, 'blue');
  log(`${colors.cyan}Monitoring for frame-sdk fix in npm package${colors.reset}\n`, 'cyan');
  
  await checkNpmPackage();
  await checkGitHubReleases();
  
  log(`\n${colors.green}✅ Monitoring complete!${colors.reset}`, 'green');
  log(`   Run this script daily: node monitor-onchainkit.js`, 'cyan');
  log(`   Or add to cron: 0 9 * * * cd /path/to/fc-minikit && node monitor-onchainkit.js`, 'cyan');
}

// Run the monitor
main().catch(error => {
  log(`❌ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
