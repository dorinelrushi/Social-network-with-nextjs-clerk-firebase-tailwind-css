import Header from "@/components/Header";
import WriteComment from "@/components/WriteComment";
import { UserButton } from "@clerk/nextjs";
import { faBell, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div className="">
      <div className="flex w-[100%] items-center bg-[#333245] justify-around gap-[10px] m-auto p-[20px] ">
        <div className="flex items-center gap-5">
          <UserButton afterSignOutUrl="/" />
          <Header />
        </div>
        <div className="flex gap-[10px] text-[#76749c]">
          <Link href="/">
            <FontAwesomeIcon className="w-[20px]" icon={faHouse} />
          </Link>
          <Link href="/dashboard">
            <FontAwesomeIcon className="w-[19px]" icon={faUser} />
          </Link>
          <Link href="/post">
            <FontAwesomeIcon className="w-[20px]" icon={faBell} />
          </Link>
        </div>
      </div>
      <WriteComment />
    </div>
  );
}
