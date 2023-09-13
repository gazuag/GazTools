// Define dictionaries
let dictionary4Plus = {};
let dictionary3 = {};
let dictionary2 = {};
let dictionary1 = {};
let corrections = {
    " 。":". ",
    "；":"; ",
    "：":": ",
    "-":"-",
    "“":"\"",
    "”":"\"",
    "！":"! ",
    "？":"? ",
    "、":", ",
    "，":", ",
    " ,": ",",
    " .": ".",
    " !":"!",
    " ?":"?",
    " ;":";",
    " :":":",
    "  ": " ",
}

// Function to load JSON dictionary files
async function loadDictionaries() {
    try {
        const cache = await caches.open('dictionaryCache');
        const responses = await Promise.all([
            fetch('/pinyinizer/pinyin1.json').then(response => cache.put('/pinyinizer/pinyin1.json', response.clone()).then(() => response.json())),
            fetch('/pinyinizer/pinyin2.json').then(response => cache.put('/pinyinizer/pinyin2.json', response.clone()).then(() => response.json())),
            fetch('/pinyinizer/pinyin3.json').then(response => cache.put('/pinyinizer/pinyin3.json', response.clone()).then(() => response.json())),
            fetch('/pinyinizer/pinyin4.json').then(response => cache.put('/pinyinizer/pinyin4.json', response.clone()).then(() => response.json()))
        ]);
        [dictionary1, dictionary2, dictionary3, dictionary4Plus] = responses;

/*        const [data4, data3, data2, data1] = await Promise.all([
            fetch('/pinyinize/pinyin4.json').then(response => response.json()),
            fetch('/pinyinize/pinyin3.json').then(response => response.json()),
            fetch('/pinyinize/pinyin2.json').then(response => response.json()),
            fetch('/pinyinize/pinyin1.json').then(response => response.json())
        ]);
        
        dictionary1 = data1;
        dictionary2 = data2;
        dictionary3 = data3;
        dictionary4Plus = data4;*/
    } catch (error) {
        console.error('Error loading dictionaries:', error);
    }
}

// Function to perform the conversion
function convert() {
    const inputText = document.getElementById('input').value;
    var outputText = inputText;
    // Iterate through dictionaries and replace matching strings
    const dictionaries = [dictionary4Plus, dictionary3, dictionary2, dictionary1, corrections];
    for (const dictionary of dictionaries) {
        for (const [key, value] of Object.entries(dictionary)) {
            outputText = outputText.split(key).join(value + " ");
        }
    }
    console.log(outputText);
    // Output the result
    document.getElementById('output').value = outputText;
}

// Load dictionaries on page load
window.addEventListener('load', loadDictionaries);

// Attach the convert function to the button click event
document.getElementById('convertButton').addEventListener('click', convert);





















