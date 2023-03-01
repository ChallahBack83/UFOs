# UFOs

## Overview of project

This project employees the use of Javascript to enhance HTML and build a dynamic webpage about UFO sighting data.  The goal is to pull in searchable data for users to search using multiple filters.  Bootstrap, CSS and d3 were all new tools used in this project to refine the final page. 

## Process

First, I began with outlining the needs for the project with a simple storyboard. This allowed me to visualize the sections needed for the page before building out the code. Since this page requires several different stages and code, I created html, javascript, and css files.  Starting with the html, I built out the outline for the layout of the page with the header, article title, and articles.  In the header, I input the title and a link to bootstrap to import the style format. Then, I linked to the empty css file, which will eventually hold the code for formatting.

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
```

Continuing the page outline, I needed division containers to hold the filters as well as the table. Then, after the divisons, I connected to my source library (for the d3 library), and the javascript files that will be used to fill the data and build the table on this page.

```
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

For the table on the right, I added the header columns using the keys in the data.js file. The <tbody /> tag underneath the headers is left empty because it will hold the data being pulled in the Javascript file.

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

In the division before the table, I added the code to create the filters in an unsorted list.  This will appear to the left of the table on the page.  Because our client wants to search by multiple filters, multiple <li /> entries were made to hold each search criteria: Date, City, State, Country, & Shape.

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

Each <li /> is given  the class "bg-dark" for formatting color. The input for each list item is given an id based on the information from the data.js, the same categories of the headers for the table. A placeholder is provided as an example of how data should be entered into the form. This creates a form to the left of our table that looks like:

![filterForm](https://github.com/ChallahBack83/UFOs/blob/main/static/images/filterForm.png)

Moving over to the css file linked in the header, code is entered to manage color for the page background and pulls the appropriate image requested by the client to fit across the top ofthe page in the jumbotron.

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

![cssStyleExample](https://github.com/ChallahBack83/UFOs/blob/main/static/images/cssStyleExample.png)

With this complete, I  moved onto the Javascript code in the app.js file to manage the import of the table and dynamic form for handling user input. First, I connected the data.js file to pull the data used to fill our table. Then, I identified the <tbody /> tag where the table data will connect with the html page and cleared any existing data to avoid duplicates. Looping through each object in the datat, the table rows are built out by appending the <tr /> for each row.

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

Now for the tricky part, creating and looping through multiple filters.  First, I created a variable to hold the criteria input by the users as searchable objects. Then I wrote a function to set them as the new values and ids of the callable data from teh table.

```
/ 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    
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

Next, I created a filterTable function and attached an event listener at the end that updates the table based on the user changes rather than needing to push a button. In a for loop, I had to loop through new keys in the filters object and use them to generate the new rows of the filteredTable.

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

The resulting page is not only a clean and clear presentation of the UFO sightings data, it is an interactive resource for users to comb easily through the data based on their individual search criteria. Using Javascript and d3 allowed me to generate the code above and make the filter search truly interactive for our users. Now you can search by more than just a date.  For example, type in the city you want to search following the placeholder example's format and hit Enter on your keyboard. Say we are looking for el cajon:

![citySearch](https://github.com/ChallahBack83/UFOs/blob/main/static/images/citySearch.png)

Now, in the table to the right, only that city appears in the table, making focused searching easier. You can also search by search by multiple criteria. For instance here, search by date and state by typing in the first and hitting tab until your cursor is in the next criteria you want to sue:

![dateStateSearch](https://github.com/ChallahBack83/UFOs/blob/main/static/images/dateStateSearch.png)

This allows the user to focus in on very specific results and compare similarities in sightings.

However, the user needs to be sure to clear input from the filter that they no longer want to use. It does not automatically clear, so before starting a new search, select and delete any existing input in the filter form.

![clearFilter](https://github.com/ChallahBack83/UFOs/blob/main/static/images/clearFilter.png)

## Summary

In summary, the new design is an improvement from the initial single search because users can employ multiple search criteria and do not need to use a mouse click to make the search happen.  However, one drawback is that there is not an easy way to clear the search filters before starting a new search. Having the user select and delete pre-entered data is clunky and increases the risk of creating search errors for the user.

![clearFilter](https://github.com/ChallahBack83/UFOs/blob/main/static/images/clearFilter.png)

The search by shape is also challenging because the variety of shapes is very wide and includes descriptions such as "light" or "fireball". Look at this variety on just one page:

![shapeSample](https://github.com/ChallahBack83/UFOs/blob/main/static/images/shapesSample.png)

### Recommendations

To further improve user experience, I suggest adding code to account for user input of upper or lower case letters. Currently, the filters input needs to be an exact match of the data. I believe we can add "toLowerCase()" on input so that it matches the data no matter how it is entered.
    
Besides that, I would add dropdown list of choices for the shape and countries filters at least. As shown above, the shapes have a wide variety. While the current data here is limited, as more is added, the number of choices for countries will also increase. Just as users will not know the shape choices, they do not know the country choices.

Lastly, I would add an easy way to clear the data from the form so that there are less risks of user error.
