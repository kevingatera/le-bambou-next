"use client";

import React from "react";

export const GorillaVisitationGuidelinesSection = () => {
  return (
    <section className="homepage wf-section pt-12 pb-16 bg-[#d7dfde]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="center-text mb-10">
          <h2 className="policy-heading text-3xl md:text-4xl font-bold text-center">
            Gorilla Visitation Guidelines
          </h2>
          <p className="mt-4 text-lg text-center font-semibold uppercase text-[#2c2c2c]">
            Gorillas are endangered – please help us keep them healthy!
          </p>
        </div>

        {/* Before you set out */}
        <GuidelineBlock title="Before you set out:">
          <li>Wash your hands before setting out on your trek to protect the health of the gorillas.</li>
          <li>Wear clean trekking clothes for each gorilla visit and clean your shoes carefully before and after the trek.</li>
          <li>If you show any signs of illness, notify park headquarters and do <span className="font-semibold">not</span> join the trek.</li>
          <li>Guests with chronic illnesses (e.g., heart disease, emphysema, asthma) should reconsider trekking – medical services are limited near the park.</li>
          <li>Please use the bathroom before your trek; there are no facilities in the forest.</li>
        </GuidelineBlock>

        {/* While you are in the park */}
        <GuidelineBlock title="While you are in the park:">
          <li>Leave no trace – pack out everything you bring in.</li>
          <li>If you must relieve yourself, bury solid waste and toilet tissue at least 30&nbsp;cm (1&nbsp;ft) deep; your guide will carry a small shovel.</li>
          <li>No smoking or spitting is allowed inside the forest.</li>
        </GuidelineBlock>

        {/* When you are with the gorillas */}
        <GuidelineBlock title="When you are with the gorillas:">
          <li>Maintain a minimum distance of 7&nbsp;m (23&nbsp;ft) from the gorillas.</li>
          <li>Do not eat, drink, or feed the gorillas during the visit.</li>
          <li>Disable flash when taking photographs.</li>
          <li>Speak only in a soft voice and avoid sudden gestures. Do not point at the gorillas.</li>
          <li>If a gorilla charges, remain still and avoid eye contact – <span className="font-semibold">do not</span> turn away.</li>
          <li>Always follow your guide&apos;s instructions.</li>
        </GuidelineBlock>

        {/* Footer note */}
        <div className="mt-8 text-base">
          <p className="mb-4 font-semibold">
            Note: Those who do not respect these guidelines may be asked to leave the gorillas and the park. Refunds will not be issued and penalties may apply.
          </p>
          <p className="mb-2">
            Learn more at:&nbsp;
            <a href="https://www.rwandatourism.com" target="_blank" rel="noopener" className="underline text-blue-800">www.rwandatourism.com</a>&nbsp;|&nbsp;
            <a href="https://www.gorilladoctors.org" target="_blank" rel="noopener" className="underline text-blue-800">www.gorilladoctors.org</a>
          </p>
        </div>
      </div>
    </section>
  );
};

interface GuidelineBlockProps {
  title: string;
  children: React.ReactNode;
}

const GuidelineBlock: React.FC<GuidelineBlockProps> = ({ title, children }) => (
  <div className="mb-10">
    <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
    <ul className="list-disc pl-6 space-y-2 text-base leading-6 text-[#2c2c2c]">
      {children}
    </ul>
  </div>
); 