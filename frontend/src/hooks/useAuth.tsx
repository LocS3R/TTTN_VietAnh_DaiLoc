import React from "react";
import { AuthContext } from "../contexts/AuthProvider";
export const useAuth = () => React.useContext(AuthContext);
