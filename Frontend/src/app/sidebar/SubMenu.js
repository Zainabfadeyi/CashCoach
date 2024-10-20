import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import styles from './Sidebar.module.css';

const SidebarLink = styled(Link)`
  display: flex;
  color: ${props => (props.isActive ? '#f5f5f5' : '#000')};
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  
  margin-bottom: 10px;
  list-style: none;
  text-decoration: none;
  font-size: 18px;
  background: ${props => (props.isActive ? '#252831' : 'transparent')};
  border-left: ${props => (props.isActive ? '3px solid #632ce4' : 'none')};
  
  &:hover {
    background: #252831;
    border-left: 3px solid #632ce4;
    cursor: pointer;
    color: #f5f5f5;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
 height: 40px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color:${props => (props.isActive ? '#f5f5f5' : '#000')};
  font-size: 16px;
  margin-bottom:10px;
  margin-top: 10px;
  background: ${props => (props.isActive ? '#632ce4' : 'transparent')};

  &:hover {
    background: #632ce4;
    cursor: pointer;
    color: #f5f5f5;
  }
`;

const SubMenu = ({ item, activeLink, setActiveLink }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {item.subNav ? (
        <div
          className={`${styles.sidebarItem} ${subnav ? styles.open : ''}`}
          onClick={showSubnav}
          style={{ padding:"20px 22px", fontSize: '18px', cursor: 'pointer', justifyContent: 'space-between', display:"flex"}}
        >
          <div style={{display:"flex" , alignItems:"center"}}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </div>
          <div>
            {subnav ? item.iconOpened : item.iconClosed}
          </div>
        </div>
      ) : (
        <SidebarLink
          to={item.path}
          isActive={activeLink === item.path}
          onClick={() => {
            setActiveLink(item.path);
            setActiveLink(item.title); // Set active link with the title
          }}
          
        >
          <div style={{display:"flex",marginLeft:"10px", alignItems:"center"}}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </div>
        </SidebarLink>
      )}
      {subnav && item.subNav && item.subNav.map((subItem, index) => (
        <DropdownLink
          to={subItem.path}
          key={index}
          isActive={activeLink === subItem.path}
          onClick={() => {
            setActiveLink(subItem.path);
            setActiveLink(subItem.title); // Set active link with sub-item title
          }}
        >
          <div style={{display:"flex"}}>
          {subItem.icon}
          <SidebarLabel>{subItem.title}</SidebarLabel>
          </div>
        </DropdownLink>
      ))}
    </>
  );
};
export default SubMenu