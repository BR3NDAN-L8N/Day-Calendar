$('document').ready(function () {
    const timeSlotSection = $("#time-slot-section");
    const buttonSection = $("#button-section");

    const userInputStartTime = $("#user-input-start-time");
    const buttonSubmitStartTime = $("#submit-start-time");

    let dayCalendar = JSON.parse(localStorage.getItem("dayCalendar"));

    const calendarObj = {
        startTime: 9,
        save: function () {
            console.log("save was run");
            

            const savedCalendarObj = {
                startTime: calendarObj.startTime,
                textareas: {

                }
            }

            for (i = 0; i < 9; i++) {
                savedCalendarObj.textareas[i] = $(`#textarea-${i}`).val();
                console.log(`savedCalendarObj.textareas[i] = ${savedCalendarObj.textareas[i]}`);
            }



            dayCalendar.push(savedCalendarObj);
            localStorage.setItem("dayCalendar", JSON.stringify(dayCalendar));
        },
        load: function () {
            console.log(dayCalendar[0].startTime);
            calendarObj.startTime = parseInt(dayCalendar[0].startTime);
            displayTimeSlots();
        }
    }


    if (Array.isArray(dayCalendar)) {  // does an array already exist in local storage?
        calendarObj.load();
        console.log('else for storage');
    } else {
        dayCalendar = [];
    }

    //     localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));

    // const setLocalLayout = localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));
    // const setLocalTextData = localStorage.setItem("userScores", JSON.stringify(savedTextareaData));

    function displayTimeSlots() {
        if (!Array.isArray(dayCalendar)) {
            calendarObj.startTime = parseInt(userInputStartTime.val());
        }
        let hour = calendarObj.startTime;
        for (let i = 0; i < 9; i++) {
            hour += i;  // grab users input and convert to number
            if (hour > 12) {  // if the number is 13 we -12 to start back at 1
                hour -= 12;
            }
            // CREATE HTML ELEMENTS that make up the time blocks
            const timeDiv = $("<div>").addClass(`col-2 hour`).attr("id", `time-display-${i}`).text(`${hour}:00`);  // this is where the time displays
            const textArea = $("<textarea>").addClass(`col-10`).attr("id", `textarea-${i}`);  // the textarea for the things to do during time block
            timeSlotSection.append(timeDiv);  // add time display to time block section
            timeSlotSection.append(textArea);  // add textarea to time block section
        }

        const saveButton = $("<button>").addClass('saveBtn').attr('id', 'save-button').text('Save');
        buttonSection.append(saveButton);
    }

    // 
    // ON CLICK LISTENERS
    // 
    buttonSubmitStartTime.on('click', function () {
        console.log(`button clicked`);
        displayTimeSlots();
    });

    $(document).on("click", "#save-button", function () {
        console.log("save was pressed");
        calendarObj.save();
    });

    // console.log(localStorage.dayCalendar.length);  // dayCalendar is undefined

});
