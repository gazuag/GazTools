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
        try {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const cache = await caches.open('dictionaryCache');

            const fetchAndCache = async (url) => {
                try {
                    const response = await fetch(url);
                    await cache.put(url, response.clone());
                    return await response.json();
                } catch (error) {
                    console.error(`Error fetching and caching ${url}:`, error);
                }
            };

            const [data1, data2, data3, data4] = await Promise.all([
                fetchAndCache('/pinyinize/pinyin1.json'),
                fetchAndCache('/pinyinize/pinyin2.json'),
                fetchAndCache('/pinyinize/pinyin3.json'),
                fetchAndCache('/pinyinize/pinyin4plus.json')
            ]);
               dictionary1 = data1;
            dictionary2 = data2;
            dictionary3 = data3;
            dictionary4Plus = data4;
        } else {
            console.error('Service workers are not supported in this browser.');
        }
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}



















