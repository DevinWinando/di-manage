import { useState } from "react";
import { show } from "../services/directories";

export default function Folder({ folder, setCurrentDirectory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);

    if (!folder.children) {
      show(folder.id).then((data) => {
        setChildren(data.results.data.children);

        if (!isOpen) {
            setCurrentDirectory(data.results.data);
        }
      });
    }
  };

  return (
    <div style={{ marginLeft: 5 }}>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {isOpen ? "📂" : "📁"} {folder.name}
      </div>
      {isOpen && children && (
        <div style={{ marginLeft: 20 }}>
          {children.map((child) => (
            <Folder key={child.id} folder={child} setCurrentDirectory={setCurrentDirectory} />
          ))}
        </div>
      )}
    </div>
  );
}
