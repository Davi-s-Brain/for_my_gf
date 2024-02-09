function smoothScrollToBottom() {
  const startY = window.pageYOffset;
  const stopY = document.body.scrollHeight - window.innerHeight;
  const distance = stopY > startY ? stopY - startY : startY - stopY;
  const duration = 20000;

  let start_time = null;
  window.requestAnimationFrame(function step(currentTime) {
    if (!start_time) start_time = currentTime;
    const progress = currentTime - start_time;
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const val = easeInOutCubic(Math.min(progress / duration, 1));
    window.scrollTo(0, startY + distance * val);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

window.onload = function () {
  let minhaMusica = document.getElementById("minhaMusica");
  minhaMusica.play();
  setTimeout(smoothScrollToBottom, 3000);
};

anime
  .timeline({ loop: false })
  .add({
    targets: "img.overlay-text",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 7500,
    delay: (el, i) => 70 * i,
  })
  .add({
    targets: "img.overlay-text",
    translateY: -60,
    duration: 500,
    easing: "easeOutExpo",
    delay: -200,
  })
  .timeline({ loop: true })
  .add({
    translateZ: 0,
    delay: 100,
    easing: "easeOutExpo",
    delay: (el, i) => 70 * i,
  });

const path = anime.path("#path");

const timeline = anime.timeline({
  easing: "easeInOutExpo",
  duration: 1000,
  complete: () => {
    anime({
      targets: ".leaf",
      rotate: 40,
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutQuad",
    });
    anime({
      targets: ".petals",
      scale: 1.05,
      duration: 6000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutQuad",
    });
  },
});

anime({
  targets: "#bee",
  translateX: path("x"),
  translateY: path("y"),
  rotate: path("angle"),
  loop: true,
  duration: 12500,
  easing: "linear",
});

timeline.add({
  targets: ".stem",
  scale: [0, 1],
});

timeline.add({
  targets: ".leaf",
  rotate: [0, 45],
});
timeline.add(
  {
    targets: ".petals",
    scale: [0, 1],
  },
  "-=1000"
);

timeline.add(
  {
    targets: "#bee",
    opacity: [0, 1],
  },
  "-=750"
);

document.querySelector(".restart").onclick = animation.restart;
