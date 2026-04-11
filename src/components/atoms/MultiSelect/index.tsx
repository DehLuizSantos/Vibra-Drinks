"use client";

import { useState, useRef, useEffect } from "react";
import { inputClass } from "@/components/organisms/Steeper";
import { Field } from "../Field";
import Tooltip from "../ToolTip";

interface DrinkOption {
  name: string;
  description: string;
}

interface MultiSelectProps {
  options: string[] | DrinkOption[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label: string;
  tooltipMessage?: string; // Tooltip do Field (label)
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  label,
  tooltipMessage
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
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleOption = (optionName: string) => {
    if (value.includes(optionName)) {
      onChange(value.filter(item => item !== optionName));
    } else {
      onChange([...value, optionName]);
    }
  };

  const removeSelected = (option: string) => {
    onChange(value.filter(item => item !== option));
  };

  // Normaliza as opções para o formato DrinkOption
  const normalizedOptions: DrinkOption[] = options.map(opt =>
    typeof opt === 'string'
      ? { name: opt, description: '' }
      : opt
  );

  const filteredOptions = normalizedOptions.filter(opt =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para obter o nome da opção (para exibição)
  const getOptionName = (option: string | DrinkOption): string =>
    typeof option === 'string' ? option : option.name;

  // Função para obter a descrição da opção
  const getOptionDescription = (optionName: string): string => {
    const option = normalizedOptions.find(opt => opt.name === optionName);
    return option?.description || '';
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <Field
        label={label}
        hasTooltip={true}
        tooltipMessage={'Escolha os drinks que iremos servir em seu evento'}
        tooltipPosition="left"
      >
        <div
          className={`${inputClass} cursor-pointer flex items-center justify-between min-h-13`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {value.length === 0 && (
              <span className="text-white-400">{placeholder}</span>
            )}
            {value.map(selected => (
              <span
                key={selected}
                className="bg-gold/20 text-gold px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {selected.length > 30 ? selected.substring(0, 30) + "..." : selected}
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
            ))}
          </div>
          <span className={`text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
      </Field>

      {/* Dropdown */}
      {isOpen && (
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
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-white-400 text-sm">
                Nenhum drink encontrado
              </div>
            ) : (
              filteredOptions.map(option => (
                <label
                  key={option.name}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gold/10 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.name)}
                    onChange={() => toggleOption(option.name)}
                    className="accent-gold w-4 h-4 cursor-pointer"
                  />
                  <span className="text-white-500 text-sm flex-1">
                    {option.name}
                  </span>
                  {option.description && (
                    <Tooltip message={option.description} position="left" />
                  )}
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}