const battle = {
  initiated: false,
};

function battleAnimation() {
  const overlay = document.querySelector('.overlay--battle');
  overlay.classList.toggle('hidden');

  gsap.to('.overlay--battle', {
    opacity: 1,
    repeat: 3,
    yoyo: true,
    duration: 0.4,
    onComplete() {
      gsap.to('.overlay--battle', {
        opacity: 1,
        duration: 0.4,
        onComplete() {
          overlay.classList.toggle('hidden');
        },
      });
    },
  });
}

function startBattleSequence() {
  battle.initiated = true;
  battleAnimation();
}

export { battle, startBattleSequence };
