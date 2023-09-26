const App = () => (
    <div>
        <FirstComponent/>
        <NamedComponent name='Tim'/>
    </div>
)

ReactDOM.render(<App/>, document.getElementById('root') )