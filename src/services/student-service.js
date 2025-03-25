export default class StudentService {

    constructor() { }

    async loadStudents() {
        this.students = JSON.parse(localStorage.getItem('students'));

        if (!this.students) {
            this.students = await this.getStudentsFromJson()
            this.saveStudents(this.students);
        }

        return this.students;
    }


    getStudentsFromJson() {
        return fetch('/assets/students.json')
            .then(resp => resp.json())
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
        return this.students;
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudents()
        return this.students;
    }

    editStudent(student, index) {
        this.students[index] = student;
        this.saveStudents()
        return this.students;
    }


}