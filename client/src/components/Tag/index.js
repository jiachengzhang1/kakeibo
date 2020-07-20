import React from "react";

import "./styles.css";
import { TAG_MAP } from "../../utils/constants";

// function getTag(tag) {
//   switch (tag) {
//     case "living":
//       return <Tag type="primary" text="Expenses on Living" />;
//     case "culture":
//       return <Tag type="success" text="Culture and Education" />;
//     case "entertainment":
//       return <Tag type="warning" text="Entertainment" />;
//     default:
//       return <Tag type="info" text="Others" />;
//   }
// }

const Tag = ({ tag }) => {
  return (
    <span
      className={`tag badge badge-pill badge-${TAG_MAP[tag].bootstrapColor}`}
    >
      {TAG_MAP[tag].text}
    </span>
  );
};

export default Tag;
