import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../Redux/Slice/modalSlice";
import { MODAL_COMPONENTS } from "../Modal/ModalComponent";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const { currentModal, modalProps } = useSelector((state: any) => state.modal);

  const handleClose = () => dispatch(closeModal());

  if (!currentModal) return null;
  //@ts-ignore
  const Component = MODAL_COMPONENTS[currentModal];

  if (!Component) return null;

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth={modalProps?.size || "md"}
    >
      {/* Header */}
      <DialogTitle sx={{ display: "flex",fontSize:25, justifyContent: "space-between" }}>
        {modalProps?.title || "Modal"}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderBottomWidth: 2, borderColor: "gray" }} />

      {/* Full Component Render */}
      <DialogContent sx={{ p: 2 }}>
        <Component {...modalProps} onClose={handleClose} />
      </DialogContent>
      <Divider sx={{ borderBottomWidth: 2, borderColor: "gray" }} />
    </Dialog>
  );
};

export default GlobalModal;
