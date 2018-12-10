import { Meteor } from "meteor/meteor";
import Stories from "../db/stories/collection";
import faker from "faker";

const createStory = () => {
  const name = faker.name.title();
  const description = faker.lorem.sentence();
  const isActive = Math.random() >= 0.5;

  Stories.insert({
    name, 
    description,
    isActive,
    createdAt: new Date()
  });
};

Meteor.startup(function() {
  if (Stories.find().count() > 0) {
    return true;
  } else {
    for (let i = 0; i < 10; i++) {
      createStory();
    }

    console.log("[Fixtures] Stories have been successfully generated!");
  }
});
