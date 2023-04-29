from flask import Flask, request, render_template
import stories as s

app = Flask(__name__)

@app.route('/madlibs')
def madlibs():
    """Dynamically accepts prompts for the Story class and generates a form with inputs."""
    words = [prompt.replace("_", " ").title() for prompt in s.story.prompts]
    return render_template('madlibs.html', words=words)

@app.route('/your_story')
def your_story():
    """Takes the values from the inputs and returns them filled into the story."""
    words = {word: request.args.get(word) for word in s.story.prompts}
    story = s.story.template.format(**words)
    return render_template('your_story.html', story=story)