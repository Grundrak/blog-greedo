const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    Users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error("Failed to fetch users");
      }
    },
    User: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (err) {
        throw new Error("Failed to fetch users");
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        console.log("User not found with email:", email);
        if (!user) {
          throw new Error("Invalid email");
        }
        console.log(bcrypt.compare(password, user.password));
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch",isMatch);
        if (!isMatch) {
          console.log("Password does not match for user:", email);
          throw new Error("Invalid email or error password");
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRES,
        });
        return { user, token };
      } catch (error) {
        throw new Error("Login Failed");
      }
    },
    register: async (_, { email, password, first_name, last_name }) => {
      try {
        const existUser = await User.findOne({ email });
        if (existUser) {
          throw new Error("Email already exist try another one");
        }
        const hashed_password = await bcrypt.hash(password, 10);
        const registerUser = await User.create({
          email,
          password: hashed_password,
          first_name,
          last_name,
        });
        return registerUser;
      } catch (error) {
        throw new Error("Failed to register user");
      }
    },
  },
};

module.exports = resolvers;
