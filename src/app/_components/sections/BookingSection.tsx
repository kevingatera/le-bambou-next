"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { type BookingEmailData } from "~/server/utils/emailUtils";
import { api } from "~/trpc/react";
import {
  additionalServices,
  roomPrices,
  type RoomSelection,
  type RoomType,
} from "~/types/booking";
import type { BoardType } from "~/types/booking";

const steps = [
  "Dates & Guests",
  "Room Selection",
  "Additional Services",
  "Guest Details",
  "Review & Book",
] as const;

type Step = typeof steps[number];

interface BookingSectionProps {
  mode?: "page" | "modal";
  initialRoomType?: RoomType | null;
  onClose?: () => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren05?: number;
  initialChildren616?: number;
}

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  min?: string;
}

const FormField: React.FC<FormFieldProps> = (
  { label, id, type, value, onChange, required = false, error, min },
) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-4 focus:ring-[rgba(16,24,40,.05)]`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export const BookingSection: React.FC<BookingSectionProps> = ({
  mode = "modal",
  initialRoomType = null,
  onClose = () => {
    // Intentionally empty: default no-op function for onClose
  },
  initialCheckIn = "",
  initialCheckOut = "",
  initialAdults = 1,
  initialChildren05 = 0,
  initialChildren616 = 0,
}) => {
  const [roomSelections, setRoomSelections] = useState<RoomSelection[]>(
    initialRoomType
      ? [{ type: initialRoomType, count: 1, boardType: "fullBoard" }]
      : [{ type: "Double", count: 1, boardType: "fullBoard" }],
  );
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [isFlexibleDates, setIsFlexibleDates] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [adults, setAdults] = useState(initialAdults);
  const [children05, setChildren05] = useState(initialChildren05);
  const [children616, setChildren616] = useState(initialChildren616);
  const [isEastAfricanResident, setIsEastAfricanResident] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [currentStep, setCurrentStep] = useState<Step>("Dates & Guests");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalGuests = adults + children05 + children616;

  useEffect(() => {
    // Load saved data from localStorage when component mounts
    const savedData = localStorage.getItem("bookingFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData) as Partial<BookingEmailData>;
      setRoomSelections(
        parsedData.roomSelections ??
          [{ type: "Double", count: 1, boardType: "fullBoard" }],
      );
      setCheckIn(parsedData.checkIn ?? "");
      setCheckOut(parsedData.checkOut ?? "");
      setIsFlexibleDates(parsedData.isFlexibleDates ?? false);
      setGuestName(parsedData.guestName ?? "");
      setGuestEmail(parsedData.guestEmail ?? "");
      setAdults(parsedData.adults ?? 1);
      setChildren05(parsedData.children05 ?? 0);
      setChildren616(parsedData.children616 ?? 0);
      setIsEastAfricanResident(parsedData.isEastAfricanResident ?? false);
      setSelectedServices(parsedData.selectedServices ?? []);
      setMessage(parsedData.message ?? "");
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      roomSelections,
      checkIn,
      checkOut,
      isFlexibleDates,
      guestName,
      guestEmail,
      adults,
      children05,
      children616,
      isEastAfricanResident,
      selectedServices,
      message,
    };
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  }, [
    roomSelections,
    checkIn,
    checkOut,
    isFlexibleDates,
    guestName,
    guestEmail,
    adults,
    children05,
    children616,
    isEastAfricanResident,
    selectedServices,
    message,
  ]);

  const adjustRoomSelections = useCallback(() => {
    let remainingGuests = totalGuests;
    const newSelections: RoomSelection[] = [];

    while (remainingGuests > 0) {
      if (remainingGuests >= 3) {
        newSelections.push({
          type: "Triple",
          count: 1,
          boardType: "fullBoard",
        });
        remainingGuests -= 3;
      } else if (remainingGuests === 2) {
        newSelections.push({
          type: "Double",
          count: 1,
          boardType: "fullBoard",
        });
        remainingGuests -= 2;
      } else {
        newSelections.push({
          type: "Single",
          count: 1,
          boardType: "fullBoard",
        });
        remainingGuests -= 1;
      }
    }

    setRoomSelections(newSelections);
  }, [totalGuests]);

  useEffect(() => {
    adjustRoomSelections();
  }, [adjustRoomSelections]);

  const bookRoomMutation = api.booking.create.useMutation({
    onSuccess: () => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      // Clear localStorage when booking is successful
      localStorage.removeItem("bookingFormData");
      // Reset form fields
      setRoomSelections([{ type: "Double", count: 1, boardType: "fullBoard" }]);
      setCheckIn("");
      setCheckOut("");
      setIsFlexibleDates(false);
      setGuestName("");
      setGuestEmail("");
      setAdults(1);
      setChildren05(0);
      setChildren616(0);
      setIsEastAfricanResident(false);
      setSelectedServices([]);
      setMessage("");
      // Close the booking section
      setTimeout(() => {
        setSubmitStatus("idle");
        onClose();
      }, 5000);
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

    // Validate dates before submitting
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < today) {
      setErrors((prev) => ({
        ...prev,
        checkIn: "Check-in date cannot be in the past",
      }));
      setIsSubmitting(false);
      return;
    }

    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(minCheckOut.getDate() + 1);

    if (checkOutDate < minCheckOut) {
      setErrors((prev) => ({
        ...prev,
        checkOut: "Check-out date must be at least one day after check-in",
      }));
      setIsSubmitting(false);
      return;
    }

    // Proceed with mutation if validations pass
    bookRoomMutation.mutate({
      roomSelections,
      checkIn,
      checkOut,
      isFlexibleDates,
      guestName,
      guestEmail,
      adults,
      children05,
      children616,
      isEastAfricanResident,
      selectedServices,
      message,
    });
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddRoom = (type: RoomType) => {
    setRoomSelections((prev) => {
      const existingRoom = prev.find((room) => room.type === type);
      if (existingRoom) {
        return prev.map((room) =>
          room.type === type ? { ...room, count: room.count + 1 } : room
        );
      } else {
        return [...prev, { type, count: 1, boardType: "fullBoard" }];
      }
    });
  };

  const handleRemoveRoom = (type: RoomType) => {
    setRoomSelections((prev) => {
      const updatedRooms = prev.map((room) =>
        room.type === type ? { ...room, count: room.count - 1 } : room
      ).filter((room) => room.count > 0);
      return updatedRooms.length
        ? updatedRooms
        : [{ type: "Double", count: 1, boardType: "fullBoard" }];
    });
  };

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case "Dates & Guests":
        if (!checkIn) newErrors.checkIn = "Check-in date is required";
        if (!checkOut) newErrors.checkOut = "Check-out date is required";
        if (!adults || adults < 1) {
          newErrors.adults = "At least one adult is required";
        }
        break;
      case "Guest Details":
        if (!guestName.trim()) newErrors.guestName = "Guest name is required";
        if (!guestEmail.trim()) {
          newErrors.guestEmail = "Guest email is required";
        } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
          newErrors.guestEmail = "Invalid email format";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1 && validateStep(currentStep)) {
      const nextStep = steps[currentIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = steps[currentIndex - 1];
      if (previousStep) {
        setCurrentStep(previousStep);
      }
    }
  };

  const handleStepClick = (step: Step) => {
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "Dates & Guests":
        return (
          <>
            <DateAndGuestsForm
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              isFlexibleDates={isFlexibleDates}
              setIsFlexibleDates={setIsFlexibleDates}
              adults={adults}
              setAdults={setAdults}
              children05={children05}
              setChildren05={setChildren05}
              children616={children616}
              setChildren616={setChildren616}
              errors={errors}
            />
            <button
              type="button"
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
            >
              Next
            </button>
          </>
        );
      case "Room Selection":
        return (
          <>
            <RoomSelectionForm
              roomSelections={roomSelections}
              handleAddRoom={handleAddRoom}
              handleRemoveRoom={handleRemoveRoom}
            />
            <div className="mt-4 flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
              >
                Next
              </button>
            </div>
          </>
        );
      case "Additional Services":
        return (
          <>
            <AdditionalServicesForm
              selectedServices={selectedServices}
              handleServiceChange={handleServiceChange}
              message={message}
              setMessage={setMessage}
            />
            <div className="mt-4 flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
              >
                Next
              </button>
            </div>
          </>
        );
      case "Guest Details":
        return (
          <>
            <GuestDetailsForm
              guestName={guestName}
              setGuestName={setGuestName}
              guestEmail={guestEmail}
              setGuestEmail={setGuestEmail}
              isEastAfricanResident={isEastAfricanResident}
              setIsEastAfricanResident={setIsEastAfricanResident}
              errors={errors}
            />
            <div className="mt-4 flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300"
              >
                Next
              </button>
            </div>
          </>
        );
      case "Review & Book":
        return (
          <>
            <ReviewBooking
              roomSelections={roomSelections}
              checkIn={checkIn}
              checkOut={checkOut}
              isFlexibleDates={isFlexibleDates}
              guestName={guestName}
              guestEmail={guestEmail}
              adults={adults}
              children05={children05}
              children616={children616}
              isEastAfricanResident={isEastAfricanResident}
              selectedServices={selectedServices}
              message={message}
            />
            <div className="mt-4 flex flex-col md:flex-row md:justify-between md:space-x-4 space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <section
      id="booking-section"
      className={`${
        mode === "modal"
          ? "mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)]"
          : ""
      }`}
    >
      <div className="container mx-auto py-2 max-w-[80rem] px-0 sm:px-4 md:px-8 lg:px-16">
        <h2 className="text-[#2c2c2c] mt-0 mb-4 text-3xl font-normal leading-snug">
          Book Your Stay
        </h2>
        <Breadcrumbs
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStepContent()}
        </form>
        {submitStatus === "success" && (
          <div className="success-message mt-4">
            <p className="text-green-600">
              Thank you! Your booking has been confirmed.
            </p>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="error-message mt-4">
            <p className="text-red-600">
              Oops! Something went wrong while processing your booking.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const Breadcrumbs: React.FC<
  {
    steps: readonly string[];
    currentStep: string;
    onStepClick: (step: Step) => void;
  }
> = ({ steps, currentStep, onStepClick }) => {
  const currentStepRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (currentStepRef.current) {
      currentStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentStep]);

  const isLastStep = currentStep === steps[steps.length - 1];

  return (
    <nav className="mb-6 relative overflow-hidden">
      <ol className="flex items-center space-x-2 text-sm whitespace-nowrap">
        {steps.map((step, index) => {
          const isCompleted = index < steps.indexOf(currentStep);
          const isCurrent = step === currentStep;
          return (
            <React.Fragment key={step}>
              {index > 0 && <span className="text-gray-300 mx-2">/</span>}
              <li
                ref={isCurrent ? currentStepRef : null}
                className={`
                  ${
                  isCurrent
                    ? "text-button font-semibold"
                    : isCompleted
                    ? "text-gray-600 cursor-pointer hover:text-button"
                    : "text-gray-400"
                }
                  transition duration-300
                `}
                onClick={() => isCompleted && onStepClick(step as Step)}
              >
                {step}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
      {isLastStep
        ? (
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#d7dfde] to-transparent pointer-events-none" />
        )
        : (
          <div className="absolute -right-4 top-0 h-full w-16 bg-gradient-to-l from-[#d7dfde] to-transparent pointer-events-none" />
        )}
    </nav>
  );
};

const DateAndGuestsForm: React.FC<{
  checkIn: string;
  setCheckIn: (value: string) => void;
  checkOut: string;
  setCheckOut: (value: string) => void;
  isFlexibleDates: boolean;
  setIsFlexibleDates: (value: boolean) => void;
  adults: number;
  setAdults: (value: number) => void;
  children05: number;
  setChildren05: (value: number) => void;
  children616: number;
  setChildren616: (value: number) => void;
  errors: Record<string, string>;
}> = ({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  isFlexibleDates,
  setIsFlexibleDates,
  adults,
  setAdults,
  children05,
  setChildren05,
  children616,
  setChildren616,
  errors,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const checkOutMin = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split(
      "T",
    )[0]
    : today;

  return (
    <div className="space-y-4">
      {/* Date selection fields */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <FormField
            label="Check-in Date"
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={setCheckIn}
            required
            error={errors.checkIn}
            min={today}
          />
        </div>
        <div className="flex-1">
          <FormField
            label="Check-out Date"
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={setCheckOut}
            required
            error={errors.checkOut}
            min={checkOutMin}
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFlexibleDates"
          checked={isFlexibleDates}
          onChange={(e) => setIsFlexibleDates(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isFlexibleDates">
          I&apos;m flexible with these dates
        </label>
      </div>

      {/* Guest number fields */}
      <div>
        <label className="block mb-1 font-medium">Number of Guests</label>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <FormField
              label="Adults"
              id="adults"
              type="number"
              value={adults}
              onChange={(value) => setAdults(parseInt(value))}
              required
              error={errors.adults}
            />
          </div>
          <div className="flex-1">
            <FormField
              label="Children 0 - 5 years"
              id="children05"
              type="number"
              value={children05}
              onChange={(value) => setChildren05(parseInt(value))}
              error={errors.children05}
            />
          </div>
          <div className="flex-1">
            <FormField
              label="Children 6 - 16 years"
              id="children616"
              type="number"
              value={children616}
              onChange={(value) => setChildren616(parseInt(value))}
              error={errors.children616}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GuestDetailsForm: React.FC<{
  guestName: string;
  setGuestName: (value: string) => void;
  guestEmail: string;
  setGuestEmail: (value: string) => void;
  isEastAfricanResident: boolean;
  setIsEastAfricanResident: (value: boolean) => void;
  errors: Record<string, string>;
}> = ({
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  isEastAfricanResident,
  setIsEastAfricanResident,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <FormField
        label="Guest Name"
        id="guestName"
        type="text"
        value={guestName}
        onChange={setGuestName}
        required
        error={errors.guestName}
      />
      <FormField
        label="Guest Email"
        id="guestEmail"
        type="email"
        value={guestEmail}
        onChange={setGuestEmail}
        required
        error={errors.guestEmail}
      />
      <div>
        <label className="block mb-1 font-medium">Citizenship</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isEastAfricanResident"
            checked={isEastAfricanResident}
            onChange={(e) => setIsEastAfricanResident(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isEastAfricanResident">East African Resident</label>
        </div>
      </div>
    </div>
  );
};

const RoomSelectionForm: React.FC<{
  roomSelections: RoomSelection[];
  handleAddRoom: (type: RoomType, boardType: BoardType) => void;
  handleRemoveRoom: (type: RoomType) => void;
}> = ({ roomSelections, handleAddRoom, handleRemoveRoom }) => {
  return (
    <div>
      <label className="block mb-1 font-medium">Room Selection</label>
      <div className="space-y-4">
        {roomSelections.map((room, index) => (
          <div
            key={`${room.type}-${index}`}
            className="flex flex-wrap items-center space-x-2 p-4 bg-gray-50 rounded-md"
          >
            <span className="flex-grow">{room.type} Bed Room</span>
            <div className="flex-shrink-0 space-y-2">
              <select
                value={room.boardType}
                onChange={(e) =>
                  handleAddRoom(room.type, e.target.value as BoardType)}
                className="w-full p-2 border rounded"
              >
                <option value="fullBoard">
                  Full Board (${roomPrices[room.type].fullBoard})
                </option>
                <option value="halfBoard">
                  Half Board (${roomPrices[room.type].halfBoard})
                </option>
                <option value="bedAndBreakfast">
                  Bed & Breakfast (${roomPrices[room.type].bedAndBreakfast})
                </option>
              </select>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleRemoveRoom(room.type)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                >
                  Remove
                </button>
                <span className="py-2 px-3 bg-white border rounded-md">
                  {room.count}
                </span>
                <button
                  type="button"
                  onClick={() => handleAddRoom(room.type, room.boardType)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdditionalServicesForm: React.FC<{
  selectedServices: string[];
  handleServiceChange: (serviceId: string) => void;
  message: string;
  setMessage: (value: string) => void;
}> = ({ selectedServices, handleServiceChange, message, setMessage }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Additional Services</label>
        {additionalServices.map((service) => (
          <div key={service.id} className="flex items-center">
            <input
              type="checkbox"
              id={service.id}
              checked={selectedServices.includes(service.id)}
              onChange={() =>
                handleServiceChange(service.id)}
              className="mr-2"
            />
            <label htmlFor={service.id}>
              {service.name} - ${service.price}
            </label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Additional Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-[rgba(16,24,40,.05)] h-32"
          placeholder="Any special requests or information you'd like to add to your reservation..."
        >
        </textarea>
      </div>
    </div>
  );
};

const ReviewBooking: React.FC<{
  roomSelections: RoomSelection[];
  checkIn: string;
  checkOut: string;
  isFlexibleDates: boolean;
  guestName: string;
  guestEmail: string;
  adults: number;
  children05: number;
  children616: number;
  isEastAfricanResident: boolean;
  selectedServices: string[];
  message: string;
}> = (props) => {
  const calculateTotal = () => {
    return props.roomSelections.reduce((total, room) => {
      const price = roomPrices[room.type][room.boardType];
      return total + (price * room.count);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Booking Summary</h3>
      <div>
        <p>
          <strong>Guest:</strong> {props.guestName}
        </p>
        <p>
          <strong>Email:</strong> {props.guestEmail}
        </p>
        <p>
          <strong>Guests:</strong> {props.adults} Adults, {props.children05}
          {" "}
          Children (0-5), {props.children616} Children (6-16)
        </p>
        <p>
          <strong>East African Resident:</strong>{" "}
          {props.isEastAfricanResident ? "Yes" : "No"}
        </p>
      </div>
      <div>
        <p>
          <strong>Check-in:</strong> {props.checkIn}
        </p>
        <p>
          <strong>Check-out:</strong> {props.checkOut}
        </p>
        <p>
          <strong>Flexible Dates:</strong>{" "}
          {props.isFlexibleDates ? "Yes" : "No"}
        </p>
      </div>
      <div>
        <p>
          <strong>Room Selection:</strong>
        </p>
        <ul>
          {props.roomSelections.map((room, index) => (
            <li key={index}>
              {room.count} x {room.type}{" "}
              Bed Room ({room.boardType}) -
              ${roomPrices[room.type][room.boardType]} per room
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-bold">
          Total: ${calculateTotal()}
        </p>
      </div>
      <div>
        <p>
          <strong>Additional Services:</strong>
        </p>
        <ul>
          {props.selectedServices.map((serviceId) => {
            const service = additionalServices.find((s) => s.id === serviceId);
            return service && (
              <li key={serviceId}>{service.name} - ${service.price}</li>
            );
          })}
        </ul>
      </div>
      {props.message && (
        <div>
          <p>
            <strong>Additional Message:</strong>
          </p>
          <p>{props.message}</p>
        </div>
      )}
    </div>
  );
};
