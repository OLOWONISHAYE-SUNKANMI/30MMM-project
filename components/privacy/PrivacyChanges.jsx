import React from "react";
import { styles } from "./styles";

export default function PrivacyChanges() {
  return (
    <section
      id="privacy-changes"
      className={styles.container}
    >
      <h2 className={styles.header}>11. Changes to Our Privacy Policy</h2>
      <p className={styles.pg}>
        We will post any changes to our Privacy Policy on our Website. If we
        make material changes to our Privacy Policy, we may notify you of such
        changes through your contact information and invite you to review (and
        accept, if necessary) the changes.
      </p>
      <p className={styles.pg}>
        We may change this Privacy Policy at any time. It is our policy to post
        any changes we make to our Privacy Policy on this page with a notice
        that the Privacy Policy has been updated on the Website’s home page or
        the App’s home screen. If we make material changes to how we treat our
        users’ Personal Data, we will notify you by email to the email address
        specified in your account and/or through a notice on the Website’s home
        page or the App’s home screen. The date this Privacy Policy was last
        revised is identified at the top of the page. You are responsible for
        ensuring we have an up-to-date active and deliverable email address for
        you, and for periodically accessing the App or visiting our Website and
        reviewing this Privacy Policy to check for any changes.
      </p>
    </section>
  );
}
