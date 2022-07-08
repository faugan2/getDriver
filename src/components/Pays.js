import "../styles/pays.scss";
import ReactCountryFlag from "react-country-flag"
import CloseIcon from '@material-ui/icons/Close';

const Pays=({pays,close,selected})=>{
    return(
        <div className="pays">

            <button onClick={close} className="btn_close">
                <CloseIcon />
            </button>
            <div className="content">
                {
                    pays.map((item,i)=>{
                        return(
                            <button key={i} onClick={e=>{
                                selected(item.isoCode2);
                                close();
                            }}>
                                <ReactCountryFlag countryCode={item.isoCode2} svg />
                                {item.country}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pays;