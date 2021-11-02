import * as RD from "../../../utils/remoteData";
import * as Rx from "rxjs";
import {
  switchMap,
  shareReplay,
  distinctUntilChanged,
  withLatestFrom,
  tap,
  map,
  filter,
} from "rxjs/operators";
import { ResetPasswordProps } from "../components/reset-password";
import { login$ } from "../../../api/login";
import { useHistory } from "react-router-dom";
import { routes } from "../../app/contants";
import { useState } from "react";
import { sendMail } from "../../../api/resetPassword";

const useResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const sendMailReset = () => {
    try {
      const res = sendMail("galvin.brightsoft@gmail.com");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return { email, setEmail, isFetching, sendMailReset };
};
export default useResetPassword;
