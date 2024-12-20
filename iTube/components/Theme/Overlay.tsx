import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
import { Box, FlexBox, FlexBoxProps } from "@/components/Theme";

export interface OverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  flexBoxProps?: FlexBoxProps;
}

export function Overlay({
  children,
  isOpen,
  onClose,
  flexBoxProps,
}: OverlayProps) {
  const $flexBoxProps: FlexBoxProps = {
    $height: "100%",
    $width: "100%",
    $background: "rgba(0, 0, 0, 0.5)",
    $alignItems: "center",
    $justifyContent: "center",
    ...flexBoxProps,
  };

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && onClose !== undefined) {
      event.stopPropagation();
      onClose();
    }
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <Box
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          $position="fixed"
          $top="0"
          $left="0"
          $right="0"
          $bottom="0"
        >
          <FlexBox {...$flexBoxProps} onClick={handleClick}>
            {children}
          </FlexBox>
        </Box>
      )}
    </AnimatePresence>,
    document.body,
  );
}
