/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelBooking } from '../redux/rockets/rockets';
import { cancelMission } from '../redux/missions/missions';

const Section = ({ title, empty, children }) => (
  <section className="glass p-6">
    <h2 className="text-3xl font-bold">{title}</h2>
    <ul className="mt-6 flex flex-col gap-4">
      {children.length === 0 ? <li className="text-slate-400">{empty}</li> : children}
    </ul>
  </section>
);

const Profile = () => {
  const dispatch = useDispatch();

  const rocketState = useSelector((state) => state.rocketsReducer);
  const reservedRockets = rocketState.filter((rocket) => rocket.reserved).map((rocket) => (
    <li key={rocket.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-lg font-medium">{rocket.rocket_name}</h3>
      <button className="btn-danger" type="button" onClick={() => dispatch(cancelBooking(rocket.id))}>Cancel</button>
    </li>
  ));

  const missionState = useSelector((state) => state.missionsReducer);
  const reservedMissions = missionState.filter((mission) => mission.reserved).map((mission) => (
    <li key={mission.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-lg font-medium">{mission.mission_name}</h3>
      <button className="btn-danger" type="button" onClick={() => dispatch(cancelMission(mission.id))}>Leave</button>
    </li>
  ));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-10 text-4xl font-bold tracking-tight">Your flight deck</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Section title="My Rockets" empty="No rockets reserved yet.">{reservedRockets}</Section>
        <Section title="My Missions" empty="No missions joined yet.">{reservedMissions}</Section>
      </div>
    </main>
  );
};

export default Profile;
