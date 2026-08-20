"use client";

import { useEffect, useState } from 'react';
import { dateDuJour } from "@/lib/daily";
import { EVENEMENT_MAJ_SCORE } from "@/lib/events";
import { lireHistorique, lireStatsGlobales, lireSauvegarde } from "@/lib/sauvegarde";


export default function Score() {
    
    const [pointsDuJour, setPointsDuJour] = useState(0);
    const [record, setRecord] = useState(0);
    const [victoires, setVictoires] = useState(0);

    useEffect(() => {
        const rafraichir = () => {
            const aujourdhui = dateDuJour();
            const historique = lireHistorique();
            setPointsDuJour(historique[aujourdhui] || 0);

            const sauvegarde = lireSauvegarde(aujourdhui);
            const partiesJouees = Object.values(sauvegarde.parties);

            const nbVictoires = partiesJouees.filter(partie => partie.statut === "won").length;
            setVictoires(nbVictoires);

            const stats = lireStatsGlobales();
            if (stats) {
                setRecord(stats.record);
            } else {
                setRecord(0);
            }
        };

        rafraichir();
        window.addEventListener(EVENEMENT_MAJ_SCORE, rafraichir);
        return () => window.removeEventListener(EVENEMENT_MAJ_SCORE, rafraichir);
    }, []);
    

    return (
        <div className="flex w-full flex-row md:flex-col gap-3 sm:gap-4 justify-between items-stretch">
            <div className="flex flex-col flex-1">
                <span className="mb-1 sm:mb-2 block font-mono text-[10px] sm:text-xs tracking-widest text-zinc-400 
                uppercase text-center md:text-left">
                    Score du jour
                </span>

                <div className="flex items-baseline gap-2 rounded-2xl bg-blue-600 px-2 sm:px-6 py-2
                ring-blue-400 h-full">
                    <span className="font-mono text-xl sm:text-2xl font-black text-white">
                        {pointsDuJour}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-blue-100">PTS</span>
                </div>
            </div>

            <dl className="flex flex-col justiify-center flex-1 rounded-xl border border-zinc-800 
            bg-zinc-900/60 p-2 sm:p-3 font-mono text-[10px] sm:text-xs text-zinc-400">
                <div className="flex justify-between items-center mb-1">
                    <dt>Record </dt>
                    <dd className="font-bold text-white text-right ml-2"> {record}</dd>
                </div>
                <div className="flex justify-between items-center">
                    <dt>Victoires </dt>
                    <dd className="font-bold text-white text-right ml-2">
                        {victoires}/5
                    </dd>
                </div>
            </dl>
        </div>
    );
}