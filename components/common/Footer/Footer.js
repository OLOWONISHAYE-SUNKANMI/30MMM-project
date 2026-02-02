import Copywright from "./Copywright";
import HelpAndSupportLinks from "./HelpAndSupportLinks";
import SocialButtons from "./SocialButtons";

export default function Footer() {
  return (
    <footer className="w-full px-3 xs:px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 mt-6 sm:mt-8 md:mt-10 bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col space-y-6 sm:space-y-8 md:flex-row md:justify-between md:space-y-0 md:space-x-4">
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