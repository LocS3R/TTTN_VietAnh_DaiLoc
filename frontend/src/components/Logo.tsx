import imgUrl from "../assets/logo.svg";

import React from "react";

const Logo: React.FC = () => {
  return <img src={imgUrl} alt="logo" width={100} />;
};

export default Logo;
