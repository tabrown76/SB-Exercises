const Tweet = (props) => {
    return (
        <div id="tweet">
            <p id="username"><i>{props.username}</i></p>
            <p id="name"><i>{props.name}</i></p>
            <p id="date"><i>{props.date}</i></p>
            <p>{props.message}</p>
        </div>
    )
}