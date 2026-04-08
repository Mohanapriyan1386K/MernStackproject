import { useDispatch } from "react-redux";
import { closeModal } from "../Redux/Slice/modalSlice";
import CustomButton from "../component/CustomButton";

function DeleteModal({ data, onDelete,mode }: any) {
  const dispatch = useDispatch();

  return (
    <div>
      <p>{ mode=="Logout" ?`Are you sure you want to Logout ?`:`Are you sure you want to delete ${data?.user_name??""}?`}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
        }}
      >
        <CustomButton
          variant="text"
          label="Cancel"
          backgroundColor=""
          onClick={() => dispatch(closeModal())}
        />

        <CustomButton
          label={mode=="Logout"?"Logout":"Delete"}
          backgroundColor="red"
          onClick={() => onDelete(data)}
        />
      </div>
    </div>
  );
}

export default DeleteModal;