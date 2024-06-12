import { getCLS, getFID, getLCP, getTTFB, getFCP } from "web-vitals";
import axios from "axios";

const sendToAnalytics = (metric) => {
  const body = JSON.stringify(metric);

  axios
    .post("http://10.103.152.171:4000/api/metrics", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error("Error posting data:", error);
    });
};

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
    getFCP(onPerfEntry);
  }
};

export default (onPerfEntry) => {
  reportWebVitals((metric) => {
    sendToAnalytics(metric);
    if (onPerfEntry) {
      onPerfEntry(metric);
    }
  });
};
