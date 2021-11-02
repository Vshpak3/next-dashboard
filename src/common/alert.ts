import { toast } from "react-toastify";
export enum ALERT_TYPE {
  ERROR = "error",
  SUCCESS = "success",
}

export const Alert = (message: string, type: ALERT_TYPE) => {
  if (type === ALERT_TYPE.ERROR) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        maxWidth: "100%",
      },
    });
  } else if (type === ALERT_TYPE.SUCCESS) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        maxWidth: "100%",
      },
    });
  }
};
