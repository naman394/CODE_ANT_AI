import { useState } from "react";
import "../index.css";

const initialData = [
  {
    name: "design-system",
    access: "Public",
    languages: "React",
    size: "2.6 MB",
    updates: "3",
  },
  {
    name: "codeant-ci-app",
    access: "Private",
    languages: "Javascript",
    size: "1.2 MB",
    updates: "2",
  },
  {
    name: "analytics-dashboard",
    access: "Public",
    languages: "Python",
    size: "4521 KB",
    updates: "5",
  },
  {
    name: "mobile-app",
    access: "Private",
    languages: "Swift",
    size: "4.6 MB",
    updates: "3",
  },
  {
    name: "e-commerce-website",
    access: "Private",
    languages: "React",
    size: "2.6 MB",
    updates: "3",
  },
  {
    name: "blog-website",
    access: "Public",
    languages: "Javascript",
    size: "16120 KB",
    updates: "4",
  },
  {
    name: "social-network",
    access: "Private",
    languages: "PHP",
    size: "5432 KB",
    updates: "3",
  },
];

function Repositories() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Filter repositories based on the search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new repository
  const addRepository = (newRepo: { name: string; url: string; description: string }) => {
    // Create a new repository object that matches the expected shape
    const repoToAdd = {
      name: newRepo.name,
      access: "Public", // Default value
      languages: "JavaScript", // Default value
      size: "Large", // Default value
      updates: "Recently updated", // Default value
    };
  
    console.log("Adding new repository:", repoToAdd); // Debugging
    setData((prevData) => [...prevData, repoToAdd]);
    setShowAddForm(false); // Close the form after adding the repository
  
    // Show success popup
    setShowSuccessPopup(true);
  
    // Hide the success popup after 2 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 2000);
  };
  

  return (
    <div className="bg-[#fafafa] w-full md:w-full h-[100vh] md:overflow-scroll">
      <div className="md:ml-[2%] mr-[2%] mt-[2%] rounded-lg flex flex-col gap-1">
        <div className="bg-white pt-5 rounded-md flex flex-col w-full gap-4 md:pl-5 md:pb-5 pl-3 pb-3">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Repositories</h1>
              <p className="text-gray-500">{data.length} total repositories</p>
            </div>
            <div className="flex flex-row gap-4 text-md">
              <button className="flex flex-row gap-3 h-max rounded-lg p-2 border-[2px] border-gray-300 items-center justify-start">
                <img src="/refresh.png" alt="" />
                Refresh All
              </button>
              <button
                className="flex flex-row gap-2 h-max rounded-lg p-2 bg-[#1470ef] text-white items-center justify-start"
                onClick={() => {
                  console.log("Add Repository button clicked"); // Debugging
                  setShowAddForm(true); // Show the form when clicked
                }}
              >
                <img src="/plus.png" alt="" />
                Add Repository
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search repositories"
            className="bg-white w-[90%] md:w-[30%] p-2 border-[1px] border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          {filteredData.map((item) => (
            <Tab
              key={item.name}
              name={item.name}
              access={item.access}
              languages={item.languages}
              size={item.size}
              updates={item.updates}
            />
          ))}
        </div>
        {showAddForm && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <AddRepository onAdd={addRepository} onClose={() => setShowAddForm(false)} />
          </div>
        )}
        {showSuccessPopup && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-3">
              <span className="text-green-500 text-2xl">✔</span>
              <span>Repository Added Successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Tab({
  name,
  access,
  languages,
  size,
  updates,
}: {
  name: string;
  access: string;
  languages: string;
  size: string;
  updates: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white md:p-5 p-3 transition-all ease-linear duration-50 hover:bg-[#f5f5f5]">
      <div className="flex flex-row items-center gap-3">
        <p className="text-[1.2rem]">{name}</p>
        <p className="border-[1.2px] border-[#bcd7fd] text-[.8rem] rounded-2xl px-[10px] bg-[#eff8ff] text-[#5c94e2]">
          {access}
        </p>
      </div>
      <div className="flex flex-row gap-5 md:gap-10">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-gray-500 text-sm">{languages}</p>
          <div className="rounded-[5rem] bg-[#1470ef] w-2 h-2"></div>
        </div>
        <div className="flex gap-2 flex-row items-center">
          <img src="/database.png" alt="" />
          <p>{size}</p>
        </div>
        <p>Updated {updates} days ago</p>
      </div>
    </div>
  );
}

function AddRepository({ onAdd, onClose }: { onAdd: (newRepo: any) => void, onClose: () => void }) {
  const [name, setName] = useState("");
  const [access, setAccess] = useState("Public");
  const [languages, setLanguages] = useState("");
  const [size, setSize] = useState("");
  const [updates, setUpdates] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRepo = { name, access, languages, size, updates };
    console.log("Form submitted:", newRepo); // Debugging
    onAdd(newRepo);
  };
  

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
      <button
        className="absolute top-2 right-2 text-xl text-gray-500"
        onClick={onClose}
      >
        ×
      </button>
      <h2 className="text-xl font-semibold mb-4">Add Repository</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={access}
          onChange={(e) => setAccess(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <input
          type="text"
          placeholder="Languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Size (e.g., 2.6 MB)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Updates (days ago)"
          value={updates}
          onChange={(e) => setUpdates(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#1470ef] text-white p-2 rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Repositories;
