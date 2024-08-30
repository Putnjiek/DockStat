import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const ConfigModal = ({ apihost, apiKey }) => {
    const [configData, setConfigData] = useState(null);
    const [isClipboardChecked, setIsClipboardChecked] = useState(false);
    const [result, setResult] = useState('');

    const handleCopyClick = () => {
        navigator.clipboard.writeText(result);
        setIsClipboardChecked(true);
        setTimeout(() => setIsClipboardChecked(false), 3000);
    };

    useEffect(() => {
        if (!apihost || !apiKey) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`${apihost}/config`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${apiKey}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch data');

                const data = await response.text();
                setResult(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, [apihost, apiKey]);

    return (
        <>
            {result ? (
                <>
                    <div className="relative mb-4"> {/* Adjust the margin-bottom as needed */}
                        <button
                            onClick={handleCopyClick}
                            className="absolute top-0 right-0 btn btn-neutral btn-xs"
                        >
                            {isClipboardChecked ? (
                                <FaClipboardCheck className="text-accent mr-0 animate-pulse" />
                            ) : (
                                <FaClipboard className="text-primary mr-0" />
                            )}
                            <span className="ml-2">{isClipboardChecked ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                    <SyntaxHighlighter
                        language="yaml"
                        style={nord}
                        showLineNumbers="True"
                        wrapLines="True"
                        wrapLongLines="True"
                    >
                        {result}
                    </SyntaxHighlighter>
                </>
            ) : (
                <p>Fetching Configuration.</p>
            )}
        </>
    );
};

export default ConfigModal;
