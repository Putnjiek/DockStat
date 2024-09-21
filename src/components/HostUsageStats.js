import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function HostUsageStats({ apihost, apiKey }) {
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
        <div>
            {Object.keys(hostStats).map((host) => (
                <div key={host} className="grid grid-cols-2 gap-1">
                    <h3 className="text-secondary">Available Memory: {(hostStats[host].totalMemory / (1024 ** 3)).toFixed(2)} GB</h3>
                    <h3 className="text-secondary">Cpu Cores: {hostStats[host].totalCPUs}</h3>
                    <h3 className="text-secondary">Memory Usage: {hostStats[host].memoryUsage}%</h3>
                    <h3 className="text-secondary">
                        CPU Usage: {calculateCpuPercentage(parseFloat(hostStats[host].cpuUsage), 100000000000000)}%
                    </h3>
                </div>
            ))}
        </div>
    );
}

export default HostUsageStats;
