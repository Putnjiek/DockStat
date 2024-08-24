import React, { useState, useEffect } from 'react';
import HostStats from './HostStats';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [data, setData] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [intervalTime, setIntervalTime] = useState(5000);
    const [theme, setTheme] = useState('');
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [apihost, setApihost] = useState('');
    const [key, setKey] = useState('');

    // Fetch configuration from config.json
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/config.json');
                const configData = await response.json();
                setApihost(configData.API_URL);
                setKey(configData.SECRET);
                setTheme(configData.DEFAULT_THEME);
            } catch (error) {
                console.error('Error loading configuration:', error);
                toast.error('Failed to load configuration.');
            }
        };

        fetchConfig();
    }, []);

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await fetch(`${apihost}/stats`, {
                method: 'GET',
                headers: {
                    'Authorization': `${key}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();

            if (JSON.stringify(result) !== JSON.stringify(data)) {
                setData(result);
            }

            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data. Please try again later.');
        }
    };

    useEffect(() => {
        if (apihost && key) {
            fetchData();
            const interval = setInterval(fetchData, intervalTime);
            return () => clearInterval(interval);
        }
    }, [apihost, key, intervalTime]);

    useEffect(() => {
        setLoadingTheme(true);
        if (theme === 'nord') {
            import('./themes/nord.css').then(() => setLoadingTheme(false));
        } else if (theme === 'dracula') {
            import('./themes/dracula.css').then(() => setLoadingTheme(false));
        } else if (theme === 'light') {
            import('./themes/light.css').then(() => setLoadingTheme(false));
        }
    }, [theme]);

    return (
        <div className={`container mx-auto p-4 theme-${theme}`}>
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">DockStat</h1>
                <div>
                    <select
                        className="border p-2"
                        value={intervalTime}
                        onChange={(e) => setIntervalTime(Number(e.target.value))}
                    >
                        <option value={5000}>5 Seconds</option>
                        <option value={10000}>10 Seconds</option>
                        <option value={30000}>30 Seconds</option>
                    </select>
                    <select
                        className="border p-2 ml-4"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="light">Light</option>
                        <option value="nord">Nord</option>
                        <option value="dracula">Dracula</option>
                    </select>
                </div>
            </div>
            {isInitialLoad || loadingTheme ? (
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {Object.keys(data).length === 0 ? (
                        <p>No data available.</p>
                    ) : (
                        Object.keys(data).map((host) => (
                            <HostStats key={host} host={host} containers={data[host]} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
