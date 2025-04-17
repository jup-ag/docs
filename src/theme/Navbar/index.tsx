import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import MobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import SearchBar from '@theme/SearchBar';
import { useNavbarItems, useNavigation } from '../../utils/navigation';

export default function Navbar(): JSX.Element {
  const location = useLocation();

  // Get navbar items and navigation utilities
  const { useNavbarItems, isNavItemActive, isDropdownItemActive } = useNavigation(location.pathname);
  const navbarItems = useNavbarItems();

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

      <div className="navbar__items">
        {navbarItems.length > 0 ? (
          navbarItems.map((item) => {
            if (item.items) {
              // Dropdown rendering
              return (
                <div key={item.label} className="navbar__item dropdown dropdown--hoverable">
                  <div className="navbar__link-wrapper">
                    <a
                      href={item.to}
                      className={clsx(
                        'navbar__link',
                        isNavItemActive(item) && 'navbar__link--active'
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
                            isDropdownItemActive(subItem.to) && 'dropdown__link--active'
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

            // Link rendering
            return (
              <a
                key={item.to}
                className={clsx(
                  'navbar__item',
                  'navbar__link',
                  isNavItemActive(item) && 'navbar__link--active'
                )}
                href={item.to}
              >
                {item.label}
              </a>
            );
          })
        ) : (
          <span>No items to display</span>
        )}
      </div>

      <div className="navbar__items navbar__items--right">
        <div className="navbarSearchContainer">
          <SearchBar />
        </div>
      </div>
    </NavbarLayout>
  );
}