import { create, show } from "../services/directories";

export default function CreateModal({ currentDirectory, setCurrentDirectory }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      parent_id: currentDirectory?.id,
    };

    create(data).then((res) => {
      if (res.results.status === 200) {
        alert("Folder created successfully");
        document.getElementById("create").close();
        e.target.reset();
      }

      show(currentDirectory?.id).then((res) => {
        setCurrentDirectory(res.results.data);
      });
    });
  };

  return (
    <dialog id="create" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create</h3>
        <form className="mt-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input input-bordered w-full"
            name="name"
            placeholder="Folder Name"
          />

          <div className="modal-action">
            <button
              className="btn"
              type="button"
              onClick={() => {
                document.getElementById("create").close();
                e.target.reset();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
