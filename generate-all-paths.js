#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import the individual generators
const { generateMintlifyPaths } = require('./generate-mintlify-paths.js');
const { generateDocusaurusPaths } = require('./generate-docusaurus-paths.js');

/**
 * Generate paths for both documentation systems and create a comparison
 */
function generateAllPaths() {
  console.log('🚀 Generating paths for both documentation systems...\n');

  // Generate Mintlify paths
  console.log('📋 Generating Mintlify paths...');
  const mintlifyResult = generateMintlifyPaths();
  
  console.log('\n📋 Generating Docusaurus paths...');
  const docusaurusResult = generateDocusaurusPaths();

  // Create comparison report
  const mintlifyPaths = new Set(mintlifyResult.paths);
  const docusaurusPaths = new Set(docusaurusResult.paths);

  const onlyInMintlify = mintlifyResult.paths.filter(path => !docusaurusPaths.has(path));
  const onlyInDocusaurus = docusaurusResult.paths.filter(path => !mintlifyPaths.has(path));
  const inBoth = mintlifyResult.paths.filter(path => docusaurusPaths.has(path));

  const comparison = {
    generated_at: new Date().toISOString(),
    summary: {
      mintlify_total: mintlifyResult.total_paths,
      docusaurus_total: docusaurusResult.total_paths,
      common_paths: inBoth.length,
      mintlify_only: onlyInMintlify.length,
      docusaurus_only: onlyInDocusaurus.length
    },
    paths: {
      common: inBoth.sort(),
      mintlify_only: onlyInMintlify.sort(),
      docusaurus_only: onlyInDocusaurus.sort()
    }
  };

  // Save comparison report
  const comparisonPath = path.join(__dirname, 'paths-comparison.json');
  fs.writeFileSync(comparisonPath, JSON.stringify(comparison, null, 2));

  // Print summary
  console.log('\n📊 Comparison Summary:');
  console.log(`├── Mintlify paths: ${comparison.summary.mintlify_total}`);
  console.log(`├── Docusaurus paths: ${comparison.summary.docusaurus_total}`);
  console.log(`├── Common paths: ${comparison.summary.common_paths}`);
  console.log(`├── Mintlify only: ${comparison.summary.mintlify_only}`);
  console.log(`└── Docusaurus only: ${comparison.summary.docusaurus_only}`);
  
  console.log(`\n📄 Comparison report saved to: ${comparisonPath}`);

  return comparison;
}

// Run the script
if (require.main === module) {
  generateAllPaths();
}

module.exports = { generateAllPaths };