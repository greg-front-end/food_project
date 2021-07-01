function forms() {
    // AJAX work with back-end and forms
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/Spinner-3.gif',
        success: 'Thank you, we will soon call you back',
        failure: 'Somthing is going wrong...'
    };

    // using function postData for every forms on site
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                padding: 10px;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            // create form body for send meassage
            const formData = new FormData(form);

            // convert to object the formdata old method
            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            // convert to json new method
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(() => {
                // console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                statusMessage.remove();
            }).finally(() => {
                form.reset();
            });

        }); 
    }

    // This function create html element for after user send forms
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div calss="modal__title">${message}</div>
            </div>
        `;
        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose();
        }, 4000);
    }

    // fetch('db.json')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}
module.exports = forms;