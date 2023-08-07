---
title: Generate side by side literature
permalink: /sbs/
---

<script>
  function loadArticlesAndGenerateTable(url1, url2) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  // Helper function to extract elements of a certain type from the DOM
  function extractElementsFromDOM(elements) {
    return Array.from(elements).map(element => ({
      type: element.tagName.toLowerCase(),
      content: element.outerHTML
    }));
  }

  // Ajax request to load the first article
  fetch(url1)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const elements1 = doc.querySelectorAll('p, img, h1, h2, h3');

      const data1 = extractElementsFromDOM(elements1);

      // Ajax request to load the second article
      fetch(url2)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const elements2 = doc.querySelectorAll('p, img, h1, h2, h3');

          const data2 = extractElementsFromDOM(elements2);

          // Generate the HTML table
          const numRows = Math.max(data1.length, data2.length);
          for (let i = 0; i < numRows; i++) {
            const row = document.createElement('tr');

            const cell1 = document.createElement('td');
            cell1.innerHTML = data1[i] ? data1[i].content : '';
            row.appendChild(cell1);

            const cell2 = document.createElement('td');
            cell2.innerHTML = data2[i] ? data2[i].content : '';
            row.appendChild(cell2);

            tbody.appendChild(row);
          }

          table.appendChild(tbody);
          // Append the table to the desired location in the DOM
          document.body.appendChild(table);
        });
    });
}
  loadArticlesAndGenerateTable("https://wol.jw.org/en/wol/d/r1/lp-e/2023406", "https://wol.jw.org/cmn-Hans/wol/d/r23/lp-chs/2023406");
</script>
Yo










