import React from "react";
import styled from "styled-components";
import { LogoIcon } from "../../../common/logo-icon";
import { Input } from "../../../common/input";
import { LeftArrowIcon } from "../../../common/left-arrow-icon";
import { RightArrowIcon } from "../../../common/right-arrow-icon";
import { Loader } from "../../../common/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useResetPassword from "../hooks/useResetPassword";
import { useHistory } from "react-router-dom";
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

const PasswordWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

const Content = styled("div")`
  width: 2960px;
  transform: scale(0.4) translate(-50%, -50%);
  transform-origin: left top;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
`;

const LogoIconWrapper = styled("div")`
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
  margin-top: 270px;
  flex-direction: column;
  div {
    margin-bottom: 72px;
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

export interface ConfirmCodeProps {}

const ConfirmCode: React.FC<ConfirmCodeProps> = () => {
  const {
    confirmCode,
    setConfirmCode,
    newPassword,
    setNewPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    isFetching,
    forgotPassword,
  } = useResetPassword();
  const history = useHistory();

  return (
    <Container>
      <ContentWrapper>
        <Content>
          <LogoIconWrapper>
            <LogoIcon />
          </LogoIconWrapper>
          <Title>Confirm code</Title>
          <BottomBlock>
            <UsernameWrapper>
              <Input
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                placeholder="Code"
              />
            </UsernameWrapper>
            <PasswordWrapper>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
              />
            </PasswordWrapper>
            <PasswordWrapper>
              <Input
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder="Confirm password"
              />
            </PasswordWrapper>
            <ArrowsWrapper>
              <ArrowWrapper
                onClick={() => {
                  history.push(routes.login);
                  localStorage.removeItem("emailReset");
                }}
              >
                <LeftArrowIcon />
              </ArrowWrapper>
              <ArrowWrapper onClick={() => forgotPassword()}>
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

export default ConfirmCode;
