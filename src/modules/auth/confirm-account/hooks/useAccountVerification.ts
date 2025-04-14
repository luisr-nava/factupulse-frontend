import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { confirmAccount } from "../actions/confirm-account-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useAccountVerification = () => {
  const PIN_LENGTH = 6;
  const router = useRouter();
  const [token, setToken] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const confirmAccountWithToken = confirmAccount.bind(null, token.join(""));

  const [state, dispatch, isLoading] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

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
        await new Promise((res) => setTimeout(res, 100));

        startTransition(() => {
          dispatch();
        });

        await new Promise((res) => setTimeout(res, 300));
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

  return {
    dispatch,
    handleChange,
    handleKeyDown,
    inputs,
    isComplete,
    isLoading,
    PIN_LENGTH,
    setIsComplete,
    setToken,
    state,
    token,
  };
};

