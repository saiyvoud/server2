import { comparePassword, generateToken, genPassword } from "../middleware/auth.js";
import conect from "../middleware/db.js";
import { CREATE, LOGIN, REGISTER, SELECT_PHONE } from "../model/user_model.js";

export const createTableUser = (req, res) => {
  try {
    conect.query(CREATE, function (err, result) {
      if (err) throw err;
      return res.json({ msg: "create table user successful" });
    });
  } catch (error) {
    console.log("error create table user", err);
  }
};
export const login = async (req, res) => {
  try {
    let {phone,password}= req.body;
    
    if(!phone){
      return res.status(400).json({msg:"phone is require"})
    } 
    if(!password){
      return res.status(400).json({msg:"password is require"})
    }
    conect.query(LOGIN, phone, async function (err, result) {
      if (err) return res.json({ msg: "Invaild phone or password" });
      if (result.length ===0){
        return res.json({ msg: "Invaild phone or password" });
      }
      const checkpassword = await comparePassword(
        password,
        result[0].password
      );
      if (!checkpassword)
        return res.json({ msg: "Invaild phone or password" });
      const token = generateToken(result);
      return res.json({msg: "login successful",token});
    });
  } catch (error) {
    console.log("error:", error);
  }
};
// =====> register
export const register = async (req, res) => {
  try {
    let { firstName, lastName, phone, password } = req.body;
    if (!firstName) {
      return res.status(400).json({ firstName: "firstName is require" });
    }
    if (!lastName) {
      return res.status(400).json({ lastName: "lastName is require" });
    }
    if (!phone) {
      return res.status(400).json({ phone: "phone is require" });
    }
    if (!password) {
      return res.status(400).json({ password: "password is require" });
    }
    const checkpassword = await genPassword(password);
    const values = [[firstName, lastName, phone, checkpassword]];
    conect.query(SELECT_PHONE, phone,  function (err, result1) { 
      if (err) throw err
      if (result1.length > 0) {
        return res.json({ msg: "phone is already" });
      }
      
      conect.query(REGISTER, [values], function (err, result2) {
        if (err) throw err;
        const token = generateToken(result2);
        return res.json({ msg: "register successful", token });
      });
    });
  } catch (error) {
    console.log("error register user", error);
  }
};
