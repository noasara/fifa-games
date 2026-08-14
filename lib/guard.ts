import motsJson from "@/app/data/ligue1/wordle.json";

const MotsClient = motsJson.words as Record<string, string[]>;

//Définition des types d'erreurs
export type ErreurSaisie = "doublon" | "invalide" | null;

export function verifierSaisie(essai: string, essaisPrecedents: string[], longueurMot: number):
ErreurSaisie {
    //Boucllier anti-doublons
    if (essaisPrecedents.includes(essai)) {
        return "doublon";
    }

    //Bouclier anti-mots inventés
    const listeDeMots = MotsClient[longueurMot.toString()] || [];
    const motValide = listeDeMots.some(
        (motDuDictionnaire) => motDuDictionnaire.toUpperCase() === essai.toUpperCase()
    );

    if (!motValide) {
        return "invalide";
    }

    //Si tout est okay, pas d'erreurs on retourne null
    return null;
}