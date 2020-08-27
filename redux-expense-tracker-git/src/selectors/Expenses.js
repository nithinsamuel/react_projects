// Get Visible Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses
      .filter((expense) => {
        const startDateMatch =
          typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch =
          typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = expense.description
          .toLowerCase()
          .includes(text.toLowerCase());
        // figure out if expenses.description as the text variable string inside it  
        // if all below values are true then the item will be kept in the array
        return startDateMatch && endDateMatch && textMatch;
      })
      .sort((a, b) => {
        console.log("sortBy", sortBy);
        if (sortBy === "date") {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === "amount") {
          return a.amount < b.amount ? 1 : -1;
        }
        // else{
        //   return false
        // }
      });
  };
  export default getVisibleExpenses;