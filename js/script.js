let subsJsonList = [];
let personJsonList = [];
let totalObtainMarks = 0;
let name;
let noOfSubjects;
let totalMarks;
let countTable = 0;
function addMarksheet() {
  countTable = countTable + 1;
  let table = document.querySelector("table");
  const tableBody = document.createElement("tbody");
  if (validateName() & validateTotalMarks()) {
    let inputSub;
    var inputObtain;
    var lastRowThirdCellTotal;
    name = document.getElementById("fullName").value;
    noOfSubjects = document.getElementById("no-subjects").value;
    totalMarks = document.getElementById("total-marks").value;

    const headingRow = document.createElement("tr");
    const heading1 = document.createElement("th");
    const heading2 = document.createElement("th");
    const heading3 = document.createElement("th");
    const heading4 = document.createElement("th");

    const serialNo = document.createTextNode("No.");
    const subject = document.createTextNode("Subject");
    const total = document.createTextNode("Total");
    const obtain = document.createTextNode("Obtain");

    heading1.appendChild(serialNo);
    heading2.appendChild(subject);
    heading3.appendChild(total);
    heading4.appendChild(obtain);

    headingRow.appendChild(heading1);
    headingRow.appendChild(heading2);
    headingRow.appendChild(heading3);
    headingRow.appendChild(heading4);
    tableBody.appendChild(headingRow);

    let obtainArray = [];
    let subName;
    let obtainMark;

    for (let i = 0; i <= noOfSubjects; i++) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      let cell4Span = document.createElement("span");
      cell4Span.id = "mark-result" + countTable;
      cell4Span.style.color = "blue";
      cell4Span.style.fontWeight = "bold";

      // var lastRowThirdCellTotal = document.createElement("b");

      const cellText1 = document.createTextNode(`${i + 1}`);

      if (i < noOfSubjects) {
        inputSub = document.createElement("input");
        inputSub.type = "text";
        inputSub.class = "form-control";
        inputSub.id = "sub-name" + i + countTable;
        inputSub.placeholder = "enter subject name";
        let subError = document.createElement("span");
        subError.id = "sub-error";
        inputSub.onblur = function () {
          subName = document.getElementById("sub-name" + i + countTable).value;
        };

        const cellText3 = document.createTextNode(`${totalMarks}`);

        inputObtain = document.createElement("input");
        inputObtain.type = "number";
        inputObtain.max = `${totalMarks}`;
        inputObtain.min = `${0}`;
        inputObtain.class = "form-control";
        inputObtain.placeholder = "0";
        inputObtain.id = "obtain-marks" + i + countTable;
        cell2.appendChild(inputSub);
        cell2.appendChild(subError);
        cell3.appendChild(cellText3);
        cell4.appendChild(inputObtain);
      } else {
        const lastRowFirstCellTotal = document.createElement("b");
        const lastRowFirstCellTotalText = document.createTextNode("Total");
        lastRowFirstCellTotal.appendChild(lastRowFirstCellTotalText);
        cell2.appendChild(lastRowFirstCellTotal);

        const lastRowSecondCellTotal = document.createElement("b");
        const totalDisplayValue = document.createTextNode(
          `${noOfSubjects * totalMarks}`
        );
        totalDisplayValue.id = "total-subjects-marks" + countTable;

        lastRowSecondCellTotal.appendChild(totalDisplayValue);
        cell3.appendChild(lastRowSecondCellTotal);
        cell4.appendChild(cell4Span);
      }

      // console.log(obtainArray);
      cell1.appendChild(cellText1);

      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);

      tableBody.appendChild(row);
      // divTag.appendChild(tableBody);
    }
    table.appendChild(tableBody);
    table.setAttribute("border", "2");

    console.log("Name is:", name);
    console.log("Total subjects:", noOfSubjects);
    console.log("Total marks:", totalMarks);

    // document.getElementById("form-data").reset();
    // console.log("inputSub", inputSub);
    // for (let i = 0; i < noOfSubjects; i++) {
    //   let subName = document.getElementById("sub-name" + i).value;
    //   inputSub.onblur = `validateSubjects(${subName})`;
    //   if (validateSubjects(subName)) {
    //     console.log("true");
    //   } else {
    //     console.log("false");
    //   }
    // }
    // createJsonForPerson(name, subsJsonList);
    // createJsonForSubject(subName, totalMarks, obtainMark);
  } else {
    validateName();
    validateTotalMarks();
  }

  // totalObtainMarks = 0;
}

function calTotalMarks() {
  noOfSubjects = document.getElementById("no-subjects").value;
  totalMarks = Number(document.getElementById("total-marks").value);
  for (let i = 0; i < noOfSubjects; i++) {
    obtainMark = parseFloat(
      document.getElementById("obtain-marks" + i + countTable).value
    );
    // console.log(obtainMark);
    if (obtainMark >= 0 && obtainMark <= totalMarks) {
      totalObtainMarks += obtainMark;
      document.getElementById("mark-result" + countTable).innerHTML =
        `${totalObtainMarks}` + "/" + `${noOfSubjects * totalMarks}`;

      obtainMark = 0;
    }
  }
  totalObtainMarks = 0;
}

function validateName() {
  name = document.getElementById("fullName").value;
  if (name.trim() == "") {
    document.querySelector("#name-error").innerHTML = "Name is Required";
    return false;
  } else {
    if (
      !name.match(
        /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
      )
    ) {
      document.querySelector("#name-error").innerHTML = "Write full name";
      return false;
    } else if (name.trim().length > 50) {
      document.querySelector("#name-error").innerHTML =
        "length should be below 50 letters !";
      return false;
    }
  }
  document.querySelector("#name-error").innerHTML = "";
  return true;
}

function validateTotalMarks() {
  const totalMarks = document.getElementById("total-marks").value;
  if (totalMarks <= 0) {
    document.getElementById("total-marks-error").innerHTML =
      "marks should be greater than zero or only digits allowed";
    return false;
  } else if (!totalMarks.match(/^\d{2,}$/)) {
    document.getElementById("total-marks-error").innerHTML =
      "marks should be 10-1000";
    return false;
  }

  document.getElementById("total-marks-error").innerHTML = "";
  return true;
}

function validateSubjects(subName) {
  if (subName.trim() == "") {
    document.getElementById("sub-error").innerHTML = "subject is Required";
    return false;
  } else {
    if (!subName.match(/^[\w\s-]+$/i)) {
      document.querySelector("#sub-error").innerHTML = "Invalid name";
      return false;
    } else if (subName.trim().length > 50) {
      document.querySelector("#sub-error").innerHTML =
        "length should be below 50 letters !";
      return false;
    }
  }
  document.querySelector("#sub-error").innerHTML = "";
  return true;
}

function createJsonForSubject(subName, totalMarks, obtainMark) {
  let subject = {
    name: subName,
    total: totalMarks,
    obtainmark: obtainMark,
  };

  subsJsonList.push(subject);
}

function createJsonForPerson(fullName, subsJsonList) {
  let person = {
    fullName: fullName,
    subjects: subsJsonList,
  };
  personJsonList.push(person);
}

function jsonCreate() {
  noOfSubjects = document.getElementById("no-subjects").value;
  name = document.getElementById("fullName").value;

  let subName;
  let obtainMark;
  let totalMarks;

  for (let i = 0; i < noOfSubjects; i++) {
    subName = document.getElementById("sub-name" + i + countTable).value;
    obtainMark = parseFloat(
      document.getElementById("obtain-marks" + i + countTable).value
    );
    totalMarks = Number(document.getElementById("total-marks").value);
    createJsonForSubject(subName, totalMarks, obtainMark);
  }

  createJsonForPerson(name, subsJsonList);
  subsJsonList = [];
  displayJson();
}

function displayJson() {
  // console.log("Subjects JSON : ", subsJsonList);
  console.log("Person JSON : ", personJsonList);
  // subsJsonList = [];
  // personJsonList = [];
  // console.log("Subjects JSON : ", subsJsonList);
  // console.log("Person JSON : ", personJsonList);
}

function resetAllData() {
  document.getElementById("form-data").reset();
  let table = document.getElementById("tableData");
  table.innerHTML = "";
}

function viewMarksheets() {
  let listOfMarksheet;
  document.getElementById("form-data").reset();
  let table = document.getElementById("tableData");
  table.innerHTML = "";

  let jsonFile = "jsonData.txt";
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4) {
      let jsonData = JSON.parse(httpRequest.responseText);
      listOfMarksheet = jsonData;
      // console.log(listOfMarksheet);
      displayJsonToTable(listOfMarksheet);
    }
  };

  httpRequest.open("GET", jsonFile, true);
  httpRequest.send();
}

function displayJsonToTable(listOfMarksheet) {
  let counter = 0;
  counter++;
  let countSubjects = 0;
  let table = document.querySelector("table");
  const tableBody = document.createElement("tbody");
  // var lastRowThirdCellTotal;

  for (let i = 0; i < listOfMarksheet.length; i++) {
    let user_name = listOfMarksheet[i].fullName;
    let subLists = listOfMarksheet[i].subjects;
    const nameHeadingRow = document.createElement("b");
    const nameHeadingData = document.createTextNode(
      `Student Name is : ${user_name}`
    );
    nameHeadingRow.appendChild(nameHeadingData);
    tableBody.appendChild(nameHeadingRow);
    const headingRow = document.createElement("tr");
    const heading1 = document.createElement("th");
    const heading2 = document.createElement("th");
    const heading3 = document.createElement("th");
    const heading4 = document.createElement("th");
    const serialNo = document.createTextNode("No.");
    const subject = document.createTextNode("Subject");
    const total = document.createTextNode("Total");
    const obtain = document.createTextNode("Obtain");
    headingRow.appendChild(heading1);
    headingRow.appendChild(heading2);
    headingRow.appendChild(heading3);
    headingRow.appendChild(heading4);

    heading1.appendChild(serialNo);
    heading2.appendChild(subject);
    heading3.appendChild(total);
    heading4.appendChild(obtain);
    tableBody.appendChild(headingRow);

    // console.log("First Name:", user_name);
    // console.log("Subjects : ", subLists);
    let totalMarks = 0;
    let totalObtainMarks = 0;

    for (let j = 0; j <= subLists.length; j++) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      const cellText1 = document.createTextNode(`${j + 1}`);
      let cell4Span = document.createElement("span");
      cell4Span.id = "mark-result" + counter;
      cell4Span.style.color = "blue";
      cell4Span.style.fontWeight = "bold";
      countSubjects = countSubjects + 1;
      let subName;
      let total;
      let obtainMark;

      let subSize = subLists.length;
      if (j < subLists.length) {
        subName = subLists[j].name;
        total = subLists[j].total;
        totalMarks += total;
        obtainMark = subLists[j].obtainmark;
        totalObtainMarks += obtainMark;
        // console.log("Subject name: ", subName);
        // console.log("Total : ", total);
        // console.log("Obtain mark :", obtainMark);

        const cellText2 = document.createTextNode(`${subName}`);
        const cellText3 = document.createTextNode(`${total}`);
        const cellText4 = document.createTextNode(`${obtainMark}`);

        cell2.appendChild(cellText2);
        cell3.appendChild(cellText3);
        cell4.appendChild(cellText4);
      } else {
        const lastRowFirstCellTotal = document.createElement("b");
        const lastRowFirstCellTotalText = document.createTextNode("Total");
        lastRowFirstCellTotal.appendChild(lastRowFirstCellTotalText);
        cell2.appendChild(lastRowFirstCellTotal);

        let lastRowSecondCellTotal = document.createElement("b");
        let totalDisplayValue = document.createTextNode(`${totalMarks}`);
        totalDisplayValue.id = "total-subjects-marks" + counter;
        let spanTagForTotalObtainsMarks = document.createTextNode(
          `${totalObtainMarks} / ${totalMarks}`
        );

        cell4Span.appendChild(spanTagForTotalObtainsMarks);
        lastRowSecondCellTotal.appendChild(totalDisplayValue);
        cell3.appendChild(lastRowSecondCellTotal);
        cell4.appendChild(cell4Span);
      }
      cell1.appendChild(cellText1);
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      tableBody.appendChild(row);
    }

    const divider = document.createElement("hr");
    divider.style.width = "100%";
    divider.style.fontWeight = "bold";
    // console.log(countSubjects);
    tableBody.appendChild(divider);
  }
  table.appendChild(tableBody);
}
