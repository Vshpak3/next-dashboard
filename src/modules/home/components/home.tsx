import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../app/contants";
import Header from '../components/header'
export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
    <div>
       <Header />
    </div>
    </>
  );
};

export default Home