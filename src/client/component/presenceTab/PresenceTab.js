const PresenceTab = (props) => {
    return (
        <div>{props.map(user => {
            return (<PresenceElement ></PresenceElement>)
        })}
        </div>
    )
}