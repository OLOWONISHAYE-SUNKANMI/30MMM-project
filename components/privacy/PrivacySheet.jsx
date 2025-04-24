import React from "react";
import AgeRestriction from "./AgeRestriction";
import CaliPrivacyRights from "./CaliPrivacyRights";
import ContactInfo from "./ContactInfo";
import DataCollection from "./DataCollection";
import DataSecurity from "./DataSecurity";
import DataUse from "./DataUse";
import Disclosure from "./Disclosure";
import Header from "./Header";
import Introduction from "./Introduction";
import OptOut from "./OptOut";
import PrivacyChanges from "./PrivacyChanges";
import Rights from "./Rights";
import Tracking from "./Tracking";

export default function PrivacySheet() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Header />
      <Introduction />
      <AgeRestriction />
      <DataCollection />
      <DataUse />
      <Disclosure />
      <OptOut />
      <Rights />
      <Tracking />
      <DataSecurity />
      <CaliPrivacyRights />
      <PrivacyChanges />
      <ContactInfo />
    </div>
  );
}
