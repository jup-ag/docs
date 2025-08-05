import { useMemo, useCallback } from 'react';
import { navbarConfigs } from './navbarConfigs';

/**
 * Hook to get navbar items for the current path
 */
export function useNavbarItems(currentPath: string) {
  return useMemo(() => {
    // Find the most specific matching path in navbarConfigs
    const matchingPath = Object.keys(navbarConfigs)
      .filter(path => currentPath === path || currentPath.startsWith(path + '/'))  // Add '/' to prevent partial matches
      .sort((a, b) => b.length - a.length)[0] || '/';
    
    return navbarConfigs[matchingPath] || [];
  }, [currentPath]);
}

/**
 * Hook to create navigation utilities
 */
export function useNavigation(currentPath: string) {
  /**
   * Checks if a path matches the current path based on regex patterns
   */
  const isPathMatch = useCallback((navPath: string, currentPath: string) => {
    // Don't highlight any nav items on the homepage
    if (currentPath === '/' || currentPath === '') {
      return false;
    }

    // Special case for root docs path
    if (navPath === '/docs/' && currentPath === '/docs/') {
      return true;
    }

    // For paths starting with /docs/api-, only match with /docs/api-setup
    if (currentPath.startsWith('/docs/api-')) {
      // If the nav path is /docs/api-setup and current path starts with /docs/api-, match
      if (navPath === '/docs/api-setup' && currentPath.startsWith('/docs/api-')) {
        return true;
      }
      // For /docs/api- paths, don't match with /docs/ (Get Started)
      return false;
    }

    // Special case for paths directly under /docs/ that aren't covered by other nav items
    if (navPath === '/docs/' && currentPath.match(/^\/docs\/[^\/]+\/?$/)) {
      // Check if this path is not covered by any other nav item
      const isPathCoveredByOtherNavItem = Object.values(navbarConfigs)
        .flat()
        .some(item => {
          if (item.to && item.to !== '/docs/' && currentPath.startsWith(item.to)) {
            return true;
          }
          if (item.items) {
            return item.items.some(subItem => 
              subItem.to && subItem.to !== '/docs/' && currentPath.startsWith(subItem.to)
            );
          }
          return false;
        });
      
      return !isPathCoveredByOtherNavItem;
    }

    // For all other paths, check if current path starts with nav path
    if (navPath !== '/docs/' && currentPath.startsWith(navPath)) {
      return true;
    }

    return false;
  }, []);

  /**
   * Checks if a navbar item should be marked as active
   */
  const isNavItemActive = useCallback((navItem: any) => {
    // Check if the main nav item path matches
    if (navItem.to && isPathMatch(navItem.to, currentPath)) {
      return true;
    }
    
    // Check if any dropdown item path matches
    if (navItem.items) {
      return navItem.items.some(subItem => 
        subItem.to && isPathMatch(subItem.to, currentPath)
      );
    }
    
    return false;
  }, [currentPath, isPathMatch]);

  /**
   * Checks if a dropdown item should be marked as active
   */
  const isDropdownItemActive = useCallback((itemPath: string) => {
    return isPathMatch(itemPath, currentPath);
  }, [currentPath, isPathMatch]);

  return {
    isNavItemActive,
    isDropdownItemActive,
    useNavbarItems: () => useNavbarItems(currentPath)
  };
} 