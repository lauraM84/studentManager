class StudentCard extends HTMLElement{

    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    // set student(value){
    //     this._student = value;
    // }

    get student(){
        const studentStr = this.getAttribute('selected-student');
        if (studentStr) {
            return JSON.parse(studentStr);
        }
        return {name: 'giovanni', yob: 1981}
    }

    connectedCallback(){
        this.style();
        this.render()
    }

    style(){
        const style = document.createElement('style');
        style.innerText = `
            .card{
                border-radius: 8px;
                border: solid 1px #313131;
                padding: 0px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `
        this.shadow.appendChild(style);
    }

    render(){
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('card');
        mainDiv.innerHTML = `
            <div>
                <strong>Nome: </strong><span>${this.student.name}</span>
            </div>
            <div>
                <strong>Età: </strong><span>${this.student.yob}</span>
            </div>
        `
        this.shadow.appendChild(mainDiv);
    }



}

customElements.define('student-card', StudentCard)