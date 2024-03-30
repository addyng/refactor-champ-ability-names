import { useState } from 'react';
import ManualList from '../tabs/ManualList.jsx'
import SummonerLookup from '../tabs/SummonerLookup.jsx'


function Header() {

    const [currentTab, setCurrentTab] = useState("tab1");

    const handleTab = (event) => {
        if (event.target.className.includes("tab1")) {
            setCurrentTab("tab1");
        }

        if (event.target.className.includes("tab2")) {
            setCurrentTab("tab2");
        }
    }

    return (
        <div className="headerRoot">
            <ul className="tabs">
                {/* Template String, static & conditional classes */}
                <li className={`tab1 ${currentTab === "tab1" ? "active" : ""}`} onClick = {handleTab}>Manual List</li>
                <li className={`tab2 ${currentTab === "tab2" ? "active" : ""}`} onClick = {handleTab}>Summoner Lookup</li>
            </ul>

            <div className="content">
                {currentTab.includes("tab1") ? <ManualList /> : <SummonerLookup />}
            </div>
        </div>
    )
}

export default Header