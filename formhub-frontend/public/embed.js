(function () {
  const scriptTag = document.currentScript;
  const formId = scriptTag.getAttribute("data-form-id");
  if (!formId) {
    console.error("FormHub Embed: Missing 'data-form-id' attribute");
    return;
  }

  const API_BASE = "http://localhost:4000/api/forms"; // Replace with your backend URL

  const iframe = document.createElement("iframe");
  iframe.src = `${API_BASE}/embed/${formId}`;
  iframe.width = "100%";
  iframe.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "8px";
  iframe.setAttribute("allowfullscreen", true);

  scriptTag.parentNode.insertBefore(iframe, scriptTag.nextSibling);

  // Listen to messages from iframe (auto resize & submission)
  window.addEventListener("message", (event) => {
    if (event.data?.type === "formhub-resize") {
      iframe.style.height = event.data.height + "px";
    } else if (event.data?.type === "formhub-submitted") {
      console.log("Form submitted successfully!", event.data);
    }
  });
})();
