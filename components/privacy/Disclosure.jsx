import React from "react";
import Link from "next/link";
import { styles } from "./styles";

export default function Disclosure() {
  const disclosures = [
    "our affiliates and third party service providers that we use to support our business;",
    "to a company we merge, acquire, or that buys us, or in the event of change in structure of our company of any form;",
    "to comply with our legal obligations;",
    "to affiliates and third parties for their own commercial purposes;",
    "to enforce our rights; and",
    "with your consent.",
  ];

  const disclosures2 = [
    "to affiliates, contractors, service providers, and other third parties we use to support our business. The services provided by these organizations include providing IT and infrastructure support services, and ordering, marketing, and payment processing services;",
    "to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Company about our Digital Platform users are among the assets transferred;",
    "to fulfill the purpose for which you provide it;",
    "for any other purpose disclosed by us when you provide the information;",
    "with your consent.",
  ];

  const disclosures3 = [
    {
      text: "to comply with any court order, law, or legal process, including to respond to any government or regulatory request;",
    },
    {
      text: "to affiliates and third parties to market their products or services to you if you have not opted out of these disclosures. For more information, see ",
      linkText: "Choices About How We Use and Disclose Your Information",
      linkHref: "#opt-out",
      suffix: "; ",
    },
    {
      text: "to enforce or apply our",
      linkText2: " Terms of Use",
      linkHref2: "/terms",
      suffix2:
        " and other agreements, including for billing and collection purposes; and",
    },
    {
      text: "if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Company, our customers, or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.",
    },
  ];
  return (
    <section
      id="disclosure"
      className={styles.container}
    >
      <h2 className={styles.header}>5. Disclosure of Your Information</h2>
      <p className={styles.pg}>
        We do not share, sell, or otherwise disclose your Personal Data for
        purposes other than those outlined in this Privacy Policy. We disclose
        your Personal Data to a few third parties, including:
      </p>
      <ul className={styles.list}>
        {disclosures.map((disclosure, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {disclosure}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>
        We do not share, sell, or otherwise disclose your Personal Data for
        purposes other than those outlined in this Privacy Policy. However, we
        may disclose aggregated information about our users, and information
        that does not identify any individual, without restriction.{" "}
      </p>

      <p className={styles.pg}>
        We may disclose Personal Data that we collect or you provide as
        described in this privacy policy:
      </p>
      <ul className={styles.list}>
        {disclosures2.map((disclosure, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {disclosure}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>We may also disclose your Personal Data:</p>
      <ul className={styles.list}>
        {disclosures3.map((disclosure, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {disclosure.text && (
              <span dangerouslySetInnerHTML={{ __html: disclosure.text }} />
            )}
            {disclosure.linkText && (
              <>
                <Link
                  href={disclosure.linkHref}
                  style={{ color: "blue" }}
                >
                  {disclosure.linkText}
                </Link>
                {disclosure.suffix}
              </>
            )}
            {disclosure.linkText2 && (
              <>
                <Link
                  href={disclosure.linkHref2}
                  style={{ color: "blue" }}
                >
                  {disclosure.linkText2}
                </Link>
                {disclosure.suffix2}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
