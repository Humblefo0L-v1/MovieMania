import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { BsFileEarmarkPlayFill as BrandIcon } from "react-icons/bs";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import BgImg from "../assets/movie-bg-img.jpg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  img {
    width: 100%;
    height: auto;
    position: absolute;
  }
`;

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const resetPassword = async() => {
    await sendPasswordResetEmail(firebaseAuth, email);
    alert("Password Reset Mail Sent!");
  }

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser){
      navigate("/")
    }
  });

  return (
    <Container>
      <img src={BgImg} alt="bg-img" />
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3">
                <div className="row g-0">
                  <div className="col-lg-6 rounded-3 text-white card-bg">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center d-flex">
                        <BrandIcon
                          className="mx-2"
                          fontSize={32}
                          color="#b4e900"
                        />
                        <h4 className="mt-1 mb-5 pb-1">MovieMania.</h4>
                      </div>

                      <form className="my-2 py-3">
                        <p className="mb-3">Please login to your account</p>

                        <div className="form-outline">
                          <label className="form-label" for="form2Example11">
                            Username
                          </label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Phone number or email address"
                            value={email}
                            onChange={(e) =>
                              setEmail(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example22">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            value={password}
                            onChange={(e) =>
                              setPassword(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="text-center mb-5 pb-1">
                          <button
                            className="btn btn-bg-color btn-block fa-lg btn-bg-color mb-3"
                            type="button"
                            onClick={handleLogin}
                          >
                            Log in
                          </button>
                          <a className="text-white mx-2 pb-2" href="#!" onClick={resetPassword}>
                            Forgot password?
                          </a>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-bg-color"
                            onClick={() => navigate("/signup")}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2 text-black">
                    <div className="px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Entertainment Starts Here.</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Login;
