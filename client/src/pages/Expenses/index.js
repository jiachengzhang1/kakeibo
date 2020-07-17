import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import ExpensesTable from "./ExpensesTable";
import Pagination from "../../components/Pagination";
import PageHeader from "../../components/PageHeader";
import Backdrop from "../../components/Backdrop";
import ExpenseOptions from "./ExpenseOptions";

import "./Expenses.css";

const DEFAULT_EXPENSES_PAGE = 1;
const DEFAULT_EXPENSES_PER_PAGE = 15;

const Expenses = () => {
  const [expensesState, setExpensesState] = useState([]);

  const [createExpense, setCreateExpense] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [selectedYearState, setSelectedYearState] = useState(0);
  const [selectedMonthState, setSelectedMonthState] = useState(0);
  const yearsWithMonthsRef = useRef([]);

  const [currentPageState, setCurrentPageState] = useState(
    DEFAULT_EXPENSES_PAGE
  );
  const [expensesPerPageState, setExpensesPerPageState] = useState(
    DEFAULT_EXPENSES_PER_PAGE
  );
  const totalPagesRef = useRef(0);

  const body = {
    action: "GET_EXPENSES_WITH_YEARS_AND_MONTHS",
    payload: {},
    query: {},
    options: {
      page: currentPageState,
      limit: expensesPerPageState,
      sort: { formated_date: "desc", date_created: "desc" },
    },
  };

  if (selectedYearState !== 0) {
    body.query.year = selectedYearState;
  }

  if (selectedMonthState !== 0) {
    body.query.month = selectedMonthState;
  }

  const updateData = async ({ action, payload }) => {
    body.action = action;
    body.payload = payload;
    await fetchData(body);
  };

  const fetchData = async (body) => {
    const response = await axios.post("http://localhost:5000/expenses", body);
    // console.log("fetch:", response);
    const {
      expenses: { docs, totalPages },
      yearsWithMonths,
    } = response.data;

    totalPagesRef.current = totalPages;
    yearsWithMonthsRef.current = yearsWithMonths;
    setExpensesState(docs);
  };

  useEffect(() => {
    fetchData(body, totalPagesRef, setExpensesState, yearsWithMonthsRef);
  }, [
    currentPageState,
    expensesPerPageState,
    selectedYearState,
    selectedMonthState,
  ]);

  const expenseTable = !expensesState ? (
    <h2>Loading</h2>
  ) : (
    <ExpensesTable
      expenses={expensesState}
      updateData={updateData}
      createExpense={createExpense}
      hideCreateExpense={() => {
        setCreateExpense(false);
      }}
      updating={updating}
      setUpdating={setUpdating}
    />
  );

  return (
    <div>
      {createExpense || updating ? <Backdrop /> : null}
      <PageHeader option="Expenses List" icon="list ul" />
      <div>
        <ExpenseOptions
          selectedYearState={selectedYearState}
          selectedMonthState={selectedMonthState}
          yearsWithMonths={yearsWithMonthsRef.current}
          setExpensesPerPage={setExpensesPerPageState}
          setSelectedYearState={setSelectedYearState}
          setSelectedMonthState={setSelectedMonthState}
          showCreateExpense={() => setCreateExpense(true)}
        />
      </div>
      <div>{expenseTable}</div>
      <Pagination
        totalPages={totalPagesRef.current}
        currentPage={currentPageState}
        setCurrentPage={setCurrentPageState}
      />
    </div>
  );
};

export default Expenses;
