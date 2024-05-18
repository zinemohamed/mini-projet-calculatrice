document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const historyList = document.getElementById('history-list');

    function updateDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function evaluateExpression() {
        try {
            const result = eval(display.value);
            addToHistory(display.value + ' = ' + result);
            display.value = result;
        } catch (error) {
            display.value = 'Error';
        }
    }

    function addToHistory(entry) {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.insertBefore(li, historyList.firstChild); // Insert at the beginning
        if (historyList.children.length > 3) {
            historyList.removeChild(historyList.lastChild); // Remove the oldest entry
        }
        saveHistory();
    }

    function saveHistory() {
        localStorage.setItem('history', historyList.innerHTML);
    }

    function loadHistory() {
        const savedHistory = localStorage.getItem('history');
        if (savedHistory) {
            historyList.innerHTML = savedHistory;
            // Remove excess entries if there are more than 3
            while (historyList.children.length > 3) {
                historyList.removeChild(historyList.lastChild);
            }
        }
    }

    loadHistory();

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            if (value === '=') {
                evaluateExpression();
            } else if (value === 'C') {
                clearDisplay();
            } else if (value === '←') {
                display.value = display.value.slice(0, -1);
            } else {
                updateDisplay(value);
            }
        });
    });
});
