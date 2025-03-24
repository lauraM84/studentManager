export default class StudentService {

    constructor() {}

    async loadStudents() {
        this.students = JSON.parse(localStorage.getItem('students'));


        console.log('load')
        if(!this.students){
            console.log('load from json')
            this.students = await this.getStudentsFromJson()
            this.saveStudents(this.students);
        }
    }


    getStudentsFromJson(){
        return fetch('/assets/students.json')
              .then(resp => resp.json())
    }

    saveStudents(){
        localStorage.setItem('students', JSON.stringify(this.students));
    }


}