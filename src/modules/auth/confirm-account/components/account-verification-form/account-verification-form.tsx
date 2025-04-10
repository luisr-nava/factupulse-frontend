"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { confirmAccount } from "../../actions/confirm-account-action";
import { useRouter } from "next/navigation";
import { CustomSpinner } from "@/components/ui";
import { Input } from "antd";

const PIN_LENGTH = 6;

export default function AccountVerificationForm() {
  const router = useRouter();

  const [token, setToken] = useState<string[]>(Array(PIN_LENGTH).fill(""));

  const [isLoading, setIsLoading] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  const confirmAccountWithToken = confirmAccount.bind(null, token.join(""));

  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newToken = [...token];
    newToken[index] = value;
    setToken(newToken);

    const joined = newToken.join("");
    if (value && index < PIN_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    const allFilled = newToken.every((val) => val !== "");
    setIsComplete(allFilled);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !token[index] && index > 0) {
      const prevToken = [...token];
      prevToken[index - 1] = "";
      setToken(prevToken);
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (isComplete) {
      const runDispatch = async () => {
        setIsLoading(true);

        await new Promise((res) => setTimeout(res, 100)); 

        startTransition(() => {
          dispatch();
        });

        await new Promise((res) => setTimeout(res, 300));

        setIsLoading(false);
      };
      runDispatch();
    }
  }, [isComplete, dispatch]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/auth/login");
    }
  }, [state, router]);
  return (
    <div className="relative flex justify-center my-10">
      {/* Overlay Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center rounded">
          <CustomSpinner />
        </div>
      )}

      {/* Inputs */}
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

