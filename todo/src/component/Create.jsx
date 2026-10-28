
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    phone: yup.string().required("Phone is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    try {
      await axios.post("http://localhost:3000/user", data);
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-3 mx-auto">
          <div className="text-center">
            <h1>
              Register<span className="text-danger">Form</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleRegister)}>
            <input
              {...register("name")}
              type="text"
              className="form-control mt-2"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}

            <input
              {...register("email")}
              type="email"
              className="form-control mt-2"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}

            <input
              {...register("phone")}
              type="tel"
              className="form-control mt-2"
              placeholder="Enter Your Phone"
            />
            {errors.phone && (
              <p className="text-danger">{errors.phone.message}</p>
            )}

            <input
              type="submit"
              className="form-control btn btn-warning text-light mt-2"
              value="Register"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
