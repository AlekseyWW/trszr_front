import udobreniya from "../../assets/udobreniya.svg";
import icon from "../../assets/icon.svg";
import logo from "../../assets/logo.svg";
import zashitaRastenij from "../../assets/zashitaRastenij.svg";
import semena from "../../assets/semena.svg";
import search from "../../assets/search.svg";
const icons = {
  udobreniya,
  zashitaRastenij,
  sem: semena,
  search,
  icon
};
const Icon = ({ name, className }) => {
    const IconComp = icons[name];
    return IconComp ? <IconComp className={className} /> : '';
};

export default Icon;