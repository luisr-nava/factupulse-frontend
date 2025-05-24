import { useState, useRef, useEffect } from "react";
import { AppButton } from "../app-button";

interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function Tabs({ tabs, value, onChange }: TabsProps) {
  const [internalValue, setInternalValue] = useState(value || tabs[0].value);
  const activeValue = value ?? internalValue;
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  const handleClick = (val: string) => {
    if (!value) setInternalValue(val);
    onChange?.(val);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeIndex = tabs.findIndex((t) => t.value === activeValue);
    const button = container.children[activeIndex] as HTMLElement;
    if (button) {
      setHighlightStyle({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
    }
  }, [activeValue, tabs]);

  return (
    <div className="relative w-full">
      {/* Highlight background */}
      <div
        className="absolute h-full top-0 left-0 transition-all duration-300 rounded-xl bg-primary-500 z-0"
        style={{
          width: `${highlightStyle.width}px`,
          transform: `translateX(${highlightStyle.left}px)`,
        }}
      />

      <div
        ref={containerRef}
        className="flex w-full bg-white rounded-xl overflow-hidden relative z-10">
        {tabs.map((tab) => (
          <AppButton
            key={tab.value}
            onClick={() => handleClick(tab.value)}
            className={`
              w-full justify-center text-sm font-medium
              ${
                activeValue === tab.value
                  ? "text-white"
                  : "text-primary-900 hover:bg-primary-50"
              }
              bg-transparent rounded-none border-none
            `}
            type="text">
            {tab.label}
          </AppButton>
        ))}
      </div>
    </div>
  );
}

