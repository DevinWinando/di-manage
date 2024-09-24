export default function BreadCrumb({ folder }) {
  console.log(folder)
  return (
    <div className="breadcrumbs justify-center w-[100%] text-xs">
      <ul>
        {folder?.parent ? (
            <li>
              <BreadCrumb folder={folder.parent} />
            </li>
        ) : (
          ""
        )}

        <li>{folder?.name}</li>
      </ul>
    </div>
  );
}
