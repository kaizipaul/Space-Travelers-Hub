/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useToast } from './toast';
import { bookMission, cancelMission } from '../redux/missions/missions';

const Mission = ({ mission, index }) => {
  const dispatch = useDispatch();
  const notify = useToast();

  const bookAction = (id) => {
    dispatch(bookMission(id));
    notify(`You joined ${mission.mission_name}`);
  };

  const cancelAction = (id) => {
    dispatch(cancelMission(id));
    notify(`You left ${mission.mission_name}`);
  };

  return (
    <li
      className="panel flex flex-col gap-5 p-5 transition duration-200 hover:border-accent-400/40 md:flex-row md:items-center md:p-6 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex-1">
        <p className="font-mono text-xs text-slate-500">{`MSN-${String(index + 1).padStart(2, '0')}`}</p>
        <h3 className="mt-1 text-lg font-semibold">{mission.mission_name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{mission.description}</p>
      </div>
      <div className="flex flex-row items-center justify-between gap-4 md:w-56 md:flex-col md:items-stretch md:justify-start">
        {mission.reserved ? (
          <span className="tag justify-center border-accent-400/50 text-accent-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Active member
          </span>
        ) : (
          <span className="tag justify-center border-line text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
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
            className="btn-primary"
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
