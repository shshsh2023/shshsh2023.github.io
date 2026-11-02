// 计时光效：鼠标进入卡片后，光沿卡边从左上角双向圈满，满 10 秒自动打开帖子。
(function () {
  var DURATION = 10000;
  var reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  document.querySelectorAll(".post-card").forEach(function (card) {
    var count = card.querySelector(".count");
    var num = count ? count.querySelector("b") : null;
    var timer = null;
    var tick = null;

    function start() {
      if (timer) return;
      var startAt = Date.now();
      card.classList.add("charging");
      if (num) num.textContent = "10";
      if (count) count.style.setProperty("--p", "0");

      tick = setInterval(function () {
        var elapsed = Date.now() - startAt;
        var p = Math.min(1, elapsed / DURATION);
        if (count) count.style.setProperty("--p", String(p));
        if (num) num.textContent = String(Math.max(0, Math.ceil((DURATION - elapsed) / 1000)));
      }, 80);

      timer = setTimeout(function () {
        window.location.href = card.getAttribute("href");
      }, DURATION);
    }

    function stop() {
      card.classList.remove("charging");
      if (timer) { clearTimeout(timer); timer = null; }
      if (tick) { clearInterval(tick); tick = null; }
    }

    card.addEventListener("mouseenter", start);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("click", stop);
  });
})();
