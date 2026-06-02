const fs = require('fs');

function updateImages(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    
    const products = [
        { title: "Pro Football Jersey 1", category: "football", index: 1 },
        { title: "Home Kit Jersey 2", category: "football", index: 2 },
        { title: "Away Kit Jersey 3", category: "football", index: 3 },
        { title: "Training Shirt 4", category: "football", index: 4 },
        { title: "Retro Jersey 5", category: "football", index: 5 },
        { title: "Goalkeeper Shirt 6", category: "football", index: 6 },
        { title: "Kids Football Kit 7", category: "football", index: 7 },
        { title: "Official Cricket Kit 1", category: "cricket", index: 1 },
        { title: "Test Match Shirt 2", category: "cricket", index: 2 },
        { title: "T20 Jersey 3", category: "cricket", index: 3 },
        { title: "ODI Kit 4", category: "cricket", index: 4 },
        { title: "Training Cricket Shirt 5", category: "cricket", index: 5 },
        { title: "Premium Cricket Kit 6", category: "cricket", index: 6 },
        { title: "Comfort Home T-Shirt 1", category: "tshirt", index: 1 },
        { title: "Graphic Printed T-Shirt 2", category: "tshirt", index: 2 },
        { title: "Plain Black T-Shirt 3", category: "tshirt", index: 3 },
        { title: "V-Neck Summer T-Shirt 4", category: "tshirt", index: 4 },
        { title: "Oversized T-Shirt 5", category: "tshirt", index: 5 },
        { title: "Polo T-Shirt 6", category: "tshirt", index: 6 },
        { title: "Essential White T-Shirt 7", category: "tshirt", index: 7 }
    ];

    products.forEach(p => {
        let prompt = "";
        if (p.category === "football") {
            prompt = `premium stylish football club jersey shirt, modern design, isolated on white background, cinematic studio lighting, high resolution, realistic photo, style ${p.index}`;
        } else if (p.category === "cricket") {
            prompt = `official national cricket team jersey shirt, modern design, isolated on white background, cinematic studio lighting, high resolution, realistic photo, style ${p.index}`;
        } else {
            prompt = `premium modern casual t-shirt clothing, isolated on white background, cinematic studio lighting, high resolution, realistic photo, style ${p.index}`;
        }
        
        const encodedPrompt = encodeURIComponent(prompt);
        const imgUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=600&height=800&nologo=true`;
        const dataImgUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=300&height=400&nologo=true`;
        
        let regex = new RegExp(`(<img src=")[^"]+(" alt="[^"]*">.*?>${p.title}</a></h3>.*?data-img=")[^"]+(")`, 'gsu');
        
        content = content.replace(regex, `$1${imgUrl}$2${dataImgUrl}$3`);
    });

    fs.writeFileSync(filename, content);
    console.log(`Updated ${filename} with AI generated images`);
}

updateImages('index.html');
updateImages('shop.html');
