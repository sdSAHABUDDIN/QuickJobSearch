export const signup = async (req, res) => { 
  res.status(200).json({ message: "User signed up successfully!" });
}
export const login = async (req, res) => {  
  res.status(200).json({ message: "User logged in successfully!" });
}
export const logout = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully!" });
}
