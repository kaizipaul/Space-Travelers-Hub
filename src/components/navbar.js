import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../images/planet.png';
import {
  RocketIcon, MissionIcon, LaunchIcon, ProfileIcon,
} from './icons';

const links = [
  { to: '/', label: 'Rockets', Icon: RocketIcon },
  { to: '/missions', label: 'Missions', Icon: MissionIcon },
  { to: '/launches', label: 'Launches', Icon: LaunchIcon },
  { to: '/myprofile', label: 'Profile', Icon: ProfileIcon },
];

const desktopClass = ({ isActive }) => `rounded-md px-3 py-1.5 text-sm font-medium transition ${
  isActive ? 'bg-accent-400/10 text-accent-300' : 'text-slate-400 hover:text-slate-100'
}`;

const mobileClass = ({ isActive }) => `relative flex flex-1 flex-col items-center gap-1 py-2.5 font-mono text-[10px] uppercase tracking-wider transition ${
  isActive ? 'text-accent-300' : 'text-slate-500'
}`;

const NavBar = () => (
  <>
    <header className="sticky top-0 z-10 border-b border-line bg-ink-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5" aria-label="Main">
        <div className="flex items-center gap-3">
          <img className="h-8 w-auto invert" src={image} alt="Space Travelers' Hub logo" />
          <h1 className="text-lg font-semibold tracking-tight">
            Space Travelers&apos; Hub
          </h1>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label }) => (
            <NavLink key={to} className={desktopClass} to={to}>{label}</NavLink>
          ))}
        </div>
      </nav>
    </header>
    <nav
      className="fixed inset-x-0 bottom-0 z-10 flex border-t border-line bg-ink-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Primary"
    >
      {links.map(({ to, label, Icon }) => (
        <NavLink key={to} className={mobileClass} to={to}>
          {({ isActive }) => (
            <>
              {isActive && <span className="absolute inset-x-6 top-0 h-px bg-accent-400" />}
              <Icon className="h-5 w-5" />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  </>
);

export default NavBar;
