import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-white py-16 text-primary-red">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Ready to Transform Your Life?
        </h2>
        <p className="mb-8 text-xl">
          Join us in becoming men who lead with purpose, integrity, and faith.
        </p>
        <Link
          href="/SignUp"
          className="text-prmary-red rounded-md border-4 border-primary-red bg-white p-2 hover:bg-primary-red/90 hover:text-white"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}
