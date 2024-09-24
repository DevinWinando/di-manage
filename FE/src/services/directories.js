export const list = async () => {
  const res = await fetch("http://localhost:8000/api/directories");
  const data = await res.json();

  return {
    results: data,
  };
};

export const show = async (id) => {
  const res = await fetch(`http://localhost:8000/api/directories/${id}`);
  const data = await res.json();

  return {
    results: data,
  };
}

export const create = async (data) => {
  const res = await fetch("http://localhost:8000/api/directories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    results: res,
  };
};

export const createFile = async (data) => {
  const res = await fetch("http://localhost:8000/api/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return {
    results: res,
  };
}
