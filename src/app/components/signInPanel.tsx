import React from "react";

import UserProfilePanel from "@/app/components/UserProfilePanel";
import { prisma } from "@/lib/prisma";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";

const SignInPanel = async () => {
  const { getUser, isAuthenticated } = await getKindeServerSession();

  if (await isAuthenticated()) {
    const user = await getUser();

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return <>{dbUser!! && <UserProfilePanel user={dbUser} />}</>;
  }

  return (
    <div className={"flex gap-3"}>
      <Button color={"primary"}>
        <LoginLink>Sign In</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign Up</RegisterLink>
      </Button>
    </div>
  );
};

export default SignInPanel;
