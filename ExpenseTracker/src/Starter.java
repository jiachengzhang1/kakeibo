
public class Starter {

	public static void main(String[] args) {
		ExpenseTracker expenseTracker = new ExpenseTracker();
		expenseTracker.inputFileHandler("/Users/jiachengzhang/eclipse-workspace/ExpenseTracker/src/test.txt");
		expenseTracker.outputFileHandler();
	}

}
