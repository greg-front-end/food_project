function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modals

    const modal = document.querySelector(modalSelector),
          modalBtn = document.querySelectorAll(triggerSelector),
          modalBtnClose = document.querySelectorAll('[data-close]');

    // let modalStyle = window.getComputedStyle(modal).diplay;
   
    modalBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalBtnClose.forEach(btn => {
        btn.addEventListener('click', () => modalClose(modalSelector));
    });

    // close modal if click out
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
             modalClose(modalSelector);
        }
    });

    // close modal if press esc on keybord
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector);
            console.log('Escape');
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            // remove the listener if scroll to end
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {modalClose};
export {openModal};