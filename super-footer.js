class SuperFooter extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get info() {
        return this.getAttribute('super-info') || 'hai dimenticato le info!!';
    }

    get backgroundColor() {
        return this.getAttribute('b-color') || 'lightpink'
    }

    connectedCallback() {
        console.log('coonected')
        this.style();
        this.render()
    }

    style() {
        const style = document.createElement('style');
        style.innerText = `
            .footer-info{
                background-color: ${this.backgroundColor};
                color: grey;
            }
        `
        this.shadow.appendChild(style);
    }

    render() {
        const mainDiv = document.createElement('div');
        mainDiv.innerHTML = `
            <p class="footer-info">${this.info}</p>
        `
        this.shadow.appendChild(mainDiv);
    }



}

customElements.define('super-footer', SuperFooter)