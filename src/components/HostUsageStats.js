import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function HostUsageStats({ apihost, apiKey, TargetHost }) {
    const [hostStats, setHostStats] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch(`${apihost}/hosts`, {
                method: 'GET',
                headers: {
                    'Authorization': `${apiKey}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setHostStats(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data. Please try again later.');
        }
    };

    const calculateCpuPercentage = (cpuUsage, cpuLimit) => {
        if (!cpuLimit || cpuLimit === 0) return 'N/A';
        return ((cpuUsage / cpuLimit) * 100).toFixed(2);
    };

    useEffect(() => {
        fetchData();
    }, [apihost, apiKey]);

    return (
        <>
            {hostStats[TargetHost] ? (
                <div className="grid grid-cols-2 gap-1">
                    <h3 className="text-secondary">
                        Available Memory: {(hostStats[TargetHost].totalMemory / (1024 ** 3)).toFixed(2)} GB
                    </h3>
                    <h3 className="text-secondary">CPU Cores: {hostStats[TargetHost].totalCPUs}</h3>
                    <h3 className="text-secondary">Memory Usage: {hostStats[TargetHost].memoryUsage} %</h3>
                    <h3 className="text-secondary">
                        CPU Usage: {calculateCpuPercentage(parseFloat(hostStats[TargetHost].cpuUsage), 100000000000000)}%
                    </h3>
                </div>
            ) : (
                <p className="text-secondary">Loading host statistics...</p>
            )}
        </>
    );
}

export default HostUsageStats;
