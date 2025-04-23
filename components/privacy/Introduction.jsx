import React from "react";
import { styles } from "./styles";

export default function Introduction() {
  const collectionSources = [
    "on our Digital Platform;",
    "in email, text, and other electronic messages between you and our Digital Platform;",
    "when you interact with our advertising and applications on third party websites and services, if those applications or advertising include links to this policy.",
  ];

  const excludedCollectionSources = [
    "us offline or through any other means, including on any other website operated by Company or any third party;",
    "any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Digital Platform.",
  ];

  return (
    <section
      id="introduction"
      className={styles.container}
    >
      <h2 className={styles.header}>1. Introduction</h2>
      <p className={styles.pg}>
        This Privacy Policy describes how Company collects and uses Personal
        Data about you through the use of our Website, mobile applications, and
        through email, text, and other electronic communications between you and
        Company.
      </p>
      <p className={styles.pg}>
        Thirty Mighty Men Ministries, Inc. (“<b>Company</b>,” or “<b>we</b>,” “
        <b>our</b>,” or “<b>us</b>”) respects your privacy, and we are committed
        to protecting it through our compliance with this Privacy Policy.
      </p>
      <p className={styles.pg}>
        This Privacy Policy (our “<b>Privacy Policy</b>”) describes the types of
        information we may collect from you or that you may provide when you
        visit or use our website located at{" "}
        <a
          href="https://www.thecleanprogram.org/"
          style={{ color: "blue" }}
        >
          www.thecleanprogram.org
        </a>
        ;{" "}
        <a
          href="https://www.30mmm.org/"
          style={{ color: "blue" }}
        >
          30mmm.org
        </a>{" "}
        (our “Website”) and our practices for collecting, using, maintaining,
        protecting, and disclosing that information. For purposes of this
        Privacy Policy, our Website, App and all related services and
        functionality that we provide through them are referred to as our “
        <b>Digital Platform</b>”.
      </p>
      <p className={styles.pg}>
        This policy applies to information we collect:
        <ul className={styles.list}>
          {collectionSources.map((source, index) => (
            <li
              key={index}
              className={styles.listItem}
            >
              {source}
            </li>
          ))}
        </ul>
      </p>
      <p className={styles.pg}>
        It does not apply to information collected by:
        <ul className={styles.list}>
          {excludedCollectionSources.map((source, index) => (
            <li
              key={index}
              className={styles.listItem}
            >
              {source}
            </li>
          ))}
        </ul>
      </p>
      <p className={styles.pg}>
        Please read this policy carefully to understand our policies and
        practices regarding your information and how we will treat it. If you do
        not agree with our policies and practices, your choice is not to use our
        Digital Platform. By accessing or using our Digital Platform, you agree
        to this Privacy Policy. This Privacy Policy may change from time to time
        (see{" "}
        <a
          href="#privacy-changes"
          style={{ color: "blue" }}
        >
          Changes to Our Privacy Policy
        </a>
        ). Your continued use of our Digital Platform after we make changes is
        deemed to be acceptance of those changes, so please check this Privacy
        Policy periodically for updates.
      </p>
    </section>
  );
}
