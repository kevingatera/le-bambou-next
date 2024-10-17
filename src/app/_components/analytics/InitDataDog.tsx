"use client";

import dynamic from 'next/dynamic';
import { useEffect } from "react";
import { datadogRum } from "@datadog/browser-rum";

// Lazy load the InitDataDog component
const InitDataDog = dynamic(() => import('./InitDataDog'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function App() {
  useEffect(() => {
    const initDD = () => {
      console.log("Initializing DataDog RUM");
      datadogRum.init({
        applicationId: process.env.NEXT_PUBLIC_DD_CLIENT_APP_ID!,
        clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN!,
        env: process.env.NEXT_PUBLIC_ENV!,
        site: "datadoghq.com",
        sessionSampleRate: 1,
        service: "le-bambou-next",
        sessionReplaySampleRate: 1,
        trackUserInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: "mask-user-input",
      });
    };
    initDD();
  }, []);
  
  return <InitDataDog />;
}