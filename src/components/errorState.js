/* eslint-disable react/prop-types */
const ErrorState = ({ what, onRetry }) => (
  <div className="glass mx-auto max-w-md p-8 text-center" role="alert">
    <p className="text-4xl" aria-hidden="true">🛰️</p>
    <h3 className="mt-4 text-2xl font-bold">Signal lost</h3>
    <p className="mt-2 text-slate-400">{`We couldn't reach mission control for ${what}. Check your connection and try again.`}</p>
    <button className="btn-neon mt-6" type="button" onClick={onRetry}>Retry transmission</button>
  </div>
);

export default ErrorState;
