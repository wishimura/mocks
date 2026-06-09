// Web商店街 - 建物デザイン選択（街と同じAIアートのテンプレ切替プレビュー）
(function () {
  const preview = document.getElementById("bldPreview");
  if (!preview) return;
  document.querySelectorAll("[data-img]").forEach((opt) => {
    opt.addEventListener("click", () => {
      const name = opt.getAttribute("data-img");
      if (name) preview.src = "../assets/buildings/" + name + ".png";
    });
  });
})();
