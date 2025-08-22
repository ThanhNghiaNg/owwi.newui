"use client";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        deferredPrompt: any;
    }
}

export default function InstallPWAButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            window.deferredPrompt = e;
            setIsVisible(true); // hiển thị nút khi đủ điều kiện
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) return;

        promptEvent.prompt(); // show popup cài đặt
        const choiceResult = await promptEvent.userChoice;
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted install");
        } else {
            console.log("User dismissed install");
        }
        window.deferredPrompt = null;
        setIsVisible(false);
    };

    if (!isVisible) return null;



    return (
        <button
            onClick={handleInstall}
            className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
            <Download />
            Download App
        </button>
    );
}
