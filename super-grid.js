class SuperGrid extends HTMLElement {

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        console.log("pippo")
        this.style();
        this.render();
    }

    style() {
        const style = document.createElement('style');

        const gridMin = this.getAttribute('super-gridmin');
        const gridMax = this.getAttribute('super-gridmax');

        style.innerText = `
            .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fit , minmax(${gridMin}, ${gridMax}));
                gap: 3rem;
            }
        `

        this.shadow.appendChild(style);
    }

    async render() {
        const container = document.createElement('div');
        container.classList.add('grid-container');
        const service = new StudentService();
        await service.loadStudents()

        console.log("students", service.students);

        for (const student of service.students) {

            const card = document.createElement('student-card');
            card.setAttribute('selected-student', JSON.stringify(student));
            // card.student = student;

            container.appendChild(card)
        }

        this.shadow.appendChild(container);
    }

}

customElements.define('super-grid', SuperGrid);