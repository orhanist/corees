const testimonials = [
  {
    quote:
      "CORE gave my daughter confidence and structure. Her grades and motivation improved in just one semester.",
    author: "Parent, Chantilly",
  },
  {
    quote: "The mentors helped me prepare for college applications and scholarships in a way school alone could not.",
    author: "Student Participant",
  },
  {
    quote:
      "This organization creates meaningful opportunities for students while building real community support around families.",
    author: "Community Partner",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900">What Families Say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.author} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <blockquote className="text-sm leading-6 text-gray-700">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-[var(--primary)]">{item.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
