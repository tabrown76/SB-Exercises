const Person = (props) => {
    let ageHeader;
    let name; 

    if(props.age < 18){
        ageHeader = "You must be 18.";
    } else{
        ageHeader = "Please go vote!";
    }

    if(props.name.length >= 8){
        name = props.name.slice(0, 6);
    } else{
        name = props.name;
    }

    return (
        <div>
            <p>Learn some information about this person!</p>
            <h1>{name}</h1>
            <h3>{ageHeader}</h3>
            <ul>
                {props.hobbies.map(h => <li>{h}</li>)}
            </ul>
        </div>
    )
}