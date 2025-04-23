import React from "react";
import { styles } from "./styles";

export default function OptOut() {
  const userControls = [
    {
      text: "<b>Tracking Technologies and Advertising.</b> You can set your browser or operating to refuse all or some cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of our Digital Platform may then be inaccessible or not function properly",
    },
    {
      text: "<b>Promotional Offers from Company.</b> If you do not wish to have your email address used by Company to promote our own products and services, you can opt-out at any time by clicking the unsubscribe link at the bottom of any email or other marketing communications you receive from us or logging onto your Account Preferences page. This opt out does not apply to information provided to Company as a result of a product purchase, or your use of our services. You may have other options with respect to marketing and communication preferences through our Digital Platform.",
    },
    {
      text: "<b>Disclosure of Your Information to Affiliates and Third Parties.</b> By using our Digital Platform, you consent to our sharing of your Personal Data with our affiliates and third parties for their promotional purposes. If you wish to unsubscribe from such affiliate and third parties’ promotions, you can do so by clicking the unsubscribe link at the bottom of any email or other marketing communications you receive from them. If you wish to opt-out of such sharing, please change your preferences in your Account Preferences page or email us Augustus.Anderson@gmail.com. ",
    },
    {
      text: "<b>Targeted Advertising.</b> To learn more about interest-based advertisements and your opt-out rights and options, visit the ",
      externalLinkText: "Digital Advertising Alliance",
      externalLinkHref: "http://www.aboutads.info/",
      suffix: " and the ",
      externalLinkText2: "Network Advertising Initiative",
      externalLinkHref2: "http://www.networkadvertising.org/",
      suffix2: " websites (",
      externalLinkText3: "www.aboutads.info",
      externalLinkHref3: "http://www.aboutads.info",
      suffix3: " and ",
      externalLinkText4: "www.networkadvertising.org",
      externalLinkHref4: "http://www.networkadvertising.org",
      suffix4:
        "). Please note that if you choose to opt out, you will continue to see ads, but they will not be based on your online activity. We do not control third parties’ collection or use of your information to serve interest-based advertising. However, these third parties may provide you with ways to choose not to have your information collected or used in this way. You can also opt out of receiving targeted ads from members of the NAI on its website.",
    },
  ];
  return (
    <section
      id="opt-out"
      className={styles.container}
    >
      <h2 className={styles.header}>
        6. Choices About How We Use and Disclose Your Information
      </h2>
      <p className={styles.pg}>
        We offer you choices on how you can opt out of our use of tracking
        technology, disclosure of your Personal Data for our advertising to you,
        and other targeted advertising.
      </p>

      <p className={styles.pg}>
        We do not control the collection and use of your information collected
        by third parties described above in{" "}
        <a
          href="#disclosure"
          style={{ color: "blue" }}
        >
          Disclosure of Your Information
        </a>
        . These third parties may aggregate the information they collect with
        information from their other customers for their own purposes.
      </p>

      <p className={styles.pg}>
        In addition, we strive to provide you with choices regarding the
        Personal Data you provide to us. We have created mechanisms to provide
        you with control over your Personal Data:
      </p>
      <ul className={styles.list}>
        {userControls.map((control, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {control.text && (
              <span dangerouslySetInnerHTML={{ __html: control.text }} />
            )}

            {control.externalLinkText && (
              <>
                <a
                  href={control.externalLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {control.externalLinkText}
                </a>
                {control.suffix}
              </>
            )}

            {control.externalLinkText2 && (
              <>
                <a
                  href={control.externalLinkHref2}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {control.externalLinkText2}
                </a>
                {control.suffix2}
              </>
            )}

            {control.externalLinkText3 && (
              <>
                <a
                  href={control.externalLinkHref3}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {control.externalLinkText3}
                </a>
                {control.suffix3}
              </>
            )}

            {control.externalLinkText4 && (
              <>
                <a
                  href={control.externalLinkHref4}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {control.externalLinkText4}
                </a>
                {control.suffix4}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
