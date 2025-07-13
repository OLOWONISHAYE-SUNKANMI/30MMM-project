import Copywright from "./Copywright";
import HelpAndSupportLinks from "./HelpAndSupportLinks";
import SocialButtons from "./SocialButtons";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-6 mt-8 bg-white border-t border-gray-200 sm:px-6 md:px-8 md:py-8 md:mt-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col space-y-8 md:flex-row md:justify-between md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <HelpAndSupportLinks />
            </div>
            <div className="w-full md:w-1/2">
              <SocialButtons />
            </div>
          </div>
          <div className="w-full">
            <Copywright />
          </div>
        </div>
      </div>
    </footer>
  );
}