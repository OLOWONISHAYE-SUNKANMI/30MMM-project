import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-white py-4 2xs:py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 text-primary-red">
      <div className="w-full max-w-7xl mx-auto px-2 2xs:px-3 xs:px-4 sm:px-6 md:px-8 text-center">
        <h2 className="mb-2 2xs:mb-3 xs:mb-4 sm:mb-6 md:mb-8 text-base 2xs:text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight 2xs:leading-snug sm:leading-normal">
          Ready to Transform Your Life?
        </h2>
        <p className="mb-3 2xs:mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 text-xs 2xs:text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs 2xs:max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed">
          Join us in becoming men who lead with purpose, integrity, and faith.
        </p>
        <Link
          href="/individuals"
          className="inline-block text-primary-red rounded border-2 md:border-4 border-primary-red bg-white px-2 2xs:px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 2xs:py-2 xs:py-2.5 sm:py-3 md:py-4 text-xs 2xs:text-sm xs:text-base sm:text-lg md:text-xl font-medium hover:bg-primary-red/90 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}
