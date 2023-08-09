import "./style.css";

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
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

  const { image }: { image: string } = await response.json();

  const result = document.querySelector("#result") as HTMLElement;
  result.innerHTML = `<img src="${image}" width="512" />`;
});
