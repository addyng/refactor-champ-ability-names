import { useState } from 'react';

function ManualList() {

    const [championNamesList, setChampionNamesList] = useState([]);
    const [championJSON, setChampionJSON] = useState([]);
    const [championImages, setChampionImages] = useState([]);
    const spellKeys = ["Q", "W", "E", "R"];

    const handleInput = async (event) => {
        if (event.key === 'Enter') {
            setChampionNamesList([]);
            setChampionJSON([]);
            setChampionImages([]);

            let championNames = event.target.value.split(',').map(champ => champ.trim());
            setChampionNamesList(championNames);

            let championJSONList = [];
            let championImagesList = [];
            for (const champName of championNames) {
                const championData = await import(`../../../../dragontail-14.6.1/14.6.1/data/en_US/champion/${champName}.json`);
                const championImage = await import(`../../../../dragontail-14.6.1/img/champion/tiles/${champName}_0.jpg`);
                championJSONList.push(championData);
                championImagesList.push(championImage.default);
            }
    
            setChampionJSON(championJSONList);
            setChampionImages(championImagesList);
        }
    }

    return (
        <div className="manualListRoot">
            <input onKeyDown={handleInput} className="inputList" type="text" placeholder="Please enter in a comma separated list with the champions names capitalized, remove spaces and apostrophes" autoFocus/>
        
            <div className="championsDisplay">
                {championJSON.map((champ, index) => 
                <div className="singleChamp" key={index}>
                    <img className="singleChampImage" src={championImages[index]}></img>
                    {champ.data[championNamesList[index]].spells.map((spell, spellIndex) => ( 
                        <div className="singleChampSpell" key={spellIndex}>{spellKeys[spellIndex]}: {spell.name}</div>))}
                        <div className="singleChampSpell">Passive: {champ.data[championNamesList[index]].passive.name}</div>
                </div>)}
            </div>
        </div>
    )
}

export default ManualList