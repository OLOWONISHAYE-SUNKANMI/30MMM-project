import React from "react";
import { styles } from "./styles";

export default function DataUse() {
  const uses = [
    "provide our Digital Platform to you;",
    "provide products and services to you;",
    "provide you with information you request from us;",
    "enforce our rights arising from contracts;",
    "notify you about changes; and",
    "provide you with notices about your account.",
  ];

  const uses2 = [
    "to provide our Website and its functionality, contents and services to;",
    "to provide our App and its functionality, contents and services;",
    "to provide our products and services to you;",
    "to provide you with information, products, or services that you request from us or that may be of interest to you;",
    "to process, fulfill, support, and administer transactions and orders for products and services ordered by you;",
    "to provide you with notices about your Company account;",
    "to contact you in response to a request;",
    "to fulfill any other purpose for which you provide it;",
    "to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;",
    "to notify you about changes to our Digital Platform or any products or services we offer or provide though them;",
    "in any other way we may describe when you provide the information; and for any other purpose with your consent.",
  ];

  return (
    <section
      id="data-use"
      className={styles.container}
    >
      <h2 className={styles.header}>4. How We Use Your Information</h2>
      <p className={styles.pg}>
        We use your Personal Data for various purposes described below,
        including to:
      </p>
      <ul className={styles.list}>
        {uses.map((use, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {use}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>
        We use information that we collect about you or that you provide to us,
        including any Personal Data:
      </p>
      <ul className={styles.list}>
        {uses2.map((use, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {use}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>
        We may also use your information to contact you about goods and services
        that may be of interest to you, including through newsletters. If you
        wish to opt-out of receiving such communications, you may do so at any
        time by clicking unsubscribe at the bottom of these communications or by
        visiting your Account Preferences page. For more information, see{" "}
        <a
          href="#opt-out"
          style={{ color: "blue" }}
        >
          Choices About How We Use and Disclose Your Information.
        </a>
      </p>
    </section>
  );
}
