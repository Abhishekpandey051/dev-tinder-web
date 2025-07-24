import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const Request = () => {
  const [request, setRequest] = useState([]);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      if (res) {
        setRequest(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleSendRequest = async(status, id) => {
    console.log(status, id)
    try{
      const res = await axios.post(BASE_URL + '/request/review/' + status + "/" + id ,{},{withCredentials:true})
      if(res){
        setRequest(request.filter((r)=> r._id !== id))
      }
    }
    catch(err){
      console.log(err)
    }
  }

  console.log(request);

  return (
    <div>
      <div className="flex justify-center min-h-screen p-6 bg-gray-900">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Request connection
          </h2>
          {request && request.length > 0 ? (
            request.map((c, idx) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                c.fromUserId;
              return (
                <div
                  key={_id || idx}
                  className="bg-base-300 shadow-md rounded-lg p-5 mb-6 flex items-center gap-5"
                >
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col text-white">
                    <h3 className="text-xl font-semibold mb-1">
                      {firstName} {lastName}
                    </h3>
                    {age && gender && (
                      <p className="mb-1">
                        {age}, {gender}
                      </p>
                    )}
                    <p className="text-gray-200">{about}</p>
                    <div className="card-actions justify-center my-4">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSendRequest("rejected", c._id)}
                      >
                        Rejected
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("accepted",c._id)}
                      >
                        Accepted
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 mt-12 text-lg">
              No connection requests found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
