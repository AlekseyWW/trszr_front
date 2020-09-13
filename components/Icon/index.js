import udobreniya from "../../assets/udobreniya.svg";
import icon from "../../assets/icon.svg";
import logo from "../../assets/logo.svg";
import zashitaRastenij from "../../assets/zashitaRastenij.svg";
import semena from "../../assets/semena.svg";
import search from "../../assets/search.svg";
import back from "../../assets/back.svg";
import filter from "../../assets/filter.svg";
import close from "../../assets/close.svg";
const icons = {
  udobreniya,
  zashitaRastenij,
  sem: semena,
  logo,
  search,
  back,
  filter,
  close,
  icon,
};
const Icon = ({ name, className }) => {
    const IconComp = icons[name];
    return IconComp ? <IconComp className={className} /> : null;
};

export default Icon;