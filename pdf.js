const handlePdf =() =>{
    const doctor_id = new URLSearchParams(window.location.search).get('doctorId');
    console.log(doctor_id)
    const user_id = localStorage.getItem('user_id');
    fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
    .then((res) => res.json())
    .then((data)=>{
        fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
        .then((res) => res.json())
        .then((pddata)=>{
            const newData = [data, pddata];
            console.log(newData);
            const parent = document.getElementById('pdf-container')
            const div = document.createElement('div');
            div.innerHTML=`
            <div
            class="text-center d-flex justify-content-center align-items-center"
            >
                <div class="patient">
                    <h2>${newData[1].username}</h2>
                    <h4>${newData[1].first_name} ${newData[1].last_name}</h4>
                    <h4>${newData[1].email}</h4>
                </div>
                <div class="doctor">
                   <img class='w-25' src=${newData[0].image} alt='image' />
                    <h2>${newData[0].full_name}</h2>
                    <h4>${newData[0].full_name}</h4></h4>
                    <h4>${newData[0].full_name}</h4>
                </div>
            </div>
            <input class="symptom text-center mt-5" type="text" />
            <h2 class="text-center mt-5">Fees:${newData[0].fee} </h2>
            `
            parent.appendChild(div);
            console.log(newData);
            donwloadPdf();
        });
    })
}



const donwloadPdf = () => {
    const element = document.getElementById("pdf-container");
  
    // Define the options for html2pdf
    const options = {
      margin: 10,
      filename: "appt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
  
    // Use html2pdf to generate and download the PDF
      html2pdf(element, options);
      
  };

handlePdf()