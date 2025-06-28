import React from "react";
import { styles } from "./styles";

export default function ContactInfo() {
  const contacts = [
    "Thirty Mighty Men Ministries",
    "P.O. BOX #3",
    "Bivalve, MD 21814",
    "Telephone: (646) 519-1186",
    "Email: contact@30mmm.org",
  ];
  return (
    <section
      id="contact-info"
      className={styles.container}
    >
      <h2 className={styles.header}>12. Contact Information</h2>
      <p className={styles.pg}>
        If you have any questions, concerns, complaints or suggestions regarding
        our Privacy Policy or otherwise need to contact us, you may contact us
        at the contact information below or through the “Contact Us” page on or
        in our Digital Platform.
      </p>
      <h4 className={styles.contactheader}>How to Contact Us:</h4>
      <ul>
        {contacts.map((contact, index) => (
          <li
            key={index}
            className={styles.contactList}
          >
            {contact}
          </li>
        ))}
      </ul>
    </section>
  );
}
