import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../redux/missions/missions';
import Mission from './mission';

const SKELETON_COUNT = 5;

const Missions = () => {
  const missions = useSelector((state) => state.missionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!missions.length > 0) {
      dispatch(fetchMissions());
    }
  }, []);
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-4xl font-bold tracking-tight">Mission briefings</h2>
      <p className="mt-2 mb-10 text-slate-400">Join a mission and become part of the crew.</p>
      <ul className="flex flex-col gap-6">
        {missions.length === 0
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <li key={i} className="glass space-y-3 p-6" aria-hidden="true">
              <div className="skeleton h-6 w-1/3" />
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
