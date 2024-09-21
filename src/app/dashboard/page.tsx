import Dashboard from "@/components/Dashboard/Dashboard";
import Navbar from "@/components/Dashboard/Navbar";
import Topbar from "@/components/Dashboard/Topbar";

const Page = () => {
  return (
    <>
      <Navbar />
        <div className="w-[60%] mx-auto">
        <Topbar />
        <Dashboard />
      </div>
    </>
  );
};

export default Page;
