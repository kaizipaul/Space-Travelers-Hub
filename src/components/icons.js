/* eslint-disable react/prop-types */
const Icon = ({ className = 'h-5 w-5', onAnimationEnd, children }) => (
  <svg
    className={className}
    onAnimationEnd={onAnimationEnd}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const RocketIcon = ({ className, onAnimationEnd }) => (
  <Icon className={className} onAnimationEnd={onAnimationEnd}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Icon>
);

export const MissionIcon = ({ className, onAnimationEnd }) => (
  <Icon className={className} onAnimationEnd={onAnimationEnd}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <path d="M4 22v-7" />
  </Icon>
);

export const ProfileIcon = ({ className, onAnimationEnd }) => (
  <Icon className={className} onAnimationEnd={onAnimationEnd}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const AlertIcon = ({ className, onAnimationEnd }) => (
  <Icon className={className} onAnimationEnd={onAnimationEnd}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </Icon>
);

export const LaunchIcon = ({ className, onAnimationEnd }) => (
  <Icon className={className} onAnimationEnd={onAnimationEnd}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
);
