import { AppButton } from "@/components";
import { Modal } from "antd";

interface CancelModalProps {
  showCancelDialog: boolean;
  setShowCancelDialog: (show: boolean) => void;
  closeForm: () => void;
}

export default function CancelModal({
  showCancelDialog,
  setShowCancelDialog,
  closeForm,
}: CancelModalProps) {
  return (
    <Modal
      open={showCancelDialog}
      centered
      footer={
        <div className="flex justify-end gap-3">
          <AppButton
            className=" text-white px-4 py-2 rounded-md"
            onClick={() => setShowCancelDialog(false)}>
            No, cancelar
          </AppButton>
          <AppButton
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:!bg-red-900"
            onClick={() => {
              setShowCancelDialog(false);
              closeForm();
            }}>
            Sí, cancelar
          </AppButton>
        </div>
      }>
      <div className="grid">
        <h4 className="text-center text-2xl font-bold mb-3">
          ¿Cancelar creación?
        </h4>
        <p>¿Estás seguro que quieres cancelar la creación?</p>
      </div>
    </Modal>
  );
}

