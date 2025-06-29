"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { type BookingEmailData } from "~/server/utils/emailUtils";
import { api } from "~/trpc/react";
import {
  additionalServices,
  roomPrices,
  type RoomSelection,
  type RoomType,
  roomTypes as availableRoomTypesList,
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
        className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"
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
  const [serviceCounts, setServiceCounts] = useState<Record<string, number>>({});

  const totalGuests = adults + children05 + children616;

  const adjustRoomSelections = useCallback(() => {
    // If totalGuests is 0, reset to a sensible default.
    if (totalGuests === 0) {
      setRoomSelections(
        initialRoomType
          ? [{ type: initialRoomType, count: 1, boardType: "fullBoard" }]
          : [{ type: "Double", count: 1, boardType: "fullBoard" }],
      );
      return;
    }

    const currentCapacity = roomSelections.reduce((acc, room) => {
      let capacityPerRoom = 0;
      if (room.type === "Single") capacityPerRoom = 1;
      else if (room.type === "Double" || room.type === "Twin") capacityPerRoom = 2;
      else if (room.type === "Triple") capacityPerRoom = 3;
      return acc + (capacityPerRoom * room.count);
    }, 0);

    // Only auto-adjust if there are no rooms selected OR current rooms can't hold all guests.
    if (roomSelections.length > 0 && currentCapacity >= totalGuests) {
      return; // User's manual selection is sufficient, so keep it.
    }

    // Auto-assignment logic:
    let remainingGuests = totalGuests;
    const newSelections: RoomSelection[] = [];
    const MAX_ROOMS_AUTO_ASSIGN = 5; // Safety break to prevent excessive rooms

    while (remainingGuests > 0 && newSelections.length < MAX_ROOMS_AUTO_ASSIGN) {
      if (remainingGuests >= 3) {
        newSelections.push({ type: "Triple", count: 1, boardType: "fullBoard" });
        remainingGuests -= 3;
      } else if (remainingGuests === 2) {
        newSelections.push({ type: "Double", count: 1, boardType: "fullBoard" }); // Default to Double for 2 guests
        remainingGuests -= 2;
      } else { // remainingGuests === 1
        newSelections.push({ type: "Single", count: 1, boardType: "fullBoard" });
        remainingGuests -= 1;
      }
    }

    if (newSelections.length === 0 && totalGuests > 0) {
      setRoomSelections([{ type: "Double", count: 1, boardType: "fullBoard" }]);
    } else {
      setRoomSelections(newSelections);
    }

  }, [totalGuests, roomSelections, initialRoomType]);

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
      // Auto-close after 10 seconds instead of 5
      setTimeout(() => {
        setSubmitStatus("idle");
        onClose();
      }, 15000);
    },
    onError: () => {
      setSubmitStatus("error");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 10000);
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

  const numberOfNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  // Initialize transport days whenever nights change
  useEffect(() => {
    if (numberOfNights > 0 && !serviceCounts.transportFullDay) {
      setServiceCounts(prev => ({ ...prev, transportFullDay: numberOfNights }));
    }
  }, [numberOfNights, serviceCounts.transportFullDay]);

  const transportServiceId = "transportFullDay";
  const [transportRemoved, setTransportRemoved] = useState(false);

  // Auto-select transportation based on days unless user removed it
  useEffect(() => {
    if (numberOfNights > 0 && !transportRemoved && !selectedServices.includes(transportServiceId)) {
      setSelectedServices((prev) => [...prev, transportServiceId]);
    }
  }, [numberOfNights, transportRemoved, selectedServices]);

  // Reset service counts when services are deselected
  useEffect(() => {
    const newCounts = { ...serviceCounts };
    let changed = false;

    // Remove counts for unselected services
    Object.keys(newCounts).forEach(serviceId => {
      if (!selectedServices.includes(serviceId)) {
        delete newCounts[serviceId];
        changed = true;
      }
    });

    // Add default counts for newly selected services
    selectedServices.forEach(serviceId => {
      if (!newCounts[serviceId]) {
        newCounts[serviceId] = serviceId === "transportFullDay" ? numberOfNights : 1;
        changed = true;
      }
    });

    if (changed) {
      setServiceCounts(newCounts);
    }
  }, [selectedServices, serviceCounts, numberOfNights]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (mode === "modal") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [mode]);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        if (serviceId === transportServiceId) setTransportRemoved(true);
        return prev.filter((id) => id !== serviceId);
      } else {
        if (serviceId === transportServiceId) setTransportRemoved(false);
        return [...prev, serviceId];
      }
    });
  };

  const handleUpdateRoomBoardType = (type: RoomType, newBoardType: BoardType) => {
    setRoomSelections(prev => prev.map(room =>
      room.type === type ? { ...room, boardType: newBoardType } : room
    ));
  };

  const handleAddOrIncrementRoom = (type: RoomType, boardTypeForNew: BoardType = "fullBoard") => {
    setRoomSelections((prev) => {
      const existingRoom = prev.find((room) => room.type === type);
      if (existingRoom) {
        return prev.map((r) =>
          r.type === type ? { ...r, count: r.count + 1 } : r
        );
      } else {
        return [...prev, { type, count: 1, boardType: boardTypeForNew }];
      }
    });
  };

  const handleRemoveOrDecrementRoom = (type: RoomType) => {
    setRoomSelections((prev) => {
      const updatedRooms = prev
        .map((room) =>
          room.type === type ? { ...room, count: room.count - 1 } : room,
        )
        .filter((room) => room.count > 0);
      return updatedRooms.length
        ? updatedRooms
        : [{ type: "Double", count: 1, boardType: "fullBoard" }];
    });
  };

  const handleChangeRoomType = (oldType: RoomType, newType: RoomType) => {
    if (oldType === newType) return;

    setRoomSelections(prev => {
      const roomToChange = prev.find(r => r.type === oldType);
      if (!roomToChange) return prev;

      // Filter out the old room type entry
      const filteredSelections = prev.filter(r => r.type !== oldType);

      const existingNewTypeRoom = filteredSelections.find(r => r.type === newType);

      if (existingNewTypeRoom) {
        // New type already exists, so merge counts and board type
        return filteredSelections.map(r =>
          r.type === newType
            ? { ...r, count: r.count + roomToChange.count, boardType: roomToChange.boardType }
            : r
        );
      } else {
        // New type doesn't exist, so just add the changed room
        return [...filteredSelections, { ...roomToChange, type: newType }];
      }
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
              onAddOrIncrement={handleAddOrIncrementRoom}
              onRemoveOrDecrement={handleRemoveOrDecrementRoom}
              onUpdateBoardType={handleUpdateRoomBoardType}
              onChangeRoomType={handleChangeRoomType}
              availableRoomTypes={availableRoomTypesList}
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
              serviceCounts={serviceCounts}
              setServiceCounts={setServiceCounts}
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
          <div className="flex flex-col h-[calc(100vh-16rem)] md:h-[calc(100vh-16rem)]">
            <div className="flex-1 overflow-y-auto pr-2">
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
                serviceCounts={serviceCounts}
              />
            </div>
            <div className="sticky bottom-0 bg-[#d7dfde] border-t border-gray-300 pt-4">
              {/* Grand Total */}
              <div className="bg-white border border-gray-300 p-3 rounded-md mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Grand Total:</span>
                  <span className="text-xl font-bold text-button">
                    ${(() => {
                      const nights = Math.max(
                        1,
                        Math.ceil(
                          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
                        )
                      );
                      const roomTotal = roomSelections.reduce((total, room) => {
                        const pricePerNight = roomPrices[room.type][room.boardType];
                        return total + pricePerNight * room.count * nights;
                      }, 0);
                      const servicesTotal = selectedServices.reduce((total, serviceId) => {
                        const service = additionalServices.find((s) => s.id === serviceId);
                        if (!service) return total;
                        const count = serviceCounts[serviceId] ?? 1;
                        return total + service.price * count;
                      }, 0);
                      return roomTotal + servicesTotal;
                    })()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4 space-y-4 md:space-y-0">
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
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="booking-section"
      className={`${mode === "modal"
        ? "mx-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)]"
        : ""
        }`}
    >
      <div className="container mx-auto py-2 max-w-[80rem] px-0 sm:px-4 md:px-8 lg:px-16">
        {submitStatus === "success" ? (
          <BookingSuccessOverlay onDismiss={() => {
            setSubmitStatus("idle");
            onClose();
          }} />
        ) : (
          <>
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
            {submitStatus === "error" && (
              <div className="error-message mt-4">
                <p className="text-red-600">
                  Oops! Something went wrong while processing your booking.
                </p>
              </div>
            )}
          </>
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
    <nav className="mb-4 relative overflow-hidden">
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
                  ${isCurrent
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
  onAddOrIncrement: (type: RoomType, boardTypeForNew?: BoardType) => void;
  onRemoveOrDecrement: (type: RoomType) => void;
  onUpdateBoardType: (type: RoomType, boardType: BoardType) => void;
  onChangeRoomType: (oldType: RoomType, newType: RoomType) => void;
  availableRoomTypes: readonly RoomType[];
}> = ({ roomSelections, onAddOrIncrement, onRemoveOrDecrement, onUpdateBoardType, onChangeRoomType, availableRoomTypes }) => {
  const [editingRoomKey, setEditingRoomKey] = useState<string | null>(null);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2 text-gray-700">Room Selection:</h4>
      <div className="space-y-4">
        {roomSelections.map((room, index) => (
          <div
            key={`${room.type}-${index}`}
            className="flex flex-wrap items-center justify-between space-x-2 p-4 bg-gray-50 rounded-md"
          >
            {/* Conditionally render text/button or select dropdown */}
            <div className="mb-2 md:mb-0 md:mr-2 min-w-[180px]">
              {editingRoomKey === `${room.type}-${index}` ? (
                <select
                  value={room.type}
                  onChange={(e) => {
                    onChangeRoomType(room.type, e.target.value as RoomType);
                    setEditingRoomKey(null); // Revert to text display
                  }}
                  onBlur={() => setEditingRoomKey(null)} // Revert if clicked away
                  className="w-full p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-button focus:border-button"
                  autoFocus
                >
                  {availableRoomTypes.map(rt => (
                    <option key={rt} value={rt}>
                      {rt} Bed Room
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">{room.type} Bed Room</span>
                  <button
                    type="button"
                    onClick={() => setEditingRoomKey(`${room.type}-${index}`)}
                    className="ml-3 text-sm text-button hover:text-button-dark font-medium focus:outline-none underline"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 space-y-2">
              <select
                value={room.boardType}
                onChange={(e) =>
                  onUpdateBoardType(room.type, e.target.value as BoardType)}
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
                  onClick={() => onRemoveOrDecrement(room.type)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                >
                  Fewer
                </button>
                <span className="py-2 px-3 bg-white border rounded-md">
                  {room.count}
                </span>
                <button
                  type="button"
                  onClick={() => onAddOrIncrement(room.type, room.boardType)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                >
                  More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-300">
        <h4 className="text-lg font-medium mb-2 text-gray-700">
          Add another room type:
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableRoomTypes.map((rt) => {
            const isSelected = roomSelections.some(s => s.type === rt);
            if (isSelected) {
              return null;
            }
            return (
              <button
                key={rt}
                type="button"
                onClick={() => onAddOrIncrement(rt, "fullBoard")}
                className="px-4 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
              >
                Add {rt} Room
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AdditionalServicesForm: React.FC<{
  selectedServices: string[];
  handleServiceChange: (serviceId: string) => void;
  message: string;
  setMessage: (value: string) => void;
  serviceCounts: Record<string, number>;
  setServiceCounts: (counts: Record<string, number>) => void;
}> = ({ selectedServices, handleServiceChange, message, setMessage, serviceCounts, setServiceCounts }) => {

  const updateServiceCount = (serviceId: string, count: number) => {
    setServiceCounts({ ...serviceCounts, [serviceId]: Math.max(1, count) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Additional Services</label>
        {additionalServices.map((service) => (
          <div key={service.id} className="flex items-center justify-between py-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceChange(service.id)}
                className="mr-2"
              />
              <label htmlFor={service.id} className="flex items-center space-x-2 select-none">
                <span>
                  {service.name} - $
                  {service.allowQuantity && selectedServices.includes(service.id)
                    ? `${service.price} ${service.id === "transportFullDay" ? "per day" : "each"} (Total $${service.price * (serviceCounts[service.id] ?? 1)})`
                    : service.price}
                </span>
              </label>
            </div>

            {service.allowQuantity && selectedServices.includes(service.id) && (
              <span className="inline-flex items-center ml-2" title={`Adjust quantity for ${service.name}`}>
                <button
                  type="button"
                  onClick={() => updateServiceCount(service.id, (serviceCounts[service.id] ?? 1) - 1)}
                  className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 text-sm"
                >
                  -
                </button>
                <span className="px-3 py-1 bg-white border-t border-b text-sm min-w-[2rem] text-center">
                  {serviceCounts[service.id] ?? 1}
                </span>
                <button
                  type="button"
                  onClick={() => updateServiceCount(service.id, (serviceCounts[service.id] ?? 1) + 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 text-sm"
                >
                  +
                </button>
              </span>
            )}
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
  serviceCounts: Record<string, number>;
}> = (props) => {
  const calculateRoomTotal = () => {
    // Calculate number of nights between check-in and check-out
    const nights = Math.max(
      1,
      Math.ceil(
        (new Date(props.checkOut).getTime() -
          new Date(props.checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
      ),
    );

    return props.roomSelections.reduce((total, room) => {
      const pricePerNight = roomPrices[room.type][room.boardType];
      return total + pricePerNight * room.count * nights;
    }, 0);
  };

  const calculateServicesTotal = () => {
    return props.selectedServices.reduce((total, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      if (!service) return total;
      const count = props.serviceCounts[serviceId] ?? 1;
      return total + service.price * count;
    }, 0);
  };

  const grandTotal = calculateRoomTotal() + calculateServicesTotal();

  const numberOfDays = Math.max(
    1,
    Math.ceil(
      (new Date(props.checkOut).getTime() -
        new Date(props.checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold mb-3">Booking Summary</h3>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Guest Information */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-gray-700 mb-1 text-sm">Guest Information</h4>
            <div className="space-y-0.5 text-xs">
              <p><span className="font-medium">Name:</span> {props.guestName}</p>
              <p><span className="font-medium">Email:</span> {props.guestEmail}</p>
              <p><span className="font-medium">Guests:</span> {props.adults} Adults{props.children05 > 0 ? `, ${props.children05} Children (0-5)` : ''}{props.children616 > 0 ? `, ${props.children616} Children (6-16)` : ''}</p>
              <p><span className="font-medium">East African Resident:</span> {props.isEastAfricanResident ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Stay Details */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-gray-700 mb-1 text-sm">Stay Details</h4>
            <div className="space-y-0.5 text-xs">
              <p><span className="font-medium">Check-in:</span> {props.checkIn}</p>
              <p><span className="font-medium">Check-out:</span> {props.checkOut}</p>
              <p><span className="font-medium">Nights:</span> {numberOfDays}</p>
              <p><span className="font-medium">Flexible Dates:</span> {props.isFlexibleDates ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        {/* Room Selection */}
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="font-medium text-gray-700 mb-1 text-sm">Room Selection</h4>
          <div className="space-y-1 text-xs">
            {props.roomSelections.map((room, index) => (
              <div key={index} className="flex justify-between">
                <span>{room.count} × {room.type} Bed ({room.boardType})</span>
                <span>${roomPrices[room.type][room.boardType] * numberOfDays * room.count}</span>
              </div>
            ))}
            <div className="border-t pt-1 mt-1 font-medium flex justify-between text-sm">
              <span>Room Total:</span>
              <span>${calculateRoomTotal()}</span>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        {props.selectedServices.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-gray-700 mb-1 text-sm">Additional Services</h4>
            <div className="space-y-1 text-xs">
              {props.selectedServices.map((serviceId) => {
                const service = additionalServices.find((s) => s.id === serviceId);
                if (!service) return null;
                const count = props.serviceCounts[serviceId] ?? 1;
                return (
                  <div key={serviceId} className="flex justify-between">
                    <span>{service.name}{count > 1 ? ` (x${count})` : ''}</span>
                    <span>${service.price * count}</span>
                  </div>
                );
              })}
              <div className="border-t pt-1 mt-1 font-medium flex justify-between text-sm">
                <span>Services Total:</span>
                <span>${calculateServicesTotal()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Additional Message */}
        {props.message && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-gray-700 mb-1 text-sm">Additional Message</h4>
            <p className="text-xs">{props.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BookingSuccessOverlay: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your booking. We&apos;ve sent a confirmation email with all the details.
          We&apos;re looking forward to welcoming you to Le Bambou Gorilla Lodge!
        </p>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-md p-4 mb-6 text-sm text-gray-700">
          <p className="font-medium mb-2">What happens next?</p>
          <ul className="text-left space-y-1">
            <li>• Check your email for booking confirmation</li>
            <li>• Payment details will be sent separately</li>
            <li>• We&apos;ll contact you if we need any additional information</li>
          </ul>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="w-full px-6 py-3 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};
