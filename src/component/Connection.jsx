import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const Connection = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      if (res) {
        setConnections(res?.data?.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  console.log(connections)

  return (
    <div className="flex justify-center min-h-screen p-6 bg-gray-900">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Connections
        </h2>
        {connections && connections.length > 0 ? (
          connections.map((c, idx) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              c;
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
  );
};

export default Connection;
