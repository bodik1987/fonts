import React, { useState, useRef } from "react";

type Props = {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
};

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
}: Props) {
  const [sliderValue, setSliderValue] = useState(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateValue = (offsetX: number, sliderWidth: number) => {
    const percent = Math.min(Math.max(offsetX / sliderWidth, 0), 1); // Clamp between 0 and 1
    const rawValue = min + percent * (max - min);
    return Math.round(rawValue / step) * step;
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;

    const sliderWidth = slider.offsetWidth;
    const sliderLeft = slider.getBoundingClientRect().left;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - sliderLeft;

    const newValue = calculateValue(offsetX, sliderWidth);
    setSliderValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleStartDrag = (e: React.MouseEvent | React.TouchEvent) => {
    handleDrag(e);

    const stopDrag = () => {
      document.removeEventListener("mousemove", handleDrag as any);
      document.removeEventListener("touchmove", handleDrag as any);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
    };

    document.addEventListener("mousemove", handleDrag as any);
    document.addEventListener("touchmove", handleDrag as any);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  };

  const sliderPercent = ((sliderValue - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-3">
      <div
        ref={sliderRef}
        className="relative h-2 bg-white cursor-pointer rounded-md"
        onMouseDown={handleStartDrag}
        onTouchStart={handleStartDrag}
      >
        <div
          className="absolute h-full bg-[#707070] rounded-md"
          style={{ width: `${sliderPercent}%` }}
        ></div>
        <div
          className="absolute w-6 h-6 bg-black shadow-lg rounded-full transform -translate-x-1/2 -top-full cursor-pointer"
          style={{ left: `${sliderPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
