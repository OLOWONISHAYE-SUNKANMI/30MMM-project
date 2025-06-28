import React from "react";
import { styles } from "./styles";

export default function Tracking() {
  return (
    <section
      id="tracking"
      className={styles.container}
    >
      <h2 className={styles.header}>8. Do Not Track Signals</h2>
      <p className={styles.pg}>
        We currently do not use automated data collection technologies to track
        you across websites. We currently do not honor do-not-track signals that
        may be sent by some browsers.
      </p>
      <p className={styles.pg}>
        Some web browsers permit you to broadcast a signal to websites and
        online services indicating a preference that they “do not track” your
        online activities. At this time, we do not honor such signals, but we
        currently do not use automated data collection technologies to collect
        information about your online activities over time and across third
        party websites or other online services (behavioral advertising).
      </p>
    </section>
  );
}
