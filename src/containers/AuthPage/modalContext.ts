import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  isModal1Visible: boolean;
  isModal2Visible: boolean;
  toggleModal1: () => void;
  toggleModal2: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModal1Visible, setModal1Visible] = useState(false);
  const [isModal2Visible, setModal2Visible] = useState(false);

  const toggleModal1 = () => {
    setModal1Visible((prevState) => !prevState);
  };

  const toggleModal2 = () => {
    setModal2Visible((prevState) => !prevState);
  };

  return (
    <ModalContext.Provider
      value={{ isModal1Visible, isModal2Visible, toggleModal1, toggleModal2 }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
