const App = () => (
    <div>
        <Person name="Name1"
                age={17}
                hobbies={["hobby1", "hobby2", "hobby3"]}/>
        <Person name="Name2"
                age={18}
                hobbies={["p2hobby1", "p2hobby2", "p2hobby3"]}/>
        <Person name="LongName"
                age={21}
                hobbies={["p3hobby1", "p3hobby2", "p3hobby3"]}/>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));