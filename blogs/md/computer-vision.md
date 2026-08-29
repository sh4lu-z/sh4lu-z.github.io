කෘත්‍රිම බුද්ධිය (AI) ගැන කතා කරද්දි මාව වඩාත්ම ආකර්ෂණය කරපු තාක්ෂණයක් තමයි **Computer Vision** කියන්නේ. අපි උදේට නැගිටලා වටපිට බලද්දි අපේ ඇස් දෙකට පේන දේවල් තේරුම් ගන්න අපේ මොළයට ගතවෙන්නේ මිලි තත්පර ගාණක්. කිසිම මහන්සියක් නැතිව පාරේ යන වාහනයක්, ගහක ඉන්න කුරුල්ලෙක් අපි අඳුරගන්නවා. හැබැයි "0" සහ "1" විතරක් තේරෙන කම්පියුටර් එකකට මේ ලෝකය පේන්නේ කොහොමද? පරිගණකයකට "පෙනීමේ හැකියාව" ලබා දෙන්නේ කොහොමද? 

ඔබගේ ස්මාර්ට් ජංගම දුරකථනයේ Face ID එක හරහා ඔබව හඳුනාගන්නේ කොහොමද? රියදුරෙක් නොමැතිව ටෙස්ලා (Tesla) වැනි වාහන පාරේ ධාවනය වෙන්නේ කොහොමද? මේ හැමදේම පිටිපස්සේ තියෙන සංකීර්ණ තාක්ෂණය තමයි අපි මේ ලිපියෙන් සරලව කතා කරන්න යන්නේ.

![](https://www.shutterstock.com/image-photo/eye-smart-contact-lens-website-600nw-2515818959.jpg)
<sub><a href="https://www.shutterstock.com/image-photo/eye-smart-contact-lens-website-600nw-2515818959.jpg">Source Image</a></sub>

---

## ඉතින් මොකක්ද මේ Computer Vision කියන්නේ? 🤔

තාක්ෂණිකව පැහැදිලි කළොත්, Computer Vision කියන්නේ කෘත්‍රිම බුද්ධියේ (AI) එක්තරා අනු-ක්ෂේත්‍රයක් (Sub-field). මෙහි මූලික අරමුණ වෙන්නේ [ඩිජිටල් රූප, වීඩියෝ සහ සජීවී දර්ශන හරහා අර්ථවත් තොරතුරු උකහා ගැනීමට පරිගණක වලට ඉගැන්වීමයි](https://www.ibm.com/topics/computer-vision).

අපිට පෙනීම ලබා දෙන්න ඇස් සහ මොළය ක්‍රියා කරනවා වගේම, පරිගණකයකට මේ හැකියාව ලබා දෙන්න මූලිකවම **ඩිජිටල් කැමරා** සහ **Machine Learning / Deep Learning ඇල්ගොරිතම** එකතු වෙලා ක්‍රියා කරනවා.

## කම්පියුටර් එකක් ඇත්තටම ෆොටෝ එකක් දකින්නේ කොහොමද? 📸

අපි ලස්සන මලක ඡායාරූපයක් දැක්කම අපිට එහි වර්ණ සහ හැඩතල පේනවා. නමුත් පරිගණකයක් ඡායාරූපයක් දකින්නේ හුදෙක් ඉලක්කම් (Numbers) පේළියක් විදිහට පමණයි. 

ඔබ ඡායාරූපයක් උපරිමයට Zoom කළොත්, එය කුඩා හතරැස් කොටු විශාල ප්‍රමාණයකින් සමන්විත වන බව පෙනෙයි. අපි මේවට කියන්නේ **Pixels** කියලයි. පරිගණකයක් කරන්නේ මේ සෑම පික්සලයකම ඇති වර්ණය, සංඛ්‍යාත්මක අගයකට (Numerical value) පරිවර්තනය කිරීමයි. සාමාන්‍යයෙන් මේවා RGB (Red, Green, Blue) ආකෘතියෙන් පවතින අතර, පරිගණකය දකින්නේ 0 සිට 255 දක්වා අගයන්ගෙන් පිරුණු විශාල වගුවක් (Matrix) ලෙසයි. (මෙහි 0 යනු සම්පූර්ණ කළු වර්ණය වන අතර 255 යනු සම්පූර්ණ සුදු වර්ණයයි).

![](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1779905079830-gemini-generated-image-cvh0wcvh0wcvh0wc.png)

---

### අපි ප්‍රායෝගිකව අත්හදා බලමුද? 🎮

නිකන්ම න්‍යායාත්මක කරුණු කියවනවට වඩා, පරිගණකයක් ඡායාරූපයක් Process කරන ආකාරය ප්‍රායෝගිකව බලාගන්න මම පහළින් Interactive Widget එකක් නිර්මාණය කළා. මෙහි ඇති Filters භාවිතා කර සාමාන්‍ය ඡායාරූපයක දාර (Edges) පරිගණකයක් හඳුනාගන්නා ආකාරය සහ එය පික්සල් වලට වෙන්වන ආකාරය ඔබටම අත්හදා බැලිය හැකියි.

*(ඔබට පහතින් ඇති බටන්ස් ක්ලික් කර වෙනස්කම් නිරීක්ෂණය කළ හැක)*
```widget
<div id="cv-widget-container" style="display: flex; justify-content: center; width: 100%; margin: 30px 0;">
  <div class="cv-widget-box" style="width: 100%; max-width: 850px; background-color: #ffffff; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); padding: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e9ecef;">
    
    <div class="cv-header" style="text-align: center; margin-bottom: 25px;">
      <h2 style="margin: 0; color: #1a202c; font-size: 28px; font-weight: 800;">🔍 Computer Vision Simulator</h2>
      <p style="margin: 8px 0 0; color: #718096; font-size: 16px;">පරිගණකයක ඇසින් ලෝකය දකින්න! පහතින් ඇති Filters ඔබා බලන්න.</p>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 25px; margin-bottom: 20px;">
      
      <!-- Canvas Area -->
      <div style="flex: 1.2; min-width: 0; width: 100%; display: flex; flex-direction: column; align-items: center; background: #f7fafc; padding: 15px; border-radius: 12px; border: 1px dashed #cbd5e0;">
        <canvas id="cv-canvas" width="450" height="300" style="background-color: #fff; border-radius: 8px; max-width: 100%; height: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"></canvas>
        <div id="mode-badge" style="margin-top: 15px; background: #4299e1; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; letter-spacing: 0.5px;">සාමාන්‍ය රූපය (Original)</div>
      </div>

      <!-- Controls Area -->
      <div style="flex: 1; min-width: 0; width: 100%; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="margin-top: 0; color: #2d3748; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">පෙරහන් (Filters) තෝරන්න</h4>
        
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button onclick="applyFilter('original')" style="padding: 12px; background-color: #3182ce; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; line-height: 1.4; height: auto; transition: all 0.2s; box-shadow: 0 2px 4px rgba(49, 130, 206, 0.4);">🖼️ Original (සාමාන්‍ය දර්ශනය)</button>
          
          <button onclick="applyFilter('grayscale')" style="padding: 12px; background-color: #718096; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; line-height: 1.4; height: auto; transition: all 0.2s; box-shadow: 0 2px 4px rgba(113, 128, 150, 0.4);">⚫ Grayscale (වර්ණ ඉවත් කිරීම)</button>
          
          <button onclick="applyFilter('edges')" style="padding: 12px; background-color: #38a169; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; line-height: 1.4; height: auto; transition: all 0.2s; box-shadow: 0 2px 4px rgba(56, 161, 105, 0.4);">📐 Edge Detection (දාර හඳුනාගැනීම)</button>
          
          <button onclick="applyFilter('pixelate')" style="padding: 12px; background-color: #e53e3e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; line-height: 1.4; height: auto; transition: all 0.2s; box-shadow: 0 2px 4px rgba(229, 62, 62, 0.4);">👾 Pixelate (පික්සල් ලෙස දැකීම)</button>
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
Edge detection යෙදූ විට, පරිගණකය ඡායාරූපයේ ඇති වස්තූන්ගේ හැඩතල (කාර් එකේ හැඩය, මාර්ගයේ සලකුණු) හඳුනාගන්නා ආකාරය ඔබට පෙනෙනවා ඇති. AI ආකෘති ලෝකය තේරුම් ගන්නා මූලිකම පදනම වන්නේ මෙයයි.

## Computer Vision හි ප්‍රධාන කාර්යයන් 4 මොනවද? 🛠️

පරිගණකයකට ඡායාරූපයක් ලබාදුන් පමණින් මිනිසෙකුට මෙන් එහි ඇති සියල්ල එකවර අවබෝධ කරගත නොහැකියි. මෙය මූලික කාර්යයන් කිහිපයක් යටතේ සිදුවේ.

1.  **Image Classification (රූප වර්ගීකරණය) - *"මෙය කුමක්ද?"*** 🐶
    අප පරිගණකයට ඡායාරූපයක් ලබා දී "මෙය බල්ලෙක්ද? පූසෙක්ද?" යන්න විමසන විට, එය ඡායාරූපය විශ්ලේෂණය කර "මෙය බල්ලෙක්" යනුවෙන් හඳුනාගැනීමයි. Google Photos වැනි යෙදුම් වල "Dog" ලෙස සෙවූ විට බල්ලන්ගේ ඡායාරූප පමණක් ප්‍රතිඵල ලෙස ලැබෙන්නේ මෙම තාක්ෂණය නිසයි.

2.  **Object Detection (වස්තු හඳුනාගැනීම) - *"එය තිබෙන්නේ කොතැනද?"*** 🚗
    ඡායාරූපයක ඇති දේ හඳුනාගැනීම පමණක් ප්‍රමාණවත් නොවේ. එය ඡායාරූපයේ කුමන ස්ථානයක තිබේද යන්න හඳුනාගැනීම (Localization) මීළඟ පියවරයි. මෙහිදී පරිගණකය විසින් අදාළ වස්තුව වටා Bounding Box එකක් (හතරැස් රාමුවක්) අඳිනු ලබයි.

![](https://media.licdn.com/dms/image/v2/D4E12AQE8w9lsMI9c7A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1739377720974?e=2147483647&v=beta&t=Un4xIHMnLQn1voUcA1Al7vX16g3ZMiby2RZ_nZSkijM)
<sub><a href="https://media.licdn.com/dms/image/v2/D4E12AQE8w9lsMI9c7A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1739377720974?e=2147483647&v=beta&t=Un4xIHMnLQn1voUcA1Al7vX16g3ZMiby2RZ_nZSkijM">Source Image</a></sub>

---

3.  **Image Segmentation (රූප ඛණ්ඩනය)** ✂️
    මෙය Object Detection වලට වඩා වඩාත් සූක්ෂම ක්‍රියාවලියකි. Bounding Box එකක් අඳිනවා වෙනුවට, අදාළ වස්තුවේ නිශ්චිත හැඩය හඳුනාගෙන පික්සල් මට්ටමෙන් එය ඛණ්ඩනය කිරීම මෙහිදී සිදු වේ (උදා: Photoshop හි Background Removal විශේෂාංගය).

4.  **Facial Recognition (මුහුණු හඳුනාගැනීම) - *"මේ කවුද?"*** 🧑‍🦱
    පුද්ගලයෙකුගේ මුහුණේ ඇති ඇස් අතර දුර, නාසයේ හැඩය වැනි සුවිශේෂී ජ්‍යාමිතික ලක්ෂණ මැන බලා එම පුද්ගලයා අනන්‍ය ලෙස හඳුනාගැනීමයි. 
		

## පරිගණකයක් මේ දේවල් ඉගෙන ගන්නේ කොහොමද? 🧠

පරිගණකයකට රූප හඳුනාගැනීමට ඉගැන්වීම, කුඩා දරුවෙකුට අලුත් දෙයක් උගන්වනවාට බෙහෙවින් සමානයි.

දරුවෙකුට බල්ලෙකු හඳුනාගැනීමට කියා දීමේදී, අපි ඔවුන්ට බල්ලන්ගේ ඡායාරූප කිහිපයක් පෙන්වා "මෙය බල්ලෙක්" යැයි පවසනවා. ඉන්පසු ඔවුන් ඒ ලක්ෂණ මතක තබාගෙන ඕනෑම බල්ලෙකු හඳුනාගන්නවා. 

පරිගණකයටද අප ලබා දෙන්නේ එම අත්දැකීමමයි. අපි පරිගණකයට "බල්ලෙකුට කන් දෙකක් සහ වලිගයක් ඇත" යනුවෙන් Rule-based නීති මාලාවක් ලබා දෙන්නේ නැහැ (එවැනි නීති පූසන්ටද පොදු බැවින්). ඒ වෙනුවට, **Convolutional Neural Networks (CNN)** වැනි Deep Learning තාක්ෂණික ක්‍රමවේද හරහා බල්ලන්ගේ ඡායාරූප දහස් ගණනක් පරිගණකයට ලබා දී ඒ හරහා ස්වයංක්‍රීයව රටා හඳුනාගැනීමට (Pattern Recognition) සලස්වනු ලබනවා. 

![](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1779905378107-gemini-generated-image-wbeb3bwbeb3bwbeb.png)

---

එකම වෙනස වන්නේ, කුඩා දරුවෙකුට ඡායාරූප 5ක් 10ක් පෙන්වීමෙන් ඉගෙනගත හැකි වුවද, AI ආකෘතියකට ඉහළ නිරවද්‍යතාවයක් ලබා ගැනීමට ඉතා විශාල දත්ත කට්ටලයක් (Large Dataset) අවශ්‍ය වීමයි.

## අපේ එදිනෙදා ජීවිතේ මේවා භාවිතාවන අවස්ථා 🌍

තාක්ෂණික සංකල්ප වලින් එහාට ගියහම, ඔබ නොදැනුවත්වම එදිනෙදා ජීවිතයේදී මේ දේවල් භාවිත කරනවා.

*   **Social Media Filters (Snapchat / Instagram / TikTok):** ඔබ හිස හරවන විට හෝ කතා කරන විට ඒ අනුව වෙනස් වන මුහුණු ෆිල්ටර ක්‍රියාත්මක වන්නේ, Computer Vision හරහා ඔබගේ මුහුණේ ජ්‍යාමිතික ලක්ෂණ Real-time නිරීක්ෂණය කරන බැවිනි.
  
*   **Self-Driving Cars (ස්වයංක්‍රීය වාහන):** ටෙස්ලා වැනි වාහන වල ඇති කැමරා පද්ධති හරහා මාර්ගය, අනෙකුත් වාහන, පදිකයින් සහ මාර්ග සංඥා හඳුනාගැනීමට Object Detection තාක්ෂණය යොදාගනී.
  
*   **Amazon Go Stores:** මෙවැනි සුපිරි වෙළඳසැල් වල මුදල් අයකැමිවරයෙකු (Cashier) නොමැත. පාරිභෝගිකයා රාක්කයෙන් ලබාගන්නා භාණ්ඩ වෙළඳසැලේ ඇති කැමරා හරහා හඳුනාගෙන, ස්වයංක්‍රීයවම බිල්පත සකස් කිරීම Computer Vision හරහා සිදු වේ.

## අභියෝග සහ විනෝදාත්මක ගැටලු (The Chihuahua vs. Muffin Problem) 

පරිගණක කෙතරම් දියුණු වුවද, සමහර අවස්ථාවලදී ඒවා ඉතා සරල දේවල් වලදී පවා ව්‍යාකූල විය හැකියි. 

Computer Vision පර්යේෂකයන් මුහුණ දුන් සම්භාව්‍ය ගැටලුවක් වූයේ [Chihuahua වර්ගයේ බල්ලන් සහ Blueberry Muffins වෙන් කර හඳුනාගැනීමයි](https://www.freecodecamp.org/news/chihuahua-or-muffin-my-search-for-the-best-computer-vision-api-cbda4d6b425d/). බල්ලාගේ ඇස් සහ නාසය, මෆින් එකේ ඇති බ්ලූබෙරි ඇට වලට බෙහෙවින් සමාන බැවින්, පරිගණකය මෙම රූප දෙක පටලවා ගනු ලැබුවා.

![](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1779905482073-gemini-generated-image-1psyi31psyi31psy.png)

---

කෙසේ වෙතත්, වර්තමානය වන විට දත්ත කට්ටල වල ගුණාත්මකභාවය සහ ඇල්ගොරිතම වල දියුණුව හේතුවෙන් මෙවැනි ගැටලු බොහෝ දුරට අවම වී ඇත.

## මගේ අදහස... 💡

Computer Vision කියන්නේ අද වෙද්දි සයන්ස් ෆික්ෂන් (Sci-Fi) චිත්‍රපට වලට පමණක් සීමා වූ දෙයක් නෙවෙයි. වෛද්‍යවරුන්ට පිළිකා සෛල කල්තියා හඳුනාගැනීමටත්, කෘෂිකර්මාන්තයේදී රෝගී වූ ශාක හඳුනාගැනීමටත් මේ වනවිටත් මෙම තාක්ෂණය සාර්ථකව යොදාගැනෙනවා. 

අනාගතයේදී Apple Vision Pro වැනි Augmented Reality (AR) උපාංග සමග Computer Vision තාක්ෂණය තවත් දියුණු වී අප ලෝකය දකින ආකාරය සම්පූර්ණයෙන්ම වෙනස් කරනු ඇති බව මගේ පෞද්ගලික විශ්වාසයයි. ඊළඟ වතාවේ ඔබගේ ජංගම දුරකථනයෙන් ඡායාරූපයක් ගන්නා විට, ඒ පිටුපස ඇති සංකීර්ණ සහ දැවැන්ත ක්‍රියාවලිය පිළිබඳව මොහොතක් සිතා බලන්න.

කවදා හෝ දිනෙක පරිගණක වලට මිනිස් ඇසට වඩා නිරවද්‍ය ලෙස ලෝකය දැකිය හැකි වෙයිද? **ඔබේ අදහස පහතින් කමෙන්ට් කරන්න!** 👇

---
*(ඔබට මෙම ලිපිය වැදගත් වුණා නම් යහළුවන් සමග Share කරන්නට අමතක කරන්න එපා!)*