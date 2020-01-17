
public class Expense {

	private String expenseName;
	private String category;
	private double expense;
	
	
	public Expense () {
		this.category = null;
		this.expense = 0;
		this.expenseName = null;
	}
	
	public Expense (String expenseName, String category, double expense) {
		this.expenseName = expenseName;
		this.expense = expense;
		this.category = category;
	}
	
	public String getExpenseName () {
		return this.expenseName;
	}
	
	public String getCategory() {
		return this.category;
	}
	
	public double getExpense() {
		return this.expense;
	}
}
