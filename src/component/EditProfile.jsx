import React, { useState } from 'react'
import FeedCart from './FeedCart'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({ user }) => {
  const gender = ['male', 'female', 'other'];
  const [error, setError] = useState('')
  const [editProfile, setEditProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    photoUrl: user.photoUrl
  })
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditProfile({
      ...editProfile,
      [name]: value
    })
  }
  const handleSaveData = async () => {
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', editProfile, { withCredentials: true });
      if (res) {
        dispatch(addUser(res.data))
      }
    }
    catch (err) {
      setError(err?.response?.data)
    }
  }
  return (
    <div className='flex justify-center my-4 gap-5'>
      <div className="card bg-base-300 w-96 shadow-sm flex justify-self-center">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              name='firstName'
              value={editProfile.firstName}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              name='lastName'
              value={editProfile.lastName}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea className="textarea h-24" placeholder="About" value={editProfile.about} name='about' onChange={(e) => handleChange(e)}></textarea>
            <div className="label">Optional</div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input"
              value={editProfile.photoUrl}
              name='photoUrl'
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input"
              name='age'
              value={editProfile.age}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
            <legend className="fieldset-legend">Gender</legend>
          <select defaultValue="Pick a color" className="select" value={editProfile.gender} onChange={(e)=>handleChange(e)} name='gender'>
            <option disabled={true}>Select gender</option>
            {gender.map((g) => 
            <option key={g}>{g}</option>
            )}
          </select>
          <p className='text-red-500 my-4'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSaveData}>
              Save Data
            </button>
          </div>
        </div>
      </div>
      <div className='w-96'>
        <FeedCart user={editProfile} />
      </div>
    </div>
  )
}

export default EditProfile