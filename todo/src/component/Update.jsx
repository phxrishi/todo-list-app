
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('info'))
    setValue('name',info.name)
    setValue('email',info.email)
    setValue('phone',info.phone)
  })
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdate = async (data) => {
    const info = JSON.parse(localStorage.getItem('info'))
    await axios.put(`http://localhost:3000/user/${info.id}`,data)
    navigate("/home")
    
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-3 mx-auto">
          <div className="text-center">
            <h1>
              Update<span className="text-danger">Form</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleUpdate)}>
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
              value="Update"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
