import React from "react";
import styled from "styled-components";
import * as Router from "react-router";
import { LogoIcon } from "../../../common/logo-icon";
import { routes } from "../../app/contants";
import { Button } from "../../../common/button";

const Container = styled("div")`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ContentWrapper = styled("div")`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, white 50%, #e60000 50%)
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

const LogInWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 270px;
`;

const SignUpWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

export interface OnboardingProps {}

export const Onboarding: React.FC<OnboardingProps> = () => {
  const history = Router.useHistory();
  const handleLogInClick = () => history.push(routes.login);
  const handleSignUpClick = () => history.push(routes.signUp);

  return (
    <Container>
      <ContentWrapper>
      <Content>
        <LogoIconWrapper>
          <LogoIcon />
        </LogoIconWrapper>
        <Title>Parrots, Inc.</Title>
        <BottomBlock>
          <LogInWrapper>
            <Button onClick={handleLogInClick}>Log In</Button>
          </LogInWrapper>
          <SignUpWrapper>
            <Button onClick={handleSignUpClick}>Sign Up</Button>
          </SignUpWrapper>
        </BottomBlock>
      </Content>
      </ContentWrapper>
    </Container>
  );
};
