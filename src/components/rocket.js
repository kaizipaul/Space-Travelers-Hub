/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from './toast';
import { RocketIcon } from './icons';
import { bookRocket, cancelBooking } from '../redux/rockets/rockets';

const Rocket = ({ rocket, index }) => {
  const dispatch = useDispatch();
  const notify = useToast();
  const [launching, setLaunching] = useState(false);

  const cancelBookedRocket = (id) => {
    dispatch(cancelBooking(id));
    notify(`${rocket.rocket_name} reservation cancelled`);
  };

  const activateBooking = (id) => {
    dispatch(bookRocket(id));
    setLaunching(true);
    notify(`${rocket.rocket_name} reserved. Liftoff!`);
  };

  return (
    <li
      className="panel group flex flex-col overflow-hidden transition duration-200 hover:border-accent-400/50 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative overflow-hidden border-b border-line">
        <img
          src={rocket.flickr_images[0]}
          className="h-48 w-full object-cover saturate-75 transition duration-500 group-hover:scale-105 group-hover:saturate-100"
          alt={`${rocket.rocket_name} rocket`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        <span className="tag absolute top-3 left-3 border-line bg-ink-950/80 text-slate-400">
          {`#${String(index + 1).padStart(2, '0')}`}
        </span>
        {rocket.reserved && (
          <span className="tag absolute top-3 right-3 border-accent-400/50 bg-ink-950/80 text-accent-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Reserved
          </span>
        )}
        {launching && (
          <RocketIcon
            className="pointer-events-none absolute bottom-3 left-1/2 h-10 w-10 -translate-x-1/2 animate-launch text-accent-300"
            onAnimationEnd={() => setLaunching(false)}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold">{rocket.rocket_name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{rocket.description}</p>
        {rocket.reserved ? (
          <button
            className="btn-secondary mt-5"
            type="button"
            onClick={() => cancelBookedRocket(rocket.id)}
          >
            Cancel Reservation
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary mt-5"
            onClick={() => activateBooking(rocket.id)}
          >
            Reserve Rocket
          </button>
        )}
      </div>
    </li>
  );
};

export default Rocket;
