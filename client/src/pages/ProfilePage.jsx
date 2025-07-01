import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../features/authSlice';
import toast from "react-hot-toast";
import { axiosInstance } from '../lib/axiosInstance';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);


    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profilePic: null,
      });
    
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value, files } = e.target;
      
        if (name === "profilePic") {
          setFormData((prev) => ({
            ...prev,
            profilePic: files[0], // this is the actual File
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };

      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const form = new FormData();
      
          form.append("name", formData.name);
          form.append("email", formData.email);
          form.append("bio", formData.bio);
      
          if (formData.profilePic) {
            form.append("profilePic", formData.profilePic);
          }
      
          const res = await axiosInstance.put("/user/update", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          toast.success("Profile updated successfully!");
          console.log(res.data);
          setFormData((prev) => ({
            ...prev,
            profilePic: res.data.updatedUser.profilePic, // ⬅️ update with cloudinary URL
          }));
          setLoading(false);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong!");
          setLoading(false);
        }
      };

      const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
          const base64Image = reader.result;
          setSelectedImg(base64Image);
          await dispatch(updateProfile({ profilePic: base64Image }));
        };
      };
      

    

    // console.log(user);



  return (
     <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-600 text-center noto-sans">YOUR PROFILE</h2>

        <div className="flex justify-center">
          <img
            src={user.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 noto-sans">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-sm mt-1 px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md resize-none"
              placeholder="Write something about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleChange}
              accept="image/*"
              className="w-full text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage