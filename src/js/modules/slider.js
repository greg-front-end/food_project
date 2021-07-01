function slider() {
    // Slider
    const sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer__slider-inner'),
          widthWrapper = window.getComputedStyle(sliderWrapper).width,
          slidesTotal = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          totalSlides = document.querySelector('#total'),
          currentSlide = document.querySelector('#current'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next');

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    // Assign total value in numeric of total slides
    totalSlides.innerHTML = getZero(slidesTotal.length);

    
    let sliderIndex = 1;

    // Assign current value in numeric of current slide
    currentSlide.textContent = getZero(sliderIndex);
    let offset = 0;
    /* 
        todo
        1) Need receive total widh for inner slides
        2) Assign style flex and transition for inner
        3) We need hidden all element which go beyond wrapper
        4) Assign widh for every element on inner
        5) Assign listener for btns
        7) Check cundition for offset
        6) Assign transform fro inner
        8) Check cudition sliderIndex
        9) Assign number for current slider number
    */

    function setPropertiesStyle(inner, wrapper, arr, width) {
        inner.style.width = 100 * arr.length + '%';
        inner.style.display = 'flex';
        inner.style.transition = '0.5s all';
        wrapper.style.overflow = 'hidden';
        arr.forEach(item => {
            item.style.width = width;
        });
        wrapper.style.width = width;
    }

    // dot for slider
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    function dotOpacity(arr) {
        arr.forEach(item => item.style.opacity = '.5');
        arr[sliderIndex - 1].style.opacity = 1;
    }

    for (let i = 0; i < slidesTotal.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i === 0) {
            dot.style.opacity = 1;
        }
        console.log(dot);
        indicators.append(dot);
        dots.push(dot);
    }
    

    nextBtn.addEventListener('click', function() {
        if (offset === +widthWrapper.slice(0, widthWrapper.length - 2) * (slidesTotal.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(widthWrapper);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex === slidesTotal.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        dotOpacity(dots);

        currentSlide.textContent = getZero(sliderIndex);
    });

    prevBtn.addEventListener('click', () => {

        if (offset === 0) {
            offset = parseInt(widthWrapper) * (slidesTotal.length - 1);
        } else {
            offset -= parseInt(widthWrapper);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        
        if (sliderIndex === 1) {
            sliderIndex = slidesTotal.length;
        } else {
            sliderIndex--;
        }

        dotOpacity(dots);

        currentSlide.textContent = getZero(sliderIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            
            offset = parseInt(widthWrapper) * (slideTo - 1);
            console.log(offset)
            sliderInner.style.transform = `translateX(-${offset}px)`;

            dotOpacity(dots);
    
            currentSlide.textContent = getZero(sliderIndex);
        });
    });
    console.log(dots);

    setPropertiesStyle(sliderInner, sliderWrapper, slidesTotal, widthWrapper);

    ///////////////////////////

    //* easy method
    /* 
        todo 
        1) create function for cunditon index and hidden slides and set value current sliden in html current slide
        2) create function for increment index on function
        3) Add listener for btns

    */
}

module.exports = slider;