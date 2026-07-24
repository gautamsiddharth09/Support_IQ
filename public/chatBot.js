(function () {
  const api_url = "https://support-iq-five.vercel.app/api/chat";
  const scriptTag = document.currentScript;
  const ownerId = scriptTag.getAttribute("data-owner-id");

  if (!ownerId) {
    console.log("owner id not found");
    return;
  }

  // 1. Create Toggle Button
  const button = document.createElement("div");
  button.innerHTML = "🗪";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#111827,#000)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: "0 12px 30px rgba(0,0,0,.25)",
    transition: "all .25s ease",
    zIndex: "999999",
  });
  document.body.appendChild(button);

  // 2. Create Chat Box
  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "fixed",
    bottom: "96px",
    right: "24px",
    width: "360px",
    height: "560px",
    background: "#ffffff",
    display: "none",
    flexDirection: "column",
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 25px 50px rgba(0,0,0,.18),0 8px 18px rgba(0,0,0,.08)",
    zIndex: "999999",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  });

  box.innerHTML = `
<div
style="
background:linear-gradient(135deg,#111827,#000000) !important;
color:#ffffff !important;
padding:16px;
display:flex;
align-items:center;
justify-content:space-between;
border-bottom:1px solid rgba(255,255,255,.08);
box-sizing:border-box;
flex-shrink:0;
">

<div style="display:flex;flex-direction:column;background:transparent !important;">

<div
style="
margin:0;
padding:0;
background:transparent !important;
color:#ffffff !important;
font-size:16px;
font-weight:700;
font-family:Inter,system-ui,sans-serif;
line-height:1.2;
">
Customer Support
</div>

</div>

<button
id="chat-close"
type="button"
style="
appearance:none;
-webkit-appearance:none;
border:none;
outline:none;
background:rgba(255,255,255,.14) !important;
color:#ffffff !important;
width:34px;
height:34px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
font-size:18px;
font-weight:600;
padding:0;
margin:0;
flex-shrink:0;
transition:.2s ease;
">
✕
</button>

</div>

<div
id="chat-messages"
style="
flex:1;
padding:16px;
overflow-y:auto;
display:flex;
flex-direction:column;
gap:10px;
background:#f8fafc !important;
box-sizing:border-box;
scroll-behavior:smooth;
">
</div>

<div
style="
padding:14px;
display:flex;
align-items:center;
gap:10px;
background:#ffffff !important;
border-top:1px solid #e5e7eb;
box-sizing:border-box;
">

<input
id="chat-input"
type="text"
placeholder="Type your message..."
style="
flex:1;
height:46px;
padding:0 16px;
border:1px solid #d1d5db;
border-radius:12px;
outline:none;
background:#ffffff !important;
color:#111827 !important;
font-size:14px;
font-family:Inter,system-ui,sans-serif;
box-sizing:border-box;
"/>

<button
id="chat-send"
type="button"
style="
height:46px;
padding:0 20px;
border:none;
border-radius:12px;
background:linear-gradient(135deg,#111827,#000000) !important;
color:#ffffff !important;
font-size:14px;
font-weight:600;
font-family:Inter,system-ui,sans-serif;
cursor:pointer;
white-space:nowrap;
box-shadow:0 8px 18px rgba(0,0,0,.18);
transition:.2s ease;
">
Send
</button>

</div>
`;
  document.body.appendChild(box);

  // 3. Logic & Events
  const input = box.querySelector("#chat-input");
  const sendBtn = box.querySelector("#chat-send");
  const messageArea = box.querySelector("#chat-messages");
  const closeBtn = box.querySelector("#chat-close");

  input.onfocus = () => {
    input.style.borderColor = "#111827";
    input.style.boxShadow = "0 0 0 3px rgba(17,24,39,.1)";
  };

  input.onblur = () => {
    input.style.borderColor = "#d1d5db";
    input.style.boxShadow = "none";
  };

  button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none";
  };

  closeBtn.onclick = () => {
    box.style.display = "none";
  };

  function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.textContent = text;
    Object.assign(bubble.style, {
      maxWidth: "80%",
      padding: "10px 14px",
      borderRadius: "18px",
      fontSize: "14px",
      lineHeight: "1.6",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      alignSelf: from === "user" ? "flex-end" : "flex-start",
      background:
        from === "user" ? "linear-gradient(135deg,#111827,#000)" : "#ffffff",
      color: from === "user" ? "#fff" : "#111827",
      border: from === "user" ? "none" : "1px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,.06)",
    });
    messageArea.appendChild(bubble);
    messageArea.scrollTop = messageArea.scrollHeight;
  }
  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    // Typing indicator
    const typing = document.createElement("div");
    typing.textContent = "Typing...";
    Object.assign(typing.style, {
      fontSize: "13px",
      color: "#6b7280",
      background: "#fff",
      border: "1px solid #e5e7eb",
      padding: "10px 14px",
      borderRadius: "18px",
      boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      alignSelf: "flex-start",
    });
    messageArea.appendChild(typing);
    messageArea.scrollTop = messageArea.scrollHeight;

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, message: text }),
      });

      const data = await response.json();

      // REMOVE typing indicator before adding the real message
      typing.remove();

      // CORRECTED: Accessing the string inside the object
      // If your API returns { reply: "..." }, use data.reply
      // If it returns { message: "..." }, use data.message
      const botText = data.reply || data.message || JSON.stringify(data);

      addMessage(botText, "ai");
    } catch (error) {
      if (typing) typing.remove();
      addMessage("Error: Could not reach server", "ai");
      console.error("Chat Error:", error);
    }
  };

  // Allow "Enter" key to send
  input.onkeypress = (e) => {
    if (e.key === "Enter") sendBtn.click();
  };
})();
