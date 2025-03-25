export default class SuperDialog extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.style();
        this.render()
    }

    style() {
        // const style = document.createElement('style');
        // style.innerText = `
        //     .card{
        //         border-radius: 8px;
        //         border: solid 1px #313131;
        //         padding: 8px;
        //         display: flex;
        //         flex-direction: column;
        //         align-items: center;
        //     }
        // `
        // this.shadow.appendChild(style);
    }

    render() {

        this.dialog = document.createElement('dialog');
        this.dialog.setAttribute('id', 'dialog');

        this.dialog.innerHTML = `
        <form id="form">
            <label for="name">Nome:</label>
            <input type="text" name="name" id="name">
            <label for="yob">Anno di nascita:</label>
            <input type="number" name="yob" id="yob">
        </form>
        `
        const cancelBtn = document.createElement('button');
        cancelBtn.appendChild(document.createTextNode('cancella'));
        cancelBtn.addEventListener('click', () => this.dialog.close());
        this.dialog.appendChild(cancelBtn)

        const okBtn = document.createElement('button');
        okBtn.appendChild(document.createTextNode('ok'));
        okBtn.addEventListener('click', () => this.dispatchStudent());
        this.dialog.appendChild(okBtn)

        this.shadow.appendChild(this.dialog);
    }

    dispatchStudent() {
        const form = this.shadow.getElementById('form');
        const data = new FormData(form);
        const student = {
            name: data.get('name'),
            yob: parseInt(data.get('yob'))
        }

        if (this.isEdit) {
            const event = new CustomEvent('student-edited', { detail: { index: this.index, student: student } })
            this.dispatchEvent(event);
        } else {
            const event = new CustomEvent('student-added', { detail: student })
            this.dispatchEvent(event);
        }

        this.dialog.close();
    }

    setupForm(student) {
        const form = this.shadow.getElementById('form');
        form.reset();
        if (student) {
            const nameInput = this.shadow.getElementById('name');
            nameInput.value = student.name;
            const yobInput = this.shadow.getElementById('yob');
            yobInput.value = student.yob;
        }
    }

    editStudent(student, index) {
        this.isEdit = true;
        this.index = index;
        this.setupForm(student)
        this.dialog.showModal()
    }

    addStudent() {
        this.isEdit = false;
        this.setupForm()
        this.dialog.showModal()
    }


}

customElements.define('super-dialog', SuperDialog)