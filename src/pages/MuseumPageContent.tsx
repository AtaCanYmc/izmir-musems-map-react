import {useEffect, useState} from "react";
import {IzmirMap} from "../components/IzmirMap";

export const MuseumPageContent = () => {
    const [museums, setMuseums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMuseums = async () => {
        try {
            const response = await fetch('https://openapi.izmir.bel.tr/api/ibb/cbs/muzeler');
            if (!response.ok) {
                throw new Error(`API Hatası: ${response.status}`);
            }
            const data = await response.json();
            const museumArr = data['onemliyer'].map((museum:any, idx:number) => {
                return {
                    id: idx,
                    name: museum['ADI'],
                    position: [museum['ENLEM'], museum['BOYLAM']],
                    description: museum['ACIKLAMA']
                }
            })
            setMuseums(museumArr);
            setLoading(false);
        } catch (error) {
            // @ts-ignore
            if(error.message) {
                // @ts-ignore
                setError(error.message);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMuseums();
    }, []);

    return (
        <>
            <IzmirMap markers={museums}/>
        </>
    );
};