/* eslint-disable react/prop-types */
const PageHeader = ({ command, title, subtitle }) => (
  <header className="mb-10">
    <p className="eyebrow">
      {`$ ${command}`}
      <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-accent-400" aria-hidden="true" />
    </p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
  </header>
);

export default PageHeader;
