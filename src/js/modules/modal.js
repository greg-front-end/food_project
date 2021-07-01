function modal() {
    // Modals

    const modal = document.querySelector('.modal'),
          modalBtn = document.querySelectorAll('[data-modal]'),
          modalBtnClose = document.querySelectorAll('[data-close]');

    // let modalStyle = window.getComputedStyle(modal).diplay;
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearTimeout(modalTimerId);
    }

    modalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    function modalClose() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalBtnClose.forEach(btn => {
        btn.addEventListener('click', modalClose);
    });

    // close modal if click out
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
             modalClose();
        }
    });

    // close modal if press esc on keybord
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose();
            console.log('Escape');
        }
    });

    // todo timer for open modal in four sec
    // const modalTimerId = setTimeout(openModal, 4000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            // openModal();
            // remove the listener if scroll to end
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;