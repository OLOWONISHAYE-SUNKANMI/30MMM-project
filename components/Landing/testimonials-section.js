export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Pastor Donovan, I truly appreciate you and your team. Being with you all feels like home. There's a rare and rich grace upon you that's undeniable. I've been in the trenches for a long time, and what you have is something special. Thank you for being a place of refuge and authenticity.",
      name: "Pastor Antonio, Zion Church",
    },
    {
      quote:
        "Yessir! Loooking forward to it fam. I know this will be transcending! Appreciate you and thankful that God chose you to have the courage to share what he revealed to you to bless the lives of use men!",
      name: "Luis Pesantes",
    },
    {
      quote:
        "I was dating with no purpose...it broke unholy convenants with women",
      name: "Clean Participant",
    },
  ];

  return (
    <section className="bg-primary-red py-12 sm:py-16 text-white">
      <div className="mx-auto px-4 sm:px-6 md:container">
        <h2 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
          What People Are Saying
        </h2>
        <p className="mb-8 sm:mb-12 text-center text-base sm:text-lg md:text-xl">
          These testimonials are kept anonymous for the privacy and safety of
          our community.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-4 sm:p-6 text-gray-800 shadow-md"
            >
              <blockquote className="mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                "{testimonial.quote}"
              </blockquote>
              <blockquote className="text-xs sm:text-sm font-medium">
                {testimonial.name}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
