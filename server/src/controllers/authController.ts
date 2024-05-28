import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { name, email, password } = req.body;
    const hashedPassword =await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: hashedPassword });
    res
      .status(200)
      .json({ success: true, message: "Registration successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const verifyPassword = bcrypt.compare(password, user?.password!);
    if (!verifyPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Passwrod not matching" });
    }
    res.status(200).json({ success: true, message: "Login successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
