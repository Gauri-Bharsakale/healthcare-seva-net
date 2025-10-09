import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "hi" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === "en" ? "हिंदी" : "English"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
