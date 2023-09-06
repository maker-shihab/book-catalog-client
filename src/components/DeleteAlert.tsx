/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const DeleteAlert = (submitHandler) => {
  confirmAlert({
    title: "Confirm to Delete",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => submitHandler(),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
};

export default DeleteAlert;
