import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExpenseTracker {

	List<Expense> expenseList;
	private double totalExpense;
	
	
	public ExpenseTracker () {
		this.expenseList = new LinkedList<>();
		this.totalExpense = 0.0;
	}
	
	/**
	 * Read expense information based on given input file
	 *
	 * @param  fileName  the path of the input file
	 */
	public void inputFileHandler (String fileName) {
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader(fileName));
			String line = reader.readLine();
			while (line != null) {
				String[] expenseInfo = line.split(":");
				double expense = Double.parseDouble(expenseInfo[1].
													replaceAll(" ", "").
													replaceAll("\\$", ""));
				
				addNewExpense(expenseInfo[0].trim(), "", expense);
				line = reader.readLine();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void outputFileHandler () {
		// blank workbook
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet spreadSheet = workbook.createSheet("Expenses");
		
		int rowNum = 0;
		for (Expense expense : expenseList) {
			XSSFRow row = spreadSheet.createRow(rowNum++);
			
			row.createCell(0).setCellValue(expense.getExpenseName());
			row.createCell(1).setCellValue(expense.getExpense());
		}
		
		try {
			FileOutputStream output = new FileOutputStream(new File("output.xlsx"));
			workbook.write(output);
			output.close();
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void addNewExpense (String expenseName, String category, double expense) {
		Expense newExpense = new Expense(expenseName, category, expense);
		expenseList.add(newExpense);
		this.totalExpense ++;
	}
	
	public double getTotalExpense () {
		return this.totalExpense;
	}
	
	public int numExpenses () {
		return this.expenseList.size();
	}
	
}
