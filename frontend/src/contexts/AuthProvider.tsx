import { PropsWithChildren, createContext, useEffect, useState } from "react";
// import { IUser } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { IUserResponse } from "../types/IUserResponse";
import AuthService, { LoginResponse } from "../services/AuthService";

type AuthContextType = {
  user: IUserResponse | null;
  //   roles: string[];
  registerUser: (
    username: string,
    password: string,
    role: string[] | null
  ) => void;
  loginUser: (
    username: string,
    password: string
  ) => Promise<LoginResponse | undefined>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

// type Props = { children: React.ReactNode };

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      AuthService.logout();
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    password: string,
    role: string[] | null
  ) => {
    await AuthService.register(username, password, role).then((res) => {
      if (res) {
        const userObj = {
          username: res?.data.username,
          roles: res?.data.roles,
        };
        setUser(userObj);
        const resu = loginUser(username, password)
          .then(() => {
            console.log("login success");
            navigate("/home");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(res);
        console.log(resu);
      }
    });
  };

  const loginUser = async (username: string, password: string) => {
    const res = await AuthService.login(username, password);
    if (res) {
      const userObj = {
        username: res?.username,
        roles: res?.roles,
      };
      setUser(userObj);
      navigate("");
      return res;
    }
    return undefined;
  };

  const isLoggedIn = () => {
    // console.log("!!user" + !!user);
    return !!user;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate("/home");
  };
  return (
    <AuthContext.Provider
      value={{ loginUser, user, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );

  //   const loginUser = async (username: string, password: string) => {
  //     await AuthService.login(username, password)
  //   };
};
