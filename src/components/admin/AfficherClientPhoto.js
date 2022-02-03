import "./afficher_client_photo.scss";
const AfficherClientPhoto=({url})=>{
    return (
        <div className="afficher_client_photo">
            {url==undefined && <div>Aucune photo n'est ajoutée pour ce client</div>}
            {url!=undefined && <img src={url} style={{width:200,height:200,resize:"contain",}}/>}
        </div>
    )
}
export default AfficherClientPhoto;