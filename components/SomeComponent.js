import { useEffect, useState } from 'react';

export default function SomeComponent({ serverData }) {
  const [clientData, setClientData] = useState(serverData);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fetch or update client-specific data if necessary
      setClientData(serverData); // Ensure consistency
    }
    setCurrentTime(Date.now());
  }, [serverData]);

  return (
    <div>
      <p>Data: {clientData}</p>
      {currentTime && <p>Current Time: {new Date(currentTime).toLocaleString()}</p>}
    </div>
  );
}
