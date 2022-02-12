import { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { routes } from "../../app/contants";
import { Alert, ALERT_TYPE } from "../../../common/alert";

const configAlert = {
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
};

const useResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>(
    localStorage.getItem("emailReset") ?? ""
  );
  const [confirmCode, setConfirmCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //see it https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#forgot-password
  const sendMailReset = async () => {
    setIsFetching(true);
    try {
      const res = await Auth.forgotPassword(email);

      localStorage.setItem("emailReset", email);

      Alert("Mail send success", ALERT_TYPE.SUCCESS);
      setTimeout(() => {
        history.push(routes.confirmCode);
      }, 2000);
    } catch (err) {
      localStorage.setItem("emailReset", email);
      history.push(routes.confirmCode);

      if (err.message) {
        Alert(err.message, ALERT_TYPE.ERROR);
      } else if (err.log) {
        Alert(err.log, ALERT_TYPE.ERROR);
      }
    }
    setIsFetching(false);
  };

  const forgotPassword = async () => {
    setIsFetching(true);
    try {
      if (checkConfirmPass()) {
        const res = await Auth.forgotPasswordSubmit(
          email,
          confirmCode,
          newPassword
        );

        Alert("Forgot password success", ALERT_TYPE.SUCCESS);
        localStorage.removeItem("emailReset");
        setTimeout(() => {
          history.push(routes.login);
        }, 2000);
      }
    } catch (err) {
      if (err.message) {
        Alert(err.message, ALERT_TYPE.ERROR);
      } else if (err.log) {
        Alert(err.log, ALERT_TYPE.ERROR);
      }
    }
    setIsFetching(false);
  };

  const checkConfirmPass = () => {
    if (newPassword == "" && newPasswordConfirm == "") {
      Alert("Confirm password is not correct", ALERT_TYPE.ERROR);
      return false;
    }
    if (newPassword === newPasswordConfirm) {
      return true;
    } else {
      Alert("Confirm password is not correct", ALERT_TYPE.ERROR);
      return false;
    }
  };

  return {
    email,
    setEmail,
    confirmCode,
    setConfirmCode,
    newPassword,
    setNewPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    isFetching,
    sendMailReset,
    forgotPassword,
  };
};
export default useResetPassword;
