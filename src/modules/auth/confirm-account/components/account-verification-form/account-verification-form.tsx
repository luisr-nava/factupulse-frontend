"use client";

import { CustomSpinner } from "@/components/ui";
import { Input } from "antd";
import { useAccountVerification } from "../../hooks";

export default function AccountVerificationForm() {
  const {
    handleChange,
    handleKeyDown,
    inputs,
    isLoading,
    PIN_LENGTH,
    state,
    token,
  } = useAccountVerification();

  return (
    <div className="relative flex justify-center my-10">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center rounded">
          <CustomSpinner />
        </div>
      )}

      <div className="flex gap-3 z-0">
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <Input
            key={i}
            maxLength={1}
            value={token[i] || ""}
            disabled={isLoading}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => {
              inputs.current[i] = el?.input || null;
            }}
            style={{
              width: 40,
              height: 40,
              textAlign: "center",
              fontSize: "1.2rem",
              borderRadius: 8,
            }}
          />
        ))}
      </div>
    </div>
  );
}

