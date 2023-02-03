import React, { useState, useEffect } from "react";

const AddConferenceForm = () => {
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await fetch("/api/tags").then((response) => response.json());
      setAllTags(tags);
    };

    fetchTags();
  }, []);

  const handleTagSelection = (e) => {
    const selectedTagIds = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setSelectedTags(selectedTagIds);
  };

  const addTagsToConf = async () => {
    // add code to call your addTagToConf function here
  };

  return (
    <form onSubmit={addTagsToConf}>
      <div>
        <label htmlFor="tags"> Tags: </label>{" "}
        <select
          multiple
          id="tags"
          value={selectedTags}
          onChange={handleTagSelection}
        >
          {allTags.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {" "}
              {tag.name}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </div>{" "}
      {/* rest of your form fields */}{" "}
      <button type="submit"> Add Conference </button>{" "}
    </form>
  );
};

export default AddConferenceForm;
