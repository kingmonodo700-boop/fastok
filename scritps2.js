
document.addEventListener("DOMContentLoaded", function () {
  const feed = document.getElementById("video-feed");
  if (!feed) return;

  let dernierTap = 0;
  let derniereCarte = null;
  let dernierePosition = null;

  feed.addEventListener("pointerup", function (event) {
    if (event.target.closest("button, a, input, textarea, select")) {
      return;
    }

    const carte = event.target.closest(".video-slide");
    if (!carte) return;

    const maintenant = Date.now();
    const position = { x: event.clientX, y: event.clientY };

    const doubleTap =
      maintenant - dernierTap < 350 &&
      carte === derniereCarte &&
      dernierePosition &&
      Math.abs(position.x - dernierePosition.x) < 45 &&
      Math.abs(position.y - dernierePosition.y) < 45;

    dernierTap = maintenant;
    derniereCarte = carte;
    dernierePosition = position;

    if (!doubleTap) return;

    const boutonLike = carte.querySelector(".like-btn");
    if (boutonLike && !boutonLike.classList.contains("liked")) {
      boutonLike.click();
    }

    const coeur = document.createElement("div");
    coeur.textContent = "❤️";
    coeur.style.cssText =
      "position:absolute;left:" +
      (position.x - carte.getBoundingClientRect().left) +
      "px;top:" +
      (position.y - carte.getBoundingClientRect().top) +
      "px;transform:translate(-50%,-50%) scale(.5);" +
      "font-size:80px;pointer-events:none;z-index:9999;" +
      "transition:transform .25s ease,opacity .5s ease;opacity:1;";

    if (getComputedStyle(carte).position === "static") {
      carte.style.position = "relative";
    }

    carte.appendChild(coeur);

    requestAnimationFrame(function () {
      coeur.style.transform = "translate(-50%,-50%) scale(1.3)";
    });

    setTimeout(function () {
      coeur.style.opacity = "0";
      coeur.style.transform = "translate(-50%,-50%) scale(1.6)";
      setTimeout(function () {
        coeur.remove();
      }, 500);
    }, 250);
  });
});
