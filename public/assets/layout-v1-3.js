/* Layout only. Does not access blockchain or modify tracker computations. */
(() => {
  'use strict';
  const area = document.getElementById('fit-area');
  const stage = document.getElementById('fit-stage');
  if (!area || !stage) return;
  let raf = 0;
  function fit() {
    stage.style.setProperty('--fit-scale', '1');
    const availableHeight = Math.max(1, area.clientHeight - 8);
    const availableWidth = Math.max(1, area.clientWidth - 8);
    const fullHeight = Math.max(1, stage.offsetHeight);
    const fullWidth = Math.max(1, stage.offsetWidth);
    const scale = Math.min(1, availableHeight / fullHeight, availableWidth / fullWidth);
    stage.style.setProperty('--fit-scale', String(Math.max(0.15,scale)));
  }
  function schedule() { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); }
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  if (window.visualViewport) window.visualViewport.addEventListener('resize',schedule,{passive:true});
  if (window.ResizeObserver) {
    const ro=new ResizeObserver(schedule);ro.observe(area);ro.observe(stage);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  schedule();
})();
