import { useState } from "react";


function Tabbed({ content }) {
    const [activeTab, setActiveTab] = useState(0);
  
    return (
      <div>
        <div className="tabs">
          <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
          <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        </div>
  
        {activeTab <= 2 ? (
          <TabContent item={content.at(activeTab)} />
        ) : (
          <p>Something went wrong</p>
        )}
      </div>
    );
  }
  
  function Tab({ num, activeTab, onClick }) {
    return (
      <button
        className={activeTab === num ? "tab active" : "tab"}
        onClick={() => onClick(num)}
      >
        Tab {num + 1}
      </button>
    );
  }
  
  function TabContent({ item }) {
    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);
  
    function handleInc() {
      setLikes(likes + 1);
    }
  
    return (
      <div className="tab-content">
        <h4>{item.summary}</h4>
        {showDetails && <p>{item.details}</p>}
  
        <div className="tab-actions">
          <button onClick={() => setShowDetails((h) => !h)}>
            {showDetails ? "Hide" : "Show"} details
          </button>
  
          <div className="hearts-counter">
            <span>{likes} ❤️</span>
            <button onClick={handleInc}>+</button>
          </div>
        </div>
  
       
      </div>
    );
  }
  
  export default Tabbed