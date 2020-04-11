import udobreniya from "../../assets/udobreniya.svg";
import icon from "../../assets/icon.svg";
import logo from "../../assets/logo.svg";
import zashitaRastenij from "../../assets/zashitaRastenij.svg";
import semena from "../../assets/semena.svg";
import search from "../../assets/search.svg";
import back from "../../assets/back.svg";
import filter from "../../assets/filter.svg";
const icons = {
  udobreniya,
  zashitaRastenij,
  sem: semena,
  search,
  back,
  filter,
  icon
};
const Icon = ({ name, className }) => {
    const IconComp = icons[name];
    return IconComp ? <IconComp className={className} /> : '';
};

export default Icon;