const { Reunion } = require("../schema/Reunion");
const { Conference } = require("../schema/Conference");
const { Tag } = require("../schema/Tag");
const createTag = async (tagName) => {
  const tag = new Tag({ name: tagName });
  try {
    await tag.save();
    return tag;
  } catch (error) {
    throw new Error(`Error creating tag: ${error}`);
  }
};

const getAllTags = async () => {
  try {
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    throw new Error(`Error retrieving tags: ${error}`);
  }
};

const getTag = async (idT) => {
  try {
    const tag = await Tag.findById(idT);
    return tag;
  } catch (error) {
    throw new Error(`Error retrieving tag: ${error}`);
  }
};

const updateTag = async (idT, newName) => {
  try {
    const tag = await Tag.findByIdAndUpdate(
      idT,
      { name: newName },
      { new: true }
    );
    return tag;
  } catch (error) {
    throw new Error(`Error updating tag: ${error}`);
  }
};

const deleteTag = async (idT) => {
  try {
    await Tag.findByIdAndDelete(idT);
    return true;
  } catch (error) {
    throw new Error(`Error deleting tag: ${error}`);
  }
};

const addTagToConference = async (idC, idT) => {
  try {
    if (Array.isArray(idT)) {
      const conference = await Conference.findByIdAndUpdate(
        idC,
        { $push: { tags: { $each: idT } } },
        { new: true }
      );
      return conference;
    } else {
      const conference = await Conference.findByIdAndUpdate(
        idC,
        { $push: { tags: idT } },
        { new: true }
      );
      return conference;
    }
  } catch (error) {
    throw new Error(`Error adding tag(s) to conference: ${error}`);
  }
};

const getConferenceWithTags = async (idT) => {
  try {
    const conference = await Conference.find({ tags: idT }).populate("tags");
    return conference;
  } catch (error) {
    throw new Error(`Error retrieving conference with tags: ${error}`);
  }
};

const addTagToReunion = async (idR, idT) => {
  try {
    const reunion = await Reunion.findByIdAndUpdate(
      idR,
      { $push: { tags: idT } },
      { new: true }
    );
    return reunion;
  } catch (error) {
    throw new Error(`Error adding tag to reunion: ${error}`);
  }
};

const getReunionWithTags = async (idT) => {
  try {
    const reunion = await Reunion.find({ tags: idT }).populate("tags");
    return reunion;
  } catch (error) {
    throw new Error(`Error retrieving reunion with tags: ${error}`);
  }
};

module.exports = {
  createTag,
  getAllTags,
  deleteTag,
  updateTag,
  getConferenceWithTags,
  getReunionWithTags,
  addTagToConference,
  addTagToReunion,
  getTag,
};
