import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rockets';
import Rocket from './rocket';
import ErrorState from './errorState';
import PageHeader from './pageHeader';
import { FAILED } from '../redux/status/status';

const SKELETON_COUNT = 6;

const Rockets = () => {
  const rockets = useSelector((state) => state.rocketsReducer);
  const status = useSelector((state) => state.statusReducer.rockets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!rockets.length > 0) {
      dispatch(fetchRockets());
    }
  }, []);

  if (status === FAILED && rockets.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
        <ErrorState what="rockets" onRetry={() => dispatch(fetchRockets())} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
      <PageHeader
        command="rockets --available"
        title="Choose your ride"
        subtitle="Reserve a rocket and get ready for liftoff."
      />
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rockets.length === 0
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <li key={i} className="panel overflow-hidden" aria-hidden="true">
              <div className="skeleton h-48 rounded-none" />
              <div className="space-y-3 p-5">
                <div className="skeleton h-5 w-2/3" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
              </div>
            </li>
          ))
          : rockets.map((rocket, i) => (
            <Rocket key={rocket.id} rocket={rocket} index={i} />
          ))}
      </ul>
    </main>
  );
};

export default Rockets;
