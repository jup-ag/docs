#!/usr/bin/env node

/**
 * Generate llms.txt from docs.json structure
 * Dynamically parses navigation structure - no hardcoding
 * Follows llms.txt standard: https://llmstxt.org/#format
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://dev.jup.ag';
const baseFolder = __dirname;

const folders = [
  'get-started',
  'portal',
  'docs',
  'openapi-spec',
  'tool-kits',
  'resources',
  'legal',
  'updates',
  'blog'
];

// Process all folders and generate output
const data = folders.flatMap(folder => {
  const folderPath = path.join(baseFolder, folder);
  return folder === 'openapi-spec' 
    ? processApiReference(folderPath)
    : processData(folderPath);
});

const nestedData = buildNestedStructure(data);
const sortedData = sortNestedData(nestedData);
const output = generateLlmsTxt(sortedData);

fs.writeFileSync(path.join(baseFolder, 'llms.txt'), output, 'utf8');
console.log(`✅ Generated llms.txt at: ${path.join(baseFolder, 'llms.txt')}`);

function generateLlmsTxt(sortedData) {
  let output = '# Jupiter\n\n';
  output += `> Jupiter provides a comprehensive DeFi infrastructure on Solana, offering APIs for swaps, lending, perpetuals, and more. This documentation covers API references, integration guides, tool kits, and best practices for building with Jupiter.\n\n`;

  const formatHeading = (key) => 
    key.replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const processSection = (data, depth = 2) => {
    if (typeof data === 'string') {
      output += data + '\n';
      return;
    }
    if (typeof data !== 'object' || data === null) return;

    const keys = Object.keys(data);
    if (keys.length === 0) return;

    let hasStringItems = false;
    let previousWasSubsection = false;

    keys.forEach(key => {
      const value = data[key];
      if (typeof value === 'string') {
        if (previousWasSubsection) output += '\n';
        output += value + '\n';
        hasStringItems = true;
        previousWasSubsection = false;
      } else if (typeof value === 'object' && value !== null) {
        if (hasStringItems || previousWasSubsection) output += '\n';
        output += `${'#'.repeat(depth)} ${formatHeading(key)}\n\n`;
        processSection(value, depth + 1);
        previousWasSubsection = true;
        hasStringItems = false;
      }
    });
  };

  const topLevelKeys = Object.keys(sortedData);
  topLevelKeys.forEach((key, index) => {
    const value = sortedData[key];
    const formattedKey = formatHeading(key);
    output += `## ${formattedKey}\n\n`;
    
    if (typeof value === 'string') {
      output += value + '\n';
    } else if (typeof value === 'object' && value !== null) {
      processSection(value, 3);
    }
    
    if (index < topLevelKeys.length - 1) output += '\n';
  });

  output += `\n## Optional\n\n`;
  output += `- [Dev Portal](https://portal.jup.ag/): Access the Jupiter Portal to manage API key, access to metrics and logs\n`;
  output += `- [API Status](https://status.jup.ag/): Check the status of Jupiter APIs\n`;
  output += `- [Stay Updated](${BASE_URL}/resources/support): Get support and stay updated with Jupiter\n`;

  return output;
}

function sortNestedData(nestedData) {
  const docsJson = JSON.parse(fs.readFileSync(path.join(baseFolder, 'docs.json'), 'utf8'));
  const navigation = docsJson.navigation;
  
  if (!navigation?.tabs) {
    throw new Error('No navigation found in docs.json');
  }

  const sortedData = {};

  const getNestedValue = (obj, pathSegments) => {
    let current = obj;
    for (const segment of pathSegments) {
      if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        return null;
      }
    }
    return current;
  };

  const setNestedValue = (obj, pathSegments, value) => {
    let current = obj;
    for (let i = 0; i < pathSegments.length - 1; i++) {
      const segment = pathSegments[i];
      if (!(segment in current)) {
        current[segment] = {};
      }
      if (typeof current[segment] === 'string') return;
      current = current[segment];
    }
    const last = pathSegments[pathSegments.length - 1];
    if (typeof current[last] !== 'string') {
      current[last] = value;
    }
  };

  const findValueForApiReference = (pathSegments) => {
    if (pathSegments.length === 0 || pathSegments[0] !== 'api-reference') {
      return getNestedValue(nestedData, pathSegments);
    }
    
    const apiRefPath = pathSegments.slice(1);
    if (apiRefPath.length === 0) {
      return getNestedValue(nestedData, pathSegments);
    }
    
    let value = getNestedValue(nestedData, pathSegments);
    if (value !== null) return value;
    
    const firstSegment = apiRefPath[0];
    return getNestedValue(nestedData, ['api-reference', firstSegment]);
  };

  const processPage = (pagePath) => {
    if (typeof pagePath !== 'string') return;
    
    const normalizedPath = pagePath
      .replace(/^\//, '')
      .replace(/\.(mdx?|md|yaml)$/i, '');
    
    const pathSegments = normalizedPath.split('/').filter(seg => seg);
    const value = findValueForApiReference(pathSegments);
    
    if (value !== null) {
      setNestedValue(sortedData, pathSegments, value);
    }
  };

  const processNavElement = (element) => {
    if (!element || typeof element !== 'object') return;
    
    if (element.pages?.forEach) {
      element.pages.forEach(page => {
        if (typeof page === 'string') {
          processPage(page);
        } else if (typeof page === 'object' && page.pages) {
          processNavElement(page);
        }
      });
    }
    
    if (element.groups?.forEach) {
      element.groups.forEach(group => processNavElement(group));
    }
    
    if (element.menu?.forEach) {
      element.menu.forEach(menuItem => processNavElement(menuItem));
    }
  };

  navigation.tabs.forEach(tab => processNavElement(tab));
  
  return sortedData;
}

function buildNestedStructure(data) {
  const result = {};
  for (const item of data) {
    const pathSegments = item.path
      .replace(/^\//, '')
      .replace(/\.(mdx?|md|yaml)$/i, '')
      .split(path.sep)
      .flatMap(seg => seg.split('/'));
    
    let curr = result;
    for (let i = 0; i < pathSegments.length - 1; i++) {
      const key = pathSegments[i];
      curr[key] = curr[key] || {};
      curr = curr[key];
    }
    curr[pathSegments[pathSegments.length - 1]] = item.copy;
  }
  return result;
}

function processData(folderPath) {
  const collectedData = [];
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      collectedData.push(...processData(entryPath));
    } else if (entry.isFile()) {
      const frontmatter = extractFrontmatter(entryPath);
      if (frontmatter) {
        const relativePath = `/${path.relative(baseFolder, entryPath)}`;
        // Use .md extension for LLM-friendly markdown export (not .mdx which returns 404)
        const markdownLink = relativePath.replace(/\.mdx?$/, '.md');
        frontmatter.path = relativePath;
        frontmatter.link = BASE_URL + markdownLink;
        frontmatter.copy = `- [${frontmatter.title}](${frontmatter.link}): ${frontmatter.description}`;
        collectedData.push(frontmatter);
      }
    }
  }
  return collectedData;
}

function processApiReference(folderPath) {
  const collectedData = [];
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      collectedData.push(...processApiReference(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.yaml')) {
      const yamlInfo = extractYamlInfo(entryPath);
      if (!yamlInfo || yamlInfo.xDeprecated === true) continue;
      
      const filename = path.basename(entryPath, '.yaml');
      const fullPath = `/${path.relative(baseFolder, entryPath)}`;
      const relativePath = path.relative(folderPath, entryPath);
      const pathParts = relativePath.split(path.sep);
      
      let apiRefPath;
      if (pathParts.length > 1) {
        const parentFolder = pathParts[pathParts.length - 2];
        const isVersion = /^v\d+$/.test(parentFolder);
        apiRefPath = isVersion 
          ? `/api-reference/${filename}/${parentFolder}`
          : `/api-reference/${filename}`;
      } else {
        apiRefPath = `/api-reference/${filename}`;
      }
      
      yamlInfo.path = apiRefPath;
      yamlInfo.link = BASE_URL + fullPath;
      yamlInfo.copy = `- [${yamlInfo.title}](${yamlInfo.link}): ${yamlInfo.description}`;
      collectedData.push(yamlInfo);
    }
  }
  return collectedData;
}

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
    if (!match) throw new Error('No frontmatter found in file: ' + filePath);

    let title, description;
    match[1].split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;

      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (key === 'title') title = value;
        if (key === 'description') description = value;
      }
    });

    if (!title || !description) {
      throw new Error(`Missing frontmatter 'title' or 'description' in file: ${filePath}`);
    }

    return { title, description };
  } catch (e) {
    console.error(e.message || e);
    return null;
  }
}

function extractYamlInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let title = null, description = null, xDeprecated = false;
    let inInfoSection = false;
    let indentLevel = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed === 'info:' || trimmed.startsWith('info:')) {
        inInfoSection = true;
        indentLevel = line.indexOf('info:');
        continue;
      }
      
      if (inInfoSection) {
        const currentIndent = line.search(/\S/);
        if (currentIndent !== -1 && currentIndent <= indentLevel && !line.startsWith(' ') && !line.startsWith('\t')) {
          break;
        }

        if (trimmed.startsWith('x-deprecated:')) {
          const match = line.match(/x-deprecated:\s*(true|false|\w+)/i);
          if (match && match[1].trim().toLowerCase() === 'true') {
            xDeprecated = true;
          }
        }
        
        if (trimmed.startsWith('title:')) {
          const match = line.match(/title:\s*(.+)/);
          if (match) {
            let value = match[1].trim();
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            title = value;
          }
        }

        if (trimmed.startsWith('description:')) {
          const match = line.match(/description:\s*(.+)/);
          if (match) {
            let value = match[1].trim();
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            description = value;
          }
        }
      }
    }
    
    if (!title || !description) {
      throw new Error(`Missing 'title' or 'description' in YAML file: ${filePath}`);
    }

    if (xDeprecated) {
      console.error(`'x-deprecated' is true in YAML file: ${filePath}`);
    }

    return { title, description, xDeprecated };
  } catch (e) {
    console.error(e.message || e);
    return null;
  }
}
