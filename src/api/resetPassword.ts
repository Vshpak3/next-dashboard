import { Auth } from "aws-amplify";

const sendMail = async (email: string) => {
  // Send confirmation code to user's email
  console.log({ email });
  Auth.forgotPassword(email)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export { sendMail };
