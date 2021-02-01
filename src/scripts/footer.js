import ElementsCreator from './utils/elementsCreator.js';
import rs_logo from '../assets/ico/rs_logo.svg';
import footer_styles from '../styles/footer.css';
import {HTML_BODY} from './constants/htmlElements.js'

export function addFooterElements() {
    const githubLinks = ["https://github.com/MariyaSin", "https://github.com/YuPodd", "https://github.com/VZaleski", "https://github.com/dariadrozdova"];
    const names = ["Mariya Sinitsyna", "Yuliya Paddubnik", "Vladimir Zaleski", "Daria Drozdova"];

    const footerTag = ElementsCreator.createElement('footer', 'footer navbar fixed-bottom bg-light', HTML_BODY);
    const githubContainer = ElementsCreator.createElement('div', 'github-container', footerTag);
    const rsLink = ElementsCreator.createElement('a', 'rs-link', footerTag);
    rsLink.setAttribute("href", "https://rs.school/");
    rsLink.setAttribute("target", "_blank");
    const rsImg = ElementsCreator.createElement('img', 'rs-image', rsLink);
    rsImg.setAttribute("src", rs_logo);

    for (let i = 0; i < githubLinks.length; i++) {
        let a = document.createElement("a");
        a.className = "github-link";
        a.setAttribute("href", githubLinks[i]);
        a.textContent = names[i];
        githubContainer.appendChild(a);
    };
}
addFooterElements();