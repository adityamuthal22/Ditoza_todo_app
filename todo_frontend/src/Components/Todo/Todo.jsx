import axios from "axios";
import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import { toast } from "react-toastify";
// import { MdAddCircle } from "react-icons/md";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/todo", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setTodoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (id) => {
    const token = window.localStorage.getItem("token");
    axios
      .delete(
          `http://localhost:8080/api/todo/${id}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Todo item Deleted Successfully..", {
            autoClose: 2000,
          });
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="bg-[
        #dadada]"
    >
      <div
        style={{
          boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: "50%",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
        }}
        className="w-50%"
      >
        <div className="flex justify-between">
          <h1 className="mt-20px  text-4xl">Todo </h1>

          <h1><AddTodo fetchData={fetchData} /></h1>
         
        </div>
        <hr className="mt-10 text-black font-bold" />

        <div>
          {todoData?.map((todo) => (
            <>
              <div key={todo._id} className="flex justify-between p-2">
                <div>
                  <p>Title: {todo.title}</p>
                  <p>Description: {todo.description}</p>
                  <p>Status: {todo.status}</p>
                </div>
                <div className="flex gap-5">
                  <button>
                    <img
                      className="h-8"
                      src="https://cdn-icons-png.flaticon.com/512/6324/6324826.png"
                      alt=""
                    />
                  </button>
                  <button onClick={()=>handleDelete(todo._id)}>
                    <img
                      className="h-8"
                      src="https://cdn4.vectorstock.com/i/1000x1000/64/73/trash-can-black-delete-button-icon-vector-31046473.jpg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <hr className="mt-4 text-black font-bold" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
