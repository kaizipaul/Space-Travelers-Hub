/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { bookRocket, cancelBooking } from '../redux/rockets/rockets';

const Rocket = ({ rocket, index }) => {
  const dispatch = useDispatch();

  const cancelBookedRocket = (id) => {
    dispatch(cancelBooking(id));
  };

  const activateBooking = (id) => {
    dispatch(bookRocket(id));
  };

  return (
    <li
      className="glass group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-neon-400/50 hover:shadow-neon animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={rocket.flickr_images[0]}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
          alt={`${rocket.rocket_name} rocket`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
        {rocket.reserved && (
          <span className="absolute top-3 right-3 rounded-full bg-neon-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-space-900 shadow-neon">
            Reserved
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-bold">{rocket.rocket_name}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-slate-300">{rocket.description}</p>
        {rocket.reserved ? (
          <button
            className="btn-ghost mt-5"
            type="button"
            onClick={() => cancelBookedRocket(rocket.id)}
          >
            Cancel Reservation
          </button>
        ) : (
          <button
            type="button"
            className="btn-neon mt-5"
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
