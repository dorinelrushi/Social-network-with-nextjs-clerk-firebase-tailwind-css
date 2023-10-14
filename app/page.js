import Link from "next/link";
import Header from "@/components/Header";

function Home() {
  return (
    <div>
      <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center ">
        <h2 className="font-bold max-w-[790px] text-center text-[50px] leading-[59px]">
          Welcome to the{" "}
          <b>
            {" "}
            New<span className="text-[#5a6ae3]"> Advanced</span> Web Development
          </b>{" "}
          Initiative
        </h2>
        <div className="flex gap-[50px]  mt-[20px]">
          <button className="bg-[#5a6ae3] w-[160px]  text-[white] h-[45px] rounded-[5px] hover:bg-[#323972]">
            <Link href="/dashboard">Dashboard</Link>
          </button>
          <button>
            <Link href="/post">View all posts</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
