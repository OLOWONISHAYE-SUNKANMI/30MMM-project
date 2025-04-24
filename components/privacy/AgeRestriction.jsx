import React from "react";
import { styles } from "./styles";

export default function AgeRestriction() {
  return (
    <section
      id="age-restriction"
      className={styles.container}
    >
      <h2 className={styles.header}>2. Child Under the Age of 16</h2>
      <p className={styles.pg}>
        Our Digital Platform are not intended for children under the age of 16
        and children under the age of 16 are not permitted to use our Digital
        Platform. We will remove any information about a child under the age of
        16 if we become aware of it.
      </p>
      <p className={styles.pg}>
        Our Digital Platform are not intended for children under 16 years of
        age. No one under age 16 may provide any information to or through the
        Digital Platform. We do not knowingly collect Personal Data from
        children under 16. If you are under 16, do not use or provide any
        information on or in our Digital Platform or on or through any of their
        features, including your name, address, telephone number, email address,
        or any screen name or user name you may use. If we learn we have
        collected or received Personal Data from a child under 16 without
        verification of parental consent, we will delete that information. If
        you believe we might have any information from a child under 16, please
        contact us at contact@30mmm.org or call us at (646) 519-1186.
      </p>
    </section>
  );
}
