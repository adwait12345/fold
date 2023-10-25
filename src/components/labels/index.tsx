"use client";
import React, { useState, useEffect } from "react";
import Select, { ActionMeta } from "react-select";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { json } from "stream/consumers";

type Option = {
  value: string;
  label: string;
};

const YourComponent: React.FC = () => {
  const [list, setList] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  // Dragging Mechanism
  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _fruitItems = [...list];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setList(_fruitItems);
  };

  //

  const handleSelectChange = (
    selectedOption: any,
    actionMeta: ActionMeta<Option>
  ) => {
    // Handle the selected option as needed
    // console.log("Selected Option:", selectedOption);
    setList([...list, selectedOption]);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`/api?tag=${searchQuery}`);
        const apiOptions = response.data.product.items.map((item: any) => ({
          value: item.name,
          label: item.name,
        }));
        setOptions(apiOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    // Fetch options only if there is a search query
    if (searchQuery.trim() !== "") {
      fetchOptions();
    } else {
      // Clear options if the search query is empty
      setOptions([]);
    }

    localStorage.setItem("list", JSON.stringify(list));
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-4">
      {list.map((item, index) => {
        return (
          <div
            className=" cursor-move bg-[#73EACC] text-black py-4 px-4 rounded-xl flex items-center justify-between"
            key={index}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <span>
              {index + 1}. {item.value}
            </span>
            <button
              className=" cursor-pointer"
              onClick={() => {
                list.splice(index, 1);
              }}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        );
      })}

      <Select
        className=" "
        options={options}
        value={null} // Set value to null to clear the selection when options change
        onInputChange={(inputValue) => setSearchQuery(inputValue)}
        onChange={handleSelectChange}
        isSearchable
        placeholder="Add Skill"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: "#CFFBF2",
            color: "#fff",
            padding: "12px 12px 12px 12px",
            borderRadius: "12px",
          }),
        }}
      />
    </div>
  );
};

export default YourComponent;
