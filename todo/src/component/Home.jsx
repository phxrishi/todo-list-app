import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate()
  const [data, setData] = useState([])
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData =async()=>{
    const res =await axios.get("http://localhost:3000/user")
    setData(res?.data)
  }
  const handleDelete=async(id)=>{
    await axios.delete(`http://localhost:3000/user/${id}`)
    fetchData()
  }
  const handleEdit=async(data)=>{
    localStorage.setItem("info",JSON.stringify(data))
    nav("/update")
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <h1 className="text-center">#Student<span className="text-danger">Details</span></h1>
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th>Sr.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>
                        <button className="btn btn-danger me-2" onClick={()=>handleDelete(item.id)}>
                          Delete
                        </button>

                        <button className="btn btn-warning" onClick={()=>handleEdit(item)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
