
export default class SuperFooter extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get info() {
        return this.getAttribute('super-info') || 'hai dimenticato le info!!';
    }

    // get backgroundColor(){
    //     return this.getAttribute('b-color') || 'crimson';
    // }

    connectedCallback() {
        this.style();
        this.render()
    }

    style() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '/src/components/super-footer/super-footer.css';
        this.shadow.appendChild(cssLink)
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
