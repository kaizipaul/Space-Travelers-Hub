/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { bookMission, cancelMission } from '../redux/missions/missions';

const Mission = ({ mission, index }) => {
  const dispatch = useDispatch();

  const bookAction = (id) => {
    dispatch(bookMission(id));
  };

  const cancelAction = (id) => {
    dispatch(cancelMission(id));
  };

  return (
    <li
      className="glass flex flex-col gap-5 p-6 transition duration-300 hover:border-neon-400/40 md:flex-row md:items-center animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold">{mission.mission_name}</h3>
        <p className="mt-2 leading-relaxed text-slate-300">{mission.description}</p>
      </div>
      <div className="flex flex-row items-center gap-4 md:w-72 md:flex-col md:items-stretch">
        {mission.reserved ? (
          <span className="rounded-full bg-neon-400/15 px-3 py-1 text-center text-sm font-semibold uppercase tracking-wider text-neon-300">
            Active Member
          </span>
        ) : (
          <span className="rounded-full bg-white/10 px-3 py-1 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
            Not a member
          </span>
        )}
        {mission.reserved ? (
          <button
            className="btn-danger"
            type="button"
            onClick={() => cancelAction(mission.id)}
          >
            Leave Mission
          </button>
        ) : (
          <button
            className="btn-neon"
            type="button"
            onClick={() => bookAction(mission.id)}
          >
            Join Mission
          </button>
        )}
      </div>
    </li>
  );
};

export default Mission;
