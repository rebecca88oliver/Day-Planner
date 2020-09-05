
//Accessing & saving to local storage
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}



$(document).ready(function() {


    // Displays the current date below the title
    $("#currentDay").text("Today is " + moment().format("dddd, MMMM Do")); 

    // Creates rows for 9 to 5 pm 
    for (let i = 9; i < 18; i++) {
    
        // creates the 1st row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // creates the hour column
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + amPM(i) + '</p>');

        //creates event column (2)
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here!"></textarea>`);        
       
        //creates save button column (3)
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        

        // appends the columns to the row
        row.append(col1, col2, col3);

        // appends the row to the container
        $(".container").append(row);
        getLocalStorage(i);
    }


// Converts 24hr time to AM/PM time
            function amPM(hours) {
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                return hours + ampm;
            }
        amPM();

// Keeps track of current time for the pink/green indicators 
        function updateColors(){
                var currentTime = new Date().getHours();
                for (var i = 9; i < 18; i++) { 
                console.log(currentTime, $(`#${i}`).data("time"));
                if ($(`#${i}`).data("time") == currentTime){
                    $(`#text${i}`).addClass( "present");
                } else if (currentTime < $(`#${i}`).data("time")) {
                    $(`#text${i}`).addClass( "future");
                }
            }
        }

        setInterval(function() {
            updateColors();
        }, 1000);

// Save button
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function(){
        let eventId = $(this).attr('id');
        let eventText = $(this).parent().siblings().children('.description').val();
        localStorage.setItem(eventId, eventText);
    });});