import React, { useState, useEffect } from "react";

import PageHeader from "@components/PageHeader";
import { MONTH_MAP } from "@utils/constants";
import { deleteObjectById, updateObjectById } from "@utils";
import {
  fetchBudgets,
  updateBudget,
  deleteBudget,
  createBudget,
} from "@services";

import BudgetCards from "./BudgetCards";
import CreateBudget from "./CreateBudget";

import "./styles.css";

const Budgets = () => {
  // TODO: select current month
  const currentDate = new Date();

  const [budgets, setBudgets] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [creatingNewBudget, setCreatingNewBudget] = useState(false);

  const [selectedYearMonth, setSelectedYearMonth] = useState({
    selectedYear: currentDate.getUTCFullYear(),
    selectedMonth: currentDate.getUTCMonth() + 1,
  });
  const { selectedYear, selectedMonth } = selectedYearMonth;

  const fetchData = async () => {
    const { budgetData, allTags } = await fetchBudgets(
      selectedYear,
      selectedMonth
    );
    setAvailableTags(allTags);
    setBudgets(budgetData);
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

    await updateBudget(id, newBudgetObject);
    await fetchData();
  };

  const handleBudgetDelete = async (id) => {
    setCreatingNewBudget(false);
    if (id === "") {
      return;
    }

    const updatedBudgets = deleteObjectById(budgets, id);
    setBudgets(updatedBudgets);

    await deleteBudget(id);
    await fetchData();
  };

  const handleBudgetCreate = async ({ tag, amount }) => {
    const newBudget = {
      year: selectedYear,
      month: selectedMonth,
      tag,
      amount,
    };
    await createBudget(newBudget);
    await fetchData();
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
        <h5>Current month: {`${MONTH_MAP[selectedMonth]}, ${selectedYear}`}</h5>
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
