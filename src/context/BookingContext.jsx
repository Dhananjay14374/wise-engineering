import { createContext, useContext, useMemo, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openBooking: () => setIsOpen(true),
      closeBooking: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
