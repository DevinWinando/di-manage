import { show } from "../services/directories";

export default function FolderList({ folder, setCurrentDirectory }) {
  const handleDoubleClick = () => {
    if (!folder.children) {
      show(folder.id).then((data) => {
        setCurrentDirectory(data.results.data);
      });
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
      📁 {folder.name}
    </div>
  );
}
