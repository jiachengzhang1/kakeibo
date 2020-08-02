import React, { useState, useEffect, useContext } from "react";

import PageHeader from "@components/PageHeader";
import { MONTH_MAP } from "@utils/constants";
import { deleteObjectById, updateObjectById } from "@utils";
import {
  fetchBudgets,
  updateBudget,
  deleteBudget,
  createBudget,
} from "@services";
import UserContext from "../../context/UserContext";
import BudgetCards from "./BudgetCards";
import CreateBudget from "./CreateBudget";

import "./styles.css";

const Budgets = () => {
  const { userData } = useContext(UserContext);
  const { token, user } = userData;

  const authenticated = token && user;

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
    if (authenticated) {
      const { budgetData, allTags } = await fetchBudgets(
        selectedYear,
        selectedMonth,
        token
      );
      setAvailableTags(allTags);
      setBudgets(budgetData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBudgetUpdate = async (id, newBudget) => {
    if (authenticated) {
      const newBudgetObject = {
        amount: newBudget.toString(),
        _id: id,
      };
      const updatedBudgets = updateObjectById(budgets, newBudgetObject);
      setBudgets(updatedBudgets);

      await updateBudget(id, newBudgetObject, token);
      await fetchData();
    }
  };

  const handleBudgetDelete = async (id) => {
    if (authenticated) {
      setCreatingNewBudget(false);
      if (id === "") {
        return;
      }
      const updatedBudgets = deleteObjectById(budgets, id);
      setBudgets(updatedBudgets);

      await deleteBudget(id, token);
      await fetchData();
    }
  };

  const handleBudgetCreate = async ({ tag, amount }) => {
    if (authenticated) {
      const newBudget = {
        year: selectedYear,
        month: selectedMonth,
        tag,
        amount,
      };
      await createBudget(newBudget, token);
      await fetchData();
      setCreatingNewBudget(false);
    }
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
