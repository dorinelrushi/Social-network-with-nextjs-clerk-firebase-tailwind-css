import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Header from "@/components/Header";

function Home() {
  return (
    <div>
      <Link href="/dashboard">Dashboard</Link>
      <FontAwesomeIcon className="w-[20px]" icon={faAddressBook} />
    </div>
  );
}

export default Home;
