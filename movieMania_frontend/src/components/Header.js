import React from "react";
import { BsFileEarmarkPlayFill as BrandIcon } from "react-icons/bs";

const Header = () => {
  return (
    <nav class="navbar sticky-top navbar-main">
      <div class="container-fluid">
        <a class="navbar-brand d-flex" href="#">
          <BrandIcon className="mx-2" fontSize={32} color="#b4e900" />
          <h4 className="mt-1 mb-1 pb-1 text-white">MovieMania.</h4>
        </a>
      </div>
    </nav>
  );
};

export default Header;
