කෘත්‍රිම බුද්ධිය (Artificial Intelligence) කියන්නේ දිනෙන් දින ඉතා වේගයෙන් පරිණාමය වන ක්ෂේත්‍රයක්. තාක්ෂණික ලෝකයේ වෙනස්කම් ගැන නිරන්තරයෙන් පර්යේෂණ කරන කෙනෙක් විදිහට, මෑතකදී මගේ අවධානය සම්පූර්ණයෙන්ම වගේ යොමු වුණේ **Agentic AI** කියන සුවිශේෂී සංකල්පය වෙතටයි. 

අපි දැනට එදිනෙදා වැඩවලට පාවිච්චි කරන ChatGPT, Claude හෝ Gemini වගේ සාමාන්‍ය AI මෙවලම් වලට වඩා මේ Agentic AI කියන්නේ හාත්පසින්ම වෙනස්, ඊළඟ පරම්පරාවේ තාක්ෂණික පිම්මක් (Paradigm Shift) විදිහට හඳුන්වන්න පුළුවන්. මේ ලිපියෙන් මම බලාපොරොත්තු වෙන්නේ Agentic AI යනු කුමක්ද, එහි ක්‍රියාකාරීත්වය සහ මම පෞද්ගලිකව සිදුකළ අත්හදා බැලීම්වල ප්‍රතිඵල ඔබත් සමග බෙදා ගැනීමටයි.

---

## 1. Generative AI සහ Agentic AI අතර පවතින වෙනස

අපි අද බහුලවම භාවිතා කරන්නේ **Generative AI** (උත්පාදක කෘතිම බුද්ධිය) කාණ්ඩයට අයත් මෙවලම්. මෙම පද්ධති මඟින් මූලිකවම සිදු කරන්නේ අප ලබාදෙන Prompt එකකට අදාළව පිළිතුරු සැපයීම පමණයි. 

උදාහරණයක් විදිහට, මෘදුකාංග කේතනයකදී (Coding) Error එකක් ආවොත්, අපට සිදුවෙනවා එම Error එක කොපි කරගෙන ගොස් AI එකට ලබා දී විසඳුම් සෙවීමට. විශාල Code Project එකක් සමඟ වැඩ කිරීමේදී මේ විදිහට එහාට මෙහාට copy-paste කරන එක ඉතාමත් අපහසු සහ කාලය නාස්ති වන ක්‍රියාවලියක්.

නමුත්, Agentic AI යනු පරිශීලකයා විසින් ලබාදෙන අවසාන ඉලක්කය (Goal) මත පදනම්ව, ස්වාධීනව තීරණ ගනිමින් පියවරෙන් පියවර ක්‍රියාත්මක වන [ස්වයංක්‍රීය නියෝජිතයෙක් (Autonomous Agent)](https://www.ibm.com/think/insights/ai-agents).

| විශේෂාංගය | Generative AI | Agentic AI |
| :--- | :--- | :--- |
| **ක්‍රියාකාරීත්වය** | Reactive (අප අසන ප්‍රශ්නයට පමණක් ප්‍රතිචාර දක්වයි) | Proactive (ඉලක්කය සපුරා ගැනීමට ස්වාධීනව සැලසුම් කරයි) |
| **මිනිස් මැදිහත්වීම** | සෑම පියවරකටම නව Prompt එකක් ලබාදිය යුතුය | අවසාන ඉලක්කය ලබාදීම පමණක් ප්‍රමාණවත් වේ |
| **Tools භාවිතය** | බාහිර මෙවලම් භාවිතය සීමිතයි | Terminal, Browser, File System සහ APIs ස්වයංක්‍රීයව හසුරුවයි |
| **දෝෂ නිවැරදි කිරීම** | වැරදීමක් වුවහොත් පරිශීලකයා විසින් එය පෙන්වා දිය යුතුය | Self-Reflection (තමා විසින්ම වැරදි හඳුනාගෙන නිවැරදි කරයි) |

![123.png](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1780483044522-123.png)

---

## 2. මගේ ප්‍රායෝගික අත්හදා බැලීම්

### Gemini CLI සිට Antigravity දක්වා

මම මුලින්ම මෙම copy-paste කිරීමේ අපහසුතාව මඟහරවා ගන්න Gemini සහ Claude Code CLI වැනි මෙවලම් භාවිතයෙන් ටර්මිනල් (Terminal) එක ඇතුලෙන්ම කේත ලියවා ගැනීමට උත්සාහ කළා. එය සාමාන්‍ය වෙබ් අඩවි නිර්මාණයට හොඳ විසඳුමක් වුණත්, සැබෑ Agentic අත්දැකීමක් මට ලැබුණේ ගූගල් සමාගම විසින් නිකුත් කරන ලද **Antigravity v1.19** සහ ඉන් පසු පැමිණි සංස්කරණ පරිශීලනයට එකතු වීමත් සමඟයි.

මෙම පද්ධති හරහා මා සාමාන්‍යයෙන් දිනකදී නිම කරන වැඩකටයුතු, ඊට වඩා 4-5 ගුණයක වේගයකින් නිම කරගැනීමේ හැකියාව ලැබුණා. Antigravity මෙවලමකට යම් කාර්යයක් පැවරු විට, එය මඟදී 500 Server Error එකක් වැනි බාධාවක් පැමිණියත් නතර වන්නේ නැහැ. එය තනිවම මුළු Codebase එකම විශ්ලේෂණය කර අදාළ දෝෂය නිරාකරණය කරනවා.

සුවිශේෂීම කරුණ නම්, වෙබ් අඩවියක් ඩිවෙලොප් කිරීමේදී Agent විසින්ම කේතය ලියා, තමන්ගේම බ්‍රවුසර් ටූල් එකක් හරහා ක්‍රෝම් බ්‍රවුසරයක් විවෘත කර එය සජීවීව පරීක්ෂා කිරීමයි. එහි පරිශීලක අතුරුමුහුණතේ (UI) දෝෂයක් පවතින බව අප පැවසුවහොත්, Agent විසින් බ්‍රවුසරය තුළ Virtual කීබෝඩ් සහ මවුස් (Computer Use API වැනි තාක්ෂණ හරහා) සකස් කරගෙන, අදාළ ස්ථාන වලට ක්ලික් කරමින් දෝෂ පවතින ස්ථාන සොයාගෙන ස්වයංක්‍රීයවම ඒවා නිවැරදි කරනවා.

මෑතකදී නිකුත් වූ **Antigravity 2.0** සංස්කරණය ප්‍රධාන ප්‍රවේශයන් දෙකක් ඔස්සේ ක්‍රියාත්මක වෙනවා:

*   **Antigravity 2.0 (Fire-and-Forget):** මෙහිදී පරිශීලකයාට ටර්මිනල් එකක් හෝ කේතයක් දැකගත නොහැක. කේතනය පිළිබඳ කිසිදු දැනුමක් නොමැති අයෙකුට වුවද, අවසාන ඉලක්කය පමණක් ලබා දී සම්පූර්ණ නිපැයුමක් ලබාගත හැකියි.
*   **Antigravity IDE (Human-in-the-Loop):** මෙය මෘදුකාංග සංවර්ධකයන් (Developers) ඉලක්ක කරගෙන නිපදවා ඇත. මිනිසා විසින් කේත ලියන අතරතුර AI මඟින් සහාය ලබාදෙමින් දෙදෙනාගේම දායකත්වයෙන් සංකීර්ණ කාර්යයන් සම්පූර්ණ කරයි.

---

## 3. පද්ධති ක්‍රියාකාරීත්වය: LLM සහ MCP Servers 

ඇත්තටම Agentic AI එකක් කියන්නේ ක්‍රියාත්මක විය හැකි අතථ්‍ය ශරීරයක් (Virtual Body) වගේ සංකල්පයක්. ඒ ශරීරයට සිතන්නට නම් "මොළයක්" අවශ්‍යයි. අන්න ඒ මොළය විදිහට තමයි Claude, Gemini වැනි විශාල භාෂා ආකෘති (Large Language Models / LLMs) සම්බන්ධ කරන්නේ.

නමුත් මොළයට පමණක් බාහිර ලෝකය සමඟ වැඩ කිරීමට නොහැකියි. ඒ සඳහා බාහිර මෙවලම් (Tools) සමඟ සම්බන්ධ වීමේ ක්‍රමවේදයක් අවශ්‍යයි. ඒ සඳහා භාවිතා වන නවතම සහ විප්ලවීය ප්‍රමිතිය තමයි [MCP (Model Context Protocol)](https://modelcontextprotocol.io/introduction) කියන්නේ. MCP සර්වර්ස් හරහා AI ආකෘතියට අපගේ එදිනෙදා පරිගණක මෙවලම්, දත්ත සමුදායන් සහ API සියල්ල ආරක්ෂිතව සම්බන්ධ කළ හැකියි. 

ඊමේල් වලට ස්වයංක්‍රීයව පිළිතුරු සැපයීම, දිනපතා සමාජ මාධ්‍ය සටහන් (Social Media Posts) පළ කිරීම, ලිපිගොනු (Docs) සකස් කිරීම වැනි කාර්යයන් කිහිපයක් වචන කිහිපයකින් පැවසූ සැනින් සිදු කිරීමට AI එකකට හැකියාව ලැබෙන්නේ මේ තාක්ෂණය නිසයි.

මෙම ක්‍රියාවලිය තවදුරටත් පහසු කිරීමට, එදිනෙදා පරිශීලනය වන කාර්යයන් සහ විධාන (Commands) 90 කට වඩා අඩංගු **Custom Python MCP Server** එකක් නිර්මාණය කර මම GitHub වෙත Open Source ලෙස මුදාහැර තිබෙනවා. අවශ්‍ය ඕනෑම කෙනෙකුට පහත Link ඔස්සේ එය ලබාගෙන ස්වයංක්‍රීයකරණ කටයුතු සඳහා පරීක්ෂා කර බැලිය හැකියි:

🔗 **GitHub Repository:**
[sh4lu-z/Custom-MCP](https://github.com/sh4lu-z/Custom-MCP)

### 📊 Agentic AI සහ MCP සන්නිවේදන Simulator එක

පහත දැක්වෙන Interactive Simulator එක ආධාරයෙන්, AI මොළය සහ MCP සර්වර්ස් අතර දත්ත හුවමාරු වෙමින් බාහිර මෙවලම් ක්‍රියාත්මක වන ආකාරය ඔබට ප්‍රායෝගිකව අත්හදා බලන්න පුළුවන්:

```widget
<div id="mcp-simulator-container" style="display: flex; justify-content: center; width: 100%; margin: 30px 0;">
  <div class="mcp-widget-box" style="width: 100%; max-width: 850px; background-color: #0f172a; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.3); padding: 25px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #334155;">
    
    <div class="mcp-header" style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">
      <h2 style="margin: 0; color: #f8fafc; font-size: 26px; font-weight: 800;">⚡ Agentic AI & MCP Architecture Simulator</h2>
      <p style="margin: 8px 0 0; color: #94a3b8; font-size: 15px;">පහත බොත්තම් ක්ලික් කර, MCP සර්වර් හරහා AI Agentic බාහිර මෙවලම් හසුරුවන ආකාරය සජීවීව නරඹන්න.</p>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 25px;">
      
      <!-- Animation Canvas -->
      <div style="flex: 1.3; min-width: 300px; display: flex; flex-direction: column; align-items: center; background: #020617; padding: 15px; border-radius: 12px; border: 1px dashed #475569;">
        <canvas id="mcp-canvas" width="460" height="300" style="background-color: #020617; border-radius: 8px; max-width: 100%; height: auto;"></canvas>
        <div id="status-badge" style="margin-top: 15px; background: #38bdf8; color: #0f172a; padding: 6px 18px; border-radius: 20px; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">පද්ධතිය සූදානම් (System Idle)</div>
      </div>

      <!-- Control Panel -->
      <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="margin-top: 0; color: #f1f5f9; font-size: 16px; margin-bottom: 15px; border-bottom: 2px solid #1e293b; padding-bottom: 10px;">විධාන ක්‍රියාත්මක කරන්න (Trigger Commands)</h4>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button onclick="triggerMcpAction('email')" style="padding: 12px; background-color: #1e293b; color: #38bdf8; border: 1px solid #38bdf8; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px; text-align: left; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center;">
            <span>📧 Auto Email Reply</span>
            <span style="font-size: 11px; background: rgba(56,189,248,0.1); padding: 2px 6px; border-radius: 4px;">Run MCP</span>
          </button>
          
          <button onclick="triggerMcpAction('code')" style="padding: 12px; background-color: #1e293b; color: #4ade80; border: 1px solid #4ade80; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px; text-align: left; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center;">
            <span>💻 Self-Correct Code Error</span>
            <span style="font-size: 11px; background: rgba(74,222,128,0.1); padding: 2px 6px; border-radius: 4px;">Antigravity Mode</span>
          </button>
          
          <button onclick="triggerMcpAction('social')" style="padding: 12px; background-color: #1e293b; color: #f472b6; border: 1px solid #f472b6; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px; text-align: left; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center;">
            <span>📱 Automated Social Post</span>
            <span style="font-size: 11px; background: rgba(244,114,182,0.1); padding: 2px 6px; border-radius: 4px;">90+ Commands</span>
          </button>
        </div>

        <div id="log-box" style="margin-top: 20px; background: #1e293b; padding: 12px; border-radius: 8px; height: 80px; overflow-y: auto; font-size: 12px; color: #cbd5e1; border-left: 3px solid #38bdf8;">
          <strong>System Log:</strong><br><span id="log-text">Awaiting user action... Select a trigger above.</span>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
  (function() {
    const canvas = document.getElementById('mcp-canvas');
    const ctx = canvas.getContext('2d');
    const statusBadge = document.getElementById('status-badge');
    const logText = document.getElementById('log-text');
    
    // Nodes positions
    const nodes = {
      llm: { x: 230, y: 150, label: 'LLM Brain', color: '#a855f7' },
      mcp: { x: 230, y: 50, label: 'Custom MCP', color: '#38bdf8' },
      terminal: { x: 60, y: 150, label: 'Terminal', color: '#4ade80' },
      email: { x: 400, y: 150, label: 'Gmail API', color: '#f59e0b' },
      browser: { x: 230, y: 250, label: 'Chromium', color: '#f472b6' }
    };

    let animationId = null;
    let packet = { x: 0, y: 0, targetX: 0, targetY: 0, progress: 1, color: '#fff' };
    let activeConnections = [];

    function drawSystem() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Connections
      ctx.lineWidth = 2;
      Object.keys(nodes).forEach(key => {
        if(key !== 'llm') {
          ctx.strokeStyle = activeConnections.includes(key) ? nodes[key].color : '#334155';
          ctx.beginPath();
          ctx.moveTo(nodes.llm.x, nodes.llm.y);
          ctx.lineTo(nodes[key].x, nodes[key].y);
          ctx.stroke();
        }
      });

      // Draw Packet Flow
      if(packet.progress < 1) {
        packet.progress += 0.03;
        packet.x = nodes.llm.x + (packet.targetX - nodes.llm.x) * packet.progress;
        packet.y = nodes.llm.y + (packet.targetY - nodes.llm.y) * packet.progress;
        
        ctx.fillStyle = packet.color;
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Nodes
      Object.keys(nodes).forEach(key => {
        const n = nodes[key];
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
        ctx.fill();

        // Node text
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - 22);
      });
    }

    function animate() {
      drawSystem();
      animationId = requestAnimationFrame(animate);
    }
    
    animate();

    window.triggerMcpAction = function(type) {
      if(type === 'email') {
        statusBadge.innerText = "MCP: Email processing";
        statusBadge.style.backgroundColor = '#f59e0b';
        logText.innerHTML = "Executing command...<br>LLM analyzed request -> Routing via Custom MCP -> Triggering Gmail API to reply.";
        activeConnections = ['mcp', 'email'];
        sendPacket(nodes.email.x, nodes.email.y, '#f59e0b');
      } 
      else if(type === 'code') {
        statusBadge.innerText = "AGENT: Debugging Layout";
        statusBadge.style.backgroundColor = '#4ade80';
        logText.innerHTML = "Antigravity Active...<br>Opening virtual Chromium instance -> Running Code Base via Terminal -> Fixing 500 error.";
        activeConnections = ['terminal', 'browser'];
        sendPacket(nodes.terminal.x, nodes.terminal.y, '#4ade80');
        setTimeout(() => { sendPacket(nodes.browser.x, nodes.browser.y, '#f472b6'); }, 400);
      }
      else if(type === 'social') {
        statusBadge.innerText = "MCP: Scheduling Post";
        statusBadge.style.backgroundColor = '#f472b6';
        logText.innerHTML = "Custom python automation active...<br>Scanning scheduler config -> Executing autonomous webhook command successfully.";
        activeConnections = ['mcp', 'browser'];
        sendPacket(nodes.mcp.x, nodes.mcp.y, '#38bdf8');
      }
    };

    function sendPacket(tx, ty, color) {
      packet = { x: nodes.llm.x, y: nodes.llm.y, targetX: tx, targetY: ty, progress: 0, color: color };
    }
  })();
</script>
```
![34434.png](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1780483241595-34434.png)

## 4. කිසිදු පිරිවැයකින් තොරව Local Machine එකක Agentic AI ධාවනය කිරීම

බොහෝ දෙනෙකු සිතන්නේ මෙම දියුණු AI තාක්ෂණයන් අත්හදා බැලීමට අධික පිරිවැයක් හෝ API Key ගාස්තු ගෙවිය යුතු බවයි. නමුත් කිසිදු මුදලක් වැය නොකර (No Cost) තමන්ගේම පරිගණකය තුළ Local මාදිලි ධාවනය කිරීමේ හැකියාව දැන් පවතිනවා.

LM Studio වැනි මෘදුකාංගයක් භාවිතයෙන් Llama 3.3, Gemma 4, Qwen 3, DeepSeek-R1 වැනි මාදිලි භාගත කරගෙන (Download), MCP සර්වර්ස් සමඟ සම්බන්ධ කර ආරක්ෂිතව සහ නොමිලේම තමන්ගේම පරිගණකය තුළ පරීක්ෂණ සිදු කළ හැකියි. මෙහිදී දත්ත බාහිර සේවාදායකයන් (Cloud Servers) වෙත ගමන් නොකරන බැවින් ඔබගේ දත්ත රහස්‍යභාවය (Privacy) උපරිමයෙන්ම රැකෙනවා.

පරිගණක වලට අමතරව ස්මාර්ට් ජංගම දුරකථන (Smartphones) සඳහාද Local මාදිලි ධාවනය කළ හැකි යෙදුම් ගූගල් සමාගම විසින් Google Edge Gallery හරහා නිකුත් කර තිබෙනවා. එමඟින් දුරකථනය තුළටම LLM එකක් ඩවුන්ලොඩ් කර අන්තර්ජාලය නොමැතිව වුවද පරීක්ෂා කිරීමේ හැකියාව පවතිනවා.

ලෝකල් පද්ධති ගැන කතා කිරීමේදී මෑතකදී නිකුත් වූ [Gemma 4 ආකෘතිය](https://ai.google.dev/gemma) පිළිබඳව විශේෂයෙන්ම සඳහන් කළ යුතුයි. එය ප්‍රමාණයෙන් ඉතා කුඩා (Small Model) එකක් වුවත්, එහි ක්‍රියාකාරීත්වය (Performance) ඉතා ඉහළ මට්ටමක පවතිනවා. සුවිශේෂී කරුණ නම් Gemma 4 සතුව Vision (රූප සහ පරිගණක තිරයන් හඳුනාගැනීමේ හැකියාව) පවතිනවා. මෙයින් අදහස් කරන්නේ අපගේ Local ඒජන්ට් කෙනෙකුට ස්වයංක්‍රීයව Computer screen දෙස බලා තීරණ ගැනීමට අවශ්‍ය "ඇස්" ලැබී ඇති බවයි.

## 5. අවසාන අදහස සහ අනාගතය

තාක්ෂණයේ අනාගතය ගමන් කරන්නේ පරිශීලකයා විසින් සෑම කුඩා පියවරක්ම AI වෙත උපදෙස් දෙන යුගයෙන් මිදී, එක් ප්‍රධාන ඉලක්කයක් ලබා දුන් පසු AI විසින්ම සියල්ල සැලසුම් කර ක්‍රියාවට නංවන ස්වයංක්‍රීය යුගයකටයි. අපට අවශ්‍ය වන්නේ නිවැරදි ඉලක්කයන් පද්ධතිය වෙත ලබා දීම පමණයි.

ඔබත් Antigravity හෝ ලෝකල් ඒජන්ටික් පද්ධති පිළිබඳව අත්හදා බැලීම් සිදුකර තිබෙනවා නම්, හෝ මා නිර්මාණය කළ GitHub MCP සර්වර් එක භාවිතා කර බැලුවා නම්, ඔබේ අත්දැකීම් සහ අදහස් පහළින් කමෙන්ට් කරන්න. තවත් මෙවැනි තාක්ෂණික ලිපියකින් නැවත හමුවෙමු! 🚀✨