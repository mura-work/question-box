import React, { useState, useCallback } from "react";

export const useDisclosure = (inital = false) => {
  const [isOpen, setIsOpen] = useState(inital);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, open, close, toggle };
};
