import axios from "axios";

const server = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

export const getAllUsers = () => server.get("/users");
export const deleteUser = (userId) => server.delete(`/user/${userId}`);
export const createUser = (user) => server.post("/user", user);
export const getUserById = (userId) => server.get(`/user/${userId}`);
export const updateUser = (id, user) => server.put(`/user/${id}`, user);