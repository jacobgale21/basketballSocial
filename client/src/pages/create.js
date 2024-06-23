import NavBar from "../components/header";
import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8080/create", {
          title,
          time,
          description,
        })
        .then((result) => {
          console.log(result);
        });

      setTitle("");
      setTime("");
      setDescription("");
    } catch (error) {
      console.error("Something wrong with creation", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Goal Deadline
            </label>
            <input
              type="text"
              id="time"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter deadline"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
export default Create;
