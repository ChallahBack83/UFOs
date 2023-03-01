# UFOs

## Overview of project

Use of Javacript to enhance HTML and build dynamic webpage. Use filters to make table dynamic by user input. customize using Bootstrap

## Analysis
-created html file to build our webpage. Outline layout with header, article title and article,

--in header create title and link to bootstrap to import style format. Create css document to hold our code for formatting and link to it here.
```
<head>
    [...]
    <title>UFO Finder</title>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous"
        />
        <link rel="stylesheet" href="static/css/style.css">
</head>
```

-- division containers to hold Table and Filters. Add links to source files at end in appropriate order
```
<body class="bg-dark">
        <div class="wrapper">
            <!--Navbar-->
            <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
                <a class="navbar-brand" href="index.html">UFO Sightings</a>
            </nav>
        
            <!--Jumbotron or Dynamic page header-->
            <div class="jumbotron">
                <h1 class="display-4">The Truth Is Out There</h1>
            </div>

            <!--Article title & paragraph. Spacing in text lines doesn't matter. Use <br /> for paragraphs-->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4 article-title">
                        <h3>UFO Sightings: Fact or Fancy? <small>Ufologists Weigh In</small></h3>
                    </div>
                    <div class="col-md-8 article-p">
                        <p>
                            Are we alone in the universe? For millennia, humans have turned to the sky to answer this question.
                            [...]
                        </p>
                    </div>
                </div>
            </div>
           <!--Filter-->
            <div class="container-fluid">
                <div class="row">
                    <div class ="col-md-3">
                    [...]
                </div>

                <!--Table-->
                <div class ="col-md-9">
                    <table class="table table-striped">
                    [...]
                   </table>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.12.0/d3.js"></script>
        <script src="static/js/data.js"></script>
        <script src="static/js/app.js"></script>
    </body>
</html>
```

--table data underneath
Outline table using keys in the data.js file.  Tags <tr> for rows, <th> for headers of rows/columns, and add <tbody>, empty because will pull data using Javascript

```
<table class="table table-striped">
    <thead>
        <tr>
            <th>Date</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Shape</th>
            <th>Duration</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

--Then add filters
Above the table, add the code for the filters in an unsorted list. Because we want to make it searchable by multiple criteria, not just one, multiple <li /> for Date, City, State, Country, & Shape.

```
<div class="row">
    <div class ="col-md-3">
        <form class ="bg-dark">
            <p>Filter Search</p>
            <ul class="bg-dark list-group">
                <li class="bg-dark list-group-item">
                    <label for="datetime">Enter Date</label>
                    <input type="text" placeholder="1/1/2010" id="datetime" />
                </li>
                <li class="bg-dark list-group-item">
                    <label for="city">Enter City</label>
                    <input type="text" placeholder="benton" id="city" />
                </li>
                <li class="bg-dark list-group-item">
                    <label for="state">Enter State</label>
                    <input type="text" placeholder="ca" id="state" />
                </li>
                <li class="bg-dark list-group-item">
                    <label for="country">Enter Country</label>
                    <input type="text" placeholder="us" id="country" />
                </li>
                <li class="bg-dark list-group-item">
                    <label for="shape">Enter Shape</label>
                    <input type="text" placeholder="circle" id="shape" />
                </li>
            </ul>
        </form>
    </div>
```
each <li /> given "bg-dark" for formatting color.  Each item changed based on id within data.js. Placeholder written as example of how data should be entered into form.
This gives us a from to the left of our table that looks like:

![filterForm]()

--Set css file linked in header to manage style for background and pulling appropriate image to appear in the jumbotron

```
body {

    color: #f7f7f7;
}
.jumbotron {
    background-image: url("../images/nasa.jpg");
    background-size: 100% 100%;
    text-align: center;
}
```
![cssStyleExample]()

--move onto javascript in app.js file to manage import of table and dynamic form for handling user input. Start with pulling data in from data.js and building table to be inserted into the <tbody /> in html file. clear any data already inserted to have clean slate and avoid duplicates

```
// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html(" ");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}
```

--then need to create and loop through multiple filters Not easy, but start with creating variable to hold filters the writing function and setting each one to new variable.

```
/ 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    // let changedElement = document.getElementById("searchInput")

    // 4b. Save the value that was changed as a variable.
    let newValue = changedElement.property("value");
    console.log(newValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    console.log(filterId);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (newValue) {
      filters[filterId] = newValue;
    }
    else {
      delete filters[filterId];
    }
      
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
```

--create filterTable function, attaching event listener at end, to filter by the filteredData based on user input. In a for loop, had to go through new keys in the filters variable and use them to generate the new rows of the filteredTable.

```
// 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (var keys in filters) {
      filteredData = filteredData.filter(row => row[keys] === filters[keys])
    }
    
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
```

## Results
--Describe to Dana how someone might use the new webpage by walking her through process of using search criteria

using Javascript and d3 allowed us to generate the code above and make the filter search truly interactive for our users. Now you can search by more than just a date.  type in city you want to search following placeholder example's format

![citySearch]()
Only that city appears then in the table, making focused searching easier.

Can search by multiple criteria. For instance here, search by date and state

![dateStateSearch]()

Now can have more focused data by both time and location.

However we need to be sure to clear input from the filter that you no longer want to use. Need to select and delete input you don't watn.

![clearFilter]()

Could lead to confusion and incorrect data searches.
--

## Summary

one drawback of new design
--and cannot easily clear data to reset search. need to delete and hit enter to refresh
![clearFilter]()

--cannot account for variety of shapes, making search by shape difficult. 
![shapeSample]()

two recommendations for further development
--add code to account for user input of Upper or Lower Case (so it won't matter) 
    use toLowerCase() ?? on input?
--add dropdown for choices of shape in filter and countries (especially if add more)

--searchable by a date range
