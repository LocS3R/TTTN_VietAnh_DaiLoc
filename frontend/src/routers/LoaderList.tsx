import { FC, Suspense, lazy } from "react";
import SuspenseLoader from "../components/SuspenseLoader";

const Loader =
  <P extends object>(Component: React.ComponentType<P>): FC<P> =>
  (props) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
export const Crypto = Loader(
  lazy(() => import("../content/dashboards/Crypto"))
);
export const Customer = Loader(
  lazy(() => import("../content/managements/Customer"))
);

export const Home = Loader(lazy(() => import("../content/home/")));

export const ComingSoon = Loader(
  lazy(() => import("../content/error-page/ComingSoon"))
);

export const LoginPage = Loader(
  lazy(() => import("../content/login/LoginPage"))
);

export const KhoCoTy = Loader(
  lazy(() => import("../content/managements/Kho/kho_coty"))
);

export const KhoCNDH = Loader(
  lazy(() => import("../content/managements/Kho/kho_cndh"))
);

export const KhoCNCN = Loader(
  lazy(() => import("../content/managements/Kho/kho_cncn"))
);
