import React from "react";
import { styles } from "./styles";

export default function Rights() {
  return (
    <section
      id="rights"
      className={styles.container}
    >
      <h2 className={styles.header}>
        7. Your Rights Regarding Your Information and Accessing and Correcting
        Your Information
      </h2>
      <p className={styles.pg}>
        You may contact us to access or change your Personal Data. You may also
        be able to review and change your personal information by logging into
        the Digital Service and visiting your Account Preferences page.
      </p>
      <p className={styles.pg}>
        You can Contact Us to access and/or find out what information we have
        about you, and to correct that information. You can also review and
        change your Personal Data by logging into our Digital Platform and
        visiting either the Settings or Account Preferences sections of our
        Digital Platform. You may also notify us through the{" "}
        <a
          href="#contact-info"
          style={{ color: "blue" }}
        >
          Contact Information
        </a>{" "}
        below of any changes or errors in any Personal Data we have about you to
        ensure that it is complete, accurate, and as current as possible or to
        delete your account. We cannot delete your personal information except
        by also deleting your account with us. We may also not be able to
        accommodate your request if we believe it would violate any law or legal
        requirement or cause the information to be incorrect.
      </p>
    </section>
  );
}
