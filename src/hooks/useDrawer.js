import { useCallback, useState } from "react";

const useDrawer = (props) => {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [drawerWidth] = useState(280);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return {
    window,
    container,
    drawerWidth,
    mobileOpen,
    handleDrawerToggle
  }
};

export default useDrawer;