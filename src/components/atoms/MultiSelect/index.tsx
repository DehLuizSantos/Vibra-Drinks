"use client";

import { useState, useRef, useEffect } from "react";
import { inputClass } from "@/components/organisms/Steeper";
import { Field } from "../Field";

interface MultiSelectProps {
  options: string[];
  value: string[]; // Array de valores selecionados
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  label
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focar no input de busca quando abrir
  useEffect(
    () => {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    [isOpen]
  );

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(item => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const removeSelected = (option: string) => {
    onChange(value.filter(item => item !== option));
  };

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <Field label={label}>
        <div
          className={`${inputClass} cursor-pointer flex items-center justify-between min-h-13`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {value.length === 0 &&
              <span className="text-white-400">
                {placeholder}
              </span>}
            {value.map(selected =>
              <span
                key={selected}
                className="bg-gold/20 text-gold px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {selected.length > 30
                  ? selected.substring(0, 30) + "..."
                  : selected}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    removeSelected(selected);
                  }}
                  className="hover:text-white-500 text-gold ml-1"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <span
            className={`text-gold transition-transform ${isOpen
              ? "rotate-180"
              : ""}`}
          >
            ▼
          </span>
        </div>
      </Field>
      {/* Select trigger */}

      {/* Dropdown */}
      {isOpen &&
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border-2 border-gold rounded-lg shadow-lg h-90 overflow-hidden flex flex-col">
          {/* Search input */}
          <div className="p-2 border-b border-gold/30">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar drink..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Options list */}
          <div className="overflow-y-auto h-90">
            {filteredOptions.length === 0
              ? <div className="p-4 text-center text-white-400 text-sm">
                  Nenhum drink encontrado
                </div>
              : filteredOptions.map(option =>
                  <label
                    key={option}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gold/10 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option)}
                      onChange={() => toggleOption(option)}
                      className="accent-gold w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white-500 text-sm flex-1">
                      {option}
                    </span>
                  </label>
                )}
          </div>
        </div>}
    </div>
  );
}
