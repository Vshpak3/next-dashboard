import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { LogoIcon } from "../../../common/logo-icon";
import { Input } from "../../../common/input";
import { Switcher } from "../../../common/switcher";
import { LeftArrowIcon } from "../../../common/left-arrow-icon";
import { RightArrowIcon } from "../../../common/right-arrow-icon";
import { Loader } from "../../../common/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Router from "react-router";
import { routes } from "../../app/contants";
const Container = styled("div")`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ContentWrapper = styled("div")`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, white 50%, #e60000 50%);
`;

const Content = styled("div")`
  margin-top: 90px;
  width: 2960px;
  height: 2197px;
  transform: scale(0.4) translate(-50%, -50%);
  transform-origin: left top;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
`;

const LogoIconWrapper = styled("div")`
  margin-top: 192px;
  text-align: center;
`;

const Title = styled("div")`
  text-align: center;
  margin-top: 47px;
  font-style: normal;
  font-weight: normal;
  font-size: 120px;
  line-height: 153px;
  color: #e60000;
`;

const BottomBlock = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
`;

const UsernameWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
`;

const PasswordWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

const SwitcherWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
  .reset-pass {
    cursor: pointer;
  }
`;

const Label = styled("div")`
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 51px;
  color: #ffffff;
  margin-right: 40px;
`;

const ArrowsWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 61px;
`;

const ArrowWrapper = styled("div")`
  margin-right: 279px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export interface LoginProps {
  onSuccessSignIn(token: string, refreshToken: string, remember: boolean): void;
  username: string;
  password: string;
  checked: boolean;
  onUsernameChange(username: string): void;
  onPasswordChange(password: string): void;
  onCheckedChange(checked: boolean): void;
  onLeftClick(): void;
  onRightClick(): void;
  isFetching: boolean;
  error: { message: string } | null;
}

export const Login: React.FC<LoginProps> = ({
  username,
  password,
  checked,
  onUsernameChange,
  onPasswordChange,
  onCheckedChange,
  onLeftClick,
  onRightClick,
  isFetching,
  error,
}) => {
  const history = Router.useHistory();
  const handleResetPasswordClick = () => history.push(routes.resetPassword);

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onUsernameChange(e.target.value);
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onPasswordChange(e.target.value);

  React.useEffect(() => {
    if (error) {
      // alert(error.message);
      const response = JSON.parse(error.message);
      if (response.message) {
        toast.error(response.message, {
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
      } else if (response.log) {
        toast.error(response.log, {
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
    }
  }, [error]);
  return (
    <Container>
      <ContentWrapper>
        <Content>
          <LogoIconWrapper>
            <LogoIcon />
          </LogoIconWrapper>
          <Title>Log In</Title>
          <BottomBlock>
            <UsernameWrapper>
              <Input
                value={username}
                onChange={handleUsernameChange}
                placeholder="Email"
              />
            </UsernameWrapper>
            <PasswordWrapper>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
            </PasswordWrapper>
            {/*<p onClick={handleResetPasswordClick}>Reset password</p>*/}
            <SwitcherWrapper>
              <Label className="reset-pass" onClick={handleResetPasswordClick}>
                Reset password
              </Label>
            </SwitcherWrapper>
            <SwitcherWrapper>
              <Label>Remember me on this device</Label>
              <Switcher value={checked} onChange={onCheckedChange} />
            </SwitcherWrapper>
            <ArrowsWrapper>
              <ArrowWrapper onClick={onLeftClick}>
                <LeftArrowIcon />
              </ArrowWrapper>
              <ArrowWrapper onClick={onRightClick}>
                <RightArrowIcon />
              </ArrowWrapper>
            </ArrowsWrapper>
          </BottomBlock>
        </Content>
      </ContentWrapper>
      {isFetching && <Loader />}
      <ToastContainer />
    </Container>
  );
};
