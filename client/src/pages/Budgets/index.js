import React, { useState, useEffect } from "react";
import axios from "axios";

import PageHeader from "components/PageHeader";

import BudgetCards from "./BudgetCards";
import CreateBudget from "./CreateBudget";
import { MONTH_MAP } from "../../utils/constants";

import "./styles.css";

const updateObjectById = (array, object) => {
  const index = array.findIndex((element) => element._id === object._id);
  const element = { ...array[index], ...object };
  return [...array.slice(0, index), ...[element], ...array.slice(index + 1)];
};

const deleteObjectById = (array, id) => {
  const index = array.findIndex((element) => element._id === id);
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

const Budgets = () => {
  const currentDate = new Date();

  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    currentDate.getUTCMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState(currentDate.getUTCFullYear());

  const [creatingNewBudget, setCreatingNewBudget] = useState(false);

  const [availableTags, setAvailableTags] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5000/budgets/${currentYear}/${currentMonth}`
    );

    const budgetData = [];
    const allTags = ["living", "culture", "entertainment", "others"];

    response.data.forEach(({ _id, year, month, tag, amount }) => {
      budgetData.push({ _id, year, month, tag, amount });
      allTags.splice(allTags.indexOf(tag), 1);
    });
    setAvailableTags(allTags);
    setBudgets(budgetData);
  };

  const updateData = async (id, data) => {
    await axios.put(`http://localhost:5000/budgets/${id}`, data);
    fetchData();
  };

  const deleteData = async (id) => {
    // console.log(id);
    const response = await axios.delete(`http://localhost:5000/budgets/${id}`);
    await fetchData();
  };

  const createData = async (data) => {
    const response = await axios.post("http://localhost:5000/budgets", data);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBudgetUpdate = async (id, newBudget) => {
    const newBudgetObject = {
      amount: newBudget.toString(),
      _id: id,
    };
    const updatedBudgets = updateObjectById(budgets, newBudgetObject);
    setBudgets(updatedBudgets);

    await updateData(id, newBudgetObject);
  };

  const handleBudgetDelete = async (id) => {
    setCreatingNewBudget(false);
    if (id === "") {
      return;
    }

    const updatedBudgets = deleteObjectById(budgets, id);
    setBudgets(updatedBudgets);

    await deleteData(id);
  };

  const handleBudgetCreate = async ({ tag, amount }) => {
    const newBudget = {
      year: currentYear,
      month: currentMonth,
      tag,
      amount,
    };
    await createData(newBudget);
    setCreatingNewBudget(false);
  };

  const createNewBudget = creatingNewBudget ? (
    <div className="create-new-budget">
      <CreateBudget
        availableTags={availableTags}
        handleBudgetCreate={handleBudgetCreate}
        handleBudgetDelete={handleBudgetDelete}
      />
    </div>
  ) : null;

  return (
    <div>
      <PageHeader option="Monthly Budgets" icon="calculator sign" />
      <div className="budget-select">
        <h5>Current month: {`${MONTH_MAP[currentMonth]}, ${currentYear}`}</h5>
        <button
          onClick={() => setCreatingNewBudget(true)}
          className={`create-budget ${
            availableTags.length === 0 ? "disabled" : ""
          }`}
        >
          <i className="plus icon"></i>
          Create Budget
        </button>
      </div>
      <div className="grid-container">
        <div className="budget-editable-cards">
          {createNewBudget}
          <BudgetCards
            budgets={budgets}
            handleBudgetCreate={handleBudgetCreate}
            handleBudgetUpdate={handleBudgetUpdate}
            handleBudgetDelete={handleBudgetDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Budgets;
