//I am aiming for the "Exceeds Expectations" grade.

//this selects all of the students and places them in an array of objects called studentList
const studentList = document.querySelectorAll(".student-item");
//number of items to display per page
const onPage = 10;

//displays proper subset of list of students depending on page number
const showPage = (list, page) => {
    let startIndex = (page * onPage) - onPage;;
    let endIndex = page * onPage;

    //loops through given array to determine whether they should be displayed on the current window
    for (let i = 0; i < list.length; i += 1) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = '';
        } else {
            list[i].style.display = 'none';
        }
    }
}

//creates buttons for new pages
const appendPageLinks = (list) => {
    //determines how many pages are needed for the list
    const numPages = Math.ceil(list.length / onPage);

    //creates new div elements
    const newDiv = document.createElement("DIV");
    newDiv.setAttribute("class", "pagination");
    document.querySelector(".page").appendChild(newDiv);

    //creates new ul elements
    const newUL = document.createElement("UL");
    newDiv.appendChild(newUL);

    //creates as many page links as needed using a for loop
    for (let i = 1; i < numPages + 1; i += 1) {
        const newLI = document.createElement("LI");
        newUL.appendChild(newLI);

        const newA = document.createElement("A");
        newA.setAttribute("href", "#");
        newA.setAttribute("class", "");
        newA.innerHTML = i;
        newLI.appendChild(newA);
    }

    //selects all link elements and places it in an array called linkElements
    const linkElements = document.querySelectorAll("a")
        //sets initial page class to active, to show only that page to begin with
    linkElements[0].setAttribute("class", "active");

    //loops through the link elements and adds an event listener to each of them, determining whether they have an "active" class or not.
    //the link with the active class will then have that corresponding page displayed
    for (let i = 0; i < linkElements.length; i += 1) {
        linkElements[i].addEventListener("click", (i) => {
            for (let a = 0; a < linkElements.length; a += 1) {
                linkElements[a].classList.remove("active");
            }
            event.target.setAttribute("class", "active");
            showPage(list, event.target.innerHTML);
        });
    }
}

//removes all pagination links
const removePagination = () => {
    const pagination = document.querySelector('.pagination');
    if (pagination !== null) {
        pagination.remove();
    }
}

//hides all students
const hideList = (list) => {
    for (let i = 0; i < list.length; i += 1) {
        list[i].style.display = 'none';
    }
}

//creates a search bar
const appendSearch = () => {
    const newDiv = document.createElement("DIV");
    newDiv.setAttribute("class", "student-search");
    document.querySelector(".page-header").appendChild(newDiv);

    //creates new input search bar
    const newInput = document.createElement("INPUT");
    newInput.setAttribute("placeholder", "Search for students...");
    newDiv.appendChild(newInput);

    //creates new click search button
    const newButton = document.createElement("BUTTON");
    newButton.innerHTML = "Search";
    newDiv.appendChild(newButton);

    //creates a "no results" message to show in the case that no results are returned from a search
    const noResults = document.createElement("P");
    noResults.innerHTML = "No results";
    document.querySelector("h2").appendChild(noResults);
    noResults.style.display = 'none';

    //adds an event listener to search bar using "keyup" event. dynamically refreshes search as you input more characters
    newInput.addEventListener("keyup", () => {
        noResults.style.display = 'none';
        const searchList = [];
        for (let i = 0; i < studentList.length; i += 1) {
            if (studentList[i].firstElementChild.firstElementChild.nextElementSibling.innerHTML.includes(newInput.value.toLowerCase())) {
                studentList[i].style.display = '';
                searchList.push(studentList[i]);
            } else {
                studentList[i].style.display = 'none';
            }
        }
        if (searchList.length === 0) {
            noResults.style.display = '';
            removePagination();
        } else {
            removePagination();
            showPage(searchList, 1);
            appendPageLinks(searchList);
        }
    });

    //adds an event listener to search bar using "click" event. refreshes search when you press the button
    newButton.addEventListener("click", () => {
        noResults.style.display = 'none';
        const searchList = [];
        for (let i = 0; i < studentList.length; i += 1) {
            if (studentList[i].firstElementChild.firstElementChild.nextElementSibling.innerHTML.includes(newInput.value.toLowerCase())) {
                studentList[i].style.display = '';
                searchList.push(studentList[i])
            } else {
                studentList[i].style.display = 'none';
            }

        }
        if (searchList.length === 0) {
            noResults.style.display = '';
            removePagination();
        } else {
            removePagination();
            showPage(searchList, 1);
            appendPageLinks(searchList);
        }
    });
}

//initial calls for when the page is loaded
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearch();