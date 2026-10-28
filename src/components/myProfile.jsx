/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelBooking } from '../redux/rockets/rockets';
import { cancelMission } from '../redux/missions/missions';
import PageHeader from './pageHeader';

const Section = ({
  title, count, empty, children,
}) => (
  <section className="panel p-6">
    <div className="flex items-baseline justify-between">
      <h3 className="text-xl font-semibold">{title}</h3>
      <span className="font-mono text-sm text-accent-400">{String(count).padStart(2, '0')}</span>
    </div>
    <ul className="mt-5 flex flex-col gap-3">
      {count === 0 ? <li className="font-mono text-sm text-slate-500">{empty}</li> : children}
    </ul>
  </section>
);

const Profile = () => {
  const dispatch = useDispatch();

  const rocketState = useSelector((state) => state.rocketsReducer);
  const rocketsReserved = rocketState.filter((rocket) => rocket.reserved);
  const reservedRockets = rocketsReserved.map((rocket) => (
    <li key={rocket.id} className="flex items-center justify-between gap-4 rounded-md border border-line bg-ink-800 p-3 pl-4">
      <h4 className="font-medium">{rocket.rocket_name}</h4>
      <button className="btn-danger" type="button" onClick={() => dispatch(cancelBooking(rocket.id))}>Cancel</button>
    </li>
  ));

  const missionState = useSelector((state) => state.missionsReducer);
  const missionsReserved = missionState.filter((mission) => mission.reserved);
  const reservedMissions = missionsReserved.map((mission) => (
    <li key={mission.id} className="flex items-center justify-between gap-4 rounded-md border border-line bg-ink-800 p-3 pl-4">
      <h4 className="font-medium">{mission.mission_name}</h4>
      <button className="btn-danger" type="button" onClick={() => dispatch(cancelMission(mission.id))}>Leave</button>
    </li>
  ));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
      <PageHeader command="whoami" title="Your flight deck" subtitle="Everything you've reserved or joined." />
      <div className="grid gap-6 md:grid-cols-2">
        <Section title="My Rockets" count={rocketsReserved.length} empty="// no rockets reserved yet">{reservedRockets}</Section>
        <Section title="My Missions" count={missionsReserved.length} empty="// no missions joined yet">{reservedMissions}</Section>
      </div>
    </main>
  );
};

export default Profile;
