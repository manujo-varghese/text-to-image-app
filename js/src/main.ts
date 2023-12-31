import "./style.css";

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);
  const response = await fetch("http://localhost:8081/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });
  if (response.ok){
    const { image }: { image: string } = await response.json();

    const result = document.querySelector("#result") as HTMLElement;
    result.innerHTML = `<img src="${image}" width="512" />`;
  }
  else{
    const err = await response.text();
    alert(err);
    console.error(err);
  }

  hideSpinner();
});
function showSpinner(): void {
  const button = document.querySelector('button') as HTMLButtonElement | null;
  if (button) {
    button.disabled = true;
    button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
  }
}

function hideSpinner(): void {
  const button = document.querySelector('button') as HTMLButtonElement | null;
  if (button) {
    button.disabled = false;
    button.innerHTML = 'Dream';
  }
}
