import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../redux/missions/missions';
import Mission from './mission';
import ErrorState from './errorState';
import PageHeader from './pageHeader';
import { FAILED } from '../redux/status/status';

const SKELETON_COUNT = 5;

const Missions = () => {
  const missions = useSelector((state) => state.missionsReducer);
  const status = useSelector((state) => state.statusReducer.missions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!missions.length > 0) {
      dispatch(fetchMissions());
    }
  }, []);

  if (status === FAILED && missions.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
        <ErrorState what="missions" onRetry={() => dispatch(fetchMissions())} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
      <PageHeader
        command="missions --list"
        title="Mission briefings"
        subtitle="Join a mission and become part of the crew."
      />
      <ul className="flex flex-col gap-4">
        {missions.length === 0
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <li key={i} className="panel space-y-3 p-6" aria-hidden="true">
              <div className="skeleton h-5 w-1/3" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-4/5" />
            </li>
          ))
          : missions.map((mission, i) => (
            <Mission key={mission.id} mission={mission} index={i} />
          ))}
      </ul>
    </main>
  );
};

export default Missions;
