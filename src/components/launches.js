/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../redux/launches/launches';
import { FAILED } from '../redux/status/status';
import { useNow, breakdown } from './countdown';
import ErrorState from './errorState';
import PageHeader from './pageHeader';

const pad = (value) => String(value).padStart(2, '0');

const formatDate = (net) => new Date(net).toLocaleString(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
});

const statusClass = (status) => {
  if (status === 'Go') return 'border-accent-400/50 text-accent-300';
  if (status === 'Hold') return 'border-amber-400/50 text-amber-300';
  return 'border-line text-slate-500';
};

const StatusTag = ({ status }) => (
  <span className={`tag ${statusClass(status)}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {status}
  </span>
);

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="font-mono text-4xl font-semibold tabular-nums text-accent-300 sm:text-6xl">{value}</span>
    <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
  </div>
);

const Featured = ({ launch, now }) => {
  const t = breakdown(launch.net, now);
  return (
    <section className="panel overflow-hidden animate-fade-up">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Next launch</span>
            <StatusTag status={launch.status} />
          </div>
          <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{launch.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{`${launch.provider}${launch.location ? ` · ${launch.location}` : ''}`}</p>
          <time className="mt-auto pt-6 font-mono text-xs text-slate-500" dateTime={launch.net}>{formatDate(launch.net)}</time>
          <div className="mt-4 flex items-start gap-4 sm:gap-6" role="timer" aria-label={`Countdown to ${launch.name}`}>
            <span className="pt-1 font-mono text-xl text-slate-500 sm:pt-3 sm:text-3xl">{t.past ? 'T+' : 'T−'}</span>
            <Unit value={t.days} label="days" />
            <Unit value={pad(t.hours)} label="hrs" />
            <Unit value={pad(t.minutes)} label="min" />
            <Unit value={pad(t.seconds)} label="sec" />
          </div>
        </div>
        <div className="min-h-[12rem] border-t border-line md:border-t-0 md:border-l">
          {launch.image ? (
            <img className="h-full w-full object-cover saturate-75" src={launch.image} alt={`${launch.rocket || launch.name} launch`} />
          ) : (
            <div className="flex h-full min-h-[12rem] items-center justify-center font-mono text-xs text-slate-600">[ no image ]</div>
          )}
        </div>
      </div>
    </section>
  );
};

const LaunchRow = ({ launch, index, now }) => {
  const t = breakdown(launch.net, now);
  return (
    <li
      className="panel flex flex-col gap-4 p-5 transition duration-200 hover:border-accent-400/40 sm:flex-row sm:items-center animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs text-slate-500">{`L-${pad(index + 2)}`}</p>
          <StatusTag status={launch.status} />
        </div>
        <h3 className="mt-2 text-lg font-semibold">{launch.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{`${launch.provider}${launch.location ? ` · ${launch.location}` : ''}`}</p>
        <time className="mt-2 block font-mono text-xs text-slate-500" dateTime={launch.net}>{formatDate(launch.net)}</time>
      </div>
      <p className="font-mono text-lg tabular-nums text-accent-300 sm:text-right" role="timer" aria-label={`Countdown to ${launch.name}`}>
        {`${t.past ? 'T+' : 'T−'} ${t.days}d ${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`}
      </p>
    </li>
  );
};

const Launches = () => {
  const launches = useSelector((state) => state.launchesReducer);
  const status = useSelector((state) => state.statusReducer.launches);
  const dispatch = useDispatch();
  const now = useNow();

  useEffect(() => {
    if (!launches.length > 0) {
      dispatch(fetchLaunches());
    }
  }, []);

  if (status === FAILED && launches.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
        <ErrorState what="launches" onRetry={() => dispatch(fetchLaunches())} />
      </main>
    );
  }

  const [next, ...rest] = launches;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
      <PageHeader
        command="launches --upcoming"
        title="Upcoming launches"
        subtitle="Live countdowns to the next liftoffs around the world."
      />
      {launches.length === 0 ? (
        <div className="panel space-y-4 p-8" aria-hidden="true">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-8 w-1/2" />
          <div className="skeleton h-16 w-full" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Featured launch={next} now={now} />
          <ul className="flex flex-col gap-4">
            {rest.map((launch, i) => (
              <LaunchRow key={launch.id} launch={launch} index={i} now={now} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Launches;
