function locomotiveAnimation() {
    // 1. Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    // 2. Link Locomotive with ScrollTrigger
    scroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // 3. Constantly update Locomotive with requestAnimationFrame
    function raf() {
        scroll.update();
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 4. Refresh ScrollTrigger and Locomotive on load
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();


}


function cursorAnimation() {
    // cursor follow code
    const video = document.querySelector(".page1 video");
    const cursor = document.querySelector(".cursor");
    window.addEventListener("mousemove", (dets) => {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        })
    })

    // Cursor on video code
    video.addEventListener("mouseover", function () {
        cursor.innerHTML = "Sound on";
        // cursor.style.width="fit-content"
        gsap.to(cursor, {
            width: "fit-content",
            padding: "0px 10px",
            borderRadius: "10px",
        })
    })

    video.addEventListener("mouseleave", function () {
        cursor.innerHTML = "";
        // cursor.style.width="20px"
        gsap.to(cursor, {
            width: "20px",
            borderRadius: "50%",
        })
    })

    // Sound on code
    video.addEventListener("click", () => {
        if (video.muted) {
            cursor.innerHTML = "Sound off";
            video.muted = false;
        }
        else {
            cursor.innerHTML = "Sound on";
            video.muted = true;
        }

    })


    // Cursor on image and video on page2
    const image = document.querySelector(".page3 .page3-part1 img");
    const video2 = document.querySelector(".page3 .page3-part1 video");


    function handleMouseOver(element, blur = false) {
        if (blur) element.style.filter = "blur(2px)";
        cursor.innerHTML = "view";
        gsap.to(cursor, {
            width: "fit-content",
            padding: "0px 10px",
            borderRadius: "10px",
        });
    }

    function handleMouseLeave(element, blur = false) {
        if (blur) element.style.filter = "blur(0)";
        cursor.innerHTML = "";
        gsap.to(cursor, {
            width: "20px",
            padding: "0px", // reset padding
            borderRadius: "50%",
        });
    }

    image.addEventListener("mouseover", () => handleMouseOver(image, true));
    image.addEventListener("mouseleave", () => handleMouseLeave(image, true));

    video2.addEventListener("mouseover", () => handleMouseOver(video2));
    video2.addEventListener("mouseleave", () => handleMouseLeave(video2));

}


function page1Animation() {
    // heading+video animation code
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            scroller: ".main",
            start: "top 20%",
            end: "top -50%",
            scrub: 2
        }
    });

    gsap.from(".page1 h1 span", {
        rotate: 10,
        duration: 0.8,
    })
    gsap.from(".page1 h2 span", {
        rotate: 10,
        duration: 0.8,
    })

    t1.to(".page1 h1", {
        x: -100
    }, "page1")
    t1.to(".page1 h2", {
        x: 100
    }, "page1")
    t1.to(".page1 video", {
        width: "90%"
    }, "page1")

}

function page2Animation() {
    // Background color changer code Part 1
    var t2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 20%",
            end: "top 0",
            scrub: 2
        }
    });

    t2.to(".main", {
        backgroundColor: "white"
    })

    t2.from(".page2 .page2-right", {
        y: 100,
        opacity: 0,
        duration: 2
    })
}

function page3Animation() {
    // Image slide in code
    var t3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page3 img",
            scroller: ".main",
            start: "top 50%",
            end: "top 0",
            scrub: 2
        }
    });

    t3.to(".page3-part1 img", {
        x: 100
    }, "slideIn")
    t3.to(".page3-part1 video", {
        x: -100
    }, "slideIn")
}

function page4Animation() {
    // Background color changer code Part 2
    var t4 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page4",
            scroller: ".main",
            start: "top 60%",
            end: "top 50%",
            scrub: 2
        }
    });

    t4.to(".main", {
        backgroundColor: "#111",
    }, "color")
    t4.to(".page3", {
        borderBottomColor: "#dadada"
    }, "color")
}

function page5Animation() {
    // Image pop out and in code
    const boxes = document.querySelectorAll(".page5 .box");
    boxes.forEach(box => {
        const img = box.getAttribute("data-image");
        box.addEventListener("mouseenter", () => {
            document.querySelector(".cursor").style.backgroundImage = `url(${img})`;
            gsap.to(".cursor", {
                height: "300px",
                width: "370px",
                borderRadius: "10px",
                zIndex: 100,
                mixBlendMode: "normal"
            })
        })

        box.addEventListener("mouseleave", () => {
            document.querySelector(".cursor").style.backgroundImage = "none"
            gsap.to(".cursor", {
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                mixBlendMode: "difference"
            })
        })
    });
}

function footerAnimation() {
    const cursor = document.querySelector(".cursor");
    const circle = document.querySelector("footer .circle");

    circle.addEventListener("mousemove", (e) => {
        cursor.style.display = "none";
        const rect = circle.getBoundingClientRect();
        const circleX = rect.left + rect.width / 2;
        const circleY = rect.top + rect.height / 2;

        const deltaX = e.clientX - circleX;
        const deltaY = e.clientY - circleY;

        gsap.to(circle, {
            x: deltaX * 0.4, // Adjust strength of attraction
            y: deltaY * 0.4,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    circle.addEventListener("mouseleave", () => {
        cursor.style.display = "initial";
        gsap.to(circle, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });
    });
}

function marqueAnimation() {
    const nav = document.querySelectorAll("#nav #nav-part2 h4");
    const purple = document.querySelector("#purple");
    const marque = document.querySelector("#purple .marquee");
    nav.forEach(nav => {
        let text = ''
        if (nav.innerHTML !== 'Home') {
            nav.addEventListener("mouseover", () => {
                for (let i = 0; i <= 20; i++) {
                    text += `<span>${nav.innerHTML}</span>`;
                }
                purple.style.opacity = 1;
                purple.style.display = "flex";
                marque.innerHTML = text;
            })
        }
        nav.addEventListener("mouseleave", () => {
            purple.style.opacity = 0;
            purple.style.display = "none";
            text = ''
            marque.innerHTML = '';
        })

    })
}


locomotiveAnimation();
cursorAnimation();
page1Animation();
page2Animation();
page3Animation();
page4Animation();
page5Animation();
footerAnimation();
marqueAnimation();


