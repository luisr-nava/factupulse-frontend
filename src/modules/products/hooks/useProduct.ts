import { useProductStore } from "./useProductStore";

export const useProduct = () => {
  const isOpen = useProductStore((s) => s.isOpen);
  const mode = useProductStore((s) => s.mode);
  const product = useProductStore((s) => s.product);
  const openForm = useProductStore((s) => s.openForm);
  const closeForm = useProductStore((s) => s.closeForm);
  const setProduct = useProductStore((s) => s.setProduct);

  return {
    mode,
    product,
    openForm,
    closeForm,
    setProduct,
    isOpen,
  };
};

