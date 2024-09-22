import Dashboard from "@/components/Dashboard/Dashboard";
import Navbar from "@/components/Dashboard/Navbar";
import Topbar from "@/components/Dashboard/Topbar";

const Page = () => {
  return (
    <div className="w-full bg-background h-screen">
      <Navbar />
        <div className="w-[90%] sm:w-[60%] mx-auto">
        <Topbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Page;
