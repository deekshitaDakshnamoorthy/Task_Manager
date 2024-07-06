 
const TableData = [
    { Task: "Meeting", Description: "ClientMeeting", duration: "42:12" },
    { Task: "Project", Description: "NextJs", duration: "50:44" },
    { Task: "Project", Description: "mern", duration: "42:12" },
    { Task: "Personalbreak", Description: "-", duration: "56:34" },
    { Task: "Meeting", Description: "HRMeeting", duration: "20:58" },
    { Task: "Meeting", Description: "ClientMeeting", duration: "42:12" },
    { Task: "Personalbreak", Description: "-", duration: "55:12" },
    { Task: "Project", Description: "Developing", duration: "42:12" },
    { Task: "Meeting", Description: "-", duration: "10:10" },
];

const tableBody = document.querySelector('#dataTable tbody');
const select = document.getElementById('sort');
let interval;
let seconds = 0;
let minutes = 0;
let hour = 0;
let isRunning = false;

function table(Task) {
    tableBody.innerHTML = '';
    TableData.forEach((data, index) => {
        if (data.Task === Task || Task === '-') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.Task}</td>
                <td>${data.Description}</td>
                <td>${data.duration}</td>
            `;
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'UPDATE';
            updateBtn.classList.add('update-btn');
            updateBtn.addEventListener('click', () => handleUpdate(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'DELETE';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => handleDelete(index));

            row.appendChild(updateBtn);
            row.appendChild(deleteBtn);
            tableBody.appendChild(row);
        }
    });
}

function addTask() {
    const Task = document.forms["form1"]["Task"].value;
    const Description = document.forms["form1"]["Description"].value;
    const duration = document.forms["form1"]["duration"].value;

    const newTask = {
        Task: Task,
        Description: Description,
        duration: duration
    };
    if (newTask.Task != null && newTask.Description != null && newTask.duration != null) {
        TableData.push(newTask);
    }
    table(select.value);
}

function handleUpdate(index) {
    const newData = {
        Task: prompt("Enter new Task") || TableData[index].Task,
        Description: prompt("Enter new Description") || TableData[index].Description,
        duration: prompt("Enter new duration") || TableData[index].duration,
    };
    TableData.splice(index, 1, newData);
    table(select.value);
}

function handleDelete(index) {
    TableData.splice(index, 1);
    table(select.value);
}

function startStopwatch() {
    if (!isRunning) {
        interval = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hour++;
                }
            }
            let formattedTime = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            document.querySelector(".stopwatch").innerHTML = formattedTime;
            isRunning = true;
        }, 1000);
    } else {
        isRunning = false;
        clearInterval(interval);
        // Get the current stopwatch time
        const stopwatchTime = document.querySelector(".stopwatch").textContent;
        // Set the stopwatch time into the duration input field
        document.forms["form1"]["duration"].value = stopwatchTime;
    }
}

function resetStopwatch() {
    // Check if the interval is defined and clear it
    if (interval) {
        clearInterval(interval);
    }
    
    // Reset time variables to zero
    seconds = 0;
    minutes = 0;
    hour = 0;
    
    // Update the button text
    document.querySelector(".button").innerHTML = 'Start';
    
    // Format the time as 00:00:00
    let formattedTime = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    
    // Update the stopwatch display
    document.querySelector(".stopwatch").innerHTML = formattedTime;
}


table(select.value);

select.addEventListener('change', function () {
    const selectedValue = this.value;
    table(selectedValue);
});
