"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const sendEmailMutation = api.email.sendContactEmail.useMutation({
    onSuccess: () => {
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    },
    onError: () => {
      setSubmitStatus("error");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    sendEmailMutation.mutate({ name, email, message });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Contact-05-name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="Contact-05-name"
            name="Contact-05-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4  focus:ring-[rgba(16,24,40,.05)]"
            maxLength={256}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="Contact-05-email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="Contact-05-email"
            name="Contact-05-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4  focus:ring-[rgba(16,24,40,.05)]"
            maxLength={256}
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="Contact-05-message"
            className="block mb-1 font-medium"
          >
            Message
          </label>
          <textarea
            id="Contact-05-message"
            name="Contact-05-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4  focus:ring-[rgba(16,24,40,.05)] h-32"
            maxLength={5000}
            placeholder="Type your message..."
            required
          >
          </textarea>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-button text-white rounded-md w-full hover:bg-[#2c2c2c] transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
      {submitStatus === "success" && (
        <div className="success-message mt-4">
          <p className="text-green-600">
            Thank you! Your submission has been received!
          </p>
        </div>
      )}
      {submitStatus === "error" && (
        <div className="error-message mt-4">
          <p className="text-red-600">
            Oops! Something went wrong while submitting the form.
          </p>
        </div>
      )}
    </>
  );
};
