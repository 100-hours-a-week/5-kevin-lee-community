import Name from "../Components/Name";

function Index({name, age, children}){
    const name2 = name;
    const age2 = age;
    const children2 = children;

    return(
        <div>
            <h1>{name2}</h1>
            <h2>{age2}</h2>
            <h3>{children2}</h3>
        </div>
    )
}

export default Index;