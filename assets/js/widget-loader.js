function initNeuralNetworkWidget(container) {
  container.innerHTML = `
    <div class="blog-widget-box">
      <div class="nn-header">
        <h2>Neural Network Layer Visualizer</h2>
        <p>Adjust sliders to dynamically build the network connections.</p>
      </div>

      <div class="nn-controls">
        <label class="nn-control">
          <span>Input Neurons (N1)</span>
          <input type="range" min="1" max="10" value="4" data-role="input-neurons">
          <strong data-role="input-neurons-val">4</strong>
        </label>

        <label class="nn-control">
          <span>Hidden Layers Count (Lh)</span>
          <input type="range" min="1" max="5" value="2" data-role="hidden-layers">
          <strong data-role="hidden-layers-val">2</strong>
        </label>

        <label class="nn-control">
          <span>Neurons per Hidden Layer (Nh)</span>
          <input type="range" min="1" max="10" value="5" data-role="neurons-per-hidden">
          <strong data-role="neurons-per-hidden-val">5</strong>
        </label>

        <label class="nn-control">
          <span>Output Neurons (N2)</span>
          <input type="range" min="1" max="10" value="3" data-role="output-neurons">
          <strong data-role="output-neurons-val">3</strong>
        </label>
      </div>

      <div class="nn-visualization-area" data-role="nn-visualization-area">
        <canvas data-role="nn-canvas"></canvas>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-role="nn-canvas"]');
  const ctx = canvas.getContext("2d");
  const visualArea = container.querySelector('[data-role="nn-visualization-area"]');

  const inputSlider = container.querySelector('[data-role="input-neurons"]');
  const hiddenLayersSlider = container.querySelector('[data-role="hidden-layers"]');
  const hiddenNeuronSlider = container.querySelector('[data-role="neurons-per-hidden"]');
  const outputSlider = container.querySelector('[data-role="output-neurons"]');

  const inputVal = container.querySelector('[data-role="input-neurons-val"]');
  const hiddenLayersVal = container.querySelector('[data-role="hidden-layers-val"]');
  const hiddenNeuronVal = container.querySelector('[data-role="neurons-per-hidden-val"]');
  const outputVal = container.querySelector('[data-role="output-neurons-val"]');

  const NODE_RADIUS = 13;
  const NODE_COLOR = "#00BFFF";
  const LINE_COLOR = "rgba(0, 191, 255, 0.45)";
  const BORDER_COLOR = "#0f172a";
  const LABEL_COLOR = getComputedStyle(document.documentElement).getPropertyValue("--widget-label-color").trim() || "#111827";

  function getLayers() {
    const inputCount = Number.parseInt(inputSlider.value, 10);
    const hiddenLayerCount = Number.parseInt(hiddenLayersSlider.value, 10);
    const hiddenNodeCount = Number.parseInt(hiddenNeuronSlider.value, 10);
    const outputCount = Number.parseInt(outputSlider.value, 10);

    const layers = [inputCount];
    for (let i = 0; i < hiddenLayerCount; i++) layers.push(hiddenNodeCount);
    layers.push(outputCount);
    return layers;
  }

  function getNodeY(index, totalNodes, canvasHeight) {
    const padding = 30;
    const availableHeight = canvasHeight - padding * 2;
    const step = availableHeight / (totalNodes + 1);
    return padding + step * (index + 1);
  }

  function drawNetwork() {
    const width = canvas.width;
    const height = canvas.height;

    const cardBg = getComputedStyle(document.documentElement).getPropertyValue("--widget-canvas-bg").trim() || "#ffffff";
    ctx.fillStyle = cardBg;
    ctx.fillRect(0, 0, width, height);

    const layers = getLayers();
    const totalLayers = layers.length;
    const layerSpacing = width / (totalLayers + 1);

    for (let i = 0; i < totalLayers; i++) {
      const currentCount = layers[i];
      const currentX = layerSpacing * (i + 1);
      const nextCount = layers[i + 1];

      if (i < totalLayers - 1) {
        const nextX = layerSpacing * (i + 2);
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;

        for (let j = 0; j < currentCount; j++) {
          const startY = getNodeY(j, currentCount, height);
          for (let k = 0; k < nextCount; k++) {
            const endY = getNodeY(k, nextCount, height);
            ctx.beginPath();
            ctx.moveTo(currentX, startY);
            ctx.lineTo(nextX, endY);
            ctx.stroke();
          }
        }
      }

      for (let j = 0; j < currentCount; j++) {
        const nodeY = getNodeY(j, currentCount, height);
        ctx.beginPath();
        ctx.arc(currentX, nodeY, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = NODE_COLOR;
        ctx.fill();
        ctx.strokeStyle = BORDER_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.fillStyle = LABEL_COLOR;
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      const label = i === 0 ? "Input" : i === totalLayers - 1 ? "Output" : `Hidden ${i}`;
      ctx.fillText(label, currentX, height - 10);
    }
  }

  function syncLabelsAndDraw() {
    inputVal.textContent = inputSlider.value;
    hiddenLayersVal.textContent = hiddenLayersSlider.value;
    hiddenNeuronVal.textContent = hiddenNeuronSlider.value;
    outputVal.textContent = outputSlider.value;
    drawNetwork();
  }

  function resizeCanvas() {
    const displayWidth = Math.max(300, visualArea.clientWidth);
    const width = Math.min(760, displayWidth - 2);
    const height = Math.max(280, Math.round(width * 0.53));
    canvas.width = width;
    canvas.height = height;
    syncLabelsAndDraw();
  }

  [inputSlider, hiddenLayersSlider, hiddenNeuronSlider, outputSlider].forEach((input) => {
    input.addEventListener("input", syncLabelsAndDraw);
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}

const widgetRegistry = {
  "nn-layer-visualizer": initNeuralNetworkWidget
};

export function initWidgets(root = document) {
  const widgetNodes = root.querySelectorAll(".blog-widget[data-widget]");
  widgetNodes.forEach((node) => {
    if (node.dataset.widgetInitialized === "true") return;

    const widgetName = node.dataset.widget;
    const initFn = widgetRegistry[widgetName];
    if (!initFn) {
      node.innerHTML = `<p class="blog-widget-error">Unknown widget: ${widgetName}</p>`;
      node.dataset.widgetInitialized = "true";
      return;
    }

    try {
      initFn(node);
      node.dataset.widgetInitialized = "true";
    } catch (error) {
      console.error(`Failed to initialize widget ${widgetName}`, error);
      node.innerHTML = `<p class="blog-widget-error">Failed to load widget: ${widgetName}</p>`;
      node.dataset.widgetInitialized = "true";
    }
  });
}
