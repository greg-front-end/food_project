import {getResource} from '../services/services';

function cards() {
    // clases for cards 
    class MenuCards {
        constructor(src, alt, title, descr, price, parentElement, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 75;
            this.valute = '$';
            this.parent = document.querySelector(parentElement);
            this.classes = classes;
            this.changeToRu();
        }
        
        changeToRu() {
            if (isFinite(this.price) && !isNaN(this.price)) { 
                this.price = this.price * this.transfer;
                this.valute = ' руб';
            }
        }
        
        render() {
            const elem = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                elem.classList.add(this.element);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }
            
            elem.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span>${this.valute}/день</div>
            </div>`;
            this.parent.append(elem);
        }
        
    }
    function checkURL(url) {

        if (url === 'http://localhost:3000/menu') {
            getResource('http://localhost:3000/menu')
            .then(data => {
                    data.forEach(({img, altimg, title, descr, price}) => {
                        new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
                    });
                });
        } else {
            new MenuCards("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 19, '.menu .container').render();

            new MenuCards("img/tabs/post.jpg", "vegy", 'Меню "Постное"', "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 39, '.menu .container').render();

            new MenuCards("img/tabs/elite.jpg","elite", "Меню 'Премиум'", "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 49, '.menu .container').render();
        }
    }

    checkURL('http://localhost:3000/menu'); // ADD 1 FOR LOAD DB FROM JS FILE

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
}
export default cards;