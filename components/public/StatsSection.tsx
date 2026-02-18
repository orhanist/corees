const stats = [
  { label: "Students Served", value: "1,500+" },
  { label: "Volunteer Mentors", value: "120+" },
  { label: "Programs Delivered", value: "35+" },
  { label: "Years of Impact", value: "8+" },
];

export function StatsSection() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-[var(--primary)] md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
