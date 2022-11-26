import React from "react";
import { StylesComponents, StylesLayout } from "./LayoutStyles";
import { Navigationbar } from "./SideBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <StylesLayout>
      <Navigationbar />
      <StylesComponents>{props.children}</StylesComponents>
    </StylesLayout>
  );
};

export default Layout;
