import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../images/planet.png';

const linkClass = ({ isActive }) => `whitespace-nowrap rounded-full px-3 py-1.5 transition sm:px-4 ${
  isActive
    ? 'bg-neon-400/15 text-neon-300 shadow-neon'
    : 'text-slate-300 hover:text-neon-300'
}`;

const NavBar = () => (
  <header className="sticky top-0 z-10 border-b border-white/10 bg-space-900/70 backdrop-blur-lg">
    <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">
      <div className="flex items-center gap-3">
        <img className="h-10 w-auto drop-shadow-[0_0_8px_rgba(34,227,255,0.6)]" src={image} alt="Space Travelers' Hub logo" />
        <h1 className="text-2xl font-bold tracking-tight">
          Space Travelers&apos;
          {' '}
          <span className="text-neon-400">Hub</span>
        </h1>
      </div>
      <div className="flex items-center gap-1 text-[1.05rem] sm:gap-2">
        <NavLink className={linkClass} to="/">Rockets</NavLink>
        <NavLink className={linkClass} to="/missions">Missions</NavLink>
        <div className="mx-1 h-4 border-l border-white/20" />
        <NavLink className={linkClass} to="/myprofile">My Profile</NavLink>
      </div>
    </nav>
  </header>
);

export default NavBar;
