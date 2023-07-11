function knapsackDinamico(items, capacity) {
  const n = items.length;
  const dpTable = [];

  for (let i = 0; i <= n; i++) {
    dpTable[i] = [];
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        dpTable[i][w] = 0;
      } else if (items[i - 1].weight <= w) {
        const remainingCapacity = w - items[i - 1].weight;
        dpTable[i][w] = Math.max(
          items[i - 1].value + dpTable[i - 1][remainingCapacity],
          dpTable[i - 1][w]
        );
      } else {
        dpTable[i][w] = dpTable[i - 1][w];
      }
    }
  }

  let remainingCapacity = capacity;
  const selectedItems = [];

  for (let i = n; i > 0 && remainingCapacity > 0; i--) {
    if (dpTable[i][remainingCapacity] !== dpTable[i - 1][remainingCapacity]) {
      selectedItems.push(items[i - 1].name);
      remainingCapacity -= items[i - 1].weight;
    }
  }

  return {
    maxValue: dpTable[n][capacity],
    selectedItems: selectedItems.reverse()
  };
}

const items = [
  { name: "Cama King Size", value: 3000, weight: 30 },
  { name: "TV 70 polegadas", value: 2500, weight: 7 },
  { name: "Fogão 6 bocas", value: 3210, weight: 25 },
  { name: "Lava Roupa", value: 1000, weight: 18 },
  { name: "Mesa", value: 750, weight: 4 },
  { name: "Notebook", value: 4000, weight: 2 }
];


document.getElementById('start').addEventListener('click', function() {
  const capacity = document.getElementById("capacity").value

  const result = knapsackDinamico(items, capacity);
  let resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = `<p>Valor máximo colocado na mochila: ${result.maxValue}</p>
  <br><br>
                  <p>Itens que foram selecionados: ${result.selectedItems}</p>`
})
