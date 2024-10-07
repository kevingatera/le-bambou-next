"use client";

import { useEffect } from "react";
import { datadogRum } from "@datadog/browser-rum";

export default function InitDataDog() {
  useEffect(() => {
    const initDD = () => {
      datadogRum.init({
        applicationId: process.env.NEXT_PUBLIC_DD_CLIENT_APP_ID!,
        clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN!,
        env: process.env.NEXT_PUBLIC_ENV!,
        site: "datadoghq.com",
        sessionSampleRate: 100,
        service: "le-bambou-next",
        sessionReplaySampleRate: 20,
        trackUserInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: "mask-user-input",
      });
    };
    initDD();
  }, []);
  return <></>;
}