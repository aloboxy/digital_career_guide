import React, { createContext, useContext, useState } from "react";
import ProModal from "@/components/ProModal";

interface ProModalContext {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const ProModalContext = createContext<ProModalContext>({
  showModal: false,
  setShowModal: () => {},
});

export const useProModal = () => {
  return useContext(ProModalContext);
};

const ProModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ProModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
      <ProModal showModal={showModal} setShowModal={setShowModal} />
    </ProModalContext.Provider>
  );
};

export default ProModalProvider;
