document.addEventListener("DOMContentLoaded", function () {
    // Función para agregar o quitar la clase "sticky" en el navbar al hacer scroll
    window.addEventListener("scroll", function () {
        var navbar = document.querySelector('.navbar');
        var scrollUpBtn = document.querySelector('.scroll-up-btn');

        // Verificar si los elementos existen antes de acceder a sus propiedades
        if (navbar && scrollUpBtn) {
            if (window.scrollY > 20) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }

            if (window.scrollY > 500) {
                scrollUpBtn.classList.add("show");
            } else {
                scrollUpBtn.classList.remove("show");
            }
        }
    });

    // Función para animar el scroll hacia arriba
    var scrollUpBtn = document.querySelector('.scroll-up-btn');
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.style.scrollBehavior = "auto";
        });
    }

    // Restaurar el comportamiento de desplazamiento suave al hacer clic en elementos del menú
    var menuLinks = document.querySelectorAll('.navbar .menu li a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            document.documentElement.style.scrollBehavior = "smooth";
        });
    });

    // Función para alternar la clase "active" en el menú/navbar
    var menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            var navbarMenu = document.querySelector('.navbar .menu');
            var menuIcon = document.querySelector('.menu-btn i');

            // Verificar si los elementos existen antes de acceder a sus propiedades
            if (navbarMenu && menuIcon) {
                navbarMenu.classList.toggle("active");
                menuIcon.classList.toggle("active");
            }
        });
    }


    let totalCards = 0;

    // API
    async function fetchData() {
        try {
            const response = await fetch("https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects");

            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }

            const data = await response.json();
            handleApiResponse(data);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    }

    function handleApiResponse(response = []) {
        let carouselHTML = "";
        response?.forEach((itm) => {
            carouselHTML += `
            <div class="card">
                <div class="box">
                    <img src="${itm?.image}" alt="img">
                    <div class="text">${itm?.title}</div>
                    <p>${itm?.description}</p>
                    <p class="project">${itm?.technologies}</p>
                </div>
            </div>
            `;
        });

        carouselHTML += `
            <button class="nav-btn" id="prev-btn">❮</button>
            <button class="nav-btn" id="next-btn">❯</button>
        `;

        totalCards = response?.length;
        document.getElementById("content-carousel").innerHTML = carouselHTML;
    }

    (async () => {
        await fetchData();
    })();


    // Carrusel
    let currentIndex = 0;
    const cards = document.querySelectorAll('#content-carousel .card');
    function showSlide(index) {
        const newTransformValue = -100 * index + '%';
        console.log(index);
        cards[index].style.transform = 'translateX(' + newTransformValue + ')';
    }

    function nextSlide() {
        if (currentIndex == (totalCards - 1)) currentIndex = 0;
        else currentIndex++;
        showSlide(currentIndex);
    }

    function prevSlide() {
        if (currentIndex == 0) currentIndex = (totalCards - 1);
        else currentIndex--;
        showSlide(currentIndex);
    }

    document.querySelector("#content-carousel #prev-btn").addEventListener("click", prevSlide);
    document.querySelector("#content-carousel #next-btn").addEventListener("click", nextSlide);

    // Desplazamiento automático cada 2 segundos
    // setInterval(nextSlide, 2000);

});


