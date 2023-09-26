const App = () => (
    <div>
        <Tweet  username="User1"
                name="First1 Last1"
                date="today"
                message="message1"
        />
        <Tweet  username="User2"
                name="First2 Last2"
                date="yesterday"
                message="message2"
        />
        <Tweet  username="User3"
                name="First3 Last3"
                date="day-before-yesterday"
                message="message3"
        />
    </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));