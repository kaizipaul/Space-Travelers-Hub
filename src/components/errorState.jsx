/* eslint-disable react/prop-types */
import { AlertIcon } from './icons';

const ErrorState = ({ what, onRetry }) => (
  <div className="panel mx-auto max-w-md p-8 text-center" role="alert">
    <AlertIcon className="mx-auto h-8 w-8 text-rose-300" />
    <p className="eyebrow mt-4 text-rose-300">ERR_NO_SIGNAL</p>
    <h3 className="mt-2 text-2xl font-semibold">Signal lost</h3>
    <p className="mt-2 text-slate-400">{`We couldn't reach mission control for ${what}. Check your connection and try again.`}</p>
    <button className="btn-primary mt-6" type="button" onClick={onRetry}>Retry transmission</button>
  </div>
);

export default ErrorState;
