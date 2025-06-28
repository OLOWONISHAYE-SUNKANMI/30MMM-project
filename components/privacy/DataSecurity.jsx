import React from "react";
import { styles } from "./styles";

export default function DataSecurity() {
  return (
    <section
      id="data-security"
      className={styles.container}
    >
      <h2 className={styles.header}>9. Data Security</h2>
      <p className={styles.pg}>
        Information transmitted over the Internet is not completely secure, but
        we do our best to protect your Personal Data. You can help protect your
        Personal Data and other information by keeping your password to our
        Digital Platform confidential.
      </p>
      <p className={styles.pg}>
        We have implemented measures designed to secure your Personal Data from
        accidental loss and from unauthorized access, use, alteration, and
        disclosure. We use encryption technology for information sent and
        received by us.
      </p>
      <p className={styles.pg}>
        The safety and security of your information also depends on you. Where
        you have chosen a password for the use of our Digital Platform, you are
        responsible for keeping this password confidential. We ask you not to
        share your password with anyone.
      </p>
      <p className={styles.pg}>
        Unfortunately, the transmission of information via the Internet is not
        completely secure. Although we do our best to protect your Personal
        Data, we cannot guarantee the security of your Personal Data transmitted
        to, on or through our Digital Platform. Any transmission of Personal
        Data is at your own risk. We are not responsible for circumvention of
        any privacy settings or security measures contained on the Website, in
        your operating system, or in the App.
      </p>
    </section>
  );
}
