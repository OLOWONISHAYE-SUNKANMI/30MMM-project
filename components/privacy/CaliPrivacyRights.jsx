import React from "react";
import { styles } from "./styles";

export default function CaliPrivacyRights() {
  return (
    <section
      id="cali-privacy-rights"
      className={styles.container}
    >
      <h2 className={styles.header}>
        10. California Privacy Rights for California Residents
      </h2>
      <p className={styles.pg}>
        Under some circumstances, California law may provide you with the right
        to obtain a list of third parties (if any) that we provide your Personal
        Data to for their own direct marketing purposes.
      </p>
      <p className={styles.pg}>
        California Civil Code Section 1798.83 (California’s “
        <b>Shine the Light</b>” law) permits users of our Digital Platform that
        are California residents and who provide Personal Data in obtaining
        products and services for personal, family, or household use to request
        certain information regarding our disclosure of Personal Data to third
        parties for their own direct marketing purposes. If applicable, this
        information would include the categories of Personal Data and the names
        and addresses of those businesses with which we shared your Personal
        Data with for the immediately prior calendar year (e.g. requests made in
        2020 will receive information regarding such activities in 2019). You
        may request this information once per calendar year. To make such a
        request, please contact us using the Contact Information{" "}
        <a
          href="#contact-info"
          style={{ color: "blue" }}
        >
          Contact Us
        </a>{" "}
        below.
      </p>
    </section>
  );
}
