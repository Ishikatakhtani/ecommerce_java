import React from 'react'
import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavItem,
  CNavTitle,
} from '@coreui/react'
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilLayers, cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <CSidebar className="border-end" unfoldable style={{
          background: 'linear-gradient(90deg, #0066ff, #00c897)',
          
        }}>
         <CSidebarHeader className="border-bottom">
  <Link to="/" className="d-flex align-items-center text-white text-decoration-none" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
    <i className="fas fa-store me-2" />
    Plume
  </Link>
</CSidebarHeader>
      <CSidebarNav>
     
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="/dashboard">
          
          <MdSpaceDashboard className="nav-icon" /> Dashboard

        </CNavItem>
        <CNavItem href="/admin/orders">
         <FaBoxOpen className="nav-icon" />  Admin Orders{' '}
          {/* <CBadge color="primary ms-auto">NEW</CBadge> */}
        </CNavItem>
         <CNavItem href="/product">
          <CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Add Products
        </CNavItem>
        <CNavItem href="/products">
          <CIcon customClassName="nav-icon" icon={cilLayers} /> Show products
        </CNavItem>
       
       
        <CNavGroup
        onClick={handleLogout}
          toggler={
            <>
            <HiOutlineLogout className="nav-icon" />logout
            </>
          }
        >
          {/* <CNavItem href="#">
            <span className="nav-icon">
              
              <span ><HiOutlineLogout /></span>
            </span>{' '}
            Logout
          </CNavItem>
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Nav dropdown item
          </CNavItem> */}
        </CNavGroup>
       
      </CSidebarNav>
    </CSidebar>
  )
}
export default Sidebar;