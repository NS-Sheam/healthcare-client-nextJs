import { getUserInfo } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeUserInfo } from "../../../services/auth.services";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogout = () => {
    removeUserInfo();
    router.refresh();
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          component={Link}
          href="/login"
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
