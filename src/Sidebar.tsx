import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

import sidebarItems from "./sidebar-items.json";

// Types
type Item = {
  name: string,
  link: string,
  children?: Item[]
}

type SidebarProps = {
  items: Item[]
}

// Styles
const Root = styled.div`
  width: 10%;
  height: 100%;
  background-color: #33373f;
  position: fixed;
  padding: 20px;
  color: white;
  z-index: 999;
  > ul:first-of-type {
    padding-left: 0px !important;
  }
  > div {
    margin-bottom: 20px;
  }
  @media (max-width: 1700px) {
    width: 20%;
  }

  @media(max-width: 1360px) {
    width: 100%;
    padding: 10px;
  }
`;

const Collapsed = styled(Root)`
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  top: 10px;
  left: 10px;
  > div {
    margin-bottom: 0px;
  }

  @media (max-width: 1700px) {
    width: auto;
  }

  @media (max-width: 1360px) {
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 0;
  }
`;

const Toggle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  div {
    width: 80%;
    height: 4px;
    border-radius: 5px;
    background-color: white;
  }
  :hover {
    cursor: pointer;
  }
`;

const Sidebar = (props: SidebarProps) => {
  let mobile = false;
  if (window.innerWidth < 1360) mobile = true;
  const [collapsed, toggle] = useState(mobile);

  const location = useLocation();
  useEffect(() => {
    if (mobile) toggle(true);
  }, [location, mobile]);

  if (collapsed) {
    return (
      <Collapsed>
        <Toggle onClick={() => toggle(!collapsed)}><div /><div /><div /></Toggle>
      </Collapsed>
    );
  } else {
    const items = sidebarItems.map((item, index) => (
      <SidebarItem key={index} item={item} />
    ));

    return (
      <Root>
        <Toggle onClick={() => toggle(!collapsed)}><div /><div /><div /></Toggle>
        {items}
      </Root>
    );
  }
}

export default Sidebar;
