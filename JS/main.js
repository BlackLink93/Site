window.onload = function () {

    const menuLinks = document.querySelectorAll('header nav a');

    menuLinks.forEach(link => {

        link.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            const headerHeight =
                document.querySelector('header').offsetHeight;

            const targetPosition =
                target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

        });

    });

}