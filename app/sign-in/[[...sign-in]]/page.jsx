import { SignIn, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <SignIn />
    </div>
  );
}
