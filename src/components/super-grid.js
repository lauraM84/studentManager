import StudentCard from "./student-card.js";
import StudentService from "../services/student-service.js";

export default class SuperGrid extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {

        this.studentServ = new StudentService();
        this.students = await this.studentServ.loadStudents();

        const sDialog = document.getElementById('student-dialog');
        sDialog.addEventListener('student-added', (event) => {
            const newStudent = event.detail;
            this.students = this.studentServ.addStudent(newStudent);
            this.render();
        });

        sDialog.addEventListener('student-edited', (event) => {
            const newStudent = event.detail.student;
            const index = event.detail.index;
            this.students = this.studentServ.editStudent(newStudent, index);
            this.render()
        });

        this.style()
        this.render()
    }


    style() {
        const style = document.createElement('style');
        style.innerText = `
            .grid{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
        `
        this.shadowRoot.appendChild(style);
    }

    render() {


        if (!this.container) {
            this.container = document.createElement('div');
            this.shadowRoot.appendChild(this.container);
        } else {
            this.container.innerHTML = '';
        }


        const controlsDiv = document.createElement('div');

        const btn = document.createElement('button');
        btn.appendChild(document.createTextNode('add'));
        btn.addEventListener('click', () => {
            const sDialog = document.getElementById('student-dialog');
            sDialog.addStudent()
        })

        controlsDiv.appendChild(btn);

        this.container.appendChild(controlsDiv);

        const main = document.createElement('div');
        main.classList.add('grid')

        for (let i = 0; i < this.students.length; i++) {
            const student = this.students[i];
            const card = document.createElement('student-card');
            card.setAttribute('selected-student', JSON.stringify(student));
            card.setAttribute('selected-index', i);
            main.appendChild(card)
        }

        this.container.appendChild(main)


    }



}


customElements.define('super-grid', SuperGrid)