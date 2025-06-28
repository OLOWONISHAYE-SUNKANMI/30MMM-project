import React from "react";
import Link from "next/link";
import { styles } from "./styles";

export default function DataCollection() {
  const CollectionTypes = [
    "by which you may be personally identified, such as name, postal address, e-mail address, home, work, and mobile telephone numbers, date of birth, physical characteristics/description, educational background, employment history, national origin, sex and gender identity, details regarding sex life and related medical conditions, religion, sexual orientation, information regarding physical and mental disability, criminal history, veteran or military status, marital status, records regarding personal property, products or services purchased, and personal preferences gleaned from other Personal Data collected (“Personal Data”);",
    "that is about you but individually does not identify you, such as traffic data, logs, referring/exit pages, date and time of your visit to or use of our Digital Platform, error information, clickstream data, and other communication data and the resources that you access and use on or through our Digital Platform; or",
    "about your Internet connection, the equipment you use to access or use our Digital Platform and usage details.",
  ];

  const collectionMethods = [
    "directly from you when you provide it to us;",
    "automatically as you navigate through or use our Digital Platform. Information collected automatically may include estimated or precise geo-location, usage details, IP addresses, and information collected through cookies and other tracking technologies; and",
    "From third parties, for example, our business partners.",
  ];

  const dataProvided = [
    "Personal Data such as the data identified above;",
    "Information that you provide by filling in forms on our Digital Platform. This includes information provided at the time of registering to use our Digital Platform, using our services or other services available through the Digital Platform, purchasing products, or requesting further services. We may also ask you for information when you report a problem with our Digital Platform;",
    "Records and copies of your correspondence (including email addresses), if you contact us; and",
    "Details of transactions you carry out through our Digital Platform and of the fulfillment of your orders. You may be required to provide financial information before placing an order through our Digital Platform.",
  ];

  const autoDataCollection = [
    "details of your visits to our Digital Platform, such as traffic data, location, logs, referring/exit pages, date and time of your visit to or use of our Digital Platform, error information, clickstream data, and other communication data and the resources that you access and use on or in the Digital Platform; and",
    "information about your computer, mobile device, and Internet connection, specifically your IP address, operating system, browser type, and App version information.",
  ];

  const personalData = [
    "estimate our audience size and usage patterns;",
    "store information about your preferences, allowing us to customize our Digital Platform according to your individual interests;",
    "recognize you when you return to our Digital Platform.",
  ];

  const dataCollectionTechnologiesDetails = [
    {
      text: "<b>Cookies (or browser cookies)</b>. We and our service providers may use cookies, web beacons, and other technologies to receive and store certain types of information whenever you interact with our Digital Platform through your computer or mobile device. A cookie is a small file or piece of data sent from a website and stored on the hard drive of your computer or mobile device. On your computer, you may refuse to accept browser cookies by activating the appropriate setting on your browser, and you may have similar capabilities on your mobile device in the preferences for your operating system or browser. However, if you select this setting you may be unable to access or use certain parts of our Digital Platform. Unless you have adjusted your browser or operating system setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website or use our App. ",
    },
    {
      text: "<b>Google Analytics</b>. We use Google Analytics, a web analytics service provided by (“<b>Google</b>”) to collect certain information relating to your use of our Website. Google Analytics uses “<b>cookies</b>”, which are text files placed on your computer, to help our Website analyze how users use the site. You can find out more about how Google uses data when you visit our Website by visiting “How Google uses data when you use our partners' sites or apps”, (located at ",
      externalLinkText: "www.google.com/policies/privacy/partners/",
      externalLinkHref: "https://www.google.com/policies/privacy/partners/",
      suffix:
        "). We may also use Google Analytics Advertising Features or other advertising networks to provide you with interest-based advertising based on your online activity. For more information regarding Google Analytics please visit ",
      externalLinkText2: "Google's website",
      externalLinkHref2: "https://www.google.com",
      suffix2: ", and pages that describe Google Analytics, such as ",
      externalLinkText3: "www.google.com/analytics/learn/privacy.html",
      externalLinkHref3: "https://www.google.com/analytics/learn/privacy.html",
      suffix3: ".",
    },
  ];

  return (
    <section
      id="data-collection"
      className={styles.container}
    >
      <h2 className={styles.header}>
        3. Information We Collect About You and How We Collect It
      </h2>
      <p className={styles.pg}>
        We collect different types of information about you, including
        information that may directly identify you, information that is about
        you but individually does not personally identify you, and information
        that we combine with our other users. This includes information that we
        collect directly from you or through automated collection technologies.
      </p>

      <h4 className={styles.subheader}>Generally</h4>
      <p className={styles.pg}>
        We collect several types of information from and about users of our
        Digital Platform, specifically information:
      </p>
      <ul className={styles.list}>
        {CollectionTypes.map((type, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {type}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>We collect this information:</p>
      <ul className={styles.list}>
        {collectionMethods.map((method, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {method}
          </li>
        ))}
      </ul>

      <h4 className={styles.subheader}>Information You Provide to Us</h4>
      <p className={styles.pg}>
        The information we collect on or through our Digital Platform is:
      </p>
      <ul className={styles.list}>
        {dataProvided.map((provide, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {provide}
          </li>
        ))}
      </ul>
      <p className={styles.pg}>
        You also may provide information to be published or displayed
        (hereinafter, “<b>posted</b>”) on public areas of the Digital Platform
        or transmitted to other users of the Digital Platform or third parties
        (collectively, “<b>User Contributions</b>”). Your User Contributions are
        posted on and transmitted to others at your own risk. Although we limit
        access to certain pages, please be aware that no security measures are
        perfect or impenetrable. Additionally, we cannot control the actions of
        other users of the Digital Platform with whom you may choose to share
        your User Contributions. Therefore, we cannot and do not guarantee that
        your User Contributions will not be viewed by unauthorized persons.
      </p>

      <h4 className={styles.subheader}>
        Information We Collect Through Automatic Data Collection Technologies
      </h4>

      <p>
        As you navigate through and interact with our Digital Platform, we may
        use automatic data collection technologies to collect certain
        information about your equipment, browsing actions, and patterns,
        specifically:
      </p>

      <ul className={styles.list}>
        {autoDataCollection.map((data, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {data}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>
        {" "}
        The information we collect automatically may include Personal Data or we
        may maintain it or associate it with Personal Data we collect in other
        ways or receive from third parties. It helps us to improve our Digital
        Platform and to deliver a better and more personalized service by
        enabling us to:
      </p>
      <ul className={styles.list}>
        {personalData.map((data, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {data}
          </li>
        ))}
      </ul>

      <p className={styles.pg}>
        The technologies we use for this automatic data collection may include:
      </p>
      <ul className={styles.list}>
        {dataCollectionTechnologiesDetails.map((item, index) => (
          <li
            key={index}
            className={styles.listItem}
          >
            {item.text && (
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            )}
            {item.externalLinkText && (
              <>
                <a
                  href={item.externalLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {item.externalLinkText}
                </a>
                {item.suffix}
              </>
            )}
            {item.externalLinkText2 && (
              <>
                <a
                  href={item.externalLinkHref2}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {item.externalLinkText2}
                </a>
                {item.suffix2}
              </>
            )}
            {item.externalLinkText3 && (
              <a
                href={item.externalLinkHref3}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue" }}
              >
                {item.externalLinkText3}
              </a>
            )}
            {item.suffix4}
          </li>
        ))}
      </ul>
    </section>
  );
}
