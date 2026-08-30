අපි හැමෝම අද AI ගැන කතා කළාට, මේ හැමදේකම පටන්ගත්තෙ කොතනින්ද කියලා ඔයා කවදාහරි හිතලා තියෙනවද? අද අපි කතා කරන්න යන්නේ  AI වල හදවත වන Neural Networks වල ආරම්භයේ ඉඳන්ම කතාවයි. ඒ කියන්නේ සරල Perceptron එකක ඉඳන් Multi-Layer Perceptron (MLP) එකක් දක්වා AI එකක් දියුණු වුණු හැටි .

## මිනිස් මොළයෙන් පරිගණකයට (Biological Inspiration)

පරිගණකයකට හිතන්න පුරුදු කරන්න කලින්, විද්‍යාඥයන්ට ඕන වුණේ අපේ මොළය වැඩ කරන්නේ කොහොමද කියලා තේරුම් ගන්නයි. අපේ මොළයේ තියෙනවා <mark>නියුරෝන (Biological Neurons)</mark> බිලියන ගණනක්. මේවා එකිනෙකට සම්බන්ධ වෙලා තමයි අපි හිතන දේවල්, කරන දේවල් පාලනය කරන්නේ.

මේ සංකල්පය පදනම් කරගෙන තමයි 1958 දී Frank Rosenblatt කියන විද්‍යාඥයා විසින් ලොව පළමු කෘත්‍රිම නියුරෝනය වෙන Perceptron එක හඳුන්වා දුන්නේ. ඇත්තටම ජීව විද්‍යාත්මක නියුරෝනයක් කෘත්‍රිම නියුරෝනයකට සමාන වෙන්නේ මෙහෙමයි

*  Dendrite = කෘත්‍රිම නියුරෝනයට දත්ත ලබාදෙන (Inputs) මාර්ගය.
*  Cell Body = ලැබෙන දත්ත එකතු කරලා ගණනය කරන තැන (Summation).
*  Axon = අවසාන තීරණය පිටතට දෙන මාර්ගය (Output).

![Biological Neuron vs Artificial Neuron](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1788089049435-1hkyltodpjjgo32docown5w.png)
<sub><a href="https://towardsdatascience.com/the-concept-of-artificial-neurons-perceptrons-in-neural-networks-fab22249cbfc/">Towards Data Science</a></sub>

## Perceptron එකක් ගණනය කිරීම් කරන්නේ කොහොමද?

කෘත්‍රිම නියුරෝනයක් ඇතුළේ ඇත්තටම වෙන්නේ සරල ගණිත කර්මයක්. මේක තේරුම් ගන්න අපි ප්‍රධාන කොටස් 3ක් බලමු

* Inputs $$(x_1, x_2)$$ අපි නියුරෝනයට ලබා දෙන දත්ත. (උදාහරණයක් විදිහට ගෙදරක වර්ග අඩිය සහ කාමර ගණන). 
* Weights $$w_1, w_2$$ ලැබෙන එක් එක් දත්තයට තියෙන වැදගත්කම (Strength). ගෙදරක මිල තීරණය කරද්දී කාමර ගණනට වඩා වර්ග අඩිය වැදගත් නම් ඒකේ weight එක වැඩියි.
* Bias $$b$$ තීරණයක් ගැනීමට අවශ්‍ය මූලික එළිපත්ත (Threshold). මේක හරියට කිසිම input එකක් නැති වුණත් තියෙන base value එක වගේ.

මේ ඔක්කොම එකතු වුණාම හැදෙන මූලික සමීකරණය තමයි $$z = w_1 x_1 + w_2 x_2 + b$$ මේ තනි නියුරෝනයකින් (Perceptron) කරන්නේ ප්‍රස්ථාරයක තියෙන දත්ත දෙපසට බෙදන්න පුළුවන් සරල තනි ඉරක් (Decision Boundary) ඇඳීම පමණයි.
```widget
<div id="nn-widget-container" style="display: flex; justify-content: center; width: 100%; margin: 30px 0;">
  <div class="nn-widget-box" style="width: 100%; max-width: 900px; background: #ffffff; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); padding: 25px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e2e8f0;">
    
    <div class="nn-header" style="text-align: center; margin-bottom: 25px;">
      <h2 style="margin: 0; color: #1a202c; font-size: 26px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px;">
        🧠 Advanced Perceptron Simulator
      </h2>
      <p style="margin: 8px 0 0; color: #4a5568; font-size: 15px;">
        ස්වයංක්‍රීය පුහුණුවීම (Auto-Train) සහ Decision Regions සහිත ආකෘතිය
      </p>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 25px; margin-bottom: 15px;">
      
      <!-- Coordinate Plane Canvas -->
      <div style="flex: 1.3; min-width: 300px; display: flex; flex-direction: column; align-items: center; background: #f8fafc; padding: 20px; border-radius: 15px; border: 1px solid #e2e8f0; position: relative;">
        
        <canvas id="nn-canvas" width="360" height="360" style="background-color: #fff; border-radius: 10px; max-width: 100%; height: auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.06); border: 1px solid #cbd5e0;"></canvas>
        
        <div style="display: flex; gap: 10px; width: 100%; justify-content: space-between; margin-top: 15px;">
            <div id="accuracy-badge" style="background: #3182ce; color: white; padding: 8px 15px; border-radius: 8px; font-size: 14px; font-weight: bold; flex: 1; text-align: center; display: flex; align-items: center; justify-content: center;">
                Accuracy: 0%
            </div>
            <button id="btn-train" onclick="toggleTrain()" style="background: #805ad5; color: white; padding: 8px 15px; border-radius: 8px; font-size: 14px; font-weight: bold; border: none; cursor: pointer; flex: 1; transition: all 0.2s; box-shadow: 0 4px 6px rgba(128, 90, 213, 0.3);">
                🤖 Auto Train
            </button>
        </div>
        
      </div>

      <!-- Controls Area -->
      <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
        
        <div style="background: #f7fafc; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #edf2f7;">
            <h4 style="margin: 0 0 10px 0; color: #2d3748; font-size: 15px;">1. Logic Gate තෝරන්න</h4>
            <div style="display: flex; gap: 6px; margin-bottom: 15px; flex-wrap: wrap;">
                <button onclick="setGate('AND')" id="btn-and" class="gate-btn active">AND</button>
                <button onclick="setGate('OR')" id="btn-or" class="gate-btn">OR</button>
                <button onclick="setGate('NAND')" id="btn-nand" class="gate-btn">NAND</button>
                <button onclick="setGate('NOR')" id="btn-nor" class="gate-btn">NOR</button>
                <button onclick="setGate('XOR')" id="btn-xor" class="gate-btn" style="color: #c53030;">XOR ⚠️</button>
            </div>
            
            <div id="equation-display" style="background: #2d3748; color: #48bb78; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 14px; text-align: center; font-weight: bold;">
                z = (1.0)x₁ + (1.0)x₂ + (-1.5)
            </div>
        </div>

        <div>
          <h4 style="margin-top: 0; color: #2d3748; font-size: 15px; margin-bottom: 15px;">2. පරාමිතීන් (Weights & Bias)</h4>
          
          <div class="slider-group">
            <div class="slider-header">
              <span>Weight 1 (w₁):</span>
              <span id="val-w1" class="val-text">1.0</span>
            </div>
            <input type="range" id="slider-w1" min="-5" max="5" step="0.1" value="1.0">
          </div>

          <div class="slider-group">
            <div class="slider-header">
              <span>Weight 2 (w₂):</span>
              <span id="val-w2" class="val-text">1.0</span>
            </div>
            <input type="range" id="slider-w2" min="-5" max="5" step="0.1" value="1.0">
          </div>

          <div class="slider-group">
            <div class="slider-header">
              <span>Bias (b):</span>
              <span id="val-b" class="val-text" style="color: #e53e3e; background: #fff5f5;">-1.5</span>
            </div>
            <input type="range" id="slider-b" min="-5" max="5" step="0.1" value="-1.5" style="accent-color: #e53e3e;">
          </div>
        </div>

        <div id="xor-warning" style="display: none; background: #fff5f5; border: 1px solid #feb2b2; color: #c53030; padding: 12px; border-radius: 8px; font-size: 13.5px; line-height: 1.5; margin-top: auto;">
          <strong>අවධානයට:</strong> XOR ගැටලුව රේඛීයව වෙන් කළ නොහැක (Non-linearly separable). තනි Perceptron එකක් මගින් මෙය විසඳිය නොහැකි අතර ඒ සඳහා Hidden Layers සහිත Multi-Layer Perceptron (MLP) එකක් අවශ්‍ය වේ!
        </div>

      </div>
    </div>
  </div>

  <style>
    .gate-btn {
        flex: 1; min-width: 50px; padding: 8px 5px; background: #edf2f7; color: #4a5568; 
        border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; font-weight: bold; transition: 0.2s;
    }
    .gate-btn:hover { background: #e2e8f0; }
    .gate-btn.active { background: #3182ce; color: #fff; border-color: #2b6cb0; }
    
    .slider-group { margin-bottom: 18px; }
    .slider-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: bold; color: #4a5568; margin-bottom: 8px; }
    .val-text { color: #3182ce; background: #ebf8ff; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
    input[type=range] { width: 100%; accent-color: #3182ce; cursor: pointer; }
  </style>

</div>

<script>
  (function() {
    const canvas = document.getElementById('nn-canvas');
    const ctx = canvas.getContext('2d');
    const badge = document.getElementById('accuracy-badge');
    const warning = document.getElementById('xor-warning');
    const eqDisplay = document.getElementById('equation-display');
    const btnTrain = document.getElementById('btn-train');

    const sW1 = document.getElementById('slider-w1');
    const sW2 = document.getElementById('slider-w2');
    const sB = document.getElementById('slider-b');

    const vW1 = document.getElementById('val-w1');
    const vW2 = document.getElementById('val-w2');
    const vB = document.getElementById('val-b');

    let currentGate = 'AND';
    let trainInterval = null;
    let isTraining = false;

    // Logic Gate Definitions
    const gates = {
      'AND':  [ {x1: 0, x2: 0, y: 0}, {x1: 0, x2: 1, y: 0}, {x1: 1, x2: 0, y: 0}, {x1: 1, x2: 1, y: 1} ],
      'OR':   [ {x1: 0, x2: 0, y: 0}, {x1: 0, x2: 1, y: 1}, {x1: 1, x2: 0, y: 1}, {x1: 1, x2: 1, y: 1} ],
      'NAND': [ {x1: 0, x2: 0, y: 1}, {x1: 0, x2: 1, y: 1}, {x1: 1, x2: 0, y: 1}, {x1: 1, x2: 1, y: 0} ],
      'NOR':  [ {x1: 0, x2: 0, y: 1}, {x1: 0, x2: 1, y: 0}, {x1: 1, x2: 0, y: 0}, {x1: 1, x2: 1, y: 0} ],
      'XOR':  [ {x1: 0, x2: 0, y: 0}, {x1: 0, x2: 1, y: 1}, {x1: 1, x2: 0, y: 1}, {x1: 1, x2: 1, y: 0} ]
    };

    window.setGate = function(gate) {
      if(isTraining) toggleTrain();
      currentGate = gate;
      
      document.querySelectorAll('.gate-btn').forEach(btn => {
          btn.classList.remove('active');
          if(btn.innerText.includes(gate)) btn.classList.add('active');
      });

      warning.style.display = gate === 'XOR' ? 'block' : 'none';
      draw();
    };

    // Coordinate Mappings
    function mapX(x) { return 60 + x * 240; }
    function mapY(y) { return 300 - y * 240; }
    function unmapX(px) { return (px - 60) / 240; }
    function unmapY(py) { return (300 - py) / 240; }

    function draw() {
      const w1 = parseFloat(sW1.value);
      const w2 = parseFloat(sW2.value);
      const b = parseFloat(sB.value);

      vW1.innerText = w1.toFixed(1);
      vW2.innerText = w2.toFixed(1);
      vB.innerText = b.toFixed(1);
      
      const signB = b >= 0 ? '+' : '-';
      eqDisplay.innerText = `z = (${w1.toFixed(1)})x₁ + (${w2.toFixed(1)})x₂ ${signB} ${Math.abs(b).toFixed(1)}`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Decision Regions (Optimized step=6 for smoother performance)
      ctx.fillStyle = 'rgba(229, 62, 62, 0.1)'; // Red area (0)
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(49, 130, 206, 0.15)'; // Blue area (1)
      const step = 6;
      for (let px = 0; px <= canvas.width; px += step) {
          for (let py = 0; py <= canvas.height; py += step) {
              const mx = unmapX(px);
              const my = unmapY(py);
              if (w1 * mx + w2 * my + b >= 0) {
                  ctx.fillRect(px, py, step, step);
              }
          }
      }

      // 2. Draw Grid & Axes
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let i = -0.5; i <= 1.5; i += 0.5) {
        ctx.beginPath(); ctx.moveTo(mapX(i), mapY(-0.5)); ctx.lineTo(mapX(i), mapY(1.5)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mapX(-0.5), mapY(i)); ctx.lineTo(mapX(1.5), mapY(i)); ctx.stroke();
      }

      ctx.strokeStyle = '#a0aec0';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mapX(-0.5), mapY(0)); ctx.lineTo(mapX(1.5), mapY(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mapX(0), mapY(-0.5)); ctx.lineTo(mapX(0), mapY(1.5)); ctx.stroke();

      ctx.fillStyle = '#4a5568';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText("x₁", mapX(1.3), mapY(0) + 15);
      ctx.fillText("x₂", mapX(0) - 20, mapY(1.3));

      // 3. Draw Decision Boundary Line
      if (Math.abs(w2) > 0.001 || Math.abs(w1) > 0.001) {
          ctx.strokeStyle = '#2d3748';
          ctx.lineWidth = 3;
          ctx.beginPath();
          if (Math.abs(w2) > 0.001) {
              const xA = -0.5, yA = (-w1 * xA - b) / w2;
              const xB = 1.5, yB = (-w1 * xB - b) / w2;
              ctx.moveTo(mapX(xA), mapY(yA));
              ctx.lineTo(mapX(xB), mapY(yB));
          } else {
              const xLine = -b / w1;
              ctx.moveTo(mapX(xLine), mapY(-0.5));
              ctx.lineTo(mapX(xLine), mapY(1.5));
          }
          ctx.stroke();
      }

      // 4. Draw Data Points and calculate Accuracy
      const data = gates[currentGate];
      let correct = 0;

      data.forEach(pt => {
        const val = w1 * pt.x1 + w2 * pt.x2 + b;
        const pred = val >= 0 ? 1 : 0;
        const isCorrect = pred === pt.y;
        if (isCorrect) correct++;

        const px = mapX(pt.x1);
        const py = mapY(pt.x2);

        // Glow indicator
        ctx.beginPath();
        ctx.arc(px, py, 18, 0, Math.PI * 2);
        ctx.fillStyle = isCorrect ? 'rgba(72, 187, 120, 0.3)' : 'rgba(245, 101, 101, 0.4)';
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = pt.y === 1 ? '#3182ce' : '#e53e3e';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Node label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pt.y.toString(), px, py);
      });

      const acc = (correct / 4) * 100;
      badge.innerText = `Accuracy: ${acc}%`;
      badge.style.background = acc === 100 ? '#38a169' : (acc >= 75 ? '#d69e2e' : '#e53e3e');
      
      if(acc === 100 && isTraining) {
          toggleTrain(); 
      }
    }

    // Perceptron Learning Rule
    window.toggleTrain = function() {
        if(!isTraining && currentGate === 'XOR') {
            warning.style.display = 'block';
            warning.style.borderColor = '#e53e3e';
            warning.style.boxShadow = '0 0 10px rgba(229, 62, 62, 0.3)';
            setTimeout(() => { warning.style.boxShadow = 'none'; }, 1000);
            return;
        }

        isTraining = !isTraining;
        if(isTraining) {
            btnTrain.innerText = "🛑 Stop Training";
            btnTrain.style.background = "#e53e3e";
            trainInterval = setInterval(trainStep, 100);
        } else {
            btnTrain.innerText = "🤖 Auto Train";
            btnTrain.style.background = "#805ad5";
            clearInterval(trainInterval);
        }
    }

    function trainStep() {
        let w1 = parseFloat(sW1.value);
        let w2 = parseFloat(sW2.value);
        let b = parseFloat(sB.value);
        const lr = 0.2;

        const data = gates[currentGate];
        // Find misclassified points first
        const errors = data.filter(pt => ((w1 * pt.x1 + w2 * pt.x2 + b >= 0 ? 1 : 0) !== pt.y));

        if (errors.length > 0) {
            const pt = errors[Math.floor(Math.random() * errors.length)];
            const z = w1 * pt.x1 + w2 * pt.x2 + b;
            const pred = z >= 0 ? 1 : 0;
            const error = pt.y - pred;

            w1 += lr * error * pt.x1;
            w2 += lr * error * pt.x2;
            b += lr * error;

            w1 = Math.max(-5, Math.min(5, w1));
            w2 = Math.max(-5, Math.min(5, w2));
            b = Math.max(-5, Math.min(5, b));

            sW1.value = w1;
            sW2.value = w2;
            sB.value = b;
            draw();
        }
    }

    [sW1, sW2, sB].forEach(el => {
        el.addEventListener('input', () => {
            if(isTraining) toggleTrain();
            draw();
        });
    });
    
    setGate('AND');
  })();
</script>
```

## The XOR Problem & AI Winter

Perceptron එක මුලින්ම ආපු කාලේ හැමෝම හිතුවේ මේකෙන් ලෝකේ පෙරළන්න පුළුවන් වෙයි කියලා. සරල Logic Gates වෙන AND, OR, NAND, NOR වගේ දේවල් තනි සරල රේඛාවකින් වෙන් කරන්න (Linear Separability) මේකට පුළුවන් වුණා.

හැබැයි මේකේ ලොකු සීමාවක් තිබුණා. ඒ තමයි XOR ගේට්ටුව. XOR ගේට්ටුවේ ප්‍රතිදානයන් තනි සරල රේඛාවකින් කවදාවත්ම වෙන් කරන්න බැහැ. 1969 දී Marvin Minsky සහ Seymour Papert කියන පර්යේෂකයන් දෙන්නා පොතක් ලියලා මුළු ලෝකෙටම පෙන්නලා දුන්නා "මේ Perceptron එකකට XOR වගේ සරල දෙයක්වත් කරගන්න බැහැ" කියලා.
![linear vs non-linear separability xor problem coordinate plane](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1788090241497-linearly-and-non-linearly-separable-tlu.webp)
<sub><a href="https://www.researchgate.net/figure/linearly-and-non-linearly-separable-TLU_fig11_323118197">Source Image</a></sub>

## Multi-Layer Perceptron (MLP)

AI Winter එකෙන් ගොඩ එන්න විද්‍යාඥයෝ අපූරු විසඳුමක් ගෙනාවා. ඒ තමයි තනි නියුරෝනයක් පාවිච්චි කරනවා වෙනුවට, නියුරෝන කිහිපයක් ස්ථර (Layers) විදිහට එකතු කරන එක. මේකට කිව්වා Multi-Layer Perceptron (MLP) කියලා.

මේකේ ප්‍රධාන ස්ථර 3ක් තියෙනවා
1. Input Layer: මුල් දත්ත ලබා ගන්නා ස්ථරය.
2. Hidden Layer(s): දත්තවල ඇති සංකීර්ණ රටා හඳුනා ගන්නා රහසිගත ස්ථරය.
3. Output Layer: අවසාන තීරණය ලබා දෙන ස්ථරය.

මේ විදිහට Hidden Layer එකක් එකතු කළාම ඒකට ඕනෑම සංකීර්ණ ගණිතමය Function එකක් ඉගෙන ගන්න පුළුවන් හැකියාව ලැබුණා. මේකට ගණිතයේදී කියන්නේ Universal Approximation Theorem කියලයි. ඒ කියන්නේ අර කලින් බැහැයි කියපු XOR ගැටළුව වගේ ඕනෑම සංකීර්ණ දෙයක් දැන් මේකට විසඳන්න පුළුවන්!

![Multi-Layer Perceptron Diagram](https://raw.githubusercontent.com/sh4lu-z/sh4lu-z.github.io/main/assets/blog-images/1788090475333-images-1-.jpg)
<sub><a href="https://www.researchgate.net/figure/Multi-Layer-Perceptron-MLP-diagram-with-four-hidden-layers-and-a-collection-of-single_fig1_334609713">Source Image</a></sub>

## Activation Functions 

Layer කීයක් තිබුණත්, අපි Activation Function එකක් පාවිච්චි කළේ නැත්නම් මුළු නියුරල් ජාලයම නිකන්ම නිකන් සරල Linear සමීකරණයක් (තනි සරල රේඛාවක්) බවට පත් වෙනවා. ඒ නිසා නියුරෝනයකට පණ දීලා සංකීර්ණ දේවල් හිතන්න පුරුදු කරන්නේ Activation Functions හරහායි.

භාවිතා වෙන ප්‍රධාන වර්ග කිහිපයක් මෙන්න

* Sigmoid: ලැබෙන Output එක 0 සහ 1 අතර අගයකට සීමා කරනවා.
* ReLU (Rectified Linear Unit) $$f(z) = \max(0, z)$$  — මේක තමයි නූතන AI (Deep Learning) වල බහුලවම භාවිත වන වේගවත්ම ක්‍රමය. සෘණ අගයක් ආවොත් 0 කරනවා, ධන අගයක් ආවොත් ඒකම එළියට දෙනවා.
* Softmax: Multi-class classification (බළලෙක්ද, බල්ලෙක්ද, කුරුල්ලෙක්ද වගේ තෝරාගැනීම් කිහිපයක්) වලදී එක එක දේට අදාළ සම්භාවිතාව (Probability %) ලබා ගන්න පාවිච්චි කරනවා.

## Forward Propagation සහ Loss Function 
අපි දත්තයක් Input එකෙන් දුන්නාම, ඒක Weights, Biases සහ Activation Functions ඔක්කොම පහු කරගෙන Output එක දක්වා ගලාගෙන යන ක්‍රියාවලියට කියන්නේ Forward Propagation කියලයි.
හැබැයි මුලදී කවදාවත් AI එක හරියටම උත්තරේ දෙන්නේ නැහැ. ලැබුණු Output එක සහ ඇත්තම සැබෑ පිළිතුර (Ground Truth) අතර තියෙන වෙනස කොච්චරද කියලා මනින්න අපි පාවිච්චි කරනවා Loss Function එකක්. (උදාහරණයක් විදිහට Mean Squared Error හෝ Cross-Entropy).
ආරම්භයේදී Weights වල තියෙන්නේ random අගයන් නිසා නියුරල් ජාලය දෙන පිළිතුරු ගොඩක් වෙලාවට වැරදියි. ඒ නිසා මුලදී Loss එක ඉතා විශාල අගයක් ගන්නවා.

#### Conclusion
අද අපි තනි Perceptron එකක් වැඩ කරන විදිහේ ඉඳන්, AI Winter එකට හේතු වුණු XOR ගැටලුව සහ ඊට පස්සේ Multi-Layer Perceptron (MLP) එකක් හරහා ඒක විසඳගත්ත හැටි කතා කළා.
හැබැයි දැන් ඔයාට ලොකු ප්‍රශ්නයක් එන්න ඕනේ... 🤔 <mark>නියුරල් ජාලය තමන් කරපු වැරැද්ද (Loss එක) බලාගෙන, තමන්ගේ Weights තනියම වෙනස් කරගෙන, හරියටම උත්තරේ දෙන්න තනියම හැදෙන්නේ (Learn කරන්නේ) කොහොමද?</mark>
<sub>Part 2 - Backpropagation සහ Gradient Descent.</sub>