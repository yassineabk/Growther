import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ar: { label: "العربية", dir: "rtl", active: false },
  fr: { label: "Français", dir: "ltr", active: false }
};

const LanguageSelect = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  React.useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);

  const changeLang=(item) => {
    i18next.changeLanguage(item);
  }

  return (
<div class="select is-primary">
  <select onChange={(e)=>changeLang(e.target.value)}>
    <option value="English" >English</option>
    <option value="العربية" >Arabic</option>
    <option value="Français" >French</option> 
  </select>
</div>
  );
};

export default LanguageSelect;
