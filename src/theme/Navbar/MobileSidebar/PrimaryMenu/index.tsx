import React from 'react';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import { useNavigation } from '../../../../utils/navigation';

export default function NavbarMobileSidebarPrimaryMenu(): JSX.Element {
  const location = useLocation();
  
  // Use the same navigation hook as the main navbar
  const { useNavbarItems, isNavItemActive, isDropdownItemActive } = useNavigation(location.pathname);
  const navbarItems = useNavbarItems();

  return (
    <div className="menu">
      <ul className="menu__list">
        {navbarItems.length > 0 ? (
          navbarItems.map((item) => {
            if (item.items) {
              return (
                <li key={item.label} className="menu__list-item">
                  <a
                    href={item.to}
                    className={clsx(
                      'menu__link',
                      isNavItemActive(item) && 'menu__link--active'
                    )}
                  >
                    {item.label}
                  </a>
                  <ul className="menu__list">
                    {item.items.map((subItem) => (
                      <li key={subItem.to} className="menu__list-item">
                        <a
                          className={clsx(
                            'menu__link',
                            isDropdownItemActive(subItem.to) && 'menu__link--active'
                          )}
                          href={subItem.to}
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.to} className="menu__list-item">
                <a
                  className={clsx(
                    'menu__link',
                    isNavItemActive(item) && 'menu__link--active'
                  )}
                  href={item.to}
                >
                  {item.label}
                </a>
              </li>
            );
          })
        ) : (
          <li className="menu__list-item">No items to display</li>
        )}
      </ul>
    </div>
  );
}