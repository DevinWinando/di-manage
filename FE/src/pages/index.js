import { useEffect, useState } from "react";
import { list, show } from "../services/directories";
import Folder from "@/components/Folder";
import FolderList from "@/components/FolderList";
import BreadCrumb from "@/components/BreadCrumb";
import CreateModal from "@/components/CreateModal";

export default function Home() {
  const [directories, setDirectories] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await list();

      setDirectories(data.results.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="navbar h-[10%] bg-base-300">
        <div className="navbar-start ms-4">
          <span className="text-lg font-bold">Dimanage</span>
        </div>

        <BreadCrumb folder={currentDirectory} />

        <div className="navbar-end">
          <label htmlFor="my-drawer-2" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </label>
        </div>
      </div>
      <div className="border-base-300 border min-h-screen">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="border-base-300 border-t px-4 py-16">
              {currentDirectory ? (
                currentDirectory?.children?.map((folder) => (
                  <div key={folder.id}>
                    <FolderList
                      key={folder.id}
                      folder={folder}
                      setCurrentDirectory={setCurrentDirectory}
                    />
                  </div>
                ))
              ) : (
                <h1 className="text-2xl">Select a folder</h1>
              )}
            </div>
          </div>
          <div className="drawer-side pt-[10%] lg:pt-0">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4">
              {directories.map((folder) => (
                <div key={folder.id}>
                  <Folder
                    setCurrentDirectory={setCurrentDirectory}
                    key={folder.id}
                    folder={folder}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed right-5 bottom-5">
        <button
          className="btn btn-primary text-white"
          onClick={() => document.getElementById("create").showModal()}
        >
          +
        </button>
      </div>
      <CreateModal currentDirectory={currentDirectory} setCurrentDirectory={setCurrentDirectory} />
    </>
  );
}
