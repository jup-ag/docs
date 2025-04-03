import React from 'react';
import Logo from '@theme/Logo';
import NavbarLayout from '@theme/Navbar/Layout';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import MobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import SearchBar from '@theme/SearchBar';
import { navbarConfigs } from '../../constant';

function CustomNavbarContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Determine which navbar config to use based on the current path
  const navbarItems = Object.keys(navbarConfigs).reduce((acc, path) => {
    if (path === '/' && location.pathname === '/') {
      return navbarConfigs[path];
    } else if (location.pathname.startsWith(path) && path !== '/') {
      return navbarConfigs[path];
    }
    return acc;
  }, []);

  // Helper function to check if a path is active
  const isPathActive = (itemPath: string) => {
    // Strip paths to 2 segments for comparison
    const stripToTwoSegments = (path: string) => {
      const segments = path.split('/').filter(Boolean);
      if (segments.length <= 2) return path;
      return '/' + segments.slice(0, 2).join('/');
    };

    const currentPathStripped = stripToTwoSegments(location.pathname);
    const itemPathStripped = stripToTwoSegments(itemPath);

    // Special case for API Reference
    if (itemPath === '/docs/api') {
      // Check if the path is exactly /docs/api or starts with /docs/api/
      // But not if it starts with /docs/api-
      if (location.pathname === '/docs/api') return true;
      if (location.pathname.startsWith('/docs/api/')) return true;
      if (location.pathname.startsWith('/docs/api-')) return false;
    }

    // Special case for root docs path
    if (itemPath === '/docs/' || itemPath === '/docs') {
      // Active when exactly at /docs/ or /docs
      if (location.pathname === '/docs/' || location.pathname === '/docs') {
        return true;
      }
      
      // Special case for /docs/api-something paths - they should match /docs/
      if (location.pathname.startsWith('/docs/api-')) {
        return true;
      }
      
      // Check if the current path matches any specific navbar item
      // If it does, don't consider it a /docs/1-segment case
      const hasSpecificNavItem = navbarItems.some(item => {
        // Check if the current path starts with this item's path (for non-docs root items)
        if (item.to !== '/docs/' && item.to !== '/docs' && 
            location.pathname.startsWith(stripToTwoSegments(item.to))) {
          return true;
        }
        // Also check dropdown items
        if (item.items) {
          return item.items.some(subItem => 
            location.pathname.startsWith(stripToTwoSegments(subItem.to))
          );
        }
        return false;
      });
      
      if (hasSpecificNavItem) {
        return false;
      }
      
      // Active when at /docs/1-segment (only one segment after /docs/)
      const segments = location.pathname.split('/').filter(Boolean);
      if (segments[0] === 'docs' && segments.length === 2) {
        return true;
      }
      return false;
    }

    // For regular items, check if the current path starts with the item path
    return location.pathname.startsWith(itemPathStripped);
  };

  return (
    <>
      <div className="navbar__items">
        {navbarItems.length > 0 ? (
          navbarItems.map((item) => {
            if (item.items) {
              // Render a dropdown
              return (
                <div key={item.label} className="navbar__item dropdown dropdown--hoverable">
                  <div className="navbar__link-wrapper">
                    <a 
                      href={item.to}
                      className={clsx(
                        'navbar__link',
                        (isPathActive(item.to) || 
                         item.items?.some(subItem => isPathActive(subItem.to))) && 
                        'navbar__link--active'
                      )}
                    >
                      {item.label}
                    </a>
                    <span className="dropdown__trigger" aria-haspopup="true" aria-expanded="false" role="button" />
                  </div>
                  <ul className="dropdown__menu">
                    {item.items.map((subItem) => (
                      <li key={subItem.to}>
                        <a
                          className={clsx(
                            'dropdown__link',
                            isPathActive(subItem.to) && 'dropdown__link--active'
                          )}
                          href={subItem.to}
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            // Render a standard link
            return (
            <a
              key={item.to}
              className={clsx(
                'navbar__item',
                'navbar__link',
                isPathActive(item.to) && 'navbar__link--active'
              )}
              href={item.to}
            >
              {item.label}
            </a>
            );
          })
        ) : (
          <span>No items to display</span> // Fallback message
        )}
      </div>
      <div className="navbar__items navbar__items--right">
        <div className="navbarSearchContainer">
          <SearchBar />
        </div>
      </div>
    </>
  );
}

export default function Navbar(): JSX.Element {
  return (
    <NavbarLayout>
      <div className="navbar__brand">
        <MobileSidebarToggle />
        <a className="navbar__logo" href="/">
          <img src="/img/jupiter-logo.svg" alt="Jupiter Logo" className="themedImage..." height="28" width="28" />
        </a>
        <a href="/" className="navbar__title mobile-hidden">
          <span>Jupiter Develop</span>
        </a>
      </div>
      <CustomNavbarContent />
    </NavbarLayout>
  );
};