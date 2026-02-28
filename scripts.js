

async function processPrescription() {
    const fileInput = document.getElementById("prescriptionFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a prescription image!");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function () {
        const base64Image = reader.result.split(",")[1];

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + 'AIzaSyDu45BEDhpCVMxmBjSKA0e56Jbn7q21LbQ',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: "Extract medicine names and dosage from this prescription" },
                                {
                                    inline_data: {
                                        mime_type: file.type,
                                        data: base64Image
                                    }
                                }
                            ]
                        }]
                    })
                }
            );
           
            const data = await response.json();
            console.log('ApI RESPONSE:',data);

            const text = JSON.strringnify(data);

            if (!text) {
                alert('No mediciness extracted');
                return;
            }

    
            const medicines = text.split('\n').filter(m => m.trim() !== '');
            const list = document.getElementById("medicineList");
            list.innerHTML = "";

            
            medicines.forEach(med => {
                const li = document.createElement('li');
                li.textContent = med;
                list.appendChild(li);
            });
            

            

           

        } catch (error) {
            console.error(error);
            alert("Error extracting medicines");
        }
    };

    reader.readAsDataURL(file);
}


