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
  const [code, setCode] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const confirmAccountWithToken = confirmAccount.bind(null, code.join(""));

  const [state, dispatch, pending] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newToken = [...code];
    newToken[index] = value;
    setCode(newToken);

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
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevToken = [...code];
      prevToken[index - 1] = "";
      setCode(prevToken);
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
    pending,
    PIN_LENGTH,
    setIsComplete,
    setCode,
    state,
    code,
  };
};


