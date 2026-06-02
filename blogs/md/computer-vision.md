
අද මම ඔයාලත් එක්ක කතා කරන්න යන්නේ කෘත්‍රිම බුද්ධිය (AI) ලෝකයේ තියෙන මාරම මාතෘකාවක් ගැන. උදේට නැගිට්ටහම ජනේලෙන් එළිය බලද්දී, පාරේ යන වාහන, අහසේ යන කුරුල්ලෝ අඳුරගන්න අපිට කිසිම අමාරුවක් නෑනි, අපේ ඇස් දෙකයි මොළයයි ඒ දේ ඉතා ඉක්මනින් Process කරලා ඉවරයි. ඒත් වයර් සහ ඉලක්කම් (0 සහ 1) විතරක් තේරෙන කම්පියුටර් එකකට කොහොමද අපි මේ ලෝකය පෙන්නන්නේ? අන්න ඒ තාක්ෂණයට තමයි අපි සරලව **Computer Vision ** කියලා කියන්නේ.

ඔයාගෙ  ෆෝන් එකට මූණ පෙන්නුවම phone එක අන්ලොක් (Face ID) වෙන්නේ කොහොමද?  ඩ්‍රයිවර් කෙනෙක් නැතුව Tesla කාර් පාරේ යන්නේ කොහොමද? මේ හැමදේම පිටිපස්සේ තියෙන මැජික් එක අද සරලව කතා කරමු.

![](https://www.shutterstock.com/image-photo/eye-smart-contact-lens-website-600nw-2515818959.jpg)
<sub><a href="https://www.shutterstock.com/image-photo/eye-smart-contact-lens-website-600nw-2515818959.jpg">Source Image</a></sub>

---

## ඉතින් මොකක්ද මේ Computer Vision කියන්නේ? 🤔

මේක සරලවම කියන්නම්. Computer Vision කියන්නේ කෘත්‍රිම බුද්ධියේ (AI) එක්තරා කොටසක්. මේකෙන් කරන්නේ photos, videos දිහා බලලා ඒවයේ තියෙන්නේ මොනවද කියලා තේරුම් ගන්න Computer වලට උගන්නන එකයි. 

අපිට ඇස් තියෙනවා වගේ කම්පියුටර් එකට **කැමරා** තියෙනවා. අපිට ඒ පේන දේවල් තේරුම් ගන්න මොළයක් තියෙනවනි එ වගෙ කම්පියුටර් එකට **Machine Learning Algorithms** තියෙනවා. මේ කැමරාවයි, ඇල්ගොරිතම ටිකයි එකතු වුණාම තමයි පරිගණකයට මේ  "Vision" ලැබෙන්නේ.

## කම්පියුටර් එකක් ඇත්තටම ෆොටෝ එකක් දකින්නේ කොහොමද? 📸

අපි ලස්සන මලක් දැක්කම අපිට ඒකේ පාට, හැඩය පේනවනේ. ඒත් මම ඔයාලට කිව්වොත් කම්පියුටර් එකට කිසිම ෆොටෝ එකක් පේන්නේ නෑ, ඒකට පේන්නේ **ඉලක්කම් ගොඩක් විතරයි** කියලා, ඔයාලා විශ්වාස කරනවද? ඔව්, ඒක තමයි ඇත්ත!

ඔයාලා ෆොටෝ එකක් ගොඩාක් සූම් (Zoom in) කරලා බලලා තියෙනවද? එහෙම කරහම ඔයාලට පෙනෙයි ෆොටෝ එක හැදිලා තියෙන්නේ පුංචි පුංචි හතරැස් කොටු ගොඩකින් කියලා. අපි මේවට කියනවා **Pixels** කියලා. 

කම්පියුටර් එකක් කරන්නේ මේ හැම පික්සල් එකකම තියෙන පාට, ඉලක්කමකට හරවන එකයි. සාමාන්‍යයෙන් මේවා RGB (Red, Green, Blue) විදිහට තමයි තියෙන්නේ. කම්පියුටර් එක දකින්නේ 0 ඉඳලා 255 වෙනකන් තියෙන ඉලක්කම් වලින් හැදුණු ලොකූ වගුවක් (Matrix එකක්) විතරයි. (0 කියන්නේ කළු පාට, 255 කියන්නේ සුදු පාට). 

![](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1779905079830-gemini-generated-image-cvh0wcvh0wcvh0wc.png)

---

### අපි පොඩි සෙල්ලමක් කරමුද? 🎮

නිකන්ම කියවනවට වඩා, ඇත්තටම කම්පියුටර් එකක් ෆොටෝ එකක් process කරන්නේ කොහොමද කියලා ඔයාලටම අත්හදා බලන්න මම පහළින් පොඩි Interactive Widget එකක් හැදුවා. ඒකේ තියෙන බටන්ස් ක්ලික් කරලා බලන්න, සාමාන්‍ය ෆොටෝ එකක දාර (Edges) කම්පියුටර් එක හොයාගන්නේ කොහොමද, ෆොටෝ එකක් පික්සල් විදිහට කම්පියුටර් එකට පේන්නේ කොහොමද කියලා. 

*(ඔබට පහතින් ඇති බටන්ස් ක්ලික් කර වෙනස්කම් නිරීක්ෂණය කළ හැක)*
```widget
<div id="cv-widget-container" style="display: flex; justify-content: center; width: 100%; margin: 30px 0;">
  <div class="cv-widget-box" style="width: 100%; max-width: 850px; background-color: #ffffff; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); padding: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e9ecef;">
    
    <div class="cv-header" style="text-align: center; margin-bottom: 25px;">
      <h2 style="margin: 0; color: #1a202c; font-size: 28px; font-weight: 800;">🔍 Computer Vision Simulator</h2>
      <p style="margin: 8px 0 0; color: #718096; font-size: 16px;">පරිගණකයක ඇසින් ලෝකය දකින්න! පහතින් ඇති Filters ඔබා බලන්න.</p>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 25px; margin-bottom: 20px;">
      
      <!-- Canvas Area -->
      <div style="flex: 1.2; min-width: 320px; display: flex; flex-direction: column; align-items: center; background: #f7fafc; padding: 15px; border-radius: 12px; border: 1px dashed #cbd5e0;">
        <canvas id="cv-canvas" width="450" height="300" style="background-color: #fff; border-radius: 8px; max-width: 100%; height: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"></canvas>
        <div id="mode-badge" style="margin-top: 15px; background: #4299e1; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; letter-spacing: 0.5px;">සාමාන්‍ය රූපය (Original)</div>
      </div>

      <!-- Controls Area -->
      <div style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="margin-top: 0; color: #2d3748; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">පෙරහන් (Filters) තෝරන්න</h4>
        
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button onclick="applyFilter('original')" style="padding: 12px; background-color: #3182ce; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(49, 130, 206, 0.4);">🖼️ Original (සාමාන්‍ය දර්ශනය)</button>
          
          <button onclick="applyFilter('grayscale')" style="padding: 12px; background-color: #718096; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(113, 128, 150, 0.4);">⚫ Grayscale (වර්ණ ඉවත් කිරීම)</button>
          
          <button onclick="applyFilter('edges')" style="padding: 12px; background-color: #38a169; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(56, 161, 105, 0.4);">📐 Edge Detection (දාර හඳුනාගැනීම)</button>
          
          <button onclick="applyFilter('pixelate')" style="padding: 12px; background-color: #e53e3e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(229, 62, 62, 0.4);">👾 Pixelate (පික්සල් ලෙස දැකීම)</button>
        </div>

        <div id="slider-container" style="display: none; margin-top: 25px; background: #edf2f7; padding: 15px; border-radius: 8px;">
          <label for="cv-slider" style="font-weight: bold; color: #2d3748; display: block; margin-bottom: 10px; font-size: 14px;">පික්සල් ප්‍රමාණය වෙනස් කරන්න:</label>
          <input type="range" id="cv-slider" min="3" max="25" value="12" style="width: 100%; accent-color: #e53e3e;">
        </div>
      </div>
    </div>

  </div>
</div>

<script>
  (function() {
    const canvas = document.getElementById('cv-canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const modeBadge = document.getElementById('mode-badge');
    const sliderContainer = document.getElementById('slider-container');
    const slider = document.getElementById('cv-slider');
    
    let currentMode = 'original';
    let baseImage = new Image();
    
    // Create an attractive geometric base image for better demonstration
    function drawBaseImage() {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 450;
      tempCanvas.height = 300;
      const tCtx = tempCanvas.getContext('2d');
      
      // Sky
      tCtx.fillStyle = '#4299e1';
      tCtx.fillRect(0, 0, 450, 200);
      
      // Ground
      tCtx.fillStyle = '#48bb78';
      tCtx.fillRect(0, 200, 450, 100);
      
      // Road
      tCtx.fillStyle = '#718096';
      tCtx.beginPath();
      tCtx.moveTo(225, 200);
      tCtx.lineTo(50, 300);
      tCtx.lineTo(400, 300);
      tCtx.fill();

      // Road markings
      tCtx.strokeStyle = '#ffffff';
      tCtx.lineWidth = 4;
      tCtx.setLineDash([20, 20]);
      tCtx.beginPath();
      tCtx.moveTo(225, 200);
      tCtx.lineTo(225, 300);
      tCtx.stroke();
      tCtx.setLineDash([]);
      
      // Sun
      tCtx.fillStyle = '#ecc94b';
      tCtx.beginPath();
      tCtx.arc(380, 60, 40, 0, Math.PI * 2);
      tCtx.fill();
      
      // Simple Car (Red Box)
      tCtx.fillStyle = '#e53e3e';
      tCtx.fillRect(180, 210, 90, 40);
      tCtx.fillStyle = '#2d3748'; // Wheels
      tCtx.beginPath(); tCtx.arc(195, 250, 15, 0, Math.PI*2); tCtx.fill();
      tCtx.beginPath(); tCtx.arc(255, 250, 15, 0, Math.PI*2); tCtx.fill();
      tCtx.fillStyle = '#ebf8ff'; // Windows
      tCtx.fillRect(190, 190, 70, 20);

      baseImage.src = tempCanvas.toDataURL();
    }

    baseImage.onload = function() {
      resetCanvas();
    };
    
    drawBaseImage();

    function resetCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    }

    window.applyFilter = function(mode) {
      currentMode = mode;
      resetCanvas();
      
      if(mode === 'original') {
        modeBadge.innerText = "සාමාන්‍ය රූපය (Original)";
        modeBadge.style.backgroundColor = "#4299e1";
        sliderContainer.style.display = 'none';
      } 
      else if(mode === 'grayscale') {
        modeBadge.innerText = "Grayscale (වර්ණ ඉවත් කිරීම)";
        modeBadge.style.backgroundColor = "#718096";
        sliderContainer.style.display = 'none';
        applyGrayscale();
      }
      else if(mode === 'edges') {
        modeBadge.innerText = "Edge Detection (දාර හඳුනාගැනීම)";
        modeBadge.style.backgroundColor = "#38a169";
        sliderContainer.style.display = 'none';
        applyEdgeDetection();
      }
      else if(mode === 'pixelate') {
        modeBadge.innerText = "Pixelation (පික්සල් දර්ශනය)";
        modeBadge.style.backgroundColor = "#e53e3e";
        sliderContainer.style.display = 'block';
        applyPixelate(slider.value);
      }
    };

    slider.addEventListener('input', function() {
      if(currentMode === 'pixelate') {
        resetCanvas();
        applyPixelate(this.value);
      }
    });

    function applyGrayscale() {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; data[i + 1] = avg; data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    function applyEdgeDetection() {
      applyGrayscale();
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;
      const output = ctx.createImageData(width, height);
      const outData = output.data;
      
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          const right = ((y) * width + (x + 1)) * 4;
          const bottom = ((y + 1) * width + (x)) * 4;
          
          const diff = Math.abs(data[idx] - data[right]) + Math.abs(data[idx] - data[bottom]);
          const edgeVal = diff > 25 ? 255 : 0; // Sensitive threshold
          
          outData[idx] = edgeVal;
          outData[idx + 1] = edgeVal;
          outData[idx + 2] = edgeVal;
          outData[idx + 3] = 255;
        }
      }
      // Fill borders with black
      for(let i=0; i<outData.length; i+=4) {
          if(outData[i+3] === 0) {
              outData[i] = 0; outData[i+1] = 0; outData[i+2] = 0; outData[i+3] = 255;
          }
      }
      ctx.putImageData(output, 0, 0);
    }

    function applyPixelate(size) {
      size = parseInt(size);
      const w = canvas.width;
      const h = canvas.height;
      
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = Math.ceil(w / size);
      tempCanvas.height = Math.ceil(h / size);
      const tCtx = tempCanvas.getContext('2d');
      tCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
      
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, w, h);
    }
  })();
</script>
```
Edge detection දැම්මහම ඔයාලට පේනවා නේද ෆොටෝ එකේ තියෙන හැඩතල (කාර් එකේ හැඩය, ඉරේ හැඩය) කම්පියුටර් එක සුදු පාට ඉරි වලින් වෙන් කරලා අඳුරගන්න විදිහ? අන්න ඒ වගේ මූලික දේවල් වලින් පටන් අරන් තමයි AI එක ලොකු ලොකු දේවල් අඳුරගන්න පුරුදු වෙන්නේ.

## Computer Vision වල ප්‍රධාන වැඩ  4 මොනවද? 🛠️

ඔයාලා හිතන්න එපා කම්පියුටර් එකට අපි වගේ එකපාරටම ෆොටෝ එකක් දැක්කම හැමදේම තේරෙනවා කියලා. මේක ප්‍රධාන කොටස් 4 කට බෙදන්න පුළුවන්.

1.  **Image Classification (රූප වර්ගීකරණය) - *"මේ මොකක්ද?"*** 🐶
    මම කම්පියුටර් එකට ෆොටෝ එකක් දාලා අහනවා "මේ බල්ලෙක්ද? පූසෙක්ද?" කියලා. කම්පියුටර් එක ෆොටෝ එක process කරලා කියනවා "මේක බල්ලෙක්" කියලා. ඔයාලා Google Photos වල "Dog" කියලා සර්ච් කරහම ඔයාලගේ Search results එකේ තියෙන්නෙ බල්ලන්ගේ photos විතරක් එන්නේ මේ තාක්ෂණය නිසා.

2.  **Object Detection (වස්තු හඳුනාගැනීම) - *"ඒක තියෙන්නේ කොහෙද?"*** 🚗
    ෆොටෝ එකේ ඉන්නේ බල්ලෙක් කියලා කිව්වට විතරක් මදි. ඌ ඉන්නේ ෆොටෝ එකේ කොතනද කියලා හොයන්නත් ඕනේ. මෙතනදී කම්පියුටර් එක කරන්නේ ෆොටෝ එකේ තියෙන කාර්, මිනිස්සු, සත්තු හොයලා ඒ හැම එකක් වටේටම පාට පාට කොටුවක් (Bounding Box එකක්) අඳින එකයි.

![](https://media.licdn.com/dms/image/v2/D4E12AQE8w9lsMI9c7A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1739377720974?e=2147483647&v=beta&t=Un4xIHMnLQn1voUcA1Al7vX16g3ZMiby2RZ_nZSkijM)
<sub><a href="https://media.licdn.com/dms/image/v2/D4E12AQE8w9lsMI9c7A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1739377720974?e=2147483647&v=beta&t=Un4xIHMnLQn1voUcA1Al7vX16g3ZMiby2RZ_nZSkijM">Source Image</a></sub>

---

3.  **Image Segmentation (රූප ඛණ්ඩනය)** ✂️
    මේක අර කොටු අඳිනවට වඩා මාරම සූක්ෂම වැඩක්. හිතන්න ඔයාලා Canva එකේ හරි Photoshop වල හරි ෆොටෝ එකක Background එක අයින් කරනවා (Remove BG) කියලා. අන්න ඒ වගේ, හරියටම මනුස්සයගෙ හැඩේටම කපලා වෙන් කරගන්න එකට තමයි Segmentation කියන්නේ.

4.  **Facial Recognition (මුහුණු හඳුනාගැනීම) - *"මේ කවුද?"*** 🧑‍🦱
    මේක නම් ඔයාලා හැමෝම දන්නවා. ඔයාලගේ ඇස් දෙක තියෙන දුර, නහයේ හැඩය වගේ දේවල් මැනලා "මේ ඉන්නේ මගේ බොසා" කියලා ෆෝන් එක අඳුරගන්න එක. 
		

## පරිගණකය මේවා තේරුම් ගන්න ඉගෙන ගන්නේ කොහොමද? 🧠


මම ඔයාලට කිව්වොත්, කම්පියුටර් එකට ෆොටෝ අඳුරගන්න උගන්නන එක හරියට **පොඩි ළමයෙකුට උගන්නනවා වගේ** වැඩක් කියලා. 

හිතන්න ඔයාලගේ ගෙදර ඉන්න පොඩි මල්ලිට හරි නංගිට හරි බල්ලෙක්ව අඳුරගන්න කියලා දෙනවා. ඔයා මොකද කරන්නේ? පොතක් අරන් බල්ලන්ගේ ෆොටෝස් 10-15 ක් පෙන්නලා කියනවා "ඔන්න බලන්න, මේ ඉන්නේ බල්ලා" කියලා. ඊටපස්සේ ඒ ළමයා පාරේ යන ඕනෑම බල්ලෙක්ව දැක්ක ගමන් අඳුරගන්නවා. 

අපි කම්පියුටර් එකටත් කරන්නේ ඕකමයි! අපි කම්පියුටර් එකට කියනවා නෑ "බල්ලෙකුට කන් දෙකක් තියෙනවා, වලිගයක් තියෙනවා" කියලා නීති දාලා. මොකද පූසටත් ඒවා තියෙනවනේ. ඒ වෙනුවට අපි කරන්නේ **Deep Learning (Convolutional Neural Networks - CNN)** කියන AI මොළයට බල්ලන්ගේ ෆොටෝස් ලක්ෂ ගණනක් පෙන්නන එක. 

![](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1779905378107-gemini-generated-image-wbeb3bwbeb3bwbeb.png)

---

කම්පියුටර් එක මේ ෆොටෝස් ලක්ෂ ගාන දිහා බලලා තනියම ඉගෙන ගන්නවා "ආ.. බල්ලෙක් නම් මෙන්න මේ වගේ හැඩයක් තමයි තියෙන්න ඕනේ" කියලා. 

එකම වෙනස මනුස්සයෙක සුලු දත්ත ප්‍රමානයකින් තෙරුම් කරන්න පුලුවන් දෙ AI එකක්ට හොදින් තෙරුම් ගන්න  විශාල dataset යොදාගෙන traing කරන්න වෙනවා 

## අපේ එදිනෙදා ජීවිතේ මේවා පාවිච්චි වෙන්නේ කොහෙද? 🌍

" ඔය Technology එකෙන් මට තියෙන වාසිය මොකක්ද?" කියලා ඔයාලට හිතෙන්න පුළුවන්. ඒත් ඇත්තම කතාව, ඔයාලා නොදැනුවත්වම හැමදාම මේ දේවල් පාවිච්චි කරනවා.

*   **Social Media Filters (Snapchat / Instagram):** ඔයාලා ස්නැප්චැට් එකේ බල්ලගෙ කන් දාලා, දිව දාලා ෆොටෝ අරන් තියෙනවනේ? ඔයා ඔලුව හොලවද්දි ඒ කන් දෙකත් ඔයාගේ ඔලුව එක්කම යන්නේ කොහොමද? අන්න එතන ඔයාගේ මුහුණේ තියෙන ඇස්, නහය, කට Real-time ට්‍රැක් කරන්නේ මේ Computer Vision තාක්ෂණයෙන්.
  
*   **Self-Driving Cars (ස්වයංක්‍රීය වාහන):** ටෙස්ලා (Tesla) වගේ කාර් පාරේ තනියම යන්නේ වාහනේ වටේට තියෙන කැමරා වලින් අර අපි කලින් කතා කරපු Object Detection පාවිච්චි කරලා පාරේ යන අනිත් කාර්, පාර පනින මිනිස්සු අඳුරගන්න නිසයි.
  
*   **Amazon Go Stores:** මේක මාරම ගැජට් එකක්. ඇමසන් සමාගමේ තියෙනවා සුපර් මාර්කට් වගයක් මුදල් අයකරන අය (Cashiers) නැති. ඔයාට තියෙන්නේ කඩේට ගිහින් ඕන බඩු ටික අරන් එළියට එන්න විතරයි. ඔයා ගත්තේ මොනවද කියලා කඩේ උඩ තියෙන කැමරා වලින් (Computer Vision හරහා) අඳුරගෙන ඔයාගේ කාඩ් එකෙන් ගාණ කපාගන්නවා! 

## හැබැයි මේකේ පොඩි අවුලකුත් තියෙනවා (Chihuahua vs. Muffin Problem) 

කම්පියුටර්ස් කොච්චර ස්මාර්ට් වුණත්, සමහර වෙලාවට අපිට හිනායන විදිහේ මෝඩ වැඩත් කරනවා. 

මුල් කාලේදී AI රිසර්ච් කරන අයට ආපු ලොකුම ප්‍රශ්නයක් තමයි කම්පියුටර් එකට **Chihuahua (චිහුවාවා)** කියන බලු වර්ගයයි, **Blueberry Muffins (කප් කේක් ජාතියක්)** යි වෙන් කරලා අඳුරගන්න බැරි වෙච්ච එක. මොකද ඒ බල්ලගෙ මූණයි, ඒ කේක් එකේ හැඩයයි දෙකම එක වගේ! බල්ලගෙ ඇස් දෙකයි නහයයි හරියට කේක් එකේ තියෙන බ්ලූබෙරි ඇට වගේමයි කම්පියුටර් එකට පෙනුණේ.

![](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1779905482073-gemini-generated-image-1psyi31psyi31psy.png)

---

ඒත් අද වෙද්දී නම් තාක්ෂණය ගොඩක් දියුණුයි, දැන් නම් කම්පියුටර් එක අපිව වුණත් රවට්ටන තරමටම දක්ෂ වෙලා තියෙන්නේ.

## මගේ අදහස... 💡

Computer Vision කියන්නේ නිකන්ම Sci-Fi ෆිල්ම්ස් වලට සීමා වෙච්ච දෙයක් නෙවෙයි. මේ වෙද්දිත් වෛද්‍යවරුන්ට පිළිකා සෛල හොයාගන්න, ගොවියන්ට ලෙඩ වෙච්ච ගස් හොයාගන්න මේ තාක්ෂණය උදව් වෙනවා. ඉස්සරහට එන Augmented Reality (AR) වගේ දේවල් එක්ක (උදාහරණයක් විදිහට Apple Vision Pro) අපේ ලෝකය සම්පූර්ණයෙන්ම වෙනස් වෙන්න යනවා.

ඉතින් ඊළඟ පාර ඔයාගේ ෆෝන් එකේ කැමරාවෙන් මොකක් හරි ෆොටෝ එකක් අරන් AI එකකින් Edit කරද්දී, තත්පරෙන් දාහෙන් පංගුවක් ඇතුළත ඒ සිද්ධවෙන දැවැන්ත ක්‍රියාවලිය ගැන පොඩ්ඩක් හිතලා බලන්න!

ඔයාලට මොකද හිතෙන්නේ? කවදාහරි දවසක කම්පියුටර් වලට මිනිස්සුන්ගේ ඇස් වලට වඩා හොඳට දේවල් තේරුම් ගන්න පුළුවන් වෙයිද? **පල්ලෙහායින් කමෙන්ට් එකක් දාන්න, අපි ඒ ගැන කතා කරමු!** 👇

*(ඔබට මෙම ලිපිය වැදගත් වුණා නම් යාලුවන් එක්ක Share කරන්නත් අමතක කරන්න එපා!)*