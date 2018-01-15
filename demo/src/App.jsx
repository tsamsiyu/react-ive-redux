import React from 'react'

export class App extends React.Component {
    componentWillUpdate() {
        this.start = (new Date).getTime();
    }

    componentDidUpdate() {
        console.log(this.props.type + ' : ' + ((new Date).getTime() - this.start));
    }

    render () {
        return <div>
          Hello React project
          <br/>
          { this.props.todos.map((todo) => (
            <div key={ todo.id }>
              { todo.id } : { todo.title } ({todo.tags.map(tag => tag.label).join('|')})
            </div>
          )) }
        </div>;
      }
}