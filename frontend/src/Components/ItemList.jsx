import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ItemList() {

  const Api_base_url="http://15.207.223.137:3000/api/items";

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const fetchItems = async () => {
    const res = await axios.get(Api_base_url);
    setItems(res.data);
  };
 
  const addItem = async () => {
    if (name.trim()) {
      await axios.post(Api_base_url, { name });
      setName("");
      fetchItems();
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`${Api_base_url}/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Add item..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <span>{item.name}</span>
            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
