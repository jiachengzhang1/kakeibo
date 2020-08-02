import React, { useState } from "react";
import ChangeableInput from "../../components/ChangeableInput";
import Tag from "../../components/Tag";
import EditableCard from "../../components/EditableCard";
import { TAG_MAP } from "../../utils/constants";

function getTag(tag) {
  switch (tag) {
    case "living":
      return <Tag type="primary" text="Expenses on Living" />;
    case "culture":
      return <Tag type="success" text="Culture and Education" />;
    case "entertainment":
      return <Tag type="warning" text="Entertainment" />;
    default:
      return <Tag type="info" text="Others" />;
  }
}

const BudgetCard = ({
  budget = { _id: "", tag: "", amount: "" },
  availableTags = [],
  creatingMode = false,
  handleBudgetCreate,
  handleBudgetUpdate,
  handleBudgetDelete,
}) => {
  // const { userData } = useContext(UserContext);
  // const { token, user } = userData;

  const { _id, tag, amount } = budget;
  const [input, setInput] = useState(amount);
  const initalSelection = availableTags.length > 0 ? availableTags[0] : "";
  const [selection, setSelection] = useState(initalSelection);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(creatingMode);

  const handleBudgetCardSave = () => {
    if (input === "") {
      setError(`A number is required in this field.`);
      return;
    }
    if (error !== "") setError("");
    const save = creatingMode
      ? () => handleBudgetCreate({ tag: selection, amount: input })
      : () => handleBudgetUpdate(_id, input);

    save();

    setEditing(false);
  };

  const handleBudgetCardEdit = () => {
    setEditing(true);
  };

  const handleBudgetCardDelete = () => {
    handleBudgetDelete(_id);
  };

  const changeableInput = (
    <ChangeableInput
      onChange={(event) => setInput(event.target.value)}
      label="$"
      type="number"
      value={input}
      editing={editing}
      name={tag}
      error={error}
    />
  );

  const titleComponent = creatingMode ? (
    <select
      name="tag"
      defaultValue={selection}
      onChange={(event) => setSelection(event.target.value)}
    >
      {availableTags.map((tag) => (
        <option key={tag} value={tag}>
          {TAG_MAP[tag].text}
        </option>
      ))}
    </select>
  ) : (
    <Tag tag={tag} />
  );

  return (
    <EditableCard
      content={changeableInput}
      handleDelete={handleBudgetCardDelete}
      handleSave={handleBudgetCardSave}
      handleEdit={handleBudgetCardEdit}
      editing={editing}
      title={titleComponent}
    />
  );
};

export default BudgetCard;
