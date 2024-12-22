import { IoWarningSharp } from "react-icons/io5";

function UnderConstruction() {
  return (
    <div className="flex flex-col md:flex-row text-[2rem] gap-2 md:text-[4rem] font-bold justify-center items-center h-[100vh] bg-gray-100">
      
      <div className="text-center text-gray-700">
        <IoWarningSharp className="inline-block text-yellow-500" />
        <p>Under Construction</p>
      </div>
    </div>
  );
}

export default UnderConstruction;
