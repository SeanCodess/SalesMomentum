import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cx } from "../utils/cx";

interface DropdownProps {
  options: readonly string[];
  selectedValue: string;
  onSelect: (option: string) => void;
  label: string;
}

export default function Dropdown({
  options,
  selectedValue,
  onSelect,
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const baseBtnClasses =
    "flex items-center justify-between w-full p-2 rounded-lg text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60";
  const inactiveClasses =
    "bg-gray-800/50 text-neutral-300 hover:bg-neutral-800 hover:text-white";

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cx(baseBtnClasses, inactiveClasses)}
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          <h3>
            {selectedValue} {label}
          </h3>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg z-10 overflow-hidden"
          >
            {options
              .filter((opt) => opt !== selectedValue)
              .map((option) => (
                <li key={option}>
                  <button
                    onClick={() => handleSelect(option)}
                    className="w-full text-left p-2 text-sm font-semibold text-neutral-300 hover:bg-neutral-700 hover:text-white"
                  >
                    {option} {label}
                  </button>
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
