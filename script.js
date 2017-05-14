(function() {

    var prompt = document.querySelector('.prompt');

    var animationLoop;
    var scrollingNow = false;
    var scrollStep = 3;

    function scroll() {
        if (window.scrollY) {
            window.scrollBy(0, -scrollStep);
            animationLoop = window.requestAnimationFrame(scroll);
            scrollingNow = true;
        }
    }

    function pause() {
        window.cancelAnimationFrame(animationLoop);
        scrollingNow = false;
    }

    function toggle() {
        if (scrollingNow) {
            pause();
        } else {
            scroll();
        }
    }

    function start() {
        window.scrollTo(0, document.body.clientHeight - window.innerHeight);
    }

    function resize(factor) {
        prompt.style.setProperty(
            '--size',
            parseFloat(
                prompt.style.getPropertyValue('--size')
            ) + factor
        );
    }

    document.addEventListener('keydown', function(event) {
        if (event.metaKey || event.ctrlKey) {
            switch (event.key) {
                case '-':
                    event.preventDefault();
                    resize(-1);
                break;
                case '=':
                    event.preventDefault();
                    resize(+1);
                break;
            }
        } else {
            switch (event.key) {
                case ' ':
                    event.preventDefault();
                    toggle();
                break;
                case '-':
                    if (scrollStep > 1) {
                        scrollStep--;
                    }
                break;
                case '=':
                    scrollStep++;
                break;
            }
        }
    });

    document.addEventListener('click', toggle);
    document.addEventListener('touchstart', toggle);

}());
