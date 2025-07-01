import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import streamifier from "streamifier";

export const register = async (req, res) => {
    try {
      const { name, email, password, bio } = req.body;
      const profilePic = req.file; // 👈 image file from multer
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters!" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists!" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      let profilePicUrl = "";
  
      if (profilePic) {
        const uploadResponse = await cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          async (error, result) => {
            if (error) {
              console.log("Cloudinary upload error:", error);
              return res.status(500).json({ message: "Image upload failed!" });
            }
  
            const newUser = new User({
              name,
              email,
              password: hashedPassword,
              bio,
              profilePic: result.secure_url,
            });
  
            await newUser.save();
            generateToken(newUser._id, res);
  
            return res.status(201).json({
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              bio: newUser.bio,
              profilePic: newUser.profilePic,
              message: "User registered successfully!",
            });
          }
        );
  
        // 🔥 Pipe buffer to cloudinary
        if (profilePic.buffer) {
          require("streamifier").createReadStream(profilePic.buffer).pipe(uploadResponse);
        } else {
          return res.status(400).json({ message: "Invalid profile image format!" });
        }
  
      } else {
        // 👤 No image upload case
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          bio,
        });
  
        await newUser.save();
        generateToken(newUser._id, res);
  
        return res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          bio: newUser.bio,
          profilePic: newUser.profilePic || "",
          message: "User registered successfully!",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: error.message || "Something went wrong" });
    }
  };
  

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        generateToken(user._id, res);

        // console.log('user id in login', user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio,
            message: "User logged in successfully!",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const logout =  async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });

    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
    }
};

export const fetchProfile = async (req, res) => {
    try {
        const userId = req.user?._id;
        console.log(userId);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId);
        res.status(200).json({ success: true, user });
        // console.log(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let profilePicUrl;

    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      profilePicUrl = result.secure_url;
    }

    const updatedFields = {
      name,
      email,
      bio,
    };

    if (profilePicUrl) {
      updatedFields.profilePic = profilePicUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    res.status(200).json({ message: "Profile updated successfully!", updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};