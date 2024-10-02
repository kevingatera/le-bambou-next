'use client'

import React, { useState, useEffect } from 'react'
import { BookingSection } from './BookingSection'
import { getStoredBookingData, setStoredBookingData } from "~/app/_utils/localStorage";

export const BookingCallToActionWithReservationSection = () => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(1)
  const [children05, setChildren05] = useState(0)
  const [children616, setChildren616] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  useEffect(() => {
    const storedData = getStoredBookingData();
    if (storedData) {
      setCheckIn(storedData.checkIn || '');
      setCheckOut(storedData.checkOut || '');
      setAdults(storedData.adults || 1);
      setChildren05(storedData.children05 || 0);
      setChildren616(storedData.children616 || 0);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBookingModalOpen) {
        closeBookingModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookingModalOpen]);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault()
    setStoredBookingData({ checkIn, checkOut, adults, children05, children616 });
    setIsBookingModalOpen(true)
    document.body.classList.add('overflow-hidden')
  }

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <section className="bg-[rgba(121,98,90,.89)]">
      <div className="container mx-auto md:px-4">
        <form onSubmit={handleBookNow} className="rounded-lg p-6 pb-7 max-w-4xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            <div className="col-span-2 md:col-span-2">
              <label htmlFor="checkIn" className="block text-sm text-[#ebf8f7] font-medium  mb-1 mx-1">Check-in</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-2 md:col-span-2">
              <label htmlFor="checkOut" className="block text-sm text-[#ebf8f7] font-medium  mb-1 mx-1">Check-out</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <label htmlFor="adults" className="block text-sm text-[#ebf8f7] font-medium  mb-1 mx-1">Adults</label>
              <input
                type="number"
                id="adults"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <label htmlFor="children05" className="block text-sm text-[#ebf8f7] font-medium  mb-1 mx-1">Kids 0-5</label>
              <input
                type="number"
                id="children05"
                value={children05}
                onChange={(e) => setChildren05(parseInt(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <label htmlFor="children616" className="block text-sm text-[#ebf8f7] font-medium  mb-1 mx-1">Kids 6-16</label>
              <input
                type="number"
                id="children616"
                value={children616}
                onChange={(e) => setChildren616(parseInt(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c2c2c] focus:border-transparent"
              />
            </div>
            <div className="text-center content-end col-span-4 md:col-span-2 lg:col-span-4">
              <button type="submit" className="w-full px-6 py-2 bg-button text-white rounded-md hover:bg-[#2c2c2c] transition duration-300">
                Book
              </button>
            </div>
          </div>
        </form>
      </div>
      {isBookingModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeBookingModal}
        >
          <div
            className="bg-[#d7dfde] p-6 rounded-lg max-w-3xl w-full max-h-[100dvh] md:max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBookingModal}
              className="float-right text-4xl"
            >
              &times;
            </button>
            <BookingSection
              initialRoomType={null}
              onClose={closeBookingModal}
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              initialAdults={adults}
              initialChildren05={children05}
              initialChildren616={children616}
            />
          </div>
        </div>
      )}
    </section>
  )
}