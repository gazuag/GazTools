---
permalink: /pinyinize/converter.js  
---
// Define dictionaries
let dictionary4Plus = {};
let dictionary3 = {};
let dictionary2 = {};
let dictionary1 = {};

// Function to load JSON dictionary files
async function loadDictionaries() {
    alert("foo");
    try {
        alert("trying");
        const [data4, data3, data2, data1] = await Promise.all([
            fetch('/pinyinize/pinyin4.json').then(response => response.json()),
            fetch('/pinyinize/pinyin3.json').then(response => response.json()),
            fetch('/pinyinize/pinyin2.json').then(response => response.json()),
            fetch('/pinyinize/pinyin1.json').then(response => response.json())
        ]);
        alert("promise");
        dictionary1 = data1;
        dictionary2 = data2;
        dictionary3 = data3;
        dictionary4Plus = data4;
        alert("loaded");
    } catch (error) {
        alert(error);
        console.error('Error loading dictionaries:', error);
    }
}

// Function to perform the conversion
function convert() {
    const inputText = document.getElementById('input').value;
    var outputText = inputText;


    // Iterate through dictionaries and replace matching strings
    const dictionaries = [dictionary4Plus, dictionary3, dictionary2, dictionary1];
    for (const dictionary of dictionaries) {
        outputText += "D";
        for (const [key, value] of Object.entries(dictionary)) {
            outputText += "R";
            // Use the replaceAll function to replace all occurrences of key with value
            outputText = outputText.split(key).join(value);
        }
    }
alert(outputText);
    // Output the result
    document.getElementById('output').value = outputText;
}

// Load dictionaries on page load
window.addEventListener('load', loadDictionaries);

// Attach the convert function to the button click event
document.getElementById('convertButton').addEventListener('click', convert);





















