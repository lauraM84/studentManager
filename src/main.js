import StudentService from "./student-service.js";



function render(students){

    const main = document.getElementById('main-div')
    main.innerHTML = '';

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const div = document.createElement('div');
        div.innerHTML = `<h3>${student.name}</h3>
                        <span>${student.yob}</span>`

        const button = document.createElement('button');
        button.appendChild(document.createTextNode('edit'))
        button.addEventListener('click', () => editStudent(i))


        div.appendChild(button)

        main.appendChild(div);



    }

    

    // document.getElementById('main-div').append(...students.map(s => {
    //     const div = document.createElement('div');
    //     div.innerHTML = `<h3>${s.name}</h3>
    //                     <span>${s.yob}</span>`

    //     return div;
    // }))


    // document.getElementById('main-div').innerHTML = students.map(s => {
    //     return `<div>
    //                 <h3>${s.name}</h3>
    //                 <span>${s.yob}</span>
    //             </div>`
    // }).join('')
}

function clearElement(element){
    const new_element = element.cloneNode(true);
    element.parentNode.replaceChild(new_element, element);
    return new_element;
}

function saveStudent(index, student) {
    debugger;
    if (index > -1) {
        service.students[index] = student;
    } else {
        service.students.push(student)
    }
    service.saveStudents();
    render(service.students)
}

function editStudent(index){
    debugger;
    const selectedStudent = service.students[index];

    if (selectedStudent){
        document.getElementById('name').value = selectedStudent.name;
        document.getElementById('yob').value = selectedStudent.yob;
    }

    const dialog = document.getElementById('dialog');
    let cancelBtn = document.getElementById('cancel-btn');
    cancelBtn = clearElement(cancelBtn)
    cancelBtn.addEventListener('click',() => {
        const form = document.getElementById('form');
        form.reset()
        dialog.close()
    })

    let okBtn = document.getElementById('ok-btn');
    okBtn = clearElement(okBtn)
    okBtn.addEventListener('click',() => {
        const form = document.getElementById('form');
        const data = new FormData(form);
        const newStudent = {
            name: data.get('name'),
            yob: Number(data.get('yob'))
        }
        saveStudent(index, newStudent);
        form.reset()
        dialog.close();
    })

    dialog.showModal();
}




const service = new StudentService();
await service.loadStudents()

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => editStudent(-1))





render(service.students)