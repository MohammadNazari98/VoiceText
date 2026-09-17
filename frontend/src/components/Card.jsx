const Card = (props) => {
    const classes = `card border-primary my-3 ${props.className}`
    return (
        <div className={classes}>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}

export default Card