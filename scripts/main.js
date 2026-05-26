const MOD_ID = "token-speed-multiplier";
const SETTING = "multiplier";

Hooks.once("init", () => {
  game.settings.register(MOD_ID, SETTING, {
    name: "Token Animation Speed Multiplier",
    hint: "Scales how fast tokens visually slide across the canvas when moved. 1 = default, 2 = double speed, 0.5 = half. Purely visual — does not affect movement distance, character sheets, or any game system data.",
    scope: "world",
    config: true,
    type: Number,
    default: 1,
    range: { min: 0.1, max: 10, step: 0.1 },
  });

  const proto = CONFIG?.Token?.objectClass?.prototype;
  if (!proto || typeof proto._getAnimationMovementSpeed !== "function") {
    console.warn(
      `${MOD_ID} | CONFIG.Token.objectClass.prototype._getAnimationMovementSpeed not available — animation scaling disabled. (Foundry version too old or API renamed.)`
    );
    return;
  }

  const original = proto._getAnimationMovementSpeed;
  proto._getAnimationMovementSpeed = function (...args) {
    const speed = original.apply(this, args);
    const mult = game.settings.get(MOD_ID, SETTING) ?? 1;
    if (mult === 1 || typeof speed !== "number") return speed;
    return speed * mult;
  };
});
