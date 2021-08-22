
let btnNext = document.querySelector('.btn-next');

btnNext.addEventListener('click', nextpage);

//Creates new element to take subject name and cie as the inputs

function nextpage() {

    const f = document.forms["subForm"]["subs"].value;
    if (f < 1 || f > 10 || f%1!=0) {
        alert('Number of subjects should be in the range 1-10 ');
        return;
    }
    btnNext.removeEventListener('click', nextpage)
    let cont = document.querySelector('.container-2');
    let formList = document.createElement('form');
    formList.className = 'form-list';
    cont.appendChild(formList);
    formList.innerHTML = '<p class="list-text">Enter subject name and CIE obtained</p>';
    for (let i = 0; i < f; i++) {

        formList.innerHTML += (i+1)+'. '+'<input type="text" name="Sname" class="subName" required>' + ' ' + '<input type="number" name="Mname" class="cie" id="cieId" min="25" max="50" required>' + '<br>';

    }
    let allSubClass = document.querySelectorAll('.subName');
    let allCieClass = document.querySelectorAll('.cie');
    for (let inp in allSubClass) {
        inp.required = true;
    }
    for (let inp in allCieClass) {
        inp.required = true;
    }

    let subBtn = document.createElement('input');
    subBtn.type = 'button';
    subBtn.className = 'calBtn';
    subBtn.value = 'Calculate';

    formList.appendChild(subBtn);
    subBtn.addEventListener('click', calculate);
}
let subjectNames = [], subjectCie = [];
let seeGrades = [90, 75, 66, 56, 50, 45];
let grades = ['S', 'A', 'B', 'C', 'D', 'E'];

//This section calculates the required result

function calculate() {

    const f = document.forms["subForm"]["subs"].value;
    let subnames = document.querySelectorAll('.subName');
    let cie = document.querySelectorAll('.cie')
    for (let index = 0; index < subnames.length; ++index) {
        if (cie[index].value < 25 || cie[index].value > 50) {
            alert('Minimum CIE is 25 and maximum is 50');
            return;
        }
        else if (subnames[index].value === "") {
            alert("Enter all subject names");
            return;
        }

        subjectNames[index] = subnames[index].value;

    }
    for (let index = 0; index < cie.length; ++index) {

        subjectCie[index] = cie[index].value;

    }
    subBtn = document.querySelector('.calBtn');
    subBtn.removeEventListener('click', calculate);

    /*
    subGrade[[]] : row- no. of subjects, col-list of marks
    */
    let subGrade = [[]];
    for (let i = 0; i < f; i++) {
        subGrade[i] = new Array(6);
        let sub = Math.ceil(subjectCie[i]);

        let j = 0;
        while (j < 6) {
            let result = seeGrades[j] - sub;
            let res=result*2;
            if (res > 100)
                subGrade[i][j] = '<span class="notAttainable">X</span>';
            else if (res< 40)
                subGrade[i][j] = 40;
            else {
                subGrade[i][j] = res - 1;
            }
            j += 1;
        }
    }

    let box = document.querySelector('.container-3');
    let innerBox = document.createElement('div');
    innerBox.className = 'result';
    box.appendChild(innerBox);
    for (let i = 0; i < f; i++) {
        let chart = document.createElement('div');
        chart.className = 'gradeChart';
        innerBox.appendChild(chart);

        chart.innerHTML = subjectNames[i] + '<hr>' + '<p>Grade------>Target</p>';
        for (let j = 0; j < 6; j++) {
            console.log(grades[j] + " " + subGrade[i][j]);
            chart.innerHTML += grades[j] + "-----> " + subGrade[i][j] + "<br>";
        }
    }


}









