"use client";

import React from "react";
import { LogOut, GalleryVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconProps = "w-4 h-4";

const MenuToggleIcon = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <AnimatePresence mode="wait">
      {!isMenuOpen ? (
        <motion.div
          key="menu"
          initial={{ opacity: 0, scale: 0.5, y: 20}}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <GalleryVertical className={iconProps} />
        </motion.div>
      ) : (
        <motion.div
          key="close"
          initial={{ opacity: 0, scale: 0.5, y: -20, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -90 }}
          exit={{ opacity: 0, scale: 0.5, y: -20, rotate: -90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <LogOut className={iconProps} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuToggleIcon;
