document.getElementById('name-select').addEventListener('change', displayTasks);
document.getElementById('week-select').addEventListener('change', displayTasks);

const tasks = {
    "July 1 - July 7": {"Bathroom": "Yashu-Peter", "Kitchen": "Rohan-Sneha", "Trash": "Muzammil", "Hallway": "Nikhil"},
    "July 8 - July 14": {"Bathroom": "Rohan-Sneha", "Kitchen": "Muzammil-Nikhil", "Trash": "Yashu", "Hallway": "Peter"},
    "July 15 - July 21": {"Bathroom": "Muzammil-Nikhil", "Kitchen": "Yashu-Peter", "Trash": "Rohan", "Hallway": "Sneha"},
    "July 22 - July 28": {"Bathroom": "Yashu-Peter", "Kitchen": "Rohan-Sneha", "Trash": "Nikhil", "Hallway": "Muzammil"},
    "July 29 - August 4": {"Bathroom": "Rohan-Sneha", "Kitchen": "Muzammil-Nikhil", "Trash": "Peter", "Hallway": "Yashu"},
    "August 5 - August 10": {"Bathroom": "Muzammil-Nikhil", "Kitchen": "Yashu-Peter", "Trash": "Sneha", "Hallway": "Rohan"}
};

function displayTasks() {
    const week = document.getElementById('week-select').value;
    const name = document.getElementById('name-select').value;
    const display = document.getElementById('task-display');
    display.innerHTML = `<h2>Your Task for the Selected Week:</h2>`;
    
    Object.entries(tasks[week]).forEach(([task, assigned]) => {
        if (assigned.includes(name)) {
            const isChecked = getTaskCompletion(week, task);
            display.innerHTML += `<div>
                <strong>${task}:</strong> ${assigned}
                <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="updateCompletion('${week}', '${task}', this.checked)">
                </div>`;
        }
    });
    updateCompletionStatus();
}

function getTaskCompletion(week, task) {
    const storedData = JSON.parse(localStorage.getItem('taskCompletion')) || {};
    return storedData[week] && storedData[week][task];
}

function updateCompletion(week, task, isChecked) {
    let storedData = JSON.parse(localStorage.getItem('taskCompletion')) || {};
    if (!storedData[week]) {
        storedData[week] = {};
    }
    storedData[week][task] = isChecked;
    localStorage.setItem('taskCompletion', JSON.stringify(storedData));
    updateCompletionStatus();
    const feedback = document.getElementById('feedback-message');
    if (isChecked) {
        feedback.innerHTML = `Great job! You've completed the ${task}. Next week's task is ready for you.`;
        setTimeout(() => feedback.innerHTML = '', 5000); // Clear message after 5 seconds
    }
}

function updateCompletionStatus() {
    const week = document.getElementById('week-select').value;
    const storedData = JSON.parse(localStorage.getItem('taskCompletion')) || {};
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = '';
    
    if (storedData[week]) {
        Object.entries(tasks[week]).forEach(([task, assigned]) => {
            const isChecked = storedData[week][task];
            statusList.innerHTML += `<li>${task}: ${isChecked ? 'Completed' : 'Not Completed'}</li>`;
        });
    } else {
        statusList.innerHTML = '<li>No tasks completed for this week.</li>';
    }
}

// Initialize the display with default selections
displayTasks();
