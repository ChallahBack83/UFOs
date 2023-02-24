// import the data from data.js

const tableData = data;

// Reference th HTML table using d3

var tbody = d3.select("tbody");

// New function build table

function buildTable(data) {
    // first, clear out any existing data
    tbody.html("");

    // next, loop through each object in the data
    //and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        
        //append a row to the table body
        let row = tbody.append("tr");

        //loop through each field in the data Row and add
        //each value as a table cell(td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

//Adding a date function to be able to filter by button click on date
function handleClick() {

    //Grab datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    //Check if a date was entered and filter data using the date
    if (date) {

        //Apply filter to table data to only keep
        //rows where 'datetime' value matches filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    //Rebuild table using filtered data
    // @Note: If no date was entered, then filteredData will
    //just be original tableData.
    buildTable(filteredData);
}

//list for Event (aka click)
d3.selectAll("#filter-btn").on("click", handleClick);

// Butld table when page loads.
buildTable(tableData);

//pseudocode practice
// if (a date is entered) {
    //Filter the default data to show only the date entered
//}