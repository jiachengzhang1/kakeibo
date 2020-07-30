import React, { useState, useEffect, useRef, useContext } from "react";

import { expenseRequest } from "@api/ExpenseRoute";
import Pagination from "@components/Pagination";
import PageHeader from "@components/PageHeader";
import Backdrop from "@components/Backdrop";

import ExpensesTable from "./ExpensesTable";
import ExpenseOptions from "./ExpenseOptions";

import "./Expenses.css";
import UserContext from "../../context/UserContext";

const DEFAULT_EXPENSES_PAGE = 1;
const DEFAULT_EXPENSES_PER_PAGE = 15;

const Expenses = () => {

  const {userData, setUserData} = useContext(UserContext);
  // console.log(userData);
  const {token, user} = userData;


  // state of all expenses showing on this page
  const [expensesState, setExpensesState] = useState([]);

  // states of if an expense is being created/updated
  const [createExpense, setCreateExpense] = useState(false);
  const [updating, setUpdating] = useState(false);

  // state of selected year and month
  const [selectedYearMonth, setSelectedYearMonth] = useState({
    selectedYear: 0,
    selectedMonth: 0,
  });
  const { selectedYear, selectedMonth } = selectedYearMonth;
  const updateYearMonth = (yearMonth) => {
    setCurrentPageState(DEFAULT_EXPENSES_PAGE);
    setSelectedYearMonth(yearMonth);
  };
  const yearsWithMonthsRef = useRef([]);

  // state for pagination
  const [currentPageState, setCurrentPageState] = useState(
    DEFAULT_EXPENSES_PAGE
  );
  const [expensesPerPageState, setExpensesPerPageState] = useState(
    DEFAULT_EXPENSES_PER_PAGE
  );
  const totalPagesRef = useRef(0);

  const expenseAPIRequest = async (
    request = { action: "GET_EXPENSES_WITH_YEARS_AND_MONTHS", payload: {} },
    page = currentPageState,
    limit = expensesPerPageState,
    year = selectedYear,
    month = selectedMonth
  ) => {
    if (token && user) {
      try {
        const {
          expenses: { docs, totalPages },
          yearsWithMonths,
        } = await expenseRequest({ ...request, ...userData }, page, limit, year, month);
        totalPagesRef.current = totalPages;
        yearsWithMonthsRef.current = yearsWithMonths;
        setExpensesState(docs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    expenseAPIRequest();
  }, [currentPageState, expensesPerPageState, selectedYearMonth, userData]);

  const expenseTable = !expensesState ? (
    <h2>Loading</h2>
  ) : (
    <ExpensesTable
      expenses={expensesState}
      updateData={expenseAPIRequest}
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
      <ExpenseOptions
        selectedYearMonth={selectedYearMonth}
        updateYearMonth={updateYearMonth}
        yearsWithMonths={yearsWithMonthsRef.current}
        setExpensesPerPage={setExpensesPerPageState}
        showCreateExpense={() => setCreateExpense(true)}
      />
      {expenseTable}
      <Pagination
        totalPages={totalPagesRef.current}
        currentPage={currentPageState}
        setCurrentPage={setCurrentPageState}
      />
    </div>
  );
};

export default Expenses;
