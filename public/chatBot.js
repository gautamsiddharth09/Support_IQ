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
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "22px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
    zIndex: "100000",
  });
  document.body.appendChild(button);

  // 2. Create Chat Box
  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "320px",
    height: "420px",
    backgroundColor: "#fff",
    display: "none",
    flexDirection: "column",
    borderRadius: "14px",
    overflow: "hidden",
    zIndex: "99999",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    fontFamily: "Inter, system-ui, sans-serif",
     whiteSpace: "pre-wrap"
  });

  box.innerHTML = `
    <div style="background:#000; color:#fff; padding:12px 14px; font-size:14px; display:flex; justify-content:space-between; align-items:center;">
      <span >Customer Support</span>
       <span id="chat-close" style="cursor:pointer;font-size:16px;">✕</span>
    </div>
    <div id="chat-messages" style="flex:1; padding:12px; overflow-y:auto; background:#f9fafb; display:flex; flex-direction:column;"></div>
    <div style="display:flex; border-top:1px solid #e5e7eb; padding:8px; gap:6px;">
       <input id="chat-input" type="text" style="flex:1; padding:8px 10px; border:1px solid #d1d5db; border-radius:8px; font-size:13px; outline:none;" placeholder="Type a message"/>
       <button id="chat-send" style="padding:8px 12px; border:none; background:#000; color:#fff; border-radius:8px; font-size:13px; cursor:pointer;">Send</button>
    </div>`;

  document.body.appendChild(box);

  // 3. Logic & Events
  const input = box.querySelector("#chat-input");
  const sendBtn = box.querySelector("#chat-send");
  const messageArea = box.querySelector("#chat-messages"); 
  const closeBtn = box.querySelector("#chat-close");

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
      maxWidth: "78%",
      padding: "8px 12px",
      borderRadius: "14px",
      fontSize: "13px",
      lineHeight: "1.4",
      marginBottom: "8px",
      alignSelf: from === "user" ? "flex-end" : "flex-start",
      background: from === "user" ? "#000" : "#e5e7eb",
      color: from === "user" ? "#fff" : "#111",
      borderTopRightRadius: from === "user" ? "4px" : "14px",
      borderTopLeftRadius: from === "user" ? "14px" : "4px",
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
      fontSize: "12px", 
      color: "#6b7280", 
      marginBottom: "8px", 
      alignSelf: "flex-start" 
    });
    messageArea.appendChild(typing);
    messageArea.scrollTop = messageArea.scrollHeight;

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, message: text })
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
