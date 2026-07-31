const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toLocaleString("en-PH", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.modal)?.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => btn.closest("dialog").close());
});

if (document.getElementById("outFirstName")) {
  const params = new URLSearchParams(window.location.search);
  const fieldMap = {
    outFirstName: "firstName",
    outLastName: "lastName",
    outEmail: "email",
    outMobilePhone: "mobilePhone",
    outOrgName: "orgName",
    outTimestamp: "timestamp",
  };
  Object.entries(fieldMap).forEach(([id, param]) => {
    document.getElementById(id).textContent = params.get(param) || "Not provided";
  });
}

const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById("lastModified");
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;