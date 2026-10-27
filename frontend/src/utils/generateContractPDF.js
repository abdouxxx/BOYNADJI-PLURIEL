import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import logo from "../assets/logo.png";

const getLogo = () => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = logo;
        img.onload = () => resolve(img);
    });
};

const generateContractPDF = async (contract) => {

    const doc = new jsPDF("p", "mm", "a4");

    // ============================
    // Logo
    // ============================

    const logoImg = await getLogo();

    // ============================
    // Couleurs
    // ============================

    const blue = [15, 23, 42];
    const lightBlue = [37, 99, 235];
    const gray = [240, 240, 240];

    // ============================
    // Entête
    // ============================

    doc.setFillColor(...blue);
    doc.rect(0, 0, 210, 38, "F");

    doc.addImage(
        logoImg,
        "PNG",
        10,
        6,
        24,
        24
    );

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255);

    doc.setFontSize(22);
    doc.text("BACOUM HOLDING", 105, 15, {
        align: "center"
    });

    doc.setFontSize(11);

    doc.text(
        "Vente & Location de Véhicules",
        105,
        22,
        {
            align: "center"
        }
    );

    doc.text(
        "Dakar - Sénégal",
        105,
        29,
        {
            align: "center"
        }
    );

    // ============================
    // Numéro contrat
    // ============================

    const numeroContrat =
        `CTR-${new Date().getFullYear()}-${contract._id
            .slice(-4)
            .toUpperCase()}`;

    const dateEdition =
        new Date().toLocaleDateString("fr-FR");

    doc.setTextColor(0);

    doc.setFontSize(18);

    doc.text(
        "CONTRAT DE LOCATION / VENTE",
        20,
        52
    );

    doc.setFontSize(11);

    doc.text(
        `Contrat : ${numeroContrat}`,
        20,
        60
    );

    doc.text(
        `Date : ${dateEdition}`,
        140,
        60
    );

    // ============================
    // CLIENT
    // ============================

    doc.setFillColor(...lightBlue);

    doc.roundedRect(
        15,
        68,
        180,
        9,
        2,
        2,
        "F"
    );

    doc.setTextColor(255);

    doc.setFontSize(12);

    doc.text(
        "INFORMATIONS DU CLIENT",
        20,
        74
    );

    doc.setTextColor(0);

    doc.setFillColor(...gray);

    doc.roundedRect(
        15,
        77,
        180,
        34,
        2,
        2,
        "F"
    );

    doc.setFontSize(11);

    doc.text(
        `Nom : ${contract.client?.nom || ""}`,
        20,
        87
    );

    doc.text(
        `Prénom : ${contract.client?.prenom || ""}`,
        20,
        95
    );

    doc.text(
        `Téléphone : ${contract.client?.telephone || ""}`,
        20,
        103
    );

    doc.text(
        `Email : ${contract.client?.email || ""}`,
        110,
        87
    );

    // ======= COLLE LA PARTIE 2 À LA SUITE =======
        // ============================
    // VEHICULE
    // ============================

    doc.setFillColor(...lightBlue);

    doc.roundedRect(
        15,
        118,
        180,
        9,
        2,
        2,
        "F"
    );

    doc.setTextColor(255);

    doc.setFontSize(12);

    doc.text(
        "INFORMATIONS DU VÉHICULE",
        20,
        124
    );

    doc.setTextColor(0);

    doc.setFillColor(...gray);

    doc.roundedRect(
        15,
        127,
        180,
        34,
        2,
        2,
        "F"
    );

    doc.setFontSize(11);

    doc.text(
        `Marque : ${contract.vehicle?.marque || ""}`,
        20,
        137
    );

    doc.text(
        `Modèle : ${contract.vehicle?.modele || ""}`,
        20,
        145
    );

    doc.text(
        `Immatriculation : ${contract.vehicle?.immatriculation || ""}`,
        20,
        153
    );

    // ============================
    // CONTRAT
    // ============================

    doc.setFillColor(...lightBlue);

    doc.roundedRect(
        15,
        168,
        180,
        9,
        2,
        2,
        "F"
    );

    doc.setTextColor(255);

    doc.text(
        "DÉTAILS DU CONTRAT",
        20,
        174
    );

    doc.setTextColor(0);

    doc.setFillColor(...gray);

    doc.roundedRect(
        15,
        177,
        180,
        40,
        2,
        2,
        "F"
    );

    doc.setFontSize(11);

    doc.text(
        `Type : ${contract.type}`,
        20,
        187
    );

    doc.text(
        `Début : ${contract.dateDebut?.substring(0,10)}`,
        20,
        195
    );

    doc.text(
        `Fin : ${contract.dateFin?.substring(0,10)}`,
        20,
        203
    );

    doc.text(
        `Statut : ${contract.statut}`,
        110,
        187
    );

    // ============================
    // MONTANT
    // ============================

    doc.setFillColor(22,163,74);

    doc.roundedRect(
        15,
        225,
        180,
        25,
        4,
        4,
        "F"
    );

    doc.setTextColor(255);

    doc.setFontSize(13);

    doc.text(
        "MONTANT TOTAL À PAYER",
        105,
        235,
        {
            align:"center"
        }
    );

    doc.setFontSize(20);

    doc.text(
        `${Number(contract.montant).toLocaleString()} FCFA`,
        105,
        245,
        {
            align:"center"
        }
    );

    doc.setTextColor(0);

    // ============================
    // CLAUSES
    // ============================

    doc.addPage();

    doc.setFontSize(18);

    doc.text(
        "Conditions Générales",
        20,
        20
    );

    autoTable(doc,{

        startY:30,

        theme:"plain",

        body:[

            ["• Le client reconnaît avoir reçu le véhicule en parfait état."],

            ["• Le véhicule doit être restitué à la date prévue."],

            ["• Toute dégradation sera facturée au client."],

            ["• Les infractions routières restent à la charge du client."],

            ["• BACOUM HOLDING peut résilier le contrat en cas de non-respect des conditions."]

        ]

    });

    // ======== COLLE LA PARTIE 3 ICI ========
        // ============================
    // QR CODE
    // ============================

    const qrContent = JSON.stringify({
        numero: numeroContrat,
        client: `${contract.client?.nom} ${contract.client?.prenom}`,
        vehicule: `${contract.vehicle?.marque} ${contract.vehicle?.modele}`,
        montant: `${contract.montant} FCFA`
    });

    const qrImage = await QRCode.toDataURL(qrContent);

    doc.addImage(
        qrImage,
        "PNG",
        150,
        60,
        35,
        35
    );

    doc.setFontSize(9);

    doc.setTextColor(100);

    doc.text(
        "Scanner pour vérifier le contrat",
        145,
        102
    );

    // ============================
    // SIGNATURES
    // ============================

    doc.setDrawColor(180);

    doc.line(
        20,
        170,
        80,
        170
    );

    doc.line(
        120,
        170,
        180,
        170
    );

    doc.setTextColor(0);

    doc.setFontSize(11);

    doc.setFont("helvetica", "bold");

    doc.text(
        "Signature du Client",
        25,
        178
    );

    doc.text(
        "Signature BACOUM HOLDING",
        118,
        178
    );

    // ============================
    // PIED DE PAGE
    // ============================

    doc.setDrawColor(220);

    doc.line(
        15,
        285,
        195,
        285
    );

    doc.setFont("helvetica", "normal");

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(
        "BACOUM HOLDING - Vente & Location de Véhicules",
        105,
        290,
        {
            align: "center"
        }
    );

    doc.text(
        "Dakar - Sénégal | Tél : +221 70 654 33 24 / 76 694 42 13 | Email : contact@bacoumholding.sn",
        105,
        295,
        {
            align: "center"
        }
    );

    // ============================
    // SAUVEGARDE
    // ============================

    doc.save(`${numeroContrat}.pdf`);

};

export default generateContractPDF;