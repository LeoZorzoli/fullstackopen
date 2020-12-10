import React from "react";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  if (coursePart.name === "Fundamentals") {
    return (
      <div>
          <span>Course name</span> <span>{coursePart.name}</span>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Course description</span> <span> {coursePart.description}</span>
        </div>
      </div>
    );
  } else if (coursePart.name === "Using props to pass data") {
    return (
      <div>
          <span>Course name</span> <span>{coursePart.name}</span>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Number of group projects</span>{" "}
          <span> {coursePart.groupProjectCount}</span>
        </div>
      </div>
    );
  } else if (coursePart.name === "Deeper type usage") {
    return (
      <div>
          <span>Course name</span> <span>{coursePart.name}</span>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Course description</span> <span> {coursePart.description}</span>
        </div>
        <div>
          <span>Exercise submission link</span>{" "}
          <span> {coursePart.exerciseSubmissionLink}</span>
        </div>
      </div>
    );
  } else if (coursePart.name === "New course") {
    return (
      <div>
          <span>Course name</span> <span>{coursePart.name}</span>
        <div>
          <span>Number of exercises</span>{" "}
          <span>{coursePart.exerciseCount}</span>
        </div>
        <div>
          <span>Course description</span> <span> {coursePart.description}</span>
        </div>
        <div>
          <span>Special</span> <span> {coursePart.special}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default Part;