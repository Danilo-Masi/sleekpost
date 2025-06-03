import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">Install SleekPost</h3>
                <button
                    onClick={() => setShowPrompt(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <X className="w-4 h-4" />
                </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
                Install SleekPost on your device for quick and easy access when you're on the go.
            </p>
            <Button
                onClick={handleInstall}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                <Download /> Install
            </Button>
        </div>
    );
} 