import BaseAxios from "./requsetToken";

// UPDATE => CẬP NHẬT USER
export const updateAvatarUser = (data: any): any => {
  return BaseAxios.put(
    `http://localhost:9000/api/v1/users/update-avatar`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateUser = (data: any): any => {
  return BaseAxios.put(`http://localhost:9000/api/v1/users/update`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const updateStatusUser = (newStatus: boolean, id: number): any => {
  return BaseAxios.put(`http://localhost:9000/api/v1/users/${id}`, {
    status: newStatus,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
