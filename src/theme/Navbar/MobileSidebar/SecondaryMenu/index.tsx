import React from 'react';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import { useNavigation } from '../../../../utils/navigation';

function SecondaryMenuBackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="clean-btn navbar-sidebar__back"
      onClick={onClick}
    >
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu"
      >
        ← Back to main menu
      </Translate>
    </button>
  );
}

export default function NavbarMobileSidebarSecondaryMenu(): JSX.Element | null {
  const location = useLocation();
  const secondaryMenu = useNavbarSecondaryMenu();
  
  // Use the navigation hook to check if we have primary menu items
  const { useNavbarItems } = useNavigation(location.pathname);
  const navbarItems = useNavbarItems();
  const primaryMenuExists = navbarItems.length > 0;

  return (
    <>
      {primaryMenuExists && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      {secondaryMenu.content}
    </>
  );
}
