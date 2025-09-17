#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extract all paths from Mintlify documentation configuration
 */
function generateMintlifyPaths() {
  const configPath = path.join(__dirname, 'mintlify-migration', 'docs.json');
  
  if (!fs.existsSync(configPath)) {
    console.error('Error: mintlify-migration/docs.json not found');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const paths = new Set();

  // Add root path
  paths.add('/');

  /**
   * Recursively extract paths from navigation structure
   */
  function extractPaths(items, basePath = '') {
    if (!items) return;

    items.forEach(item => {
      if (typeof item === 'string') {
        // Simple page reference
        const fullPath = basePath ? `${basePath}/${item}` : `/${item}`;
        paths.add(fullPath);
      } else if (item.pages) {
        // Item with pages array
        extractPaths(item.pages, basePath);
      } else if (item.groups) {
        // Item with groups array
        item.groups.forEach(group => {
          if (group.pages) {
            extractPaths(group.pages, basePath);
          }
        });
      } else if (item.group && item.pages) {
        // Group item with pages
        extractPaths(item.pages, basePath);
      }
    });
  }

  /**
   * Process navigation tabs
   */
  if (config.navigation && config.navigation.tabs) {
    config.navigation.tabs.forEach(tab => {
      if (tab.groups) {
        tab.groups.forEach(group => {
          if (group.pages) {
            extractPaths(group.pages);
          }
        });
      }
      
      if (tab.menu) {
        tab.menu.forEach(menuItem => {
          if (menuItem.groups) {
            menuItem.groups.forEach(group => {
              if (group.pages) {
                extractPaths(group.pages);
              }
            });
          }
        });
      }
    });
  }

  /**
   * Process redirects to get additional paths
   */
  if (config.redirects) {
    config.redirects.forEach(redirect => {
      if (redirect.destination) {
        paths.add(redirect.destination);
      }
      if (redirect.source) {
        paths.add(redirect.source);
      }
    });
  }

  // Convert Set to sorted array
  const sortedPaths = Array.from(paths).sort();

  // Output to JSON file
  const output = {
    generator: 'mintlify',
    timestamp: new Date().toISOString(),
    total_paths: sortedPaths.length,
    paths: sortedPaths
  };

  const outputPath = path.join(__dirname, 'mintlify-paths.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`✅ Generated ${sortedPaths.length} Mintlify paths`);
  console.log(`📄 Output saved to: ${outputPath}`);
  
  return output;
}

// Run the script
if (require.main === module) {
  generateMintlifyPaths();
}

module.exports = { generateMintlifyPaths }; 