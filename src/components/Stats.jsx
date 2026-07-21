import { useSiteData } from '../context/SiteDataContext';

const iconMap = {
  home: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  male: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  female: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11a4 4 0 100-8 4 4 0 000 8zM8 21v-5a4 4 0 014-4h0a4 4 0 014 4v5M12 15v6" />
    </svg>
  ),
};

export default function Stats() {
  const { stats, loading } = useSiteData();

  if (loading) {
    return <div className="h-32 animate-pulse bg-gray-50 rounded-2xl w-full"></div>;
  }

  if (!stats || stats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
      {stats.map((stat, idx) => (
        <div key={stat.id || idx} className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0">
          <div className="w-12 h-12 rounded-full bg-warm-100 text-twilight-600 flex items-center justify-center mb-4">
            {iconMap[stat.icon] || iconMap.home}
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
            {stat.value}
          </div>
          <div className="text-sm font-bold text-gray-800 mb-1">{stat.label}</div>
          <div className="text-xs text-gray-500">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}
