import Sidebar from "../components/Sidebar";

function HomePage({ collapsed }) {
    
  return (
    <div className="flex h-full">
      <Sidebar collapsed={collapsed} />
      <main className=" h-full w-full p-14 text-3xl">Home</main>
    </div>
  );
}

export default HomePage;
