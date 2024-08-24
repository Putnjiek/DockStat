import React, { useState, useEffect } from 'react';
import { FaMemory, FaMicrochip, FaArrowDown, FaArrowUp, FaLink, FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContainerStats.css';

function formatBytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
}

function formatBytesToGB(bytes) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

function calculateCpuPercentage(cpuUsage, cpuLimit) {
    if (!cpuLimit || cpuLimit === 0) return 'N/A';
    return ((cpuUsage / cpuLimit) * 100).toFixed(2);
}

function getStatusClass(status) {
    switch (status) {
        case 'running':
            return 'status-green';
        case 'starting':
            return 'status-orange';
        case 'error':
            return 'status-red';
        default:
            return 'status-grey';
    }
}

function ContainerStats({ container, timeInterval, onStopResume, onRestart }) {
    const { name, state, cpu_usage, mem_usage, mem_limit, current_net_rx, current_net_tx, link, icon, id, hostName } = container;

    const [prevCpuUsage, setPrevCpuUsage] = useState(cpu_usage);

    const cpuPercentage = calculateCpuPercentage(cpu_usage, 100000000000000);

    useEffect(() => {
        setPrevCpuUsage(cpu_usage);
    }, [cpu_usage]);

    const containerName = name.startsWith('/') ? name.substring(1) : name;

    const handleStopResume = async () => {
        toast.info('Request sent to toggle container state.');

        try {
            const response = await fetch(`http://localhost:7070/startstop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ containerId: id, hostName: hostName })
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`Container state toggled successfully: ${result.message}`);
                // Optionally, refresh container stats here
            } else {
                toast.error('Failed to toggle container state.');
                console.error('Failed to toggle container state:', response.statusText);
            }
        } catch (error) {
            toast.error('An error occurred.');
            console.error('Error occurred:', error);
        }
    };

    const handleRestart = async () => {
        toast.info('Request sent to restart container.');

        try {
            const response = await fetch(`http://localhost:7070/restart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ containerId: id, hostName: hostName })
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`Container restarted successfully: ${result.message}`);
                // Optionally, refresh container stats here
            } else {
                toast.error('Failed to restart container.');
                console.error('Failed to restart container:', response.statusText);
            }
        } catch (error) {
            toast.error('An error occurred.');
            console.error('Error occurred:', error);
        }
    };

    return (
        <div className="border p-4 rounded shadow container-bubble relative">
            <ToastContainer />
            <div className="flex items-center justify-between relative">
                <div className="flex items-center">
                    <div className={`status-orb ${getStatusClass(state)} ${state === 'running' || state === 'starting' || state === 'error' ? 'pulse' : ''}`}></div>
                    {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <FaLink className="mr-1 text-gray-500" />
                            <h3 className="font-semibold text-lg ml-1">{containerName}</h3>
                        </a>
                    ) : (
                        <div className="flex items-center">
                            <h3 className="font-semibold text-lg ml-0">{containerName}</h3>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center mt-2">
                <FaMicrochip className="mr-2" />
                <p>{cpuPercentage}%</p>
            </div>
            <div className="flex items-center mt-2">
                <FaMemory className="mr-2" />
                <p>{formatBytesToGB(mem_usage)} GB / {formatBytesToGB(mem_limit)} GB</p>
            </div>
            <div className="flex items-center mt-2">
                <FaArrowUp className={`network-stats ${current_net_tx !== 0 ? 'pulse' : ''} mr-2`} />
                <p>{formatBytesToMB(current_net_tx)} MB/s</p>
            </div>
            <div className="flex items-center mt-2">
                <FaArrowDown className={`network-stats ${current_net_rx !== 0 ? 'pulse' : ''} mr-2`} />
                <p>{formatBytesToMB(current_net_rx)} MB/s</p>
            </div>
            {icon && (
                <img src={`/icons/${icon}`} alt="Container Icon" className="container-icon absolute bottom-0 right-0 p-2" />
            )}
        </div>
    );
}

export default ContainerStats;
