document.addEventListener('DOMContentLoaded', function() {
    const expenses = [];

    const addExpenseButton = document.getElementById('addExpense');
    const saveExpensesButton = document.getElementById('saveExpenses');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const expenseList = document.getElementById('expenseList');

    addExpenseButton.addEventListener('click', function() {
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount) && amount > 0) {
            const date = new Date().toLocaleString();
            expenses.push({ description, amount, date });
            updateExpenseList();
            clearInputs();
        } else {
            alert('Please enter valid description and amount.');
        }
    });

    saveExpensesButton.addEventListener('click', function() {
        if (expenses.length > 0) {
            const data = expenses.map(expense => `${expense.date} - ${expense.description}: $${expense.amount.toFixed(2)}`).join('\n');
            const blob = new Blob([data], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'expenses.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            alert('No expenses to save.');
        }
    });

    function updateExpenseList() {
        expenseList.innerHTML = '<strong>Expenses:</strong><br>';
        expenses.forEach(expense => {
            const item = document.createElement('div');
            item.textContent = `${expense.date} - ${expense.description}: $${expense.amount.toFixed(2)}`;
            expenseList.appendChild(item);
        });
    }

    function clearInputs() {
        descriptionInput.value = '';
        amountInput.value = '';
    }
});
