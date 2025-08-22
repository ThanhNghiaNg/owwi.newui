"use client";
import { Download, PictureInPicture } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        deferredPrompt: any;
    }
}

export default function InstallOrOpenPWAButton() {
    const [mode, setMode] = useState<"hidden" | "install" | "open">("open");

    useEffect(() => {
        // 1. Nếu đang ở standalone (đã mở app) thì ẩn nút
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setMode("hidden");
            return;
        }

        // 2. Kiểm tra xem app đã cài chưa (chỉ hỗ trợ Android/Chrome)
        if ("getInstalledRelatedApps" in navigator) {
            (navigator as any).getInstalledRelatedApps().then((apps: any[]) => {
                if (apps.length > 0) {
                    setMode("open"); // đã cài rồi
                }
            });
        }

        // 3. Nếu chưa có thì chờ sự kiện beforeinstallprompt
        const handler = (e: Event) => {
            e.preventDefault();
            window.deferredPrompt = e;
            setMode("install");
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) return;
        promptEvent.prompt();
        const choiceResult = await promptEvent.userChoice;
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted install");
        }
        window.deferredPrompt = null;
        setMode("hidden");
    };

    const handleOpenApp = () => {
        // Deep link tới app (custom protocol hoặc universal link)

        const now = Date.now();
        window.location.href = "web+owwi://open"; // ví dụ schema app của bạn

        setTimeout(() => {
            if (Date.now() - now < 1500) {
                handleInstall();
            }
        }, 1000);
    };

    if (mode === "hidden") return null;

    return (
        <button
            onClick={mode === "install" ? handleInstall : handleOpenApp}
            className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >


            {mode === "install" ?
                <>
                    <Download />
                    Download App</> :
                <>
                    <PictureInPicture />
                    Open in App
                </>}
        </button>
    );
}
