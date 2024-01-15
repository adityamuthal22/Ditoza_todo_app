import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTodo = ({ fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [addTodo, setAddTodo] = useState({
    title: "",
    description: "",
  });

  const handleAddTodoChange = (event) => {
    const { name, value } = event.target;

    setAddTodo((prevTodoData) => ({
      ...prevTodoData,
      [name]: value,
    }));
  };

  const handleAddData = async () => {
    const payload = {
      title: addTodo.title,
      description: addTodo.description,
    };
    // console.log("payload", payload);
    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/todo",
        payload,
        config
      );
      console.log("response", response);

      if (response.data.status === 400) {
        console.log("Error");
      } else if (response.status === 201) {
        toast.success("Todo Added Successfully !", {
          autoClose: 2000,
        });
        closeModal();
        // console.log("user Successfully Added");

        // Call fetchData() here to fetch and display updated data
        fetchData();
      }
    } catch (error) {
      console.error("Post error:", error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <button className="bg-[#415cf3] w-10 h-10 rounded-full text-4xl text-white">
          +
        </button>
      </button>

      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`${
          isModalOpen ? "fixed" : "hidden"
        } flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full md:w-auto`}
      >
        <div className="relative p-10 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-10 md:p-10">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={addTodo.title}
                    onChange={handleAddTodoChange}
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Todo name"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={addTodo.description}
                    onChange={handleAddTodoChange}
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type desc"
                    required=""
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddData}
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Add new Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
