document.getElementById("ping")?.addEventListener("click", async () => {
  const output = document.getElementById("out");
  if (!output) {
    return;
  }

  output.textContent = "Loading /health...";

  try {
    const response = await fetch("/health");
    const payload = await response.json();
    output.textContent = JSON.stringify(payload, null, 2);
  } catch (error) {
    output.textContent = `Request failed: ${error instanceof Error ? error.message : String(error)}`;
  }
});