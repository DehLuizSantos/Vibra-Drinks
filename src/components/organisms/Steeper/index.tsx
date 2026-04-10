"use client";

import { StepForm1 } from "@/components/molecules/SteepForm1";
import { StepForm2 } from "@/components/molecules/SteepForm2";
import { StepForm3 } from "@/components/molecules/SteepForm3";
import Image from "next/image";
import { useState } from "react";

const steps = [
  { number: 1, label: "Informações pessoais" },
  { number: 2, label: "Informações evento" },
  { number: 3, label: "Variáveis do evento" }
];

const stepForms = [
  <StepForm1 key={1} />,
  <StepForm2 key={2} />,
  <StepForm3 key={3} />
];

import { useRef } from "react";

export default function Steeper() {
  const [currentStep, setCurrentStep] = useState(1);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const readImage = () => {
    const images = [
      {
        image: "/images/orcamento/section1.png",
        alt: "Drinks"
      },
      {
        image: "/images/orcamento/section2.png",
        alt: "Drinks"
      },
      {
        image: "/images/orcamento/section3.png",
        alt: "Drinks"
      }
    ];

    return images[currentStep - 1];
  };

  return (
    <div className="w-full relative md:flex md:flex-row-reverse">
      <div className="mx-auto relative w-82.5 h-82.5 md:w-125 md:h-130">
        <Image
          src={readImage().image}
          fill
          alt={readImage().alt}
          className="mx-auto my-8"
        />
      </div>
      <div className="mt-12">
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-4 overflow-x-auto p-4"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {steps.map((step, index) =>
            <div
              key={step.number}
              className="flex items-start gap-4"
              style={{ flexShrink: 0 }}
            >
              <button
                onClick={() => setCurrentStep(step.number)}
                className="text-left cursor-pointer group"
              >
                <p
                  className={`display-font text-xs transition-colors ${currentStep ===
                  step.number
                    ? "text-gold"
                    : "text-white-500"}`}
                >
                  Passo {step.number}
                </p>
                <p
                  className={`display-marcellus text-sm transition-colors ${currentStep ===
                  step.number
                    ? "text-gold"
                    : "text-white-500"}`}
                >
                  {step.label}
                </p>
              </button>

              {index < steps.length - 1 &&
                <span className="text-white-300 text-xl mt-1 select-none">
                  ›
                </span>}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="p-8">
          {stepForms[currentStep - 1]}
        </div>
      </div>
    </div>
  );
}
