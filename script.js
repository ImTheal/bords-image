// URL du webhook n8n
const webhookUrl = 'https://n8n.shizuku.fr/webhook/7d013591-566f-41f1-bb17-bb8ae177a449'; // Remplacez par votre URL
document.getElementById("uploadForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];
    
    if (!file) {
        alert("Veuillez sélectionner une image à uploader.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ajoute le fichier sous le nom "file"
    try {
        document.getElementById("starterbut").disabled = true;
        fetch(webhookUrl,{
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            // Afficher le message de succès
            statusMessage.innerText = "Image envoyée avec succès !";
            statusMessage.style.color = "green";
            downloadImage(data.lien)
        });
        
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
        document.getElementById("statusMessage").innerText = "Erreur lors de l'envoi.";
        document.getElementById("statusMessage").style.color = "red";
    }
});

function downloadImage(source){
    link=document.createElement('a');
    link.href = source;
    link.download = 'mon_image.jpg'; // Spécifiez le nom du fichier souhaité
    link.click();
}