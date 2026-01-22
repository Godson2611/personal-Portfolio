/** @format */

import React from "react";
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  ToggleButton,
  MobileLink,
} from "./NavbarStyledComponent";
import { IoLogoIonic } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { Bio } from "../../data/constants";
import { useTheme } from "styled-components";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>
          <NavLink
            to='/'
            style={{
              display: "flex",
              alignItems: "center",
              color: darkMode ? "white" : "black",
              marginBottom: "20",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <IoLogoIonic size='3rem' /> <Span>Portfolio</Span>
          </NavLink>
        </NavLogo>
        <MobileIcon>
          <FaBars
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </MobileIcon>
        <NavItems>
          <NavLink href='#about'>About</NavLink>
          <NavLink href='#skills'>Skills</NavLink>
          <NavLink href='#experience'>certificate</NavLink>
          <NavLink href='#projects'>Projects</NavLink>
          <NavLink href='#education'>Education</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target='_blank'>
            Github Profile
          </GitHubButton>
          <ToggleButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </ToggleButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink
              href='#about'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              About
            </MobileLink>
            <MobileLink
              href='#skills'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Skills
            </MobileLink>
            <MobileLink
              href='#experience'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              certificate
            </MobileLink>
            <MobileLink
              href='#projects'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Projects
            </MobileLink>
            <MobileLink
              href='#education'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Education
            </MobileLink>
            <GitHubButton
              style={{
                padding: "10px 16px",
                background: `${theme.primary}`,
                color: "white",
                width: "max-content",
              }}
              href={Bio.github}
              target='_blank'
            >
              Github Profile
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
