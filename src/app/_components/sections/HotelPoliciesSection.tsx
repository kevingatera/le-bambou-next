'use client'

import React, { useState } from "react";

export const HotelPoliciesSection = () => {
    return (
        <section className="faq-container">
            <div className="inner-padding">
                <div className="center-text">
                    <div className="max-width-text align-center">
                        <h2 className="policy-heading">Hotel Policy</h2>
                        <div className="small-space"></div>
                        <div className="policy-text">Explore our Hotel Policy Page for essential guidelines and terms to enhance your stay.</div>
                    </div>
                </div>
                <div className="policy-container">
                    <div className="policies-list">
                        <PolicyAccordion
                            heading="Rates"
                            content="All room rates and fees are in United States Dollars (USD) and include 18% VAT."
                        />

                        <PolicyAccordion
                            heading="Arrival & Departure"
                            content={<>
                                Check-in is at <strong>anytime (24/7 Service)</strong><br />
                                Check-out is <strong>before 10:00</strong> (up to 17:00 for guests went trekking on the same day as the checkout day)
                            </>}
                        />

                        <PolicyAccordion
                            heading="Payment Options"
                            content={<>
                                We accept:<br />
                                <ul className="list-disc">
                                    <li><strong>Visa</strong></li>
                                    <li><strong>MasterCard</strong></li>
                                    <li><strong>Wire Transfer</strong></li>
                                    <li><strong>Cash</strong></li>
                                </ul>
                            </>}
                        />

                        <PolicyAccordion
                            heading="Cancellations & Prepayment"
                            content={<>
                                If cancelled within 15 days of date of arrival, or in case of no-show, 100% the total price of the reservation will be charged. There will be no refund.<br /><br />
                                If cancelled within 30 days of date of arrival, 50% of the total price of the reservation will be charged. A refund of 50% will be issued, including all fees.<br /><br />
                                If cancelled within 60 days of date of arrival, 0% of the total price of the reservation will be charged. A refund of 100% will be issued, including all fees.<br /><br />
                                If modification to the itinerary or booking date occurs, there shall be no charge if the new dates are within 14 days of the original date. Otherwise, there may be a booking handling fee.<br /><br />
                                In the case where a refund includes bank charges and other transaction handling fees, said fees shall be deducted from the total amount of the refund.
                            </>}
                        />

                        <PolicyAccordion
                            heading="Additional Guest Information"
                            content={<>
                                Guest address details:<br />
                                Our guests do not have to provide their address details when they book<br /><br />
                                Guest phone number:<br />
                                Our guests do not have to provide a phone number when they book (although an email is required)
                            </>}
                            isLast={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

interface PolicyAccordionProps {
    heading: string;
    content: React.ReactNode;
    isLast?: boolean;
}

const PolicyAccordion: React.FC<PolicyAccordionProps> = ({ heading, content, isLast = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-accordion ${isLast ? 'last-item' : ''}`}>
            <div
                className="policy-question cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="question-heading">{heading}</div>
                <div className="faq-icon-wrapper">
                    <div className={`accordion-icon_component ${isOpen ? 'rotate-45' : ''} transition-transform duration-300`}>
                        <div className="accordion-icon_horizontal-line"></div>
                        <div className="accordion-icon_vertical-line"></div>
                    </div>
                </div>
            </div>
            <div
                className={`policy-answer overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="answer-text">{content}</div>
                <div className="medium-space"></div>
            </div>
        </div>
    );
};